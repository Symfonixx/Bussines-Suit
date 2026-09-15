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
        <header class="intro intro-fullscreen" :data-background="asset_path + 'theme/img/main/55.jpg'" :style="{ backgroundImage: `url(${asset_path}theme/img/main/55.jpg)` }">
            <div class="overlay"></div>
            <div class="intro-body">
                <h1 class="big light">{{ status }}</h1>
                <div class="container">
                    <div class="row">
                        <div class="col-md-6 col-md-offset-3">
                            <h2>{{ heading }}</h2>
                            <h3>{{ message }}</h3>
                            <p>
                                <Link class="btn btn-dark btn-lg" :href="homeUrl">{{ trans('Back To Home') }}</Link>
                                <Link v-if="secondaryHref" class="btn btn-gray btn-lg" :href="secondaryHref">{{ secondaryLabel }}</Link>
                            </p>
                            <div
                                v-if="showDebug && (page?.props?.error || page?.props?.trace)"
                                class="alert alert-danger text-left"
                            >
                                <strong>Debug Error:</strong>
                                <div v-if="page?.props?.error">{{ page.props.error }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    </app-layout>
</template>

<script setup>
import { computed } from 'vue'
import { usePage, Link, Head } from '@inertiajs/vue3'
import AppLayout from '@/Layouts/App.vue'

const props = defineProps({
    status: { type: [Number, String], required: true },
    title: { type: String, required: true },
    heading: { type: String, required: true },
    message: { type: String, required: true },
    description: { type: String, default: '' },
    keywords: { type: String, default: '' },
    showImage: { type: Boolean, default: false },
    showDebug: { type: Boolean, default: false },
    secondaryHref: { type: String, default: '' },
    secondaryLabel: { type: String, default: '' },
})

const page = usePage()
const trans = (key) => {
    try {
        return page.props.translations?.[key] || key
    } catch (e) {
        return key
    }
}

const asset_path = computed(() => page.props.asset_path || '/')
const locale = computed(() => page.props.locale || 'en')
const isRtl = computed(() => locale.value === 'ar')
const seo = computed(() => page.props.seo || {})
const meta = computed(() => page.props.meta || {})
const siteName = computed(() => seo.value.website_name || page.props.appName || 'Symfonix')

const metaTitle = computed(() => `${props.title} | ${siteName.value}`)
const metaDescription = computed(() => meta.value.description || props.description || props.message)
const metaKeywords = computed(() => meta.value.keywords || props.keywords)
const metaImage = computed(() => meta.value?.og?.image || meta.value?.twitter?.image || '')
const metaCanonical = computed(() => meta.value.canonical || '')
const metaRobots = computed(() => meta.value.robots || 'noindex, nofollow')

const homeUrl = computed(() => {
    try {
        return route('home')
    } catch (e) {
        return `/${locale.value}`
    }
})
</script>

<script>
export default {
    components: {
        AppLayout,
    },
}
</script>
