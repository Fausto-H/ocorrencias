<?php

use App\Jobs\SendCustomWhatsAppMessageJob;
use App\Services\WhatsApp\WhatsAppMessageSender;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

Artisan::command('whatsapp:test {telefone} {protocolo=TESTE-123}', function (string $telefone, string $protocolo) {
    $message = "Teste de envio: protocolo {$protocolo}";

    app(WhatsAppMessageSender::class)->send($telefone, $message, [
        'source' => 'artisan_test',
    ]);

    $this->info('Teste de WhatsApp executado com sucesso.');
})->purpose('Testa envio de WhatsApp de forma imediata');

Artisan::command('whatsapp:test:queue {telefone} {protocolo=TESTE-123}', function (string $telefone, string $protocolo) {
    $message = "Teste assíncrono: protocolo {$protocolo}";

    SendCustomWhatsAppMessageJob::dispatch($telefone, $message)->afterCommit();

    $this->info('Mensagem enviada para fila de WhatsApp.');
})->purpose('Testa envio de WhatsApp via fila assíncrona');
