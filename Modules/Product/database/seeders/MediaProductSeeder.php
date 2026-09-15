<?php

namespace Modules\Product\Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Modules\Product\Models\Product;
use Modules\Product\Models\ProductCategory;

class MediaProductSeeder extends Seeder
{
    /**
     * Seed a media-company catalog with realistic production offerings.
     */
    public function run(): void
    {
        $categories = ProductCategory::query()->pluck('id', 'slug');

        $products = [
            [
                'category' => 'production-packages',
                'name' => 'Brand Film Package',
                'sku' => 'MED-FILM-BRAND',
                'description' => 'Concept, shoot day, and master edit for a 60–90s cinematic brand film.',
                'price' => 18500.00,
                'currency' => 'USD',
                'billing_type' => Product::BILLING_ONE_TIME,
                'is_featured' => true,
            ],
            [
                'category' => 'production-packages',
                'name' => 'Commercial Spot Duo',
                'sku' => 'MED-COM-DUO',
                'description' => 'Two cutdowns (30s + 15s) for TV and paid social with talent direction.',
                'price' => 24000.00,
                'currency' => 'EUR',
                'billing_type' => Product::BILLING_ONE_TIME,
                'is_featured' => true,
            ],
            [
                'category' => 'production-packages',
                'name' => 'Documentary Mini-Series',
                'sku' => 'MED-DOC-MINI',
                'description' => 'Three-episode branded documentary with field crews and finishing.',
                'price' => 52000.00,
                'currency' => 'GBP',
                'billing_type' => Product::BILLING_ONE_TIME,
                'is_featured' => false,
            ],
            [
                'category' => 'studio-equipment',
                'name' => 'Cinema Camera Kit Day',
                'sku' => 'MED-KIT-CINE',
                'description' => 'Full-frame cinema body, primes, monitors, and media — daily rental.',
                'price' => 950.00,
                'currency' => 'USD',
                'billing_type' => Product::BILLING_ONE_TIME,
                'is_featured' => false,
            ],
            [
                'category' => 'studio-equipment',
                'name' => 'Sound Stage Day Rate',
                'sku' => 'MED-STAGE-DAY',
                'description' => 'Black-box stage with grid, power, and basic lighting package.',
                'price' => 1800.00,
                'currency' => 'EUR',
                'billing_type' => Product::BILLING_ONE_TIME,
                'is_featured' => true,
            ],
            [
                'category' => 'studio-equipment',
                'name' => 'Podcast Suite Half-Day',
                'sku' => 'MED-POD-HALF',
                'description' => 'Multi-mic podcast room with video cameras and live switching.',
                'price' => 420.00,
                'currency' => 'USD',
                'billing_type' => Product::BILLING_ONE_TIME,
                'is_featured' => false,
            ],
            [
                'category' => 'post-distribution',
                'name' => 'Editorial Finishing Bundle',
                'sku' => 'MED-POST-FINISH',
                'description' => 'Picture edit, color grade, mix, captions, and platform masters.',
                'price' => 6500.00,
                'currency' => 'USD',
                'billing_type' => Product::BILLING_ONE_TIME,
                'is_featured' => true,
            ],
            [
                'category' => 'post-distribution',
                'name' => 'Social Cutdowns Pack',
                'sku' => 'MED-SOCIAL-CUT',
                'description' => 'Twelve vertical and square cutdowns optimized for Reels and Shorts.',
                'price' => 2800.00,
                'currency' => 'EUR',
                'billing_type' => Product::BILLING_ONE_TIME,
                'is_featured' => false,
            ],
            [
                'category' => 'retainers-licensing',
                'name' => 'Always-On Content Retainer',
                'sku' => 'MED-RET-CONTENT',
                'description' => 'Monthly shoot + edit retainer for continuous social storytelling.',
                'price' => 7500.00,
                'currency' => 'USD',
                'billing_type' => Product::BILLING_MONTHLY,
                'is_featured' => true,
            ],
            [
                'category' => 'retainers-licensing',
                'name' => 'Broadcast Usage License',
                'sku' => 'MED-LIC-BCAST',
                'description' => 'One-year regional broadcast and paid-media usage license.',
                'price' => 12500.00,
                'currency' => 'GBP',
                'billing_type' => Product::BILLING_YEARLY,
                'is_featured' => false,
            ],
            [
                'category' => 'retainers-licensing',
                'name' => 'Event Coverage Retainer',
                'sku' => 'MED-RET-EVENT',
                'description' => 'Quarterly live-event capture with highlight reels and same-day socials.',
                'price' => 185000.00,
                'currency' => 'TRY',
                'billing_type' => Product::BILLING_QUARTERLY,
                'is_featured' => false,
            ],
        ];

        foreach ($products as $item) {
            $categoryId = $categories[$item['category']] ?? null;

            if ($categoryId === null) {
                continue;
            }

            Product::query()->updateOrCreate(
                ['sku' => $item['sku']],
                [
                    'product_category_id' => $categoryId,
                    'name' => $item['name'],
                    'slug' => Str::slug($item['name']),
                    'description' => $item['description'],
                    'price' => $item['price'],
                    'currency' => $item['currency'],
                    'billing_type' => $item['billing_type'],
                    'status' => Product::STATUS_ACTIVE,
                    'is_featured' => $item['is_featured'],
                ]
            );
        }
    }
}
