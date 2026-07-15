# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: board/kanban-flow.spec.ts >> Kanban Board — Work Item Flow >> "view child board" on Feature navigates to USER_STORY board with parent pre-selected
- Location: tests/board/kanban-flow.spec.ts:183:7

# Error details

```
Error: Create work item failed (400): {"timestamp":"2026-07-15T13:42:43.082070857Z","error":"VALIDATION_ERROR","message":"priority: must be greater than 0"}
```

# Page snapshot

```yaml
- generic [ref=e4]:
  - heading "AgentBoard" [level=1] [ref=e5]
  - paragraph [ref=e6]: Entre com sua conta
  - generic [ref=e7]:
    - generic [ref=e8]:
      - generic [ref=e9]: E-mail
      - textbox "E-mail" [ref=e10]
    - generic [ref=e11]:
      - generic [ref=e12]: Senha
      - textbox "Senha" [ref=e13]
    - button "Entrar" [ref=e14] [cursor=pointer]
  - paragraph [ref=e15]:
    - text: Não tem conta?
    - link "Criar conta" [ref=e16] [cursor=pointer]:
      - /url: /register
```

# Test source

```ts
  1  | export class BaseApiClient {
  2  |   constructor(protected readonly baseUrl: string) {}
  3  | 
  4  |   protected async request<T>(
  5  |     path: string,
  6  |     init: RequestInit,
  7  |     errorContext: string
  8  |   ): Promise<T> {
  9  |     const response = await fetch(`${this.baseUrl}${path}`, init);
  10 | 
  11 |     if (!response.ok) {
  12 |       const body = await response.text();
> 13 |       throw new Error(`${errorContext} failed (${response.status}): ${body}`);
     |             ^ Error: Create work item failed (400): {"timestamp":"2026-07-15T13:42:43.082070857Z","error":"VALIDATION_ERROR","message":"priority: must be greater than 0"}
  14 |     }
  15 | 
  16 |     return response.json() as Promise<T>;
  17 |   }
  18 | 
  19 |   protected jsonHeaders(jwt?: string, tenantId?: string): Record<string, string> {
  20 |     const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  21 |     if (jwt) {
  22 |       headers['Authorization'] = `Bearer ${jwt}`;
  23 |     }
  24 |     if (tenantId) {
  25 |       headers['X-Tenant-Id'] = tenantId;
  26 |     }
  27 |     return headers;
  28 |   }
  29 | }
  30 | 
```