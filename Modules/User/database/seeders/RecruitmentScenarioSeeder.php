<?php

namespace Modules\User\Database\Seeders;

use Illuminate\Database\Seeder;
use Modules\User\Models\Candidate;
use Modules\User\Models\JobApplication;
use Modules\User\Models\JobPosition;

class RecruitmentScenarioSeeder extends Seeder
{
    public function run(): void
    {
        $positions = collect([
            [
                'title' => 'Senior Video Editor',
                'department' => 'Post-Production',
                'location' => 'Cairo Studio / Hybrid',
                'employment_type' => JobPosition::EMPLOYMENT_FULL_TIME,
                'description' => 'Lead narrative and commercial edits across Premiere and Resolve for brand films and social cutdowns.',
                'requirements' => 'Strong editorial storytelling, color basics, captions workflows, and calm client communication.',
            ],
            [
                'title' => 'Producer / Production Manager',
                'department' => 'Production',
                'location' => 'Dubai',
                'employment_type' => JobPosition::EMPLOYMENT_FULL_TIME,
                'description' => 'Own schedules, budgets, crew, and vendor coordination for commercials and live coverage.',
                'requirements' => 'Agency or studio production experience, call-sheet discipline, and multi-currency budget tracking.',
            ],
            [
                'title' => 'Motion Designer',
                'department' => 'Creative',
                'location' => 'Remote',
                'employment_type' => JobPosition::EMPLOYMENT_CONTRACT,
                'description' => 'Design titles, lower-thirds, and branded motion systems for films and podcasts.',
                'requirements' => 'After Effects / Cinema 4D portfolio with broadcast-ready delivery experience.',
            ],
            [
                'title' => 'Sound Designer',
                'department' => 'Audio',
                'location' => 'Istanbul Studio',
                'employment_type' => JobPosition::EMPLOYMENT_FULL_TIME,
                'description' => 'Record, clean, and mix dialogue, music, and sound design for commercials and podcasts.',
                'requirements' => 'Pro Tools or similar, ADR familiarity, and delivery for stereo / loudness standards.',
            ],
        ])->map(fn (array $attributes) => JobPosition::query()->firstOrCreate(
            ['title' => $attributes['title']],
            [...$attributes, 'status' => JobPosition::STATUS_ACTIVE, 'posted_at' => now()->subDays(fake()->numberBetween(3, 30))],
        ));

        $candidates = Candidate::factory()->count(8)->create();

        $candidates->each(function (Candidate $candidate, int $index) use ($positions): void {
            JobApplication::query()->firstOrCreate(
                [
                    'candidate_id' => $candidate->id,
                    'job_position_id' => $positions[$index % $positions->count()]->id,
                ],
                [
                    'status' => JobApplication::STATUSES[$index % count(JobApplication::STATUSES)],
                    'submitted_at' => now()->subDays($index + 1),
                ],
            );
        });
    }
}
