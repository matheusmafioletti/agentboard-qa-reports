# agentboard-qa-reports

Central QA report portal for AgentBoard. Publishes Allure, Playwright HTML, and Cypress Mochawesome reports with run history via GitHub Pages.

## GitHub Pages setup

1. Create the repository `matheusmafioletti/agentboard-qa-reports` on GitHub.
2. Push this repo and run the **Deploy Pages** workflow once to bootstrap the `gh-pages` branch.
3. In **Settings → Pages**, set Source to branch `gh-pages`, folder `/ (root)`.
4. The dashboard is available at `https://matheusmafioletti.github.io/agentboard-qa-reports/`.

## Secrets

| Secret | Where to configure | Purpose |
|---|---|---|
| `QA_REPORTS_PAT` | `agentboard-backend` (and any caller) | Fine-grained PAT with `contents: write` on this repo — pushes to `gh-pages` |
| `GITHUB_TOKEN` | This repo (automatic) | Used by `deploy-pages.yml` on first bootstrap |

### Creating `QA_REPORTS_PAT`

1. GitHub → Settings → Developer settings → Fine-grained personal access tokens.
2. Repository access: `agentboard-qa-reports` only.
3. Permissions: **Contents** → Read and write.
4. Add the token as `QA_REPORTS_PAT` in `agentboard-backend` repository secrets.

## Site structure

```text
/
├── index.html              # Dashboard (reads manifest.json)
├── manifest.json           # Append-only run index
├── pr-local/
│   ├── latest/             # Most recent PR-local reports
│   └── runs/<run_id>/      # Historical PR runs
└── staging/
    ├── latest/
    └── runs/<run_id>/
```

## Publishing reports

Callers invoke the reusable workflow `publish-report.yml` via `workflow_call` or `repository_dispatch`:

| Input | Description |
|---|---|
| `run_id` | Unique run identifier (e.g. `backend-pr-42-abc1234`) |
| `sha` | Git commit SHA |
| `env` | `pr-local` or `staging` |
| `pr_number` | PR number (optional, pr-local only) |
| `results_json` | JSON object with per-suite pass/fail status and artifact names |

## Callers

- `agentboard-backend` → `pre-merge.yml` (`publish-reports-pr`, env `pr-local`)
- `agentboard-backend` → `post-deploy.yml` (`publish-reports-staging`, env `staging`)
