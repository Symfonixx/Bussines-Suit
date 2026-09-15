<?php

namespace Modules\Testimonial\Listeners;

use Modules\Base\Support\SafeNotification;
use Modules\Testimonial\Events\TestimonialSubmitted;
use Modules\Testimonial\Notifications\NewTestimonialAdminNotification;
use Modules\Testimonial\Support\TestimonialNotificationRecipients;

class NotifyAdminsOfNewTestimonial
{
    public function handle(TestimonialSubmitted $event): void
    {
        $event->testimonial->loadMissing([
            'customer:id,name,email',
            'project:id,title',
        ]);

        $recipients = TestimonialNotificationRecipients::testimonialAdmins();

        if ($recipients->isEmpty()) {
            return;
        }

        SafeNotification::send($recipients, new NewTestimonialAdminNotification($event));
    }
}
