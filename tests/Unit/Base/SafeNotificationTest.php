<?php

namespace Tests\Unit\Base;

use Illuminate\Notifications\Notifiable;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Facades\Log;
use Modules\Base\Support\SafeNotification;
use Tests\TestCase;

class SafeNotificationTest extends TestCase
{
    public function test_it_does_not_throw_when_delivery_fails(): void
    {
        Log::spy();

        $notifiable = new class
        {
            use Notifiable;

            public string $email = 'customer1@demo.symfonix.com';

            public string $name = 'Demo Customer';
        };

        SafeNotification::send($notifiable, new class extends Notification
        {
            public function via(object $notifiable): array
            {
                return ['mail'];
            }

            public function toMail(object $notifiable): never
            {
                throw new \RuntimeException('550 bounce');
            }
        });

        Log::shouldHaveReceived('warning')
            ->once()
            ->withArgs(fn (string $message): bool => $message === 'Notification delivery failed.');
    }
}
