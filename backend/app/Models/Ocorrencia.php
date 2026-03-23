<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use DateTimeInterface;
use DateTimeZone;

class Ocorrencia extends Model
{
    use HasFactory;

    protected $fillable = [
        'nome_paciente',
        'telefone',
        'endereco',
        'protocolo'
    ];

    protected function serializeDate(DateTimeInterface $date)
    {
        return $date->setTimezone(new DateTimeZone('America/Fortaleza'))
                    ->format('Y-m-d H:i:s');
    }
}