# Testes - PHPUnit

## Rodar Testes

```bash
# Todos
php artisan test

# Com saída legível
php artisan test --testdox

# Só Unit
php artisan test --testsuite=Unit

# Só Feature  
php artisan test --testsuite=Feature

# Teste específico
php artisan test --filter=cria_ocorrencia_com_dados_sanitizados_e_dispara_job

# Com debug
php artisan test --debug
```

## Estrutura

- **Unit** (`tests/Unit/`): testa uma peça isolada (model, lógica)
- **Feature** (`tests/Feature/`): testa fluxo HTTP completo (API)



## Testes Atuais

**Unit**: `OcorrenciaModelTest` - fillable + timezone  
**Feature**: `OcorrenciaApiTest` - POST, validação, listagem

## Estrutura de Pastas

```
tests/
├── Unit/
│   └── OcorrenciaModelTest.php
├── Feature/
│   └── OcorrenciaApiTest.php
└── TestCase.php
```

## Criando um Novo Teste

**Feature Test** - estenda `TestCase` + `RefreshDatabase`:
```php
namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class OcorrenciaApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_lista_retorna_200(): void
    {
        $response = $this->getJson('/api/ocorrencias');
        $response->assertOk();
    }
}
```

**Unit Test** - estenda `PHPUnit\Framework\TestCase`:
```php
namespace Tests\Unit;

use PHPUnit\Framework\TestCase;

class OcorrenciaModelTest extends TestCase
{
    public function test_nome(): void
    {
        $this->assertTrue(true);
    }
}
```

## Asserções Comuns

```php
// HTTP
$response->assertOk();                    // 200
$response->assertCreated();               // 201
$response->assertStatus(422);             // Custom status
$response->assertJsonValidationErrors(['field']);

// BD
$this->assertDatabaseHas('table', ['col' => 'value']);
$this->assertDatabaseCount('table', 1);

// Fila
Queue::assertPushed(JobClass::class);

// Conteúdo
$this->assertSame('expected', $actual);
$this->assertMatchesRegularExpression('/pattern/', $string);
```

## Configuração

- Banco: SQLite em memória (`:memory:`)
- Migrations: rodam antes de cada teste
- Fila: sincronizada (sem job real)
- Variáveis: em `phpunit.xml`
