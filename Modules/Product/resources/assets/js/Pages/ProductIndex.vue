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
            :title="trans('Products')"
            :subtitle="trans('Our Catalog')"
            :background="asset_path + 'theme/img/main/18.jpg'"
        />

        <section class="section-small" id="shop">
            <div class="container text-center">
                <h2>{{ trans('B2B Solutions Built for Scale') }}</h2>
                <p class="products-page__subtitle">
                    {{ trans('Discover enterprise-ready platforms and services designed to grow with your business.') }}
                </p>

                <div v-if="products.data.length" class="products-page__stats">
                    <div class="products-page__stat">
                        <span class="products-page__stat-value">{{ products.total }}</span>
                        <span class="products-page__stat-label">{{ trans('Solutions Available') }}</span>
                    </div>
                    <div v-if="featuredCount" class="products-page__stat">
                        <span class="products-page__stat-value">{{ featuredCount }}</span>
                        <span class="products-page__stat-label">{{ trans('Featured') }}</span>
                    </div>
                </div>

                <div class="row">
                    <div
                        v-for="(product, index) in products.data"
                        :key="product.id"
                        class="col-xl-4 col-lg-6 col-md-6 wow fadeInUp"
                        :data-wow-delay="`${(index % 3 + 1) * 100}ms`"
                    >
                        <ProductCard :item="product" :locale="locale" />
                    </div>

                    <div v-if="!products.data.length" class="col-12">
                        <div class="products-page__empty">
                            <div class="products-page__empty-icon" aria-hidden="true">
                                <i class="fas fa-box-open"></i>
                            </div>
                            <h3>{{ trans('No records found') }}</h3>
                            <p>{{ trans('Check back soon — we are adding new solutions to our catalog.') }}</p>
                        </div>
                    </div>

                    <div v-if="products.last_page > 1" class="blog-page__pagination products-page__pagination">
                        <ul class="pg-pagination list-unstyled">
                            <li v-if="products.prev_page_url" class="prev">
                                <Link :href="products.prev_page_url" aria-label="Previous">
                                    <span class="icon-left-arrow-1"></span>
                                </Link>
                            </li>
                            <template v-for="(link, linkIndex) in products.links" :key="linkIndex">
                                <li v-if="link.url && linkIndex > 0 && linkIndex < products.links.length - 1"
                                    :class="['count', link.active ? 'active' : '']">
                                    <Link :href="link.url">{{ link.label }}</Link>
                                </li>
                            </template>
                            <li v-if="products.next_page_url" class="next">
                                <Link :href="products.next_page_url" aria-label="Next">
                                    <span :class="`icon-${locale === 'ar' ? 'left' : 'right'}-arrow-1`"></span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>

        <CtaTwo />
    </app-layout>
</template>

<script setup>
import { computed, onMounted, nextTick } from 'vue'
import { Head, Link, usePage } from '@inertiajs/vue3'
import AppLayout from '@/Layouts/App.vue'
import CtaTwo from '@/Components/CtaTwo.vue'
import ProductCard from '@/Components/ProductCard.vue'
import PageHeader from '@/Components/PageHeader.vue'

const page = usePage()
const trans = (key) => page.props.translations[key] || key
const seo = computed(() => page.props.seo)
const settings = computed(() => page.props.settings || {})
const asset_path = computed(() => page.props.asset_path || '')
const locale = computed(() => page.props.locale || 'en')
const products = computed(() => page.props.products || { data: [] })
const meta = computed(() => page.props.meta || {})

const featuredCount = computed(() => products.value.data?.filter((p) => p.is_featured).length || 0)

const metaTitle = computed(() => meta.value.title || `${trans('Products')} | ${seo.value.website_name || ''}`.trim())
const metaDescription = computed(() => meta.value.description || trans('Browse our B2B product catalog.') || seo.value.website_desc || '')
const metaKeywords = computed(() => meta.value.keywords || trans('products, B2B catalog, SaaS') || seo.value.website_keywords || '')
const metaImage = computed(() => meta.value?.og?.image || meta.value?.twitter?.image || settings.value?.meta_img || '')
const metaCanonical = computed(() => meta.value.canonical || '')
const metaRobots = computed(() => meta.value.robots || 'index, follow')

onMounted(() => {
    nextTick(() => {
        if (typeof WOW !== 'undefined') {
            new WOW().init()
        }
    })
})
</script>

<script>
import AppLayout from '@/Layouts/App.vue'
import CtaTwo from '@/Components/CtaTwo.vue'
import ProductCard from '@/Components/ProductCard.vue'

export default {
    components: {
        AppLayout,
        CtaTwo,
        ProductCard,
    },
}
</script>

<style scoped>
#shop h2 {
    font-size: 32px;
    margin-bottom: 12px;
}
.products-page__subtitle {
    max-width: 640px;
    margin: 0 auto 36px;
    font-size: 16px;
    line-height: 1.8;
    color: #555;
}
.products-page__stats {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 16px;
    margin-bottom: 48px;
}
.products-page__stat {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    min-width: 140px;
    padding: 16px 28px;
    border: 1px solid #eee;
}
.products-page__stat-value {
    font-size: 28px;
    font-weight: 700;
    color: #111;
    line-height: 1;
}
.products-page__stat-label {
    font-size: 14px;
    font-weight: 500;
    color: #555;
}
.products-page__empty {
    text-align: center;
    padding: 64px 24px;
}
.products-page__empty h3 {
    margin: 0 0 10px;
    font-size: 22px;
    color: #111;
}
.products-page__empty p {
    margin: 0;
    font-size: 16px;
    color: #555;
}
</style>

