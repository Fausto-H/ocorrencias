<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\OcorrenciaController;

Route::post('/ocorrencias', [OcorrenciaController::class, 'store']);