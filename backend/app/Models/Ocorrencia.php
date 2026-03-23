<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Ocorrencia extends Model
{
    use HasFactory;

    protected $fillable = [
        'nome_paciente',
        'telefone',
        'endereco',
        'protocolo'
    ];
}