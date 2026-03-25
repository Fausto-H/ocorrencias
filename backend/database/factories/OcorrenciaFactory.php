<?php

namespace Database\Factories;

use App\Models\Ocorrencia;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Ocorrencia>
 */
class OcorrenciaFactory extends Factory
{
    protected $model = Ocorrencia::class;

    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nome_paciente' => fake()->name(),
            'telefone' => fake()->numerify('859########'),
            'endereco' => fake()->streetName() . ', ' . fake()->buildingNumber(),
            'protocolo' => fake()->unique()->bothify('########-######-??'),
        ];
    }
}