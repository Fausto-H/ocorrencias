<?php

namespace Tests\Feature;

use App\Jobs\SendProtocolWhatsAppJob;
use App\Models\Ocorrencia;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Queue;
use Tests\TestCase;

class OcorrenciaApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_cria_ocorrencia_com_dados_sanitizados_e_dispara_job(): void
    {
        Queue::fake();

        $payload = [
            'nome_paciente' => '  Maria   Silva  ',
            'telefone' => '(85) 98888-7777',
            'endereco' => '  Rua das Flores, 123  ',
        ];

        $response = $this->postJson('/api/ocorrencias', $payload);

        $response
            ->assertCreated()
            ->assertJsonStructure([
                'id',
                'nome_paciente',
                'telefone',
                'endereco',
                'protocolo',
                'created_at',
                'updated_at',
            ])
            ->assertJsonPath('nome_paciente', 'Maria Silva')
            ->assertJsonPath('telefone', '85988887777')
            ->assertJsonPath('endereco', 'Rua das Flores, 123');

        $this->assertMatchesRegularExpression(
            '/^\d{8}-\d{6}-\d{3}-[A-Z]{2}$/',
            (string) $response->json('protocolo')
        );

        $this->assertDatabaseHas('ocorrencias', [
            'nome_paciente' => 'Maria Silva',
            'telefone' => '85988887777',
            'endereco' => 'Rua das Flores, 123',
        ]);

        Queue::assertPushed(
            SendProtocolWhatsAppJob::class,
            fn (SendProtocolWhatsAppJob $job) => $job->ocorrenciaId === (int) $response->json('id')
        );
    }

    public function test_retorna_422_quando_payload_for_invalido(): void
    {
        Queue::fake();

        $payload = [
            'nome_paciente' => 'Ma',
            'telefone' => '123',
            'endereco' => 'Rua sem numero',
        ];

        $response = $this->postJson('/api/ocorrencias', $payload);

        $response
            ->assertStatus(422)
            ->assertJsonValidationErrors([
                'nome_paciente',
                'telefone',
                'endereco',
            ]);

        $this->assertDatabaseCount('ocorrencias', 0);
        Queue::assertNothingPushed();
    }

    public function test_lista_ocorrencias_em_ordem_decrescente_de_criacao(): void
    {
        $maisAntiga = Ocorrencia::factory()->create([
            'created_at' => now()->subHours(3),
            'updated_at' => now()->subHours(3),
        ]);

        $intermediaria = Ocorrencia::factory()->create([
            'created_at' => now()->subHours(2),
            'updated_at' => now()->subHours(2),
        ]);

        $maisRecente = Ocorrencia::factory()->create([
            'created_at' => now()->subHour(),
            'updated_at' => now()->subHour(),
        ]);

        $response = $this->getJson('/api/ocorrencias');

        $response->assertOk()->assertJsonCount(3);

        $ids = array_column($response->json(), 'id');

        $this->assertSame(
            [$maisRecente->id, $intermediaria->id, $maisAntiga->id],
            $ids
        );
    }
}
