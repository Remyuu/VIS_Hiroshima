# VIS Hiroshima

HPC Documentation for Visual Information Science Laboratory, Hiroshima University

## Languages

This project uses **English** as the canonical source language.

| Language | Path | Status |
| --- | --- | --- |
| **English** | `docs/en/` | Canonical source |
| Chinese | `docs/zh/` | Synced translation |
| Japanese | `docs/ja/` | Translation in progress |
| ... | `docs/.../` | ... |

English and Chinese should stay aligned. Japanese files may exist for structure
or draft work, but Japanese content is not considered complete until it has been
translated and reviewed.

## Contribution Guidelines

- Make content changes in English first.
- If a content change also needs Japanese/Chinese translation, mark the pull request or
  follow-up issue with `needs-ja` or `needs-cn`.
- Store documentation images under `docs/assets/images/`, grouped by the related
  section, for example `docs/assets/images/connecting-to-servers/`.
- Reuse the same image across languages when the screenshot or diagram is
  language-neutral.
- If an image must be localized, use a language suffix such as
  `image0.en.png`, `image0.zh.png`, or
  `image0.ja.png`.
- Reference local images with relative paths from the Markdown file and include
  lazy loading:

  ```md
  ![SSH connection example](../../assets/images/connecting-to-servers/image0.png){ loading=lazy }
  ```

  or

  ```md
  <figure markdown="span">
    ![VS Code Remote SSH](https://code.visualstudio.com/assets/docs/remote/remote-overview/architecture.png){ loading=lazy, width="60%" }
    <figcaption>VS Code Remote SSH</figcaption>
  </figure>
  ```
- Prefer local assets for stable documentation. Use external image URLs only
  when the image is maintained by an official upstream source.

Suggested commit prefixes:

```text
content(en): update server access guide
i18n(zh): sync server access guide
i18n(ja): translate server access guide
fix(i18n): restore missing localized page
```

## Local Preview

```bash
conda create -n vis-hiroshima python=3.11
conda activate vis-hiroshima
pip install -r requirements.txt
mkdocs serve
```

or

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
mkdocs serve
```

## Build

```bash
mkdocs build --strict
```

## Publish

Pushing to `main` deploys the site to GitHub Pages through GitHub Actions.
