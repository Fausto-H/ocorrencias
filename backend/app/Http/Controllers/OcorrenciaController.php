<?php

namespace App\Http\Controllers;


use App\Models\Ocorrencia;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class OcorrenciaController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'nome_paciente' => 'required|string',
            'telefone' => 'required|string',
            'endereco' => 'required|string',
        ]);

        $data['protocolo'] = strtoupper(Str::random(10));

        $ocorrencia = Ocorrencia::create($data);

        return response()->json($ocorrencia, 201);
    }

    public function index()
    {
        $ocorrencias = Ocorrencia::orderBy('created_at', 'desc')->get();

        return response()->json($ocorrencias);
    }
}