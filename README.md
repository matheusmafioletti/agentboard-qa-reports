# agentboard-qa-reports

Central QA report portal for AgentBoard. Publishes Allure, Playwright HTML, and Cypress Mochawesome reports with run history via GitHub Pages.

## GitHub Pages setup

1. Create the repository `matheusmafioletti/agentboard-qa-reports` on GitHub.
2. Push this repo and run the **Deploy Pages** workflow once to bootstrap the `gh-pages` branch.
3. In **Settings → Pages**, set Source to branch `gh-pages`, folder `/ (root)`.
4. The dashboard is available at `https://matheusmafioletti.github.io/agentboard-qa-reports/`.

## Secrets

| Secret | Onde configurar | Propósito |
|---|---|---|
| `QA_REPORTS_PAT` | `agentboard-backend` | PAT com `contents: write` neste repo — push em `gh-pages` via `publish-report.yml` |
| `GITHUB_TOKEN` | Este repo (automático) | Bootstrap inicial de `gh-pages` em `deploy-pages.yml` |

### Criar `QA_REPORTS_PAT` (passo a passo)

1. Acesse [Fine-grained tokens](https://github.com/settings/personal-access-tokens/new).
2. **Token name:** `agentboard-qa-reports-publish`
3. **Expiration:** 90 dias ou No expiration (portfolio — prefira rotacionar a cada 90 dias).
4. **Repository access:** Only select repositories → `agentboard-qa-reports`
5. **Permissions:**
   - **Contents** → Read and write (obrigatório — push em `gh-pages`)
   - **Metadata** → Read-only (padrão)
6. Gere o token e copie **uma única vez** (não será exibido de novo).
7. No repo **agentboard-backend**: Settings → Secrets and variables → Actions → **New repository secret**
   - Name: `QA_REPORTS_PAT`
   - Value: o token gerado

> **Não** use classic PAT com escopo `repo` completo — fine-grained limita o acesso só a este repo.

### Validar o secret

Após o primeiro PR com pré-merge verde, confira em Actions do backend o job `publish-reports-pr`. Se falhar com `403` no push, o PAT não tem `contents: write` em `agentboard-qa-reports`.

## Branch protection

Ver [docs/branch-protection.md](docs/branch-protection.md). Resumo:

- **`main`**: sem force-push/deleção
- **`gh-pages`**: sem force-push/deleção, sem exigência de PR (publicação automática)

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
