<template>
    <Head :title="metaTitle">
    </Head>
    <AppLayout>
        <PageHeader
            :title="trans('Careers')"
            :subtitle="trans('Join Our Team')"
            :background="asset_path + 'theme/img/main/30.jpg'"
        />

        <section class="jobs-page py-5">
            <div class="container">
                <div class="text-center mb-5">
                    <h2>{{ trans('Join Our Team') }}</h2>
                    <p>{{ trans('Explore current opportunities and help us build technology in perfect harmony.') }}</p>
                </div>
                <div class="row g-4">
                    <div v-for="position in positions.data" :key="position.id" class="col-lg-4 col-md-6">
                        <article class="job-card h-100">
                            <span class="job-card__department">{{ position.department }}</span>
                            <h3>{{ position.title }}</h3>
                            <p class="job-card__meta">
                                <span><i class="fas fa-map-marker-alt"></i>{{ position.location }}</span>
                                <span><i class="fas fa-briefcase"></i>{{ formatEmploymentType(position.employment_type) }}</span>
                            </p>
                            <p class="text-muted">{{ trans('Posted') }}: {{ formatDate(position.posted_at) }}</p>
                            <Link :href="route('jobs.show', position.slug)" class="btn btn-dark">
                                {{ trans('View & Apply') }}
                            </Link>
                        </article>
                    </div>
                    <div v-if="positions.data.length === 0" class="col-12 text-center py-5">
                        <p class="text-muted">{{ trans('There are no open positions at the moment. Please check back soon.') }}</p>
                    </div>
                </div>
            </div>
        </section>
    </AppLayout>
</template>

<script setup>
import {computed} from 'vue'
import {Head, Link, usePage} from '@inertiajs/vue3'
import AppLayout from '@/Layouts/App.vue'
import PageHeader from '@/Components/PageHeader.vue'

const props = defineProps({positions: {type: Object, required: true}})
const page = usePage()
const trans = (key) => page.props.translations[key] || key
const locale = computed(() => page.props.locale || 'en')
const asset_path = computed(() => page.props.asset_path || '')
const metaTitle = computed(() => page.props.meta?.title || `${trans('Careers')} | ${page.props.seo?.website_name || page.props.appName}`)

const formatDate = (value) => new Intl.DateTimeFormat(locale.value, {year: 'numeric', month: 'long', day: 'numeric'}).format(new Date(`${value}T00:00:00`))
const formatEmploymentType = (value) => trans(String(value || '').replaceAll('_', ' ').replace(/\b\w/g, (letter) => letter.toUpperCase()))
</script>

<style scoped>
.jobs-page { background: #f7f7f7; color: #222; }
.jobs-page h2,
.job-card h3 { color: #111; }
.job-card { background: #fff; border: 1px solid #eee; padding: 24px; margin-bottom: 24px; }
.job-card .btn, .job-card .thm-btn { margin-top: 16px; }
.job-card__department { font-weight: 700; text-transform: uppercase; font-size: .8rem; letter-spacing: .08em; }
</style>
