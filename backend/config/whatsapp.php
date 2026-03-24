<?php

return [
    'enabled' => env('WHATSAPP_ENABLED', false),
    'provider' => env('WHATSAPP_PROVIDER', 'log'),
    'queue' => env('WHATSAPP_QUEUE', 'whatsapp'),
    'default_country_code' => env('WHATSAPP_DEFAULT_COUNTRY_CODE', '55'),

    'twilio' => [
        'account_sid' => env('WHATSAPP_TWILIO_ACCOUNT_SID'),
        'auth_token' => env('WHATSAPP_TWILIO_AUTH_TOKEN'),
        'from' => env('WHATSAPP_TWILIO_FROM', 'whatsapp:+14155238886'),
        'timeout' => (int) env('WHATSAPP_TWILIO_TIMEOUT', 15),
        'verify_ssl' => env('WHATSAPP_TWILIO_VERIFY_SSL', true),
        'ca_bundle' => env('WHATSAPP_TWILIO_CA_BUNDLE'),
    ],
];
