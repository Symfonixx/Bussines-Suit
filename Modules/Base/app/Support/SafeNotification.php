<?php

namespace Modules\Base\Support;

use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Notification;
use Throwable;

class SafeNotification
{
    public static function send(mixed $notifiables, object $notification): void
    {
        try {
            Notification::send($notifiables, $notification);
        } catch (Throwable $e) {
            Log::warning('Notification delivery failed.', [
                'notification' => $notification::class,
                'message' => $e->getMessage(),
            ]);
        }
    }
}
