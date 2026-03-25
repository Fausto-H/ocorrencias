<?php

namespace Tests\Unit;

use App\Models\Ocorrencia;
use Carbon\Carbon;
use PHPUnit\Framework\TestCase;

class OcorrenciaModelTest extends TestCase
{
    public function test_model_tem_fillable_esperado(): void
    {
        $model = new Ocorrencia();

        $this->assertSame(
            ['nome_paciente', 'telefone', 'endereco', 'protocolo'],
            $model->getFillable()
        );
    }

    public function test_serialize_date_converte_para_timezone_america_fortaleza(): void
    {
        $model = new class extends Ocorrencia {
            public function serializePublic(Carbon $date): string
            {
                return $this->serializeDate($date);
            }
        };

        $date = Carbon::create(2026, 3, 25, 15, 0, 0, 'UTC');

        $this->assertSame('2026-03-25 12:00:00', $model->serializePublic($date));
    }
}
