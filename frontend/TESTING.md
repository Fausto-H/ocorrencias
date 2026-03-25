# Testes - Vitest + React Testing Library

## Rodar Testes

```bash
# Modo watch (reexecuta automaticamente ao salvar)
npm test

# Uma vez (CI mode)
npm run test:run

# Com UI interativa
npm run test:ui
```

## Estrutura

- **Unit**: testa função/componente de forma isolada
- **Integration**: testa componente + hooks + serviço
- **Snapshot**: valida mudanças visuais em componentes

## Testes Atuais

| Arquivo | O que testa |
|---------|-------------|
| `api.test.js` | Configuração do client axios |
| `Home.test.jsx` | Página principal renderiza corretamente |
| `OcorrenciaForm.test.jsx` | Formulário tem campos e botão |
| `OcorrenciaList.test.jsx` | Lista tem botão de toggle |

## Estrutura de Pastas

```
src/
├── __tests__/
│   ├── api.test.js
│   ├── Home.test.jsx
│   ├── OcorrenciaForm.test.jsx
│   └── OcorrenciaList.test.jsx
├── components/
├── features/
├── pages/
├── services/
└── ...
```

## Criando um Novo Teste

**Componente Test**:
```jsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import MyComponent from '../components/MyComponent';

describe('MyComponent', () => {
  it('deve renderizar texto', () => {
    render(<MyComponent />);
    expect(screen.getByText('Texto esperado')).toBeInTheDocument();
  });
});
```

**Serviço/Função Test**:
```js
import { describe, it, expect } from 'vitest';
import { minhaFuncao } from '../services/meu-servico';

describe('minha função', () => {
  it('deve retornar valor esperado', () => {
    expect(minhaFuncao()).toBe('valor');
  });
});
```

## Asserções Comuns

```js
// Elementos no DOM
expect(screen.getByText('texto')).toBeInTheDocument();
expect(screen.getByPlaceholderText('input')).toBeInTheDocument();
expect(screen.getByRole('button')).toBeInTheDocument();

// Classes CSS
expect(container.querySelector('.classe')).toBeInTheDocument();

// Valores
expect(valor).toBe(esperado);
expect(array).toHaveLength(3);
expect(string).toContain('parte');

// Funções
expect(mockFn).toHaveBeenCalled();
expect(mockFn).toHaveBeenCalledWith(arg);
```

## Configuração

- **Framework**: Vitest 1.2.2
- **Library**: React Testing Library 15.0.7
- **DOM**: happy-dom
- **Config**: vitest.config.js
- **Globals**: describe, it, expect habilitados

## Mock de Funções

```js
import { vi } from 'vitest';

const mockFn = vi.fn();
const mockFn2 = vi.fn().mockReturnValue('valor');

// Testar se foi chamada
expect(mockFn).toHaveBeenCalled();
```

## Dicas Boas Práticas

1. **Nomes descritivos**: `test_deve_renderizar_titulo`, não `test1`
2. **One assertion per test**: cada teste valida uma coisa
3. **User perspective**: teste o que o usuário vê/faz
4. **Evite implementation details**: não acople ao estado interno
5. **Use render + screen**: melhor que container.querySelector

## Troubleshooting

**Erro: Module not found**
- Certifique-se que importou corretamente: `import { component } from '../path'`

**Erro: Component renders, but queryBy returns null**
- Use `getByText` para elemento que deve existir
- Use `queryByText` para elemento que pode não existir
- Use `findByText` para elemento async/lazy

**Testes passando localmente, mas falhando em CI**
- Testes devem ser isolados (limpar estado entre testes)
- Não depender de ordem de execução

## Próximos Passos

- Adicionar testes de interação (userEvent)
- Testar hooks customizados (renderHook)
- Mock de API calls (vi.mock)
- Snapshot tests para componentes complexos
