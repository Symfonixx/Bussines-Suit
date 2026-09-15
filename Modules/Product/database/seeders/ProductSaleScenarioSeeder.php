<?php

namespace Modules\Product\Database\Seeders;

use Illuminate\Database\Seeder;
use Modules\CRM\Models\Company;
use Modules\Finance\Services\FinanceService;
use Modules\Product\Models\Product;

class ProductSaleScenarioSeeder extends Seeder
{
    /**
     * Seed demo product sales with matching finance ledger income entries.
     */
    public function run(): void
    {
        $financeService = app(FinanceService::class);
        $company = Company::query()->orderBy('id')->first();

        $scenarios = [
            ['sku' => 'MED-FILM-BRAND', 'quantity' => 1, 'days_ago' => 2],
            ['sku' => 'MED-RET-CONTENT', 'quantity' => 1, 'days_ago' => 5],
            ['sku' => 'MED-STAGE-DAY', 'quantity' => 3, 'days_ago' => 10],
            ['sku' => 'MED-POST-FINISH', 'quantity' => 1, 'days_ago' => 14],
            ['sku' => 'MED-LIC-BCAST', 'quantity' => 1, 'days_ago' => 21],
            ['sku' => 'MED-SOCIAL-CUT', 'quantity' => 2, 'days_ago' => 28],
        ];

        foreach ($scenarios as $scenario) {
            $product = Product::query()->where('sku', $scenario['sku'])->first();

            if ($product === null) {
                continue;
            }

            $soldAt = now()->subDays($scenario['days_ago'])->toDateString();

            $financeService->recordProductSale([
                'product_id' => $product->id,
                'company_id' => $company?->id,
                'quantity' => $scenario['quantity'],
                'sold_at' => $soldAt,
                'notes' => 'Seeded media-company product sale scenario.',
            ]);
        }
    }
}
