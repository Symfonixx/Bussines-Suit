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
            :title="trans('Our Services')"
            :subtitle="trans('What we do')"
            :background="asset_path + 'theme/img/main/59.jpg'"
        />

        <section class="section-small" id="services">
            <div class="container">
                <div class="text-center">
                    <h2>{{ trans('Scale Your Business Smarter with Next-Gen IT Solutions') }}</h2>
                    <p class="services-page__subtitle">
                        {{ trans('Discover our IT services designed to scale and modernize your business.') }}
                    </p>
                </div>

                <div v-if="totalServicesCount" class="services-page__stats">
                    <div class="services-page__stat">
                        <span class="services-page__stat-value">{{ totalServicesCount }}</span>
                        <span class="services-page__stat-label">{{ trans('Services Available') }}</span>
                    </div>
                    <div v-if="categories.length" class="services-page__stat">
                        <span class="services-page__stat-value">{{ categories.length }}</span>
                        <span class="services-page__stat-label">{{ trans('Categories') }}</span>
                    </div>
                    <div v-if="featuredCount" class="services-page__stat">
                        <span class="services-page__stat-value">{{ featuredCount }}</span>
                        <span class="services-page__stat-label">{{ trans('Featured') }}</span>
                    </div>
                </div>

                <form class="services-page__search" @submit.prevent="submitSearch">
                    <label class="sr-only" for="services-search">{{ trans('Search services...') }}</label>
                    <input
                        id="services-search"
                        v-model="searchQuery"
                        type="search"
                        class="form-control"
                        :placeholder="trans('Search services...')"
                    >
                    <button type="submit" class="btn btn-dark">{{ trans('Search') }}</button>
                    <Link
                        v-if="hasActiveFilters"
                        class="btn btn-gray"
                        :href="route('services.index')"
                    >
                        {{ trans('Clear') }}
                    </Link>
                </form>

                <ul v-if="categories.length" class="list-inline portfolio-sorting services-page__filters">
                    <li>
                        <Link
                            :href="categoryUrl(null)"
                            class="services-page__filter"
                            :class="{ 'is-current': !filters.category }"
                            active-class=""
                            exact-active-class=""
                            :aria-current="!filters.category ? 'page' : undefined"
                        >
                            {{ trans('All Services') }}
                            <span>({{ totalServicesCount }})</span>
                        </Link>
                    </li>
                    <li v-for="category in categories" :key="category.id">
                        <Link
                            :href="categoryUrl(category.slug)"
                            class="services-page__filter"
                            :class="{ 'is-current': filters.category === category.slug }"
                            active-class=""
                            exact-active-class=""
                            :aria-current="filters.category === category.slug ? 'page' : undefined"
                        >
                            {{ getCategoryName(category) }}
                            <span>({{ category.services_count || 0 }})</span>
                        </Link>
                    </li>
                </ul>

                <p v-if="hasActiveFilters && services.total" class="services-page__results">
                    {{ trans('Showing') }} {{ services.total }} {{ trans('results') }}
                </p>

                <div class="row services-page__grid">
                    <div
                        v-for="(serviceItem, index) in services.data"
                        :key="serviceItem.id"
                        class="col-xl-4 col-lg-4 col-md-6 wow fadeInUp services-page__col"
                        :data-wow-delay="`${(index % 3 + 1) * 100}ms`"
                    >
                        <ServiceCardThree
                            :title="getServiceTitle(serviceItem)"
                            :short-desc="serviceItem.short_desc"
                            :description="getServiceDescription(serviceItem)"
                            :highlights="getServiceHighlights(serviceItem)"
                            :link="getServiceUrl(serviceItem)"
                            :image="serviceItem.image_link"
                            :is-rtl="locale === 'ar'"
                            :reading-time="serviceItem.reading_time"
                            :reading-time-label="trans('min read')"
                            :category="getCategoryName(serviceItem.category)"
                            :featured="Boolean(serviceItem.featured)"
                            :icon-class="serviceIcons[index % serviceIcons.length]"
                        />
                    </div>

                    <div v-if="!services.data.length" class="col-12">
                        <div class="services-page__empty">
                            <div class="services-page__empty-icon" aria-hidden="true">
                                <i class="ion-ios-lightbulb-outline"></i>
                            </div>
                            <h3>{{ trans('No services found') }}</h3>
                            <p>{{ trans('No services match your filters. Try another category or search term.') }}</p>
                            <Link v-if="hasActiveFilters" class="btn btn-dark" :href="route('services.index')">
                                {{ trans('View All Services') }}
                            </Link>
                        </div>
                    </div>
                </div>

                <div v-if="services.last_page > 1" class="blog-page__pagination services-pagination">
                    <ul class="pg-pagination list-unstyled">
                        <li v-if="services.prev_page_url" class="prev">
                            <Link :href="services.prev_page_url" :aria-label="trans('Previous')">
                                <span class="icon-left-arrow-1"></span>
                            </Link>
                        </li>
                        <template v-for="(link, linkIndex) in services.links" :key="linkIndex">
                            <li
                                v-if="link.url && linkIndex > 0 && linkIndex < services.links.length - 1"
                                :class="['count', link.active ? 'active' : '']"
                            >
                                <Link :href="link.url">{{ link.label }}</Link>
                            </li>
                        </template>
                        <li v-if="services.next_page_url" class="next">
                            <Link :href="services.next_page_url" :aria-label="trans('Next')">
                                <span :class="`icon-${locale === 'ar' ? 'left' : 'right'}-arrow-1`"></span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </section>

        <CtaTwo />
    </app-layout>
</template>

<script setup>
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { Head, Link, router, usePage } from '@inertiajs/vue3'
import AppLayout from '@/Layouts/App.vue'
import ServiceCardThree from '@/Components/Services/ServiceCardThree.vue'
import CtaTwo from '@/Components/CtaTwo.vue'
import PageHeader from '@/Components/PageHeader.vue'

const page = usePage()
const trans = (key) => page.props.translations[key] || key
const seo = computed(() => page.props.seo)
const settings = computed(() => page.props.settings || {})
const asset_path = computed(() => page.props.asset_path || '')
const locale = computed(() => page.props.locale || 'en')
const categories = computed(() => page.props.categories || [])
const filters = computed(() => page.props.filters || {})
const meta = computed(() => page.props.meta || {})
const totalServicesCount = computed(() => page.props.totalServicesCount || 0)
const featuredCount = computed(() => page.props.featuredCount || 0)
const searchQuery = ref(filters.value.search || '')
const serviceIcons = [
    'ion-ios-pie-outline',
    'ion-ios-game-controller-b-outline',
    'ion-ios-analytics-outline',
    'ion-ios-clock-outline',
]

const metaTitle = computed(() => {
    return `${trans('Our Services')} | ${seo.value.website_name || ''}`.trim()
})
const metaDescription = computed(() => {
    return meta.value.description
        || trans('Discover our IT services designed to scale and modernize your business.')
        || seo.value.website_desc
        || ''
})
const metaKeywords = computed(() => {
    return meta.value.keywords
        || trans('IT services, web development, mobile apps, AI solutions, cloud services')
        || seo.value.website_keywords
        || ''
})
const metaImage = computed(() => {
    return meta.value?.og?.image || meta.value?.twitter?.image || settings.value?.meta_img || ''
})
const metaCanonical = computed(() => meta.value.canonical || '')
const metaRobots = computed(() => meta.value.robots || 'index, follow')

const services = computed(() => {
    const source = page.props.services || { data: [], links: [], last_page: 1, total: 0 }
    const data = Array.isArray(source.data)
        ? source.data.filter((service) => service && service.id)
        : []
    return {
        ...source,
        data,
    }
})

const hasActiveFilters = computed(() => Boolean(filters.value.search || filters.value.category))

watch(() => filters.value.search, (value) => {
    searchQuery.value = value || ''
})

const translateField = (value) => {
    if (!value) return ''
    if (typeof value === 'string') return value
    if (typeof value === 'object' && value !== null) {
        return value[locale.value] || value['en'] || value[Object.keys(value)[0]] || ''
    }
    return ''
}

const filterParams = (overrides = {}) => {
    const params = {}
    const search = overrides.search !== undefined ? overrides.search : filters.value.search
    const category = overrides.category !== undefined ? overrides.category : filters.value.category
    if (search) params.search = search
    if (category) params.category = category
    return params
}

const categoryUrl = (slug) => route('services.index', filterParams({ category: slug || null }))

const submitSearch = () => {
    router.get(route('services.index'), filterParams({ search: searchQuery.value.trim() || null }), {
        preserveState: true,
        preserveScroll: true,
        replace: true,
    })
}

const getServiceUrl = (service) => {
    if (!service || !service.slug) {
        return '#'
    }
    try {
        return route('services.show', service.slug)
    } catch (e) {
        return '#'
    }
}

const getServiceTitle = (service) => translateField(service?.title)
const getServiceDescription = (service) => translateField(service?.description)
const getCategoryName = (category) => translateField(category?.title)

const normalizeKeywords = (rawKeywords) => {
    if (!rawKeywords) {
        return []
    }

    let parsed = rawKeywords
    if (typeof rawKeywords === 'string') {
        try {
            parsed = JSON.parse(rawKeywords)
        } catch (e) {
            parsed = rawKeywords
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
            .map((item) => item?.toString().trim())
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

const getServiceHighlights = (service) => normalizeKeywords(service?.keywords)

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
#services h2 {
    font-size: 32px;
    margin-bottom: 12px;
    line-height: 1.3;
}
.services-page__subtitle {
    max-width: 640px;
    margin: 0 auto 36px;
    font-size: 16px;
    line-height: 1.8;
    color: #555;
}
.services-page__stats {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 16px;
    margin-bottom: 36px;
}
.services-page__stat {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    min-width: 140px;
    padding: 16px 28px;
    border: 1px solid #eee;
    background: #fff;
}
.services-page__stat-value {
    font-size: 28px;
    font-weight: 700;
    color: #111;
    line-height: 1;
}
.services-page__stat-label {
    font-size: 14px;
    font-weight: 500;
    color: #555;
}
.services-page__search {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
    max-width: 720px;
    margin: 0 auto 28px;
}
.services-page__search .form-control {
    flex: 1 1 240px;
    height: 46px;
    border-radius: 0;
}
.services-page__search .btn {
    margin: 0;
}
.services-page__filters {
    text-align: center;
    margin: 0 0 28px;
}
.services-page__filters .services-page__filter.is-current,
.services-page__filters .services-page__filter:hover {
    color: #fff;
    background: #999;
    border-radius: 20px;
}
.services-page__results {
    text-align: center;
    margin: 0 0 24px;
    color: #777;
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
.services-pagination {
    margin-top: 20px;
}
.services-page__empty {
    text-align: center;
    padding: 64px 24px;
}
.services-page__empty-icon {
    font-size: 48px;
    color: #999;
    margin-bottom: 12px;
}
.services-page__empty h3 {
    margin: 0 0 10px;
    font-size: 22px;
    color: #111;
}
.services-page__empty p {
    margin: 0 0 20px;
    font-size: 16px;
    color: #555;
}

@media (max-width: 767px) {
    #services h2 {
        font-size: 26px;
    }
    .services-page__search .btn {
        width: 100%;
    }
}
</style>
