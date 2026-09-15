<?php

namespace Modules\Product\Database\Seeders;

use Illuminate\Database\Seeder;

/**
 * @deprecated Prefer MediaProductSeeder. Kept as a thin alias for existing callers.
 */
class TechProductSeeder extends Seeder
{
    public function run(): void
    {
        $this->call(MediaProductSeeder::class);
    }
}
