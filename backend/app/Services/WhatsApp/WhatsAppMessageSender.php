<?php

namespace App\Services\WhatsApp;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use RuntimeException;

class WhatsAppMessageSender
{
    public function send(string $toPhone, string $message, array $context = []): void
    {
        if (!config('whatsapp.enabled')) {
            Log::info('WhatsApp desativado. Mensagem nao enviada.', [
                'to' => $toPhone,
                'message' => $message,
                'provider' => config('whatsapp.provider'),
                'queue_connection' => config('queue.default'),
                ...$context,
            ]);

            return;
        }

        $provider = (string) config('whatsapp.provider', 'log');

        if (in_array($provider, ['log', 'meta-cloud'], true)) {
            if ($provider === 'meta-cloud') {
                Log::warning('Provider meta-cloud ainda nao implementado neste projeto. Usando modo log.', [
                    'to' => $toPhone,
                    ...$context,
                ]);
            }

            Log::info('WhatsApp (modo log): mensagem simulada.', [
                'to' => $this->formatToE164($toPhone),
                'message' => $message,
                ...$context,
            ]);

            return;
        }

        if ($provider === 'twilio') {
            $this->sendWithTwilio($toPhone, $message, $context);
            return;
        }

        Log::warning('Provider de WhatsApp desconhecido. Usando modo log.', [
            'provider' => $provider,
            'to' => $toPhone,
            ...$context,
        ]);

        Log::info('WhatsApp (modo log): mensagem simulada.', [
            'to' => $this->formatToE164($toPhone),
            'message' => $message,
            ...$context,
        ]);
    }

    private function sendWithTwilio(string $toPhone, string $message, array $context = []): void
    {
        $sid = (string) config('whatsapp.twilio.account_sid');
        $token = (string) config('whatsapp.twilio.auth_token');
        $from = (string) config('whatsapp.twilio.from');
        $timeout = (int) config('whatsapp.twilio.timeout', 15);
        $verifySsl = filter_var(config('whatsapp.twilio.verify_ssl', true), FILTER_VALIDATE_BOOL);
        $caBundle = (string) config('whatsapp.twilio.ca_bundle', '');

        if ($sid === '' || $token === '' || $from === '') {
            throw new RuntimeException('Credenciais do Twilio nao configuradas.');
        }

        $candidates = $this->buildToCandidates($toPhone);
        $lastError = null;

        foreach ($candidates as $toDigits) {
            $to = 'whatsapp:+' . $toDigits;

            $http = Http::asForm()
                ->timeout($timeout)
                ->withBasicAuth($sid, $token);

            if ($caBundle !== '') {
                $http = $http->withOptions(['verify' => $caBundle]);
            } else {
                $http = $http->withOptions(['verify' => $verifySsl]);
            }

            $response = $http->post("https://api.twilio.com/2010-04-01/Accounts/{$sid}/Messages.json", [
                'From' => $from,
                'To' => $to,
                'Body' => $message,
            ]);

            if ($response->successful()) {
                Log::info('WhatsApp enviado com sucesso via Twilio.', [
                    'to' => $to,
                    'twilio_sid' => $response->json('sid'),
                    ...$context,
                ]);

                return;
            }

            $lastError = [
                'status' => $response->status(),
                'code' => $response->json('code'),
                'message' => $response->json('message'),
                'response' => $response->body(),
                'to' => $to,
            ];

            Log::warning('Twilio rejeitou envio para candidato de numero.', [
                ...$lastError,
                ...$context,
            ]);
        }

        Log::error('Falha ao enviar WhatsApp via Twilio.', [
            ...($lastError ?? []),
            ...$context,
        ]);

        throw new RuntimeException('Falha ao enviar WhatsApp via Twilio.');
    }

    private function buildToCandidates(string $phone): array
    {
        $primary = $this->formatToE164($phone);
        $candidates = [$primary];

        if (str_starts_with($primary, '55') && strlen($primary) === 13 && substr($primary, 4, 1) === '9') {
            $withoutNinthDigit = substr($primary, 0, 4) . substr($primary, 5);

            
            $candidates = [$withoutNinthDigit, $primary];
        }

        return array_values(array_unique($candidates));
    }

    private function formatToE164(string $phone): string
    {
        $digits = preg_replace('/\D+/', '', $phone) ?? '';
        $countryCode = (string) config('whatsapp.default_country_code', '55');

        if (str_starts_with($digits, $countryCode)) {
            return $digits;
        }

        return $countryCode . $digits;
    }
}
