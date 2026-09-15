<?php

namespace Modules\Finance\Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Modules\Finance\Models\ExpenseCategory;

class ExpenseCategorySeeder extends Seeder
{
    /**
     * Seed expense categories for a media production studio ledger.
     */
    public function run(): void
    {
        $categories = [
            'Talent & Cast',
            'Crew & Freelancers',
            'Equipment Rental',
            'Locations',
            'Post-Production',
            'Marketing',
            'Travel',
            'Studio Overhead',
            'Software',
            'Other',
        ];

        foreach ($categories as $name) {
            ExpenseCategory::query()->firstOrCreate(
                ['slug' => Str::slug($name)],
                ['name' => $name]
            );
        }
    }
}
