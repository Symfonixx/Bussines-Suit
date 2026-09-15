<?php

namespace Modules\Finance\Database\Seeders;

use Illuminate\Database\Seeder;
use Modules\Finance\Models\ExpenseCategory;
use Modules\Finance\Models\JournalEntry;
use Modules\Finance\Services\FinanceService;
use Modules\Project\Models\Project;

class MultiCurrencyTransactionSeeder extends Seeder
{
    public function run(): void
    {
        if (JournalEntry::query()->where('description', 'USD brand film deposit')->exists()) {
            return;
        }

        $finance = app(FinanceService::class);
        $projects = Project::query()->orderBy('id')->get();
        $expenseCategory = ExpenseCategory::query()->orderBy('id')->first();

        $samples = [
            ['flow' => 'revenue', 'amount' => 8500, 'currency' => 'USD', 'days_ago' => 2, 'description' => 'USD brand film deposit'],
            ['flow' => 'revenue', 'amount' => 4200, 'currency' => 'EUR', 'days_ago' => 5, 'description' => 'EUR studio day invoice'],
            ['flow' => 'revenue', 'amount' => 3100, 'currency' => 'GBP', 'days_ago' => 8, 'description' => 'GBP post-production milestone'],
            ['flow' => 'expense', 'amount' => 1200, 'currency' => 'USD', 'days_ago' => 3, 'description' => 'USD camera kit rental'],
            ['flow' => 'expense', 'amount' => 780, 'currency' => 'EUR', 'days_ago' => 6, 'description' => 'EUR freelance colorist'],
            ['flow' => 'expense', 'amount' => 45000, 'currency' => 'TRY', 'days_ago' => 4, 'description' => 'TRY location and catering'],
        ];

        foreach ($samples as $index => $sample) {
            $project = $projects[$index % max($projects->count(), 1)] ?? null;

            $payload = [
                'flow' => $sample['flow'],
                'amount' => $sample['amount'],
                'currency' => $sample['currency'],
                'description' => $sample['description'],
                'transaction_date' => now()->subDays($sample['days_ago'])->toDateString(),
                'reference_type' => $project ? Project::class : null,
                'reference_id' => $project?->id,
            ];

            if ($sample['flow'] === 'expense' && $expenseCategory) {
                $payload['expense_category_id'] = $expenseCategory->id;
            }

            $finance->logTransaction($payload);
        }
    }
}
