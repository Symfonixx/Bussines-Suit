<?php

namespace Modules\Support\app\Listeners;

use Modules\Base\Support\SafeNotification;
use Modules\Support\app\Events\TicketReplied;
use Modules\Support\app\Notifications\TicketReplyAdminNotification;
use Modules\Support\app\Notifications\TicketReplyCustomerNotification;
use Modules\Support\app\Support\TicketNotificationRecipients;

class NotifyOfTicketReply
{
    public function handle(TicketReplied $event): void
    {
        $event->ticket->loadMissing(['user:id,name,email', 'assignee:id,name,email']);

        $recipients = TicketNotificationRecipients::forAdminReply($event->ticket, $event->replier);

        if ($recipients->isEmpty()) {
            return;
        }

        if ($event->replier->isAdmin()) {
            SafeNotification::send($recipients, new TicketReplyCustomerNotification($event));

            return;
        }

        SafeNotification::send($recipients, new TicketReplyAdminNotification($event));
    }
}
