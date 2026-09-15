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
        <meta property="og:type" content="article">
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:title" :content="metaTitle">
        <meta name="twitter:description" :content="metaDescription">
        <meta v-if="metaImage" name="twitter:image" :content="metaImage">
    </Head>
    <app-layout>
        <PageHeader
            :title="getServiceTitle(service)"
            :subtitle="trans('Our Services')"
            :parent-href="route('services.index')"
            :background="service.image_link || (asset_path + 'theme/img/main/30.jpg')"
        />

        <section class="section-small" id="service-details">
            <div class="container">
                <div class="row">
                    <div class="col-lg-8">
                        <article class="service-detail">
                            <p v-if="getCategoryName(service.category)" class="service-detail__kicker">
                                <Link :href="route('services.index', { category: service.category.slug })">
                                    {{ getCategoryName(service.category) }}
                                </Link>
                            </p>
                            <h1 class="service-detail__title">{{ getServiceTitle(service) }}</h1>
                            <ul class="service-detail__meta list-unstyled">
                                <li v-if="service.reading_time">
                                    <i class="far fa-clock" aria-hidden="true"></i>
                                    {{ service.reading_time }} {{ trans('min read') }}
                                </li>
                                <li v-if="service.created_at">
                                    <i class="far fa-calendar" aria-hidden="true"></i>
                                    {{ service.created_at }}
                                </li>
                            </ul>
                            <p v-if="leadText" class="service-detail__lead">{{ leadText }}</p>
                            <div v-if="hasImage && imageUsable" class="service-detail__image">
                                <img
                                    :src="service.image_link"
                                    :alt="getServiceTitle(service)"
                                    loading="lazy"
                                    decoding="async"
                                    @load="onHeroLoad"
                                >
                            </div>
                            <div class="service-detail__content" v-html="service.content"></div>
                            <ul v-if="keywordTags.length" class="service-detail__tags list-unstyled">
                                <li v-for="tag in keywordTags" :key="tag">{{ tag }}</li>
                            </ul>

                            <div class="service-detail__share">
                                <span>{{ trans('Share') }}</span>
                                <a :href="getShareUrl('facebook')" target="_blank" rel="noopener" aria-label="Facebook">
                                    <i class="fab fa-facebook-f fa-fw fa-lg"></i>
                                </a>
                                <a :href="getShareUrl('twitter')" target="_blank" rel="noopener" aria-label="Twitter">
                                    <i class="fab fa-twitter fa-fw fa-lg"></i>
                                </a>
                                <a :href="getShareUrl('linkedin')" target="_blank" rel="noopener" aria-label="LinkedIn">
                                    <i class="fab fa-linkedin-in fa-fw fa-lg"></i>
                                </a>
                            </div>

                            <nav v-if="previousService || nextService" class="service-detail__nav" aria-label="Service pagination">
                                <Link
                                    v-if="previousService"
                                    class="service-detail__nav-link"
                                    :href="getServiceUrl(previousService)"
                                >
                                    <small>{{ trans('Previous Service') }}</small>
                                    <strong>{{ getServiceTitle(previousService) }}</strong>
                                </Link>
                                <span v-else></span>
                                <Link
                                    v-if="nextService"
                                    class="service-detail__nav-link service-detail__nav-link--next"
                                    :href="getServiceUrl(nextService)"
                                >
                                    <small>{{ trans('Next Service') }}</small>
                                    <strong>{{ getServiceTitle(nextService) }}</strong>
                                </Link>
                            </nav>
                        </article>
                    </div>

                    <aside class="col-lg-4">
                        <div class="service-sidebar">
                            <div class="service-sidebar__card">
                                <h3>{{ trans('Need Help?') }}</h3>
                                <p>{{ trans('Tell us about your needs and we will get back to you shortly.') }}</p>
                                <button type="button" class="btn btn-dark btn-block" @click="openRequestModal">
                                    {{ trans('Request this Service') }}
                                </button>
                                <a
                                    v-if="phoneNumber"
                                    class="service-sidebar__phone"
                                    dir="ltr"
                                    :href="`tel:${phoneNumber}`"
                                >
                                    {{ phoneNumber }}
                                </a>
                            </div>

                            <div v-if="categories.length" class="service-sidebar__card">
                                <h3>{{ trans('Service Categories') }}</h3>
                                <ul class="service-sidebar__list list-unstyled">
                                    <li>
                                        <Link :href="route('services.index')">
                                            {{ trans('All Services') }}
                                            <span>{{ totalServicesCount }}</span>
                                        </Link>
                                    </li>
                                    <li v-for="category in categories" :key="category.id">
                                        <Link
                                            :href="route('services.index', { category: category.slug })"
                                            :class="{ 'is-active': service?.category?.slug === category.slug }"
                                        >
                                            {{ getCategoryName(category) }}
                                            <span>{{ category.services_count || 0 }}</span>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </section>

        <section v-if="relatedServices.length" class="section-small bg-white" id="related-services">
            <div class="container">
                <div class="text-center">
                    <h2>{{ trans('Explore More') }} {{ trans('Services') }}</h2>
                    <p class="services-page__subtitle">{{ trans('Related Services') }}</p>
                </div>
                <div class="row services-page__grid">
                    <div
                        v-for="(relatedService, index) in relatedServices"
                        :key="relatedService.id"
                        class="col-xl-4 col-lg-4 col-md-6 wow fadeInUp services-page__col"
                        :data-wow-delay="`${(index + 1) * 100}ms`"
                    >
                        <ServiceCardThree
                            :title="getServiceTitle(relatedService)"
                            :short-desc="relatedService.short_desc"
                            :description="getServiceDescription(relatedService)"
                            :highlights="getServiceHighlights(relatedService)"
                            :link="getServiceUrl(relatedService)"
                            :image="relatedService.image_link"
                            :is-rtl="locale === 'ar'"
                            :reading-time="relatedService.reading_time"
                            :reading-time-label="trans('min read')"
                            :category="getCategoryName(relatedService.category)"
                            :featured="Boolean(relatedService.featured)"
                        />
                    </div>
                </div>
            </div>
        </section>

        <section v-if="featuredTestimonial" class="section-small" id="testimonials">
            <div class="container">
                <div class="row">
                    <div class="col-md-3">
                        <h2>{{ trans('Testimonials') }}</h2>
                    </div>
                    <div class="col-md-3">
                        <img
                            class="img-circle center-block img-responsive"
                            :src="featuredTestimonial.avatar_link || (asset_path + 'theme/img/testimonials/1.jpg')"
                            :alt="translateField(featuredTestimonial.name)"
                        >
                    </div>
                    <div class="col-md-6">
                        <h2 class="dark-gray">{{ translateField(featuredTestimonial.quote) }}</h2>
                        <div class="classic">{{ translateField(featuredTestimonial.name) }}</div>
                        <small v-if="translateField(featuredTestimonial.position)">
                            — {{ translateField(featuredTestimonial.position) }}
                        </small>
                    </div>
                </div>
            </div>
        </section>

        <ContactRequestModal
            ref="contactModal"
            modal-id="serviceRequestModal"
            :title="trans('Request this Service')"
            :description="requestModalDescription"
            :default-subject="requestSubject"
            :default-message="requestMessage"
            :submit-label="trans('Send')"
        />

        <CtaTwo />
    </app-layout>
</template>

<script setup>
import { computed, nextTick, onMounted, ref } from 'vue'
import { Head, Link, usePage } from '@inertiajs/vue3'
import AppLayout from '@/Layouts/App.vue'
import ServiceCardThree from '@/Components/Services/ServiceCardThree.vue'
import CtaTwo from '@/Components/CtaTwo.vue'
import PageHeader from '@/Components/PageHeader.vue'
import ContactRequestModal from '@/Components/ContactRequestModal.vue'

const page = usePage()
const trans = (key) => page.props.translations[key] || key
const seo = computed(() => page.props.seo)
const settings = computed(() => page.props.settings || {})
const asset_path = computed(() => page.props.asset_path || '')
const locale = computed(() => page.props.locale || 'en')
const service = computed(() => page.props.service || {})
const relatedServices = computed(() => page.props.relatedServices || [])
const categories = computed(() => page.props.categories || [])
const testimonials = computed(() => page.props.testimonials || [])
const totalServicesCount = computed(() => page.props.totalServicesCount || 0)
const previousService = computed(() => page.props.previousService)
const nextService = computed(() => page.props.nextService)
const meta = computed(() => page.props.meta || {})
const contactModal = ref(null)
const imageUsable = ref(true)

const metaTitle = computed(() => {
    return meta.value.title || `${getServiceTitle(service.value)} | ${seo.value.website_name || ''}`.trim()
})
const metaDescription = computed(() => {
    return meta.value.description || getServiceDescription(service.value) || seo.value.website_desc || ''
})
const metaKeywords = computed(() => {
    return meta.value.keywords || service.value?.keywords || seo.value.website_keywords || ''
})
const metaImage = computed(() => {
    return meta.value?.og?.image || meta.value?.twitter?.image || service.value?.image_link || settings.value?.meta_img || ''
})
const metaCanonical = computed(() => meta.value.canonical || '')
const metaRobots = computed(() => meta.value.robots || 'index, follow')

const featuredTestimonial = computed(() => testimonials.value[0] || null)
const phoneNumber = computed(() => settings.value.website_phone || settings.value.phone || '')
const hasImage = computed(() => {
    const src = String(service.value.image_link || '')
    return src !== '' && !src.includes('blank.png')
})

const translateField = (value) => {
    if (!value) return ''
    if (typeof value === 'string') return value
    if (typeof value === 'object' && value !== null) {
        return value[locale.value] || value['en'] || value[Object.keys(value)[0]] || ''
    }
    return ''
}

const getServiceUrl = (serviceItem) => {
    if (!serviceItem || !serviceItem.slug) {
        return '#'
    }
    try {
        return route('services.show', serviceItem.slug)
    } catch (e) {
        return '#'
    }
}

const getServiceTitle = (serviceItem) => translateField(serviceItem?.title)
const getServiceDescription = (serviceItem) => translateField(serviceItem?.description)
const getCategoryName = (category) => translateField(category?.title)

const leadText = computed(() => {
    const raw = getServiceDescription(service.value)
    const text = String(raw).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
    if (!text) {
        return ''
    }
    const content = String(service.value.content || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
    if (content && content.includes(text)) {
        return ''
    }
    return text
})

const normalizeKeywords = (rawKeywords) => {
    if (!rawKeywords) {
        return []
    }

    let parsed = rawKeywords
    if (typeof rawKeywords === 'string') {
        const trimmed = rawKeywords.trim()
        if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
            try {
                parsed = JSON.parse(trimmed)
            } catch (e) {
                try {
                    parsed = JSON.parse(trimmed.replace(/'/g, '"'))
                } catch (err) {
                    parsed = rawKeywords
                }
            }
        }
    }

    if (Array.isArray(parsed)) {
        return parsed
            .map((item) => {
                if (typeof item === 'string') {
                    return item
                }
                if (item && typeof item === 'object') {
                    if (item.value) {
                        return translateField(item.value)
                    }
                    return translateField(item)
                }
                return ''
            })
            .map((item) => String(item).trim())
            .filter(Boolean)
    }

    if (typeof parsed === 'object') {
        const value = translateField(parsed)
        return value ? [value] : []
    }

    return parsed
        .toString()
        .split(/[,;\n]+/)
        .map((item) => item.trim())
        .filter(Boolean)
}

const getServiceHighlights = (serviceItem) => normalizeKeywords(translateField(serviceItem?.keywords) || serviceItem?.keywords)
const keywordTags = computed(() => getServiceHighlights(service.value).slice(0, 8))

const requestSubject = computed(() => `${trans('Request this Service')}: ${getServiceTitle(service.value)}`.trim())
const requestMessage = computed(() => {
    const intro = trans('I would like to learn more about this service.')
    const name = getServiceTitle(service.value) ? `${trans('Service')}: ${getServiceTitle(service.value)}` : ''
    return [intro, name].filter(Boolean).join('\n\n')
})
const requestModalDescription = computed(() => trans('Tell us about your needs and we will get back to you shortly.'))

const openRequestModal = () => {
    contactModal.value?.show()
    if (typeof window !== 'undefined' && window.jQuery) {
        window.jQuery('#serviceRequestModal').modal('show')
    }
}

const onHeroLoad = (event) => {
    const img = event?.target
    if (!img) {
        return
    }
    imageUsable.value = img.naturalWidth >= 240 && img.naturalHeight >= 80
}

const getShareUrl = (platform) => {
    if (typeof window === 'undefined') {
        return '#'
    }

    const url = encodeURIComponent(window.location.href)
    const title = encodeURIComponent(getServiceTitle(service.value) || '')

    switch (platform) {
        case 'twitter':
            return `https://twitter.com/intent/tweet?url=${url}&text=${title}`
        case 'facebook':
            return `https://www.facebook.com/sharer/sharer.php?u=${url}`
        case 'linkedin':
            return `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}`
        default:
            return '#'
    }
}

onMounted(() => {
    nextTick(() => {
        if (typeof WOW !== 'undefined') {
            new WOW().init()
        }
    })
})
</script>

<script>
export default {
    components: {
        AppLayout,
        CtaTwo,
    },
}
</script>

<style scoped>
.service-detail {
    background: #fff;
    border: 1px solid #eee;
    padding: 36px;
}
.service-detail__kicker {
    margin: 0 0 8px;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
}
.service-detail__kicker a {
    color: #777;
}
.service-detail__title {
    margin: 0 0 16px;
    font-size: 32px;
    line-height: 1.25;
    color: #111;
}
.service-detail__meta {
    display: flex;
    flex-wrap: wrap;
    gap: 8px 18px;
    margin: 0 0 20px;
    padding: 0;
    color: #777;
    font-size: 14px;
}
.service-detail__meta i {
    margin-inline-end: 6px;
}
.service-detail__lead {
    font-size: 18px;
    line-height: 1.8;
    color: #444;
    margin-bottom: 24px;
}
.service-detail__image {
    margin-bottom: 28px;
}
.service-detail__image img {
    width: 100%;
    height: auto;
    display: block;
}
.service-detail__content {
    font-size: 17px;
    line-height: 1.85;
    color: #444;
    overflow: hidden;
    word-wrap: break-word;
}
.service-detail__content :deep(p),
.service-detail__content :deep(li) {
    font-size: 17px;
    line-height: 1.85;
}
.service-detail__content :deep(img),
.service-detail__content :deep(iframe),
.service-detail__content :deep(video) {
    max-width: 100%;
    height: auto;
}
.service-detail__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin: 28px 0 0;
    padding: 0;
}
.service-detail__tags li {
    padding: 6px 12px;
    background: #f5f5f5;
    border: 1px solid #eee;
    font-size: 13px;
    color: #555;
}
.service-detail__share {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-top: 28px;
    padding-top: 20px;
    border-top: 1px solid #eee;
}
.service-detail__share a {
    color: #111;
}
.service-detail__nav {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin-top: 28px;
}
.service-detail__nav-link {
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 16px;
    border: 1px solid #eee;
    color: #111;
    text-decoration: none;
}
.service-detail__nav-link:hover {
    border-color: #ccc;
    text-decoration: none;
}
.service-detail__nav-link small {
    color: #777;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    font-size: 11px;
}
.service-detail__nav-link--next {
    text-align: right;
}
.service-sidebar {
    position: sticky;
    top: 120px;
}
.service-sidebar__card {
    background: #fff;
    border: 1px solid #eee;
    padding: 24px;
    margin-bottom: 24px;
}
.service-sidebar__card h3 {
    margin: 0 0 12px;
    font-size: 20px;
    color: #111;
}
.service-sidebar__card p {
    color: #555;
    line-height: 1.7;
}
.service-sidebar__phone {
    display: block;
    margin-top: 12px;
    text-align: center;
    font-weight: 700;
    color: #111;
}
.service-sidebar__list {
    margin: 0;
    padding: 0;
}
.service-sidebar__list a {
    display: flex;
    justify-content: space-between;
    gap: 12px;
    padding: 10px 0;
    border-bottom: 1px solid #f0f0f0;
    color: #333;
}
.service-sidebar__list a:hover,
.service-sidebar__list a.is-active {
    color: #111;
    font-weight: 700;
}
.service-sidebar__list span {
    color: #777;
    font-weight: 500;
}
.services-page__subtitle {
    max-width: 640px;
    margin: 0 auto 36px;
    font-size: 16px;
    line-height: 1.8;
    color: #555;
}
.services-page__col {
    display: flex;
    margin-bottom: 30px;
}
.services-page__col :deep(.service-card) {
    width: 100%;
}
.services-page__grid {
    display: flex;
    flex-wrap: wrap;
}

@media (max-width: 991px) {
    .service-sidebar {
        position: static;
        margin-top: 30px;
    }
    .service-detail {
        padding: 24px;
    }
}
@media (max-width: 767px) {
    .service-detail__title {
        font-size: 26px;
    }
    .service-detail__nav {
        grid-template-columns: 1fr;
    }
    .service-detail__nav-link--next {
        text-align: left;
    }
}

html[dir="rtl"] .service-detail__nav-link--next {
    text-align: left;
}
html[dir="rtl"] .service-detail__nav-link:not(.service-detail__nav-link--next) {
    text-align: right;
}
</style>
