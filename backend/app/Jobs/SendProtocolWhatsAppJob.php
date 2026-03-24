<?php

namespace App\Jobs;

use App\Models\Ocorrencia;
use App\Services\WhatsApp\WhatsAppMessageSender;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Log;
use Throwable;

class SendProtocolWhatsAppJob implements ShouldQueue
{
    use Queueable;

    public int $tries = 5;
    public int $timeout = 30;

    public function __construct(public int $ocorrenciaId)
    {
        $this->onQueue((string) config('whatsapp.queue', 'whatsapp'));
    }

    public function backoff(): array
    {
        return [10, 30, 60, 180];
    }

    public function handle(WhatsAppMessageSender $sender): void
    {
        $ocorrencia = Ocorrencia::find($this->ocorrenciaId);

        if (!$ocorrencia) {
            Log::warning('Ocorrencia nao encontrada para envio de protocolo no WhatsApp.', [
                'ocorrencia_id' => $this->ocorrenciaId,
            ]);

            return;
        }

        $message = "Sua ocorrencia foi registrada com sucesso. Protocolo: {$ocorrencia->protocolo}";

        $sender->send($ocorrencia->telefone, $message, [
            'ocorrencia_id' => $ocorrencia->id,
            'protocolo' => $ocorrencia->protocolo,
        ]);
    }

    public function failed(Throwable $exception): void
    {
        Log::error('Envio de protocolo via WhatsApp falhou apos retries.', [
            'ocorrencia_id' => $this->ocorrenciaId,
            'error' => $exception->getMessage(),
        ]);
    }
}
