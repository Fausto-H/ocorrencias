<?php

use Illuminate\Auth\AuthenticationException;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpKernel\Exception\HttpExceptionInterface;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        //
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        $exceptions->render(function (\Throwable $exception, Request $request) {
            if (!($request->expectsJson() || $request->is('api/*'))) {
                return null;
            }

            $requestId = $request->header('X-Request-Id') ?: (string) str()->uuid();

            if ($exception instanceof ValidationException) {
                return response()->json([
                    'success' => false,
                    'code' => 'VALIDATION_ERROR',
                    'message' => 'Dados invalidos.',
                    'errors' => $exception->errors(),
                    'request_id' => $requestId,
                ], 422);
            }

            if ($exception instanceof AuthenticationException) {
                return response()->json([
                    'success' => false,
                    'code' => 'UNAUTHENTICATED',
                    'message' => 'Usuario nao autenticado.',
                    'request_id' => $requestId,
                ], 401);
            }

            $status = $exception instanceof HttpExceptionInterface ? $exception->getStatusCode() : 500;

            return response()->json([
                'success' => false,
                'code' => $status >= 500 ? 'INTERNAL_ERROR' : 'REQUEST_ERROR',
                'message' => $status >= 500 ? 'Erro interno no servidor.' : ($exception->getMessage() ?: 'Erro na requisicao.'),
                'request_id' => $requestId,
            ], $status);
        });
    })->create();
