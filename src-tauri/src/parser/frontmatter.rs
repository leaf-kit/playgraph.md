use crate::models::Frontmatter;

pub fn extract_frontmatter(content: &str) -> Option<(Frontmatter, &str)> {
    let trimmed = content.trim_start();
    if !trimmed.starts_with("---") {
        return None;
    }

    let after_first = &trimmed[3..];
    let end_pos = after_first.find("\n---")?;
    let yaml_str = &after_first[..end_pos];
    let body = &after_first[end_pos + 4..];
    let body = body.strip_prefix('\n').unwrap_or(body);

    let fm: Frontmatter = serde_yaml::from_str(yaml_str).ok()?;
    Some((fm, body))
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_extract_frontmatter() {
        let content = r#"---
id: "sine-wave"
title: { kr: "사인 함수", en: "Sine Wave" }
difficulty: "Middle-3"
connections: ["unit-circle", "oscillation"]
---

# Sine Wave

Some body text."#;

        let (fm, body) = extract_frontmatter(content).unwrap();
        assert_eq!(fm.id, "sine-wave");
        assert_eq!(fm.title.kr, "사인 함수");
        assert_eq!(fm.title.en, "Sine Wave");
        assert_eq!(fm.difficulty, "Middle-3");
        assert_eq!(fm.connections, vec!["unit-circle", "oscillation"]);
        assert!(body.contains("# Sine Wave"));
    }

    #[test]
    fn test_no_frontmatter() {
        let content = "# Just a heading\n\nNo frontmatter here.";
        assert!(extract_frontmatter(content).is_none());
    }

    #[test]
    fn test_empty_connections() {
        let content = r#"---
id: "test"
title: { kr: "테스트", en: "Test" }
difficulty: "Easy"
---

Body."#;

        let (fm, _) = extract_frontmatter(content).unwrap();
        assert_eq!(fm.connections.len(), 0);
    }
}
