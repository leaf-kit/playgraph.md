use crate::models::{AnimParam, MathAnimBlock};
use std::collections::HashMap;

pub fn extract_math_anim_blocks(body: &str) -> (String, Vec<MathAnimBlock>, Vec<String>) {
    let mut blocks = Vec::new();
    let mut mermaid_blocks = Vec::new();
    let mut cleaned_body = String::with_capacity(body.len());
    let mut lines = body.lines().peekable();

    let mut mermaid_index = 0usize;

    while let Some(line) = lines.next() {
        if line.trim_start().starts_with("```math-anim") {
            let mut raw = String::new();
            for inner_line in lines.by_ref() {
                if inner_line.trim_start().starts_with("```") && !inner_line.contains("math-anim")
                {
                    break;
                }
                if !raw.is_empty() {
                    raw.push('\n');
                }
                raw.push_str(inner_line);
            }

            if let Some(block) = parse_math_anim_yaml(&raw) {
                let placeholder = format!(
                    "<div data-math-anim=\"{}\" data-anim-index=\"{}\"></div>\n",
                    block.anim_type,
                    blocks.len()
                );
                cleaned_body.push_str(&placeholder);
                blocks.push(block);
            }
        } else if line.trim_start().starts_with("```mermaid") {
            let mut mermaid_src = String::new();
            for inner_line in lines.by_ref() {
                if inner_line.trim_start() == "```" {
                    break;
                }
                if !mermaid_src.is_empty() {
                    mermaid_src.push('\n');
                }
                mermaid_src.push_str(inner_line);
            }
            let placeholder = format!(
                "<div class=\"mermaid-block\" data-mermaid-index=\"{}\"></div>\n",
                mermaid_index
            );
            cleaned_body.push_str(&placeholder);
            mermaid_blocks.push(mermaid_src);
            mermaid_index += 1;
        } else {
            cleaned_body.push_str(line);
            cleaned_body.push('\n');
        }
    }

    (cleaned_body, blocks, mermaid_blocks)
}

#[derive(serde::Deserialize)]
struct RawAnimBlock {
    r#type: String,
    #[serde(default)]
    params: HashMap<String, AnimParam>,
}

fn parse_math_anim_yaml(raw: &str) -> Option<MathAnimBlock> {
    let parsed: RawAnimBlock = serde_yaml::from_str(raw).ok()?;
    Some(MathAnimBlock {
        anim_type: parsed.r#type,
        params: parsed.params,
        raw: raw.to_string(),
    })
}

pub fn markdown_to_html(md: &str) -> String {
    use pulldown_cmark::{html, Options, Parser};

    // Protect LaTeX from pulldown-cmark escaping:
    // Replace $$...$$ and $...$ with placeholders before markdown parsing
    let mut protected = md.to_string();
    let mut math_blocks: Vec<String> = Vec::new();

    // Block math: $$...$$
    while let Some(start) = protected.find("$$") {
        let after_start = start + 2;
        if let Some(end_offset) = protected[after_start..].find("$$") {
            let end = after_start + end_offset;
            let tex = &protected[start..end + 2];
            let placeholder = format!("MATHPLACEHOLDER{}ENDMATH", math_blocks.len());
            math_blocks.push(tex.to_string());
            protected = format!("{}{}{}", &protected[..start], placeholder, &protected[end + 2..]);
        } else {
            break;
        }
    }

    // Inline math: $...$  (avoid matching placeholders)
    let mut inline_protected = String::new();
    let mut chars = protected.chars().peekable();
    while let Some(ch) = chars.next() {
        if ch == '$' && chars.peek() != Some(&'$') {
            let mut tex = String::from("$");
            let mut found_end = false;
            for inner in chars.by_ref() {
                tex.push(inner);
                if inner == '$' {
                    found_end = true;
                    break;
                }
                if inner == '\n' {
                    break;
                }
            }
            if found_end && tex.len() > 2 {
                let placeholder = format!("MATHPLACEHOLDER{}ENDMATH", math_blocks.len());
                math_blocks.push(tex);
                inline_protected.push_str(&placeholder);
            } else {
                inline_protected.push_str(&tex);
            }
        } else {
            inline_protected.push(ch);
        }
    }

    let mut options = Options::empty();
    options.insert(Options::ENABLE_TABLES);
    options.insert(Options::ENABLE_STRIKETHROUGH);

    let parser = Parser::new_ext(&inline_protected, options);
    let mut html_output = String::new();
    html::push_html(&mut html_output, parser);

    // Restore LaTeX from placeholders
    for (i, tex) in math_blocks.iter().enumerate() {
        let placeholder = format!("MATHPLACEHOLDER{}ENDMATH", i);
        html_output = html_output.replace(&placeholder, tex);
    }

    html_output
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_extract_single_anim_block() {
        let body = r#"# Title

Some text before.

```math-anim
type: sine-wave
params:
  amplitude: { default: 1, min: 0.1, max: 3, step: 0.1, label: { kr: "진폭", en: "Amplitude" } }
  frequency: { default: 1, min: 0.1, max: 5, step: 0.1, label: { kr: "주파수", en: "Frequency" } }
```

Some text after."#;

        let (cleaned, blocks, _) = extract_math_anim_blocks(body);
        assert_eq!(blocks.len(), 1);
        assert_eq!(blocks[0].anim_type, "sine-wave");
        assert_eq!(blocks[0].params.len(), 2);
        assert!(blocks[0].params.contains_key("amplitude"));
        assert!(blocks[0].params.contains_key("frequency"));
        assert!(cleaned.contains("data-math-anim=\"sine-wave\""));
        assert!(cleaned.contains("Some text before."));
        assert!(cleaned.contains("Some text after."));
        assert!(!cleaned.contains("```math-anim"));
    }

    #[test]
    fn test_no_anim_blocks() {
        let body = "# Title\n\nJust text, no animations.";
        let (cleaned, blocks, _) = extract_math_anim_blocks(body);
        assert_eq!(blocks.len(), 0);
        assert!(cleaned.contains("Just text, no animations."));
    }

    #[test]
    fn test_multiple_anim_blocks() {
        let body = r#"Text before.

```math-anim
type: sine-wave
params:
  amplitude: { default: 1, min: 0.1, max: 3, step: 0.1 }
```

Middle text.

```math-anim
type: unit-circle
params:
  angle: { default: 0, min: 0, max: 6.28, step: 0.01 }
```

Text after."#;

        let (_, blocks, _) = extract_math_anim_blocks(body);
        assert_eq!(blocks.len(), 2);
        assert_eq!(blocks[0].anim_type, "sine-wave");
        assert_eq!(blocks[1].anim_type, "unit-circle");
    }

    #[test]
    fn test_markdown_to_html() {
        let md = "# Hello\n\nThis is **bold** and *italic*.";
        let html = markdown_to_html(md);
        assert!(html.contains("<h1>Hello</h1>"));
        assert!(html.contains("<strong>bold</strong>"));
        assert!(html.contains("<em>italic</em>"));
    }

    #[test]
    fn test_mermaid_block_extraction() {
        let body = r#"# Title

Some text.

```mermaid
graph TD
    A --> B
    B --> C
```

More text."#;

        let (cleaned, blocks, mermaid) = extract_math_anim_blocks(body);
        assert_eq!(blocks.len(), 0);
        assert_eq!(mermaid.len(), 1);
        assert!(mermaid[0].contains("graph TD"));
        assert!(mermaid[0].contains("A --> B"));
        assert!(cleaned.contains("data-mermaid-index=\"0\""));
        assert!(!cleaned.contains("```mermaid"));

        // Verify placeholder survives markdown_to_html
        let html = markdown_to_html(&cleaned);
        eprintln!("HTML output:\n{}", html);
        assert!(html.contains("data-mermaid-index"));
    }
}
