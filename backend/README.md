<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

<p align="center">
<a href="https://github.com/laravel/framework/actions"><img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

## About Laravel

Laravel is a web application framework with expressive, elegant syntax. We believe development must be an enjoyable and creative experience to be truly fulfilling. Laravel takes the pain out of development by easing common tasks used in many web projects, such as:

- [Simple, fast routing engine](https://laravel.com/docs/routing).
- [Powerful dependency injection container](https://laravel.com/docs/container).
- Multiple back-ends for [session](https://laravel.com/docs/session) and [cache](https://laravel.com/docs/cache) storage.
- Expressive, intuitive [database ORM](https://laravel.com/docs/eloquent).
- Database agnostic [schema migrations](https://laravel.com/docs/migrations).
- [Robust background job processing](https://laravel.com/docs/queues).
- [Real-time event broadcasting](https://laravel.com/docs/broadcasting).

Laravel is accessible, powerful, and provides tools required for large, robust applications.

## Learning Laravel

Laravel has the most extensive and thorough [documentation](https://laravel.com/docs) and video tutorial library of all modern web application frameworks, making it a breeze to get started with the framework.

In addition, [Laracasts](https://laracasts.com) contains thousands of video tutorials on a range of topics including Laravel, modern PHP, unit testing, and JavaScript. Boost your skills by digging into our comprehensive video library.

You can also watch bite-sized lessons with real-world projects on [Laravel Learn](https://laravel.com/learn), where you will be guided through building a Laravel application from scratch while learning PHP fundamentals.

## Agentic Development

Laravel's predictable structure and conventions make it ideal for AI coding agents like Claude Code, Cursor, and GitHub Copilot. Install [Laravel Boost](https://laravel.com/docs/ai) to supercharge your AI workflow:

```bash
composer require laravel/boost --dev

php artisan boost:install
```

Boost provides your agent 15+ tools and skills that help agents build Laravel applications while following best practices.

## Contributing

Thank you for considering contributing to the Laravel framework! The contribution guide can be found in the [Laravel documentation](https://laravel.com/docs/contributions).

## Code of Conduct

In order to ensure that the Laravel community is welcoming to all, please review and abide by the [Code of Conduct](https://laravel.com/docs/contributions#code-of-conduct).

## Security Vulnerabilities

If you discover a security vulnerability within Laravel, please send an e-mail to Taylor Otwell via [taylor@laravel.com](mailto:taylor@laravel.com). All security vulnerabilities will be promptly addressed.

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).

## WhatsApp assíncrono (fila)

Quando uma ocorrencia e criada, o backend dispara um job para enviar o protocolo via WhatsApp em segundo plano.

### Arquitetura

- Controller salva a ocorrencia e despacha `SendProtocolWhatsAppJob`
- A fila processa no worker
- O envio usa `App\Services\WhatsApp\WhatsAppMessageSender`

### Configuracao rapida

1. Configure no `.env`:

```env
QUEUE_CONNECTION=database
WHATSAPP_QUEUE=whatsapp

WHATSAPP_ENABLED=true
WHATSAPP_PROVIDER=log
WHATSAPP_DEFAULT_COUNTRY_CODE=55

# Twilio (opcional)
WHATSAPP_TWILIO_ACCOUNT_SID=
WHATSAPP_TWILIO_AUTH_TOKEN=
WHATSAPP_TWILIO_FROM=whatsapp:+14155238886
```

2. Garanta as tabelas de fila:

```bash
php artisan migrate
```

3. Rode o worker:

```bash
php artisan queue:work --queue=whatsapp,default
```

### Comandos de teste

Envio imediato (sem fila):

```bash
php artisan whatsapp:test 85999999999 TESTE-123
```

Envio assíncrono (via fila):

```bash
php artisan whatsapp:test:queue 85999999999 TESTE-123
```

### Sobre Meta WhatsApp Cloud API

Sem token da Meta, use `WHATSAPP_PROVIDER=log` para simular o envio. O projeto tambem suporta `twilio` quando as credenciais forem informadas.
