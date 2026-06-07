# VIS Hiroshima

Material for MkDocs documentation scaffold for Hiroshima University VIS Lab.

## Local Preview

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
