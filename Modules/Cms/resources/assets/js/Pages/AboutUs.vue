<template>
    <Head>
        <title>{{ metaTitle }}</title>
        <meta name="description" :content="metaDescription">
        <meta name="keywords" :content="metaKeywords">
        <meta name="robots" :content="metaRobots">
        <link v-if="metaCanonical" rel="canonical" :href="metaCanonical">
        <meta property="og:title" :content="metaTitle">
        <meta property="og:description" :content="metaDescription">
        <meta v-if="metaImage" property="og:image" :content="metaImage">
        <meta v-if="metaCanonical" property="og:url" :content="metaCanonical">
        <meta property="og:type" content="website">
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:title" :content="metaTitle">
        <meta name="twitter:description" :content="metaDescription">
        <meta v-if="metaImage" name="twitter:image" :content="metaImage">
    </Head>
    <app-layout>
        <PageHeader
            :title="trans('About Us')"
            :subtitle="trans('Who we are?')"
            :background="asset_path + 'theme/img/main/30.jpg'"
        />

        <section id="about">
            <div class="container">
                <div class="row">
                    <div class="col-lg-6">
                        <h2>{{ trans('About Us') }}</h2>
                        <p>
                            {{ trans('Symfonix is a technology company that designs, builds, and scales digital systems where web, mobile, AI, and cloud work together instead of fighting each other. The name says it all: a symphony of technologies, orchestrated with intention.') }}
                        </p>
                        <h2 class="classic">— {{ seo.website_name }}</h2>
                        <ul class="list-unstyled">
                            <li><strong>{{ trans('Harmony over chaos') }}</strong> — {{ trans('Every solution must be coherent. No messy stacks, no duct-tape architectures.') }}</li>
                            <li><strong>{{ trans('Engineering first') }}</strong> — {{ trans('Pretty UI is great, but solid architecture, performance, and maintainability come first.') }}</li>
                            <li><strong>{{ trans('Truth & clarity') }}</strong> — {{ trans("We say what's possible, what's risky, and what's unnecessary. No tech theater.") }}</li>
                            <li><strong>{{ trans('Continuous learning') }}</strong> — {{ trans('AI, cloud, and software evolve fast. We evolve faster.') }}</li>
                            <li><strong>{{ trans('Global mindset, local roots') }}</strong> — {{ trans('Built in Syria. Designed for the world.') }}</li>
                        </ul>
                    </div>
                    <div class="col-lg-5 col-lg-offset-1">
                        <img class="img-responsive" :src="asset_path + 'images/home/about_us.jpg'" :alt="trans('About Us')">
                    </div>
                </div>
            </div>
        </section>

        <section v-if="teams.length" id="team">
            <div class="container text-center">
                <h2>{{ trans('Meet The Team') }}</h2>
                <div class="row">
                    <div v-for="team in teams" :key="team.id" class="col-md-4 shadow">
                        <img class="img-responsive center-block" :src="team.image_link || team.avatar_link" :alt="translateField(team.name)">
                        <h5>
                            {{ translateField(team.name) }}
                            <div class="small">{{ translateField(team.position) }}</div>
                        </h5>
                    </div>
                </div>
            </div>
        </section>

        <section v-if="testimonials.length" class="section-small" id="testimonials">
            <div class="container">
                <div class="row" v-for="testimonial in testimonials.slice(0, 1)" :key="testimonial.id">
                    <div class="col-md-3"><h2>{{ trans('Testimonials') }}</h2></div>
                    <div class="col-md-3">
                        <img class="img-circle center-block img-responsive" :src="testimonial.avatar_link" :alt="translateField(testimonial.name)">
                    </div>
                    <div class="col-md-6">
                        <h2 class="dark-gray">{{ translateField(testimonial.quote) }}</h2>
                        <div class="classic">{{ translateField(testimonial.name) }}</div>
                        <small>{{ translateField(testimonial.position) }}</small>
                    </div>
                </div>
            </div>
        </section>

        <CtaTwo />
        <ClientsSection :clients="clients" />
    </app-layout>
</template>
<script setup>
import {computed} from 'vue'
import {Link, usePage, Head} from '@inertiajs/vue3'
import ClientsSection from '@/Components/ClientsSection.vue'
import PageHeader from '@/Components/PageHeader.vue'
import CtaTwo from '@/Components/CtaTwo.vue'
import AppLayout from '@/Layouts/App.vue'

const page = usePage()
const trans = (key) => page.props.translations[key] || key
const seo = computed(() => page.props.seo)
const settings = computed(() => page.props.settings || {})
const asset_path = computed(() => page.props.asset_path || '')
const locale = computed(() => page.props.locale || 'en')
const teams = computed(() => page.props.teams || [])
const testimonials = computed(() => page.props.testimonials || [])
const clients = computed(() => page.props.clients || [])
const meta = computed(() => page.props.meta || {})

const metaTitle = computed(() => meta.value.title || `${trans('About Us')} | ${seo.value.website_name || ''}`.trim())
const metaDescription = computed(() => meta.value.description || trans('Learn about our team, mission, and the technology expertise behind our solutions.') || seo.value.website_desc || '')
const metaKeywords = computed(() => meta.value.keywords || trans('about us, IT consulting, technology experts, digital transformation') || seo.value.website_keywords || '')
const metaImage = computed(() => meta.value?.og?.image || meta.value?.twitter?.image || settings.value?.meta_img || '')
const metaCanonical = computed(() => meta.value.canonical || '')
const metaRobots = computed(() => meta.value.robots || 'index, follow')

const translateField = (value) => {
    if (!value) return ''
    if (typeof value === 'string') return value
    if (typeof value === 'object' && value !== null) {
        return value[locale.value] || value.en || value[Object.keys(value)[0]] || ''
    }
    return ''
}
</script>

