# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: auth/register.spec.ts >> Authentication — Register >> full registration creates user and workspace then redirects to /inicio with active workspace in sidebar
- Location: tests/auth/register.spec.ts:6:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText('Tenant-1784122836322-u2k1')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByText('Tenant-1784122836322-u2k1')

```

```yaml
- complementary:
  - button "Expandir menu":
    - img
  - navigation:
    - link "Início":
      - /url: /inicio
      - img
    - link "Board":
      - /url: /board
      - img
    - link "Itens":
      - /url: /itens
      - img
    - link "Projetos":
      - /url: /projetos
      - img
    - link "Usuários":
      - /url: /usuarios
      - img
  - button "Perfil":
    - img
- main:
  - heading "Início" [level=1]
  - img
  - text: Ranking de projetos
  - paragraph: Nenhum projeto com itens.
  - text: Features 0
  - button "Não iniciados": "0"
  - button "Em andamento": "0"
  - button "Concluídos": "0"
  - text: Não iniciado Em andamento Concluído User Stories 0
  - button "Não iniciados": "0"
  - button "Em andamento": "0"
  - button "Concluídos": "0"
  - text: Não iniciado Em andamento Concluído Tasks 0
  - button "Não iniciados": "0"
  - button "Em andamento": "0"
  - button "Concluídos": "0"
  - text: Não iniciado Em andamento Concluído
```

# Test source

```ts
  1  | import { test, expect } from '../../support/fixtures';
  2  | import { testData } from '../../api/services/TestDataService';
  3  | import { generateEmail, generateTenantName } from '../../support/generators';
  4  | 
  5  | test.describe('Authentication — Register', () => {
  6  |   test(
  7  |     'full registration creates user and workspace then redirects to /inicio with active workspace in sidebar',
  8  |     { tag: '@local' },
  9  |     async ({ registerPage, page }) => {
  10 |       const tenantName = generateTenantName();
  11 | 
  12 |       await registerPage.goto();
  13 |       await registerPage.register({
  14 |         name: 'Test User',
  15 |         email: generateEmail('auth001'),
  16 |         password: 'Password123!',
  17 |         tenantName,
  18 |       });
  19 | 
  20 |       await registerPage.continueToDashboard();
  21 |       await expect(page).toHaveURL(/\/inicio/);
> 22 |       await expect(page.getByText(tenantName)).toBeVisible();
     |                                                ^ Error: expect(locator).toBeVisible() failed
  23 |     }
  24 |   );
  25 | 
  26 |   test(
  27 |     'registration with existing email shows error message and stays on /register',
  28 |     { tag: '@local' },
  29 |     async ({ registerPage, page }) => {
  30 |       const email = generateEmail('auth002');
  31 |       await testData.createAuthenticatedUser(email, 'Password123!', generateTenantName());
  32 | 
  33 |       await registerPage.goto();
  34 |       await registerPage.register({
  35 |         name: 'Another User',
  36 |         email,
  37 |         password: 'Password123!',
  38 |         tenantName: generateTenantName(),
  39 |       });
  40 | 
  41 |       await expect(registerPage.errorMessage).toBeVisible();
  42 |       await expect(page).toHaveURL(/\/register/);
  43 |     }
  44 |   );
  45 | });
  46 | 
```