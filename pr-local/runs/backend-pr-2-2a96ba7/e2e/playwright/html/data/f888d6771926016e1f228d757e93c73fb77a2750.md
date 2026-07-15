# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: projects/projects.spec.ts >> Projects >> local mutations >> selecting active project updates ProjectSelector and board shows project content
- Location: tests/projects/projects.spec.ts:80:9

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByTestId('project-selector')

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - complementary [ref=e4]:
    - button "Expandir menu" [ref=e6] [cursor=pointer]:
      - img [ref=e7]
    - navigation [ref=e10]:
      - link "Início" [ref=e11] [cursor=pointer]:
        - /url: /inicio
        - img [ref=e13]
      - link "Board" [ref=e15] [cursor=pointer]:
        - /url: /board
        - img [ref=e17]
      - link "Itens" [ref=e21] [cursor=pointer]:
        - /url: /itens
        - img [ref=e23]
      - link "Projetos" [ref=e27] [cursor=pointer]:
        - /url: /projetos
        - img [ref=e29]
      - link "Usuários" [ref=e31] [cursor=pointer]:
        - /url: /usuarios
        - img [ref=e33]
    - button "Perfil" [ref=e40] [cursor=pointer]:
      - img [ref=e42]
  - main [ref=e45]:
    - generic [ref=e46]:
      - generic [ref=e47]:
        - heading "Projetos" [level=1] [ref=e48]
        - button "Novo Projeto" [ref=e49] [cursor=pointer]
      - 'link "ActiveProj-1784122990755 # Project Constitution ## Principles - Quality first - Test-driven development - Continuous delivery" [ref=e51] [cursor=pointer]':
        - /url: /projetos/340d456e-c723-4e95-9956-8f8b99b4cb26
        - heading "ActiveProj-1784122990755" [level=3] [ref=e52]
        - paragraph [ref=e53]: "# Project Constitution ## Principles - Quality first - Test-driven development - Continuous delivery"
```

# Test source

```ts
  1  | import type { Locator, Page } from '@playwright/test';
  2  | import { BasePage } from './BasePage';
  3  | 
  4  | export class ProjectsPage extends BasePage {
  5  |   readonly createProjectButton: Locator;
  6  |   readonly projectList: Locator;
  7  | 
  8  |   constructor(page: Page) {
  9  |     super(page);
  10 |     this.createProjectButton = page.getByRole('button', { name: /novo projeto|new project/i });
  11 |     this.projectList = page.getByTestId('project-list');
  12 |   }
  13 | 
  14 |   async goto(): Promise<void> {
  15 |     await this.navigate('/projetos');
  16 |   }
  17 | 
  18 |   async createProject(name: string): Promise<void> {
  19 |     await this.createProjectButton.click();
  20 |     const modal = this.page.getByRole('dialog');
  21 |     await modal.waitFor({ state: 'visible' });
  22 |     await modal.getByLabel(/nome|name/i).fill(name);
  23 |     await modal.getByRole('button', { name: /confirmar|criar|salvar|create|save/i }).click();
  24 |     await modal.waitFor({ state: 'hidden' });
  25 |   }
  26 | 
  27 |   async clickProject(name: string): Promise<void> {
  28 |     await this.page.getByRole('link', { name }).click();
  29 |   }
  30 | 
  31 |   async getProjectNames(): Promise<string[]> {
  32 |     return this.page.getByTestId('project-name').allInnerTexts();
  33 |   }
  34 | 
  35 |   async selectActiveProject(name: string): Promise<void> {
  36 |     const selector = this.page.getByTestId('project-selector');
> 37 |     await selector.click();
     |                    ^ Error: locator.click: Test timeout of 30000ms exceeded.
  38 |     await this.page.getByRole('option', { name }).click();
  39 |   }
  40 | }
  41 | 
```