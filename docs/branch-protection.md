# Branch protection — agentboard-qa-reports

## Branches

| Branch | Propósito | Proteção |
|---|---|---|
| `main` | Workflows, dashboard template, scripts | Bloqueia force-push e deleção |
| `gh-pages` | Site publicado (relatórios + manifest) | Bloqueia force-push e deleção; **sem** exigência de PR (push automático via Actions/PAT) |

## Configuração aplicada

Regras clássicas via GitHub API:

- **`main`**: `enforce_admins`, sem force-push, sem deleção
- **`gh-pages`**: sem force-push, sem deleção (permite push direto do workflow `publish-report` e do PAT)

## Por que `gh-pages` não exige PR?

O job `publish-report.yml` e o `QA_REPORTS_PAT` fazem commit direto em `gh-pages` após cada run de testes. Exigir PR quebraria a publicação automática.

## Reconfigurar manualmente

Settings → Branches → Add rule, ou:

```bash
gh api repos/matheusmafioletti/agentboard-qa-reports/branches/main/protection -X PUT \
  --input - <<'EOF'
{
  "required_status_checks": null,
  "enforce_admins": true,
  "required_pull_request_reviews": null,
  "restrictions": null,
  "allow_force_pushes": false,
  "allow_deletions": false
}
EOF
```
