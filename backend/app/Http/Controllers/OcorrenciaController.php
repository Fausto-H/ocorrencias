<?php

namespace App\Http\Controllers;

use App\Jobs\SendProtocolWhatsAppJob;
use App\Models\Ocorrencia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class OcorrenciaController extends Controller
{
    public function store(Request $request)
    {
        $data = [
            'nome_paciente' => preg_replace('/\s+/', ' ', trim((string) $request->input('nome_paciente', ''))),
            'telefone' => preg_replace('/\D+/', '', (string) $request->input('telefone', '')),
            'endereco' => preg_replace('/\s+/', ' ', trim((string) $request->input('endereco', ''))),
        ];

        $validator = Validator::make(
            $data,
            [
                'nome_paciente' => ['required', 'string', 'min:3', 'max:120', "regex:/^[\p{L}\s'\-]+$/u"],
                'telefone' => ['required', 'regex:/^\d{10,11}$/'],
                'endereco' => ['required', 'string', 'min:8', 'max:255', 'regex:/.*\d.*/'],
            ],
            [
                'nome_paciente.required' => 'Informe o nome do paciente.',
                'nome_paciente.min' => 'O nome do paciente deve ter ao menos 3 caracteres.',
                'nome_paciente.max' => 'O nome do paciente deve ter no máximo 120 caracteres.',
                'nome_paciente.regex' => 'O nome do paciente aceita apenas letras, espaços, hífen e apóstrofo.',
                'telefone.required' => 'Informe o telefone.',
                'telefone.regex' => 'O telefone deve ter DDD e 10 ou 11 dígitos.',
                'endereco.required' => 'Informe o endereço.',
                'endereco.min' => 'O endereço deve ter ao menos 8 caracteres.',
                'endereco.max' => 'O endereço deve ter no máximo 255 caracteres.',
                'endereco.regex' => 'O endereço deve conter número.',
            ]
        );

        $validator->validate();

        $iniciais = collect(explode(' ', $data['nome_paciente']))
            ->filter()
            ->take(2)
            ->map(fn($n) => mb_strtoupper(mb_substr($n, 0, 1)))
            ->implode('');

        $iniciais = $iniciais ?: 'XX';

        $agora = now()->setTimezone('America/Fortaleza');
        $timestamp = $agora->format('Ymd-His') . '-' . substr($agora->format('u'), 0, 3);

        $data['protocolo'] = "{$timestamp}-{$iniciais}";

        $ocorrencia = Ocorrencia::create($data);

        SendProtocolWhatsAppJob::dispatch($ocorrencia->id)->afterCommit();

        return response()->json($ocorrencia, 201);
    }

    public function index()
    {
        $ocorrencias = Ocorrencia::orderBy('created_at', 'desc')->get();

        return response()->json($ocorrencias);
    }
}