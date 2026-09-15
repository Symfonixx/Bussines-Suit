<?php

namespace Modules\Core\Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Modules\Cms\Enums\CmsStatus;
use Modules\Cms\Models\Blog;
use Modules\Cms\Models\BlogCategory;
use Modules\Cms\Models\Faq;
use Modules\Cms\Models\Page;
use Modules\Core\Support\DummyImageGenerator;
use Modules\CRM\Database\Seeders\PipelineStageSeeder;
use Modules\CRM\Models\Company;
use Modules\CRM\Models\Contact;
use Modules\CRM\Models\Deal;
use Modules\CRM\Models\Lead;
use Modules\CRM\Models\MarketingCampaign;
use Modules\CRM\Models\PipelineStage;
use Modules\CRM\Models\Subscription;
use Modules\Finance\Database\Seeders\ExpenseCategorySeeder;
use Modules\Product\Database\Seeders\MediaProductSeeder;
use Modules\Product\Database\Seeders\ProductCategorySeeder;
use Modules\Product\Database\Seeders\ProductSaleScenarioSeeder;
use Modules\Product\Models\Product;
use Modules\Project\Database\Seeders\ProjectStatusSeeder;
use Modules\Project\Models\Project;
use Modules\Project\Models\ProjectEmployee;
use Modules\Project\Models\ProjectStatus;
use Modules\Project\Models\ProjectUseCase;
use Modules\Services\Models\Service;
use Modules\Services\Models\ServiceCategory;
use Modules\Support\Database\Seeders\TicketCategorySeeder;
use Modules\Support\Models\Subscriber;
use Modules\Support\Models\Ticket;
use Modules\Support\Models\TicketCategory;
use Modules\Support\Models\TicketMessage;
use Modules\Team\Models\Team;
use Modules\Testimonial\Models\Testimonial;
use Modules\User\Database\Seeders\AdminScenarioSeeder;
use Modules\User\Database\Seeders\EmployeeScenarioSeeder;
use Modules\User\Database\Seeders\LeaveScenarioSeeder;
use Modules\User\Database\Seeders\RecruitmentScenarioSeeder;
use Modules\User\Database\Seeders\RoleScenarioSeeder;
use Modules\User\Models\Employee;

class SystemDummyDataSeeder extends Seeder
{
    private DummyImageGenerator $images;

    public function run(): void
    {
        $this->images = new DummyImageGenerator;

        $this->seedReferenceData();
        $this->seedUsersAndHr();
        $this->seedCustomers();
        $this->seedTeam();
        $this->seedCms();
        $this->seedServices();
        $this->seedProducts();
        $this->seedCrm();
        $this->seedProjects();
        $this->seedTestimonials();
        $this->seedSupport();
        $this->seedProductSales();
        $this->seedMultiCurrencyFinance();

        $this->command?->info('All modules seeded with media-company dummy data and stock images.');
    }

    private function seedReferenceData(): void
    {
        $this->call([
            PipelineStageSeeder::class,
            TicketCategorySeeder::class,
            ProjectStatusSeeder::class,
            ExpenseCategorySeeder::class,
            \Modules\Finance\Database\Seeders\CurrencySettingsSeeder::class,
        ]);
    }

    private function seedUsersAndHr(): void
    {
        $this->call([
            RoleScenarioSeeder::class,
            EmployeeScenarioSeeder::class,
            AdminScenarioSeeder::class,
            LeaveScenarioSeeder::class,
            RecruitmentScenarioSeeder::class,
        ]);

        User::query()->admins()->each(function (User $user) {
            if ($user->img) {
                return;
            }

            $user->update([
                'img' => $this->images->storeAvatar($user->name, 'avatars'),
            ]);
        });
    }

    private function seedCustomers(): void
    {
        $customers = [
            ['name' => 'Ahmed Farouk', 'email' => 'customer1@demo.symfonix.com', 'mobile' => '01030000001'],
            ['name' => 'Sara Ibrahim', 'email' => 'customer2@demo.symfonix.com', 'mobile' => '01030000002'],
            ['name' => 'Hassan Ali', 'email' => 'customer3@demo.symfonix.com', 'mobile' => '01030000003'],
            ['name' => 'Mona Saeed', 'email' => 'customer4@demo.symfonix.com', 'mobile' => '01030000004'],
            ['name' => 'Tarek Nassar', 'email' => 'customer5@demo.symfonix.com', 'mobile' => '01030000005'],
        ];

        foreach ($customers as $customer) {
            User::query()->updateOrCreate(
                ['email' => $customer['email']],
                [
                    'name' => $customer['name'],
                    'mobile' => $customer['mobile'],
                    'password' => Hash::make('password'),
                    'type' => User::TYPE_CUSTOMER,
                    'img' => $this->images->storeAvatar($customer['name'], 'avatars'),
                ]
            );
        }
    }

    private function seedTeam(): void
    {
        $members = [
            ['name' => 'Layla Mansour', 'position' => 'Creative Director', 'skills' => 'Brand Strategy, Art Direction, Storytelling'],
            ['name' => 'Karim Haddad', 'position' => 'Head of Production', 'skills' => 'Film Production, Budgets, Crew Management'],
            ['name' => 'Nadine Salim', 'position' => 'Lead Cinematographer', 'skills' => 'Lighting, Camera, Visual Language'],
            ['name' => 'Rami Khouri', 'position' => 'Senior Video Editor', 'skills' => 'Premiere, After Effects, Color Grade'],
            ['name' => 'Salma Aziz', 'position' => 'Content Strategy Lead', 'skills' => 'Social, SEO Content, Campaigns'],
            ['name' => 'Omar Farid', 'position' => 'Client Producer', 'skills' => 'Accounts, Scheduling, Delivery'],
        ];

        foreach ($members as $member) {
            $slug = Str::slug($member['name']);

            Team::query()->updateOrCreate(
                ['linked_in' => 'https://linkedin.com/in/'.$slug],
                [
                    'name' => ['en' => $member['name'], 'ar' => $member['name'], 'tr' => $member['name']],
                    'position' => ['en' => $member['position'], 'ar' => $member['position'], 'tr' => $member['position']],
                    'facebook' => 'https://facebook.com/'.$slug,
                    'github' => null,
                    'behance' => 'https://behance.net/'.$slug,
                    'resume' => null,
                    'key_skills' => $member['skills'],
                    'avatar' => $this->images->store('teams', $member['name'], 400, 400, 'teams'),
                    'status' => 'Published',
                ]
            );
        }
    }

    private function seedCms(): void
    {
        $categories = [
            ['name' => 'Production Notes', 'slug' => 'production-notes'],
            ['name' => 'Creative Insights', 'slug' => 'creative-insights'],
            ['name' => 'Studio News', 'slug' => 'studio-news'],
        ];

        foreach ($categories as $category) {
            BlogCategory::query()->updateOrCreate(
                ['slug' => $category['slug']],
                [
                    'name' => [
                        'en' => $category['name'],
                        'ar' => $category['name'],
                        'tr' => $category['name'],
                    ],
                ]
            );
        }

        $categoryIds = BlogCategory::query()->pluck('id', 'slug');

        $posts = [
            [
                'slug' => 'behind-the-lens-brand-films',
                'category' => 'production-notes',
                'title' => 'Behind the Lens: Brand Films That Convert',
                'description' => 'How cinematic storytelling turns product launches into memorable brand moments.',
            ],
            [
                'slug' => 'color-grading-for-social',
                'category' => 'creative-insights',
                'title' => 'Color Grading for Social-First Content',
                'description' => 'A practical grade workflow that keeps Reels and YouTube looking on-brand.',
            ],
            [
                'slug' => 'studio-expansion-dubai',
                'category' => 'studio-news',
                'title' => 'Studio Expansion in Dubai',
                'description' => 'New sound stage, podcast suite, and post bay now open for regional productions.',
            ],
            [
                'slug' => 'podcast-to-video-pipeline',
                'category' => 'production-notes',
                'title' => 'From Podcast to Video Series',
                'description' => 'Our multi-camera podcast pipeline that feeds YouTube, Shorts, and LinkedIn.',
            ],
            [
                'slug' => 'event-coverage-playbook',
                'category' => 'creative-insights',
                'title' => 'Live Event Coverage Playbook',
                'description' => 'Crew roles, shot lists, and same-day edit tips for conferences and festivals.',
            ],
            [
                'slug' => 'client-spotlight-fashion-week',
                'category' => 'studio-news',
                'title' => 'Client Spotlight: Fashion Week Recap Films',
                'description' => 'How we delivered 48-hour turnaround highlight films across three runway days.',
            ],
        ];

        foreach ($posts as $index => $post) {
            Blog::query()->updateOrCreate(
                ['slug' => $post['slug']],
                [
                    'category_id' => $categoryIds[$post['category']] ?? $categoryIds->first(),
                    'title' => ['en' => $post['title'], 'ar' => $post['title'], 'tr' => $post['title']],
                    'description' => ['en' => $post['description'], 'ar' => $post['description'], 'tr' => $post['description']],
                    'content' => [
                        'en' => '<p>'.$post['description'].'</p><p>Seeded demo article for a media production studio.</p>',
                        'ar' => '<p>'.$post['description'].'</p>',
                        'tr' => '<p>'.$post['description'].'</p>',
                    ],
                    'keywords' => ['en' => 'media, film, production, studio', 'ar' => 'media', 'tr' => 'media'],
                    'image' => $this->images->store('blogs', $post['title'], 1200, 675),
                    'status' => CmsStatus::PUBLISHED->value,
                    'featured' => $index < 3 ? 1 : 0,
                    'visits' => random_int(40, 900),
                ]
            );
        }

        $pages = [
            [
                'slug' => 'about-us',
                'title' => 'About the Studio',
                'description' => 'A full-service media company crafting film, photo, podcast, and brand content.',
                'nav' => true,
                'footer' => true,
            ],
            [
                'slug' => 'careers',
                'title' => 'Careers',
                'description' => 'Join producers, editors, and creatives shipping work for global brands.',
                'nav' => true,
                'footer' => true,
            ],
            [
                'slug' => 'privacy-policy',
                'title' => 'Privacy Policy',
                'description' => 'How we collect, use, and protect client and audience data.',
                'nav' => false,
                'footer' => true,
            ],
            [
                'slug' => 'terms-of-service',
                'title' => 'Terms of Service',
                'description' => 'Usage terms for studio services, licensing, and deliverables.',
                'nav' => false,
                'footer' => true,
            ],
        ];

        foreach ($pages as $page) {
            Page::query()->updateOrCreate(
                ['slug' => $page['slug']],
                [
                    'title' => ['en' => $page['title'], 'ar' => $page['title'], 'tr' => $page['title']],
                    'description' => ['en' => $page['description'], 'ar' => $page['description'], 'tr' => $page['description']],
                    'content' => [
                        'en' => '<p>'.$page['description'].'</p><p>Seeded page content for a media company demo.</p>',
                        'ar' => '<p>'.$page['description'].'</p>',
                        'tr' => '<p>'.$page['description'].'</p>',
                    ],
                    'keywords' => ['en' => 'media studio, '.$page['slug'], 'ar' => 'media', 'tr' => 'media'],
                    'image' => $this->images->store('pages', $page['title'], 1400, 700),
                    'status' => CmsStatus::PUBLISHED->value,
                    'featured' => 0,
                    'add_to_nav' => $page['nav'],
                    'add_to_footer' => $page['footer'],
                    'add_to_top_bar' => false,
                    'visits' => random_int(20, 350),
                ]
            );
        }

        $faqs = [
            ['q' => 'What does the studio produce?', 'a' => 'Brand films, commercials, photography, podcasts, social content, and live event coverage.'],
            ['q' => 'Can I try demo data?', 'a' => 'Yes. Run php artisan app:seed-dummy to populate a full media-company demo environment.'],
            ['q' => 'Do you license footage?', 'a' => 'Yes. Packages include usage licenses for web, social, and broadcast depending on the scope.'],
            ['q' => 'How do I contact the studio?', 'a' => 'Open a ticket from the client portal or email studio@symfonix.com.'],
            ['q' => 'Is post-production included?', 'a' => 'Most retainers include edit, color, sound design, and delivery masters.'],
        ];

        foreach ($faqs as $index => $faq) {
            Faq::query()->updateOrCreate(
                ['question->en' => $faq['q']],
                [
                    'question' => ['en' => $faq['q'], 'ar' => $faq['q'], 'tr' => $faq['q']],
                    'answer' => ['en' => $faq['a'], 'ar' => $faq['a'], 'tr' => $faq['a']],
                    'rank' => $index + 1,
                    'status' => CmsStatus::PUBLISHED->value,
                ]
            );
        }
    }

    private function seedServices(): void
    {
        $categories = [
            [
                'slug' => 'film-video-production',
                'title' => 'Film & Video Production',
                'description' => 'Commercials, brand films, and documentary storytelling.',
                'color' => '#0f766e',
            ],
            [
                'slug' => 'photography-content',
                'title' => 'Photography & Content',
                'description' => 'Campaign stills, product shoots, and social asset libraries.',
                'color' => '#b45309',
            ],
            [
                'slug' => 'audio-live-experiences',
                'title' => 'Audio & Live Experiences',
                'description' => 'Podcasts, sound design, and multi-camera event coverage.',
                'color' => '#7c3aed',
            ],
        ];

        foreach ($categories as $category) {
            ServiceCategory::query()->updateOrCreate(
                ['slug' => $category['slug']],
                [
                    'title' => ['en' => $category['title'], 'ar' => $category['title'], 'tr' => $category['title']],
                    'description' => ['en' => $category['description'], 'ar' => $category['description'], 'tr' => $category['description']],
                    'color_code' => $category['color'],
                    'image' => $this->images->store('service_categories', $category['title'], 900, 600),
                ]
            );
        }

        $categoryIds = ServiceCategory::query()->pluck('id', 'slug');

        $services = [
            [
                'slug' => 'brand-film-production',
                'category' => 'film-video-production',
                'title' => 'Brand Film Production',
                'description' => 'End-to-end cinematic films for launches and corporate storytelling.',
            ],
            [
                'slug' => 'commercial-shoot',
                'category' => 'film-video-production',
                'title' => 'TV & Digital Commercials',
                'description' => 'High-impact commercials optimized for broadcast and paid social.',
            ],
            [
                'slug' => 'campaign-photography',
                'category' => 'photography-content',
                'title' => 'Campaign Photography',
                'description' => 'Studio and location photography for seasonal campaigns.',
            ],
            [
                'slug' => 'social-content-factory',
                'category' => 'photography-content',
                'title' => 'Social Content Factory',
                'description' => 'Batch-produced Reels, carousels, and always-on creative assets.',
            ],
            [
                'slug' => 'podcast-studio-production',
                'category' => 'audio-live-experiences',
                'title' => 'Podcast Studio Production',
                'description' => 'Multi-mic recording, video podcast capture, and episode delivery.',
            ],
            [
                'slug' => 'live-event-coverage',
                'category' => 'audio-live-experiences',
                'title' => 'Live Event Coverage',
                'description' => 'Multi-camera capture, highlight edits, and same-day social cuts.',
            ],
        ];

        foreach ($services as $index => $service) {
            Service::query()->updateOrCreate(
                ['slug' => $service['slug']],
                [
                    'service_category_id' => $categoryIds[$service['category']] ?? $categoryIds->first(),
                    'title' => ['en' => $service['title'], 'ar' => $service['title'], 'tr' => $service['title']],
                    'description' => ['en' => $service['description'], 'ar' => $service['description'], 'tr' => $service['description']],
                    'content' => [
                        'en' => '<p>'.$service['description'].'</p><p>Seeded media-studio service offering for demo environments.</p>',
                        'ar' => '<p>'.$service['description'].'</p>',
                        'tr' => '<p>'.$service['description'].'</p>',
                    ],
                    'keywords' => ['en' => 'media, production, studio', 'ar' => 'media', 'tr' => 'media'],
                    'image' => $this->images->store('services', $service['title'], 1100, 700),
                    'status' => CmsStatus::PUBLISHED->value,
                    'featured' => $index < 3 ? 1 : 0,
                    'visits' => random_int(25, 500),
                ]
            );
        }
    }

    private function seedProducts(): void
    {
        $this->call([
            ProductCategorySeeder::class,
            MediaProductSeeder::class,
        ]);

        Product::query()->each(function (Product $product) {
            $name = $product->getTranslation('name', 'en') ?: (string) $product->name;
            $description = $product->getTranslation('description', 'en') ?: '';

            $product->update([
                'main_image' => $this->images->store('products', $name, 1000, 750),
                'seo_meta_img' => $this->images->store('products', $name.' SEO', 1200, 630),
                'is_published' => true,
                'short_description' => $description,
            ]);
        });
    }

    private function seedCrm(): void
    {
        $customers = User::query()->customers()->orderBy('id')->get();
        $employees = Employee::query()->where('status', Employee::STATUS_ACTIVE)->orderBy('id')->get();
        $stages = PipelineStage::query()->orderBy('sort_order')->get();
        $services = Service::query()->orderBy('id')->get();

        $companies = [
            [
                'name' => 'Lumen Fashion House',
                'activity_type' => Company::ACTIVITY_RETAIL,
                'email' => 'hello@lumenfashion.demo',
                'phone' => '+201000000101',
                'country' => 'Egypt',
                'city' => 'Cairo',
            ],
            [
                'name' => 'Pulse Streaming',
                'activity_type' => Company::ACTIVITY_TECHNOLOGY,
                'email' => 'ops@pulsestream.demo',
                'phone' => '+201000000102',
                'country' => 'UAE',
                'city' => 'Dubai',
            ],
            [
                'name' => 'CarePlus Clinics',
                'activity_type' => Company::ACTIVITY_HEALTHCARE,
                'email' => 'admin@careplus.demo',
                'phone' => '+201000000103',
                'country' => 'Saudi Arabia',
                'city' => 'Riyadh',
            ],
            [
                'name' => 'Aether Bank',
                'activity_type' => Company::ACTIVITY_FINANCE,
                'email' => 'contact@aetherbank.demo',
                'phone' => '+201000000104',
                'country' => 'Egypt',
                'city' => 'Alexandria',
            ],
            [
                'name' => 'Horizon University',
                'activity_type' => Company::ACTIVITY_EDUCATION,
                'email' => 'team@horizonuni.demo',
                'phone' => '+201000000105',
                'country' => 'Turkey',
                'city' => 'Istanbul',
            ],
            [
                'name' => 'Northstar Agency',
                'activity_type' => Company::ACTIVITY_CONSULTING,
                'email' => 'hello@northstar.demo',
                'phone' => '+201000000106',
                'country' => 'Jordan',
                'city' => 'Amman',
            ],
        ];

        $companyModels = collect();

        foreach ($companies as $index => $company) {
            $customer = $customers[$index % max($customers->count(), 1)] ?? null;

            $model = Company::query()->updateOrCreate(
                ['email' => $company['email']],
                [
                    'user_id' => $customer?->id,
                    'name' => $company['name'],
                    'activity_type' => $company['activity_type'],
                    'phone' => $company['phone'],
                    'country' => $company['country'],
                    'city' => $company['city'],
                    'address' => $company['city'].' Creative District',
                    'notes' => 'Seeded media-studio client account.',
                    'status' => Company::STATUS_ACTIVE,
                ]
            );

            $companyModels->push($model);

            Contact::query()->updateOrCreate(
                ['email' => 'contact+'.$index.'@'.$model->id.'.demo'],
                [
                    'company_id' => $model->id,
                    'user_id' => $customer?->id,
                    'name' => ($customer?->name ?? 'Brand Manager').' ('.$model->name.')',
                    'phone' => $company['phone'],
                    'source' => Lead::SOURCES[$index % count(Lead::SOURCES)],
                    'job_title' => 'Brand / Marketing Lead',
                    'notes' => 'Primary seeded marketing contact.',
                    'is_primary' => true,
                ]
            );
        }

        foreach ($companyModels->take(5) as $index => $company) {
            $assignee = $employees[$index % max($employees->count(), 1)] ?? null;
            $service = $services[$index % max($services->count(), 1)] ?? null;

            Lead::query()->updateOrCreate(
                ['email' => 'lead'.$index.'@'.$company->id.'.demo'],
                [
                    'name' => 'Lead '.$company->name,
                    'phone' => $company->phone,
                    'job_title' => 'Marketing Director',
                    'company_name' => $company->name,
                    'company_id' => $company->id,
                    'city' => $company->city,
                    'country' => $company->country,
                    'website' => 'https://'.Str::slug($company->name).'.demo',
                    'industry' => $company->activity_type,
                    'assigned_to' => $assignee?->id,
                    'source' => Lead::SOURCES[$index % count(Lead::SOURCES)],
                    'status' => Lead::STATUSES[$index % count(Lead::STATUSES)],
                    'project_budget' => 8000 + ($index * 3500),
                    'service_interest' => $service?->getTranslation('title', 'en'),
                    'service_id' => $service?->id,
                    'problem_statement' => 'Needs a media partner for campaign film and always-on content.',
                    'locale' => 'en',
                    'blocked' => false,
                ]
            );
        }

        $openStage = $stages->firstWhere('is_won', false);
        $wonStage = $stages->firstWhere('is_won', true);

        foreach ($companyModels->take(4) as $index => $company) {
            $assignee = $employees[$index % max($employees->count(), 1)] ?? null;
            $stage = $index === 0 ? $wonStage : ($stages[$index % max($stages->count(), 1)] ?? $openStage);
            $currencies = ['USD', 'EUR', 'GBP', 'TRY'];

            Deal::query()->updateOrCreate(
                [
                    'company_id' => $company->id,
                    'title' => $company->name.' Media Retainer',
                ],
                [
                    'pipeline_stage_id' => $stage?->id,
                    'assigned_to' => $assignee?->id,
                    'value' => 12000 + ($index * 6500),
                    'currency' => $currencies[$index % count($currencies)],
                    'probability' => $stage?->probability ?? 25,
                    'expected_close_date' => now()->addDays(14 + ($index * 7))->toDateString(),
                    'source' => Lead::SOURCE_WEBSITE,
                    'description' => 'Seeded media production opportunity.',
                    'status' => $stage?->is_won ? Deal::STATUS_WON : Deal::STATUS_OPEN,
                    'won_at' => $stage?->is_won ? now()->subDays(3) : null,
                    'closed_at' => $stage?->is_won ? now()->subDays(3) : null,
                ]
            );
        }

        foreach ($companyModels->take(3) as $index => $company) {
            $service = $services[$index % max($services->count(), 1)] ?? null;

            if ($service === null) {
                continue;
            }

            $subscriptionCurrencies = ['USD', 'EUR', 'GBP'];

            Subscription::query()->updateOrCreate(
                [
                    'company_id' => $company->id,
                    'service_id' => $service->id,
                    'name' => $service->getTranslation('title', 'en').' Retainer',
                ],
                [
                    'status' => Subscription::STATUS_ACTIVE,
                    'billing_cycle' => Subscription::BILLING_MONTHLY,
                    'amount' => 2500 + ($index * 750),
                    'currency' => $subscriptionCurrencies[$index % count($subscriptionCurrencies)],
                    'starts_at' => now()->subMonths(2)->toDateString(),
                    'ends_at' => null,
                    'renewal_at' => now()->addMonth()->toDateString(),
                    'auto_renew' => true,
                    'notes' => 'Seeded active media retainer.',
                ]
            );
        }

        $admin = User::query()->admins()->orderBy('id')->first();

        if ($admin) {
            MarketingCampaign::query()->updateOrCreate(
                ['subject' => 'New season media packages'],
                [
                    'user_id' => $admin->id,
                    'body' => '<p>Explore our brand film, podcast, and social content packages for Q4 campaigns.</p>',
                    'recipients_count' => $customers->count(),
                    'status' => MarketingCampaign::STATUS_FINISHED,
                    'recipient_sources' => ['customers'],
                ]
            );
        }
    }

    private function seedProjects(): void
    {
        $companies = Company::query()->orderBy('id')->get();
        $statuses = ProjectStatus::query()->orderBy('sort_order')->get();
        $employees = Employee::query()->where('status', Employee::STATUS_ACTIVE)->orderBy('id')->get();
        $deals = Deal::query()->orderBy('id')->get();

        if ($companies->isEmpty() || $statuses->isEmpty()) {
            return;
        }

        $projects = [
            ['title' => 'Autumn Brand Film', 'budget' => 48000, 'currency' => 'USD', 'payment' => Project::PAYMENT_PARTIALLY_PAID],
            ['title' => 'Streaming Launch Trailer', 'budget' => 62000, 'currency' => 'EUR', 'payment' => Project::PAYMENT_UNPAID],
            ['title' => 'Healthcare Awareness Spots', 'budget' => 35000, 'currency' => 'GBP', 'payment' => Project::PAYMENT_FULLY_PAID],
            ['title' => 'Campus Open Day Coverage', 'budget' => 28000, 'currency' => 'USD', 'payment' => Project::PAYMENT_PARTIALLY_PAID],
            ['title' => 'Banking App Social Series', 'budget' => 890000, 'currency' => 'TRY', 'payment' => Project::PAYMENT_UNPAID],
        ];

        foreach ($projects as $index => $item) {
            $company = $companies[$index % $companies->count()];
            $status = $statuses[$index % $statuses->count()];
            $deal = $deals[$index % max($deals->count(), 1)] ?? null;
            $currencyService = app(\Modules\Finance\Services\CurrencyService::class);

            $project = Project::query()->updateOrCreate(
                [
                    'title' => $item['title'],
                    'company_id' => $company->id,
                ],
                [
                    'description' => 'Seeded media production project for '.$company->name.'.',
                    'project_status_id' => $status->id,
                    'deal_id' => $deal?->id,
                    'budget' => $item['budget'],
                    'currency' => $item['currency'],
                    'budget_exchange_rate' => $currencyService->snapshotRateToBase($item['currency']),
                    'payment_status' => $item['payment'],
                    'start_date' => now()->subDays(40 - ($index * 5))->toDateString(),
                    'due_date' => now()->addDays(30 + ($index * 10))->toDateString(),
                ]
            );

            if ($employees->isNotEmpty()) {
                ProjectEmployee::query()->updateOrCreate(
                    [
                        'project_id' => $project->id,
                        'employee_id' => $employees[$index % $employees->count()]->id,
                    ],
                    [
                        'role' => $index % 2 === 0 ? 'Producer' : 'Editor',
                        'started_at' => $project->start_date,
                        'ended_at' => null,
                        'notes' => 'Seeded crew assignment.',
                    ]
                );
            }

            ProjectUseCase::query()->updateOrCreate(
                ['slug' => Str::slug($item['title']).'-case-study'],
                [
                    'project_id' => $project->id,
                    'title' => ['en' => $item['title'].' Case Study', 'ar' => $item['title'], 'tr' => $item['title']],
                    'client_name' => ['en' => $company->name, 'ar' => $company->name, 'tr' => $company->name],
                    'summary' => [
                        'en' => 'How '.$company->name.' elevated their brand with cinematic media.',
                        'ar' => 'How '.$company->name.' elevated their brand with cinematic media.',
                        'tr' => 'How '.$company->name.' elevated their brand with cinematic media.',
                    ],
                    'challenge' => [
                        'en' => 'Fragmented creative assets and slow turnaround limited campaign impact.',
                        'ar' => 'Fragmented creative assets and slow turnaround limited campaign impact.',
                        'tr' => 'Fragmented creative assets and slow turnaround limited campaign impact.',
                    ],
                    'solution' => [
                        'en' => 'We delivered a production package spanning film, stills, and social edits.',
                        'ar' => 'We delivered a production package spanning film, stills, and social edits.',
                        'tr' => 'We delivered a production package spanning film, stills, and social edits.',
                    ],
                    'results' => [
                        'en' => 'Stronger brand recall and faster content velocity across channels.',
                        'ar' => 'Stronger brand recall and faster content velocity across channels.',
                        'tr' => 'Stronger brand recall and faster content velocity across channels.',
                    ],
                    'content' => [
                        'en' => '<p>Full media case study content seeded for demo.</p>',
                        'ar' => '<p>Full media case study content seeded for demo.</p>',
                        'tr' => '<p>Full media case study content seeded for demo.</p>',
                    ],
                    'image' => $this->images->store('project-use-cases', $item['title'], 1200, 800),
                    'technologies' => ['Cinema Camera', 'Premiere Pro', 'DaVinci Resolve', 'After Effects'],
                    'category_tag' => 'Media Production',
                    'project_url' => 'https://example.com/'.Str::slug($item['title']),
                    'completed_year' => (int) now()->year,
                    'featured' => $index < 3,
                    'status' => CmsStatus::PUBLISHED->value,
                    'sort_order' => $index + 1,
                    'visits' => random_int(40, 700),
                ]
            );
        }
    }

    private function seedTestimonials(): void
    {
        $projects = Project::query()->with('company')->orderBy('id')->get();
        $customers = User::query()->customers()->orderBy('id')->get();

        if ($projects->isEmpty() || $customers->isEmpty()) {
            return;
        }

        $quotes = [
            'The brand film captured our story better than any previous campaign.',
            'Their crew was calm on set and the edit turnaround was exceptional.',
            'We finally have a content engine for social, events, and launch films.',
            'A true media partner — strategy, production, and delivery in one studio.',
        ];

        foreach ($quotes as $index => $quote) {
            $project = $projects[$index % $projects->count()];
            $customer = $customers[$index % $customers->count()];

            Testimonial::query()->updateOrCreate(
                [
                    'project_id' => $project->id,
                    'customer_id' => $customer->id,
                ],
                [
                    'quote' => ['en' => $quote, 'ar' => $quote, 'tr' => $quote],
                    'status' => CmsStatus::PUBLISHED->value,
                ]
            );
        }
    }

    private function seedSupport(): void
    {
        $customers = User::query()->customers()->orderBy('id')->get();
        $admins = User::query()->admins()->orderBy('id')->get();
        $categories = TicketCategory::query()->orderBy('sort_order')->get();

        if ($customers->isEmpty() || $categories->isEmpty()) {
            return;
        }

        $tickets = [
            ['subject' => 'Need revised cut of brand film', 'priority' => Ticket::PRIORITY_HIGH, 'status' => Ticket::STATUS_OPEN],
            ['subject' => 'Invoice for podcast studio days', 'priority' => Ticket::PRIORITY_MEDIUM, 'status' => Ticket::STATUS_IN_PROGRESS],
            ['subject' => 'Share usage rights for campaign stills', 'priority' => Ticket::PRIORITY_LOW, 'status' => Ticket::STATUS_RESOLVED],
            ['subject' => 'Request raw footage access', 'priority' => Ticket::PRIORITY_MEDIUM, 'status' => Ticket::STATUS_CLOSED],
        ];

        foreach ($tickets as $index => $item) {
            $customer = $customers[$index % $customers->count()];
            $category = $categories[$index % $categories->count()];
            $assignee = $admins[$index % max($admins->count(), 1)] ?? null;
            $ticketNumber = 'TKT-DEMO-'.str_pad((string) ($index + 1), 4, '0', STR_PAD_LEFT);

            $ticket = Ticket::query()->updateOrCreate(
                ['ticket_number' => $ticketNumber],
                [
                    'user_id' => $customer->id,
                    'ticket_category_id' => $category->id,
                    'assigned_to' => $assignee?->id,
                    'subject' => $item['subject'],
                    'description' => $item['subject'].'. Seeded support ticket for media studio demo.',
                    'priority' => $item['priority'],
                    'status' => $item['status'],
                    'closed_at' => in_array($item['status'], [Ticket::STATUS_RESOLVED, Ticket::STATUS_CLOSED], true)
                        ? now()->subDays(2)
                        : null,
                ]
            );

            TicketMessage::query()->updateOrCreate(
                [
                    'ticket_id' => $ticket->id,
                    'user_id' => $customer->id,
                    'body' => 'Hi, I need help with: '.$item['subject'],
                ],
                []
            );

            if ($assignee) {
                TicketMessage::query()->updateOrCreate(
                    [
                        'ticket_id' => $ticket->id,
                        'user_id' => $assignee->id,
                        'body' => 'Thanks for reaching out. The production team is reviewing this demo ticket.',
                    ],
                    []
                );
            }
        }

        foreach (['news1@demo.symfonix.com', 'news2@demo.symfonix.com', 'news3@demo.symfonix.com'] as $email) {
            Subscriber::query()->updateOrCreate(
                ['email' => $email],
                [
                    'ip_address' => '127.0.0.1',
                    'lang' => 'en',
                    'blocked' => false,
                ]
            );
        }
    }

    private function seedProductSales(): void
    {
        $this->call(ProductSaleScenarioSeeder::class);
    }

    private function seedMultiCurrencyFinance(): void
    {
        $this->call(\Modules\Finance\Database\Seeders\MultiCurrencyTransactionSeeder::class);
    }
}
