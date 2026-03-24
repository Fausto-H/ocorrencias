<?php

namespace App\Jobs;

use App\Services\WhatsApp\WhatsAppMessageSender;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;

class SendCustomWhatsAppMessageJob implements ShouldQueue
{
    use Queueable;

    public int $tries = 3;
    public int $timeout = 30;

    public function __construct(
        public string $phone,
        public string $message
    ) {
        $this->onQueue((string) config('whatsapp.queue', 'whatsapp'));
    }

    public function backoff(): array
    {
        return [10, 30, 60];
    }

    public function handle(WhatsAppMessageSender $sender): void
    {
        $sender->send($this->phone, $this->message, [
            'source' => 'manual_queue_test',
        ]);
    }
}
