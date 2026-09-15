<?php

namespace Modules\Project\Listeners;

use Modules\Base\Support\SafeNotification;
use Modules\Project\Events\ProjectPaymentStatusChanged;
use Modules\Project\Events\ProjectStatusChanged;
use Modules\Project\Notifications\ProjectPaymentStatusChangedNotification;
use Modules\Project\Notifications\ProjectStatusChangedNotification;

class NotifyCustomerOfProjectChanges
{
    public function handleStatusChanged(ProjectStatusChanged $event): void
    {
        $event->project->loadMissing(['company.user']);

        $customer = $event->project->company?->user;

        if (! $customer?->isCustomer()) {
            return;
        }

        SafeNotification::send($customer, new ProjectStatusChangedNotification($event));
    }

    public function handlePaymentStatusChanged(ProjectPaymentStatusChanged $event): void
    {
        $event->project->loadMissing(['company.user']);

        $customer = $event->project->company?->user;

        if (! $customer?->isCustomer()) {
            return;
        }

        SafeNotification::send($customer, new ProjectPaymentStatusChangedNotification($event));
    }
}
