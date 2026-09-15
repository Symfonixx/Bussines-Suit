<?php

namespace Modules\Product\Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Modules\Product\Models\ProductCategory;

class ProductCategorySeeder extends Seeder
{
    /**
     * Seed product categories tailored for a media production company.
     */
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Production Packages',
                'slug' => 'production-packages',
                'description' => 'Film, commercial, and branded content production packages.',
            ],
            [
                'name' => 'Studio & Equipment',
                'slug' => 'studio-equipment',
                'description' => 'Studio day rates, camera kits, lighting, and rental bundles.',
            ],
            [
                'name' => 'Post & Distribution',
                'slug' => 'post-distribution',
                'description' => 'Editing, color, sound, captions, and multi-platform delivery.',
            ],
            [
                'name' => 'Retainers & Licensing',
                'slug' => 'retainers-licensing',
                'description' => 'Monthly creative retainers and usage licensing options.',
            ],
        ];

        foreach ($categories as $category) {
            ProductCategory::query()->updateOrCreate(
                ['slug' => $category['slug']],
                $category
            );
        }
    }
}
