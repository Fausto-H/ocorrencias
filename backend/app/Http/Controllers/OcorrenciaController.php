<?php

namespace App\Http\Controllers;

use App\Models\Ocorrencia;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Carbon\Carbon;

class OcorrenciaController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'nome_paciente' => 'required|string',
            'telefone' => 'required|string',
            'endereco' => 'required|string',
        ]);

        // Gerar iniciais do nome
        $iniciais = collect(explode(' ', $data['nome_paciente']))
            ->filter()
            ->take(2)
            ->map(fn($n) => strtoupper(substr($n, 0, 1)))
            ->implode('');

        $iniciais = $iniciais ?: 'XX';

        // Timestamp
        $agora = Carbon::now();
        $timestamp = $agora->format('Ymd-His') . '-' . substr($agora->format('u'), 0, 3);

        $data['protocolo'] = "{$timestamp}-{$iniciais}";

        $ocorrencia = Ocorrencia::create($data);

        return response()->json($ocorrencia, 201);
    }

    public function index()
    {
        $ocorrencias = Ocorrencia::orderBy('created_at', 'desc')->get();

        return response()->json($ocorrencias);
    }
}