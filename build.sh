#!/usr/bin/env bash
set -euo pipefail

PROJECT_ROOT="$(cd "$(dirname "$0")" && pwd)"
BINARY_NAME="playgraph"
GITHUB_REPO="leaf-kit/playgraph.md"
HOMEBREW_TAP_REPO="leaf-kit/homebrew-playgraph"

cd "$PROJECT_ROOT"

get_version() {
    grep '^version' src-tauri/Cargo.toml | head -1 | sed 's/.*"\(.*\)"/\1/'
}

bump_patch_version() {
    local current
    current=$(get_version)
    local major minor patch
    IFS='.' read -r major minor patch <<< "$current"
    patch=$((patch + 1))
    local new_version="${major}.${minor}.${patch}"
    sed -i '' "s/^version = \"${current}\"/version = \"${new_version}\"/" src-tauri/Cargo.toml
    echo ">> Version bumped: ${current} -> ${new_version}"
}

show_menu() {
    local ver
    ver=$(get_version)
    echo "=================================="
    echo "  playgraph v${ver} — Build & Dev"
    echo "=================================="
    echo ""
    echo "  1) Build (debug)"
    echo "  2) Build (release)"
    echo "  3) Run tests"
    echo "  4) Run clippy (lint)"
    echo "  5) Clean build artifacts"
    echo "  6) Dev mode (live reload)"
    echo "  7) Create release tarball"
    echo "  8) Deploy to Homebrew"
    echo "  0) Exit"
    echo ""
    echo -n "  Select: "
}

require_tests() {
    echo ">> Running Rust tests..."
    if ! (cd src-tauri && cargo test); then
        echo "!! Rust tests failed. Aborting."
        return 1
    fi
    echo ">> Running clippy..."
    if ! (cd src-tauri && cargo clippy -- -D warnings); then
        echo "!! Clippy found issues. Aborting."
        return 1
    fi
    echo ">> All checks passed."
}

build_debug() {
    echo ">> Installing npm dependencies..."
    npm install
    echo ">> Building debug..."
    cargo tauri build --debug
    echo ">> Done."
}

build_release() {
    require_tests || return 1
    bump_patch_version
    echo ">> Installing npm dependencies..."
    npm install
    echo ">> Building release..."
    cargo tauri build
    echo ">> Done: release build at src-tauri/target/release/bundle/"
}

run_tests() {
    echo ">> Running Rust tests..."
    (cd src-tauri && cargo test)
    echo ">> Tests complete."
}

run_clippy() {
    echo ">> Running clippy..."
    (cd src-tauri && cargo clippy -- -W clippy::all)
    echo ">> Clippy complete."
}

clean() {
    echo ">> Cleaning cargo build artifacts..."
    (cd src-tauri && cargo clean)
    echo ">> Cleaning npm cache..."
    rm -rf node_modules dist
    echo ">> Clean complete."
}

dev_mode() {
    echo ">> Starting dev mode..."
    cargo tauri dev
}

create_tarball() {
    build_release || return 1

    VERSION=$(get_version)
    ARCH="$(uname -m)"
    OS="$(uname -s | tr '[:upper:]' '[:lower:]')"
    TARBALL="$BINARY_NAME-$VERSION-$ARCH-$OS.tar.gz"

    echo ">> Creating release tarball: $TARBALL"

    STAGING=$(mktemp -d)
    cp "src-tauri/target/release/$BINARY_NAME" "$STAGING/" 2>/dev/null || true
    cp README.md LICENSE "$STAGING/" 2>/dev/null || true

    tar -czf "$TARBALL" -C "$STAGING" .
    rm -rf "$STAGING"

    echo ">> Done: $TARBALL"
    echo ">> SHA256: $(shasum -a 256 "$TARBALL" | awk '{print $1}')"
}

deploy_homebrew() {
    VERSION=$(get_version)
    TAG="v${VERSION}"

    echo ""
    echo "======================================"
    echo "  Deploying playgraph ${VERSION} to Homebrew"
    echo "======================================"
    echo ""

    require_tests || return 1

    echo "[1/5] Creating GitHub release ${TAG}..."
    git tag "$TAG" 2>/dev/null || true
    git push origin "$TAG" 2>/dev/null || true

    echo "[2/5] Downloading source tarball SHA256..."
    VERIFY_DIR=$(mktemp -d)
    curl -sL "https://github.com/${GITHUB_REPO}/archive/refs/tags/${TAG}.tar.gz" \
        -o "$VERIFY_DIR/source.tar.gz"
    SOURCE_SHA=$(shasum -a 256 "$VERIFY_DIR/source.tar.gz" | awk '{print $1}')
    rm -rf "$VERIFY_DIR"
    echo "        SHA256: ${SOURCE_SHA}"

    echo "[3/5] Updating Formula..."
    mkdir -p Formula
    cat > Formula/playgraph.rb << FORMULA
class Playgraph < Formula
  desc "Interactive math animation viewer powered by markdown"
  homepage "https://github.com/${GITHUB_REPO}"
  version "${VERSION}"
  license "MIT"

  depends_on "rust" => :build
  depends_on "node" => :build

  url "https://github.com/${GITHUB_REPO}/archive/refs/tags/${TAG}.tar.gz"
  sha256 "${SOURCE_SHA}"

  def install
    system "npm", "install"
    cd "src-tauri" do
      system "cargo", "build", "--release"
      bin.install "target/release/playgraph"
    end
  end

  test do
    assert_match "playgraph", shell_output("#{bin}/playgraph --version")
  end
end
FORMULA
    echo "        Done."

    echo "[4/5] Committing Formula..."
    git add Formula/playgraph.rb
    if git diff --cached --quiet; then
        echo "        Formula unchanged."
    else
        git commit -m "Formula: update to ${TAG}"
        git push origin main
    fi

    echo "[5/5] Pushing to tap..."
    TAP_DIR=$(mktemp -d)
    gh repo clone "$HOMEBREW_TAP_REPO" "$TAP_DIR/hb" 2>/dev/null || true
    if [ -d "$TAP_DIR/hb" ]; then
        mkdir -p "$TAP_DIR/hb/Formula"
        cp Formula/playgraph.rb "$TAP_DIR/hb/Formula/playgraph.rb"
        (
            cd "$TAP_DIR/hb"
            git add Formula/playgraph.rb
            if ! git diff --cached --quiet; then
                git commit -m "Update playgraph to ${TAG}"
                git push origin main
            fi
        )
    fi
    rm -rf "$TAP_DIR"

    echo ""
    echo "======================================"
    echo "  Deploy complete: v${VERSION}"
    echo "======================================"
}

# Main loop
while true; do
    show_menu
    read -r choice
    echo ""

    case $choice in
        1) build_debug ;;
        2) build_release ;;
        3) run_tests ;;
        4) run_clippy ;;
        5) clean ;;
        6) dev_mode ;;
        7) create_tarball ;;
        8) deploy_homebrew ;;
        0) echo "Bye."; exit 0 ;;
        *) echo "Invalid selection." ;;
    esac

    echo ""
done
