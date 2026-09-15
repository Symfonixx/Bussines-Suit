<template>
    <Head>
        <title>{{ metaTitle }}</title>
        <meta name="description" :content="metaDescription">
        <meta name="keywords" :content="metaKeywords">
        <meta name="robots" :content="metaRobots">
        <meta property="og:title" :content="metaTitle">
        <meta property="og:description" :content="metaDescription">
        <meta v-if="metaImage" property="og:image" :content="metaImage">
        <meta property="og:type" content="product">
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:title" :content="metaTitle">
        <meta name="twitter:description" :content="metaDescription">
        <meta v-if="metaImage" name="twitter:image" :content="metaImage">
    </Head>

    <app-layout>
        <PageHeader
            :title="product.name"
            :subtitle="trans('Products')"
            :background="product.main_image_link || (asset_path + 'theme/img/main/30.jpg')"
        />

        <section class="section-small" id="shop">
            <div class="container">
                <div class="row">
                    <div class="col-lg-6">
                        <img
                            class="img-responsive"
                            :src="product.main_image_link"
                            :alt="product.name"
                            loading="lazy"
                            decoding="async"
                        >
                    </div>
                    <div class="col-lg-6">
                        <p v-if="product.category" class="small">{{ product.category.name }}</p>
                        <h2>{{ product.name }}</h2>
                        <p v-if="formattedPrice" class="lead">
                            {{ formattedPrice }}
                            <small v-if="billingLabel">{{ billingLabel }}</small>
                        </p>
                        <p v-if="product.short_description">{{ product.short_description }}</p>
                        <div v-if="product.description" class="product-copy" v-html="product.description"></div>
                        <p>
                            <button type="button" class="btn btn-dark btn-lg" @click="openDemoModal">
                                {{ trans('Request Live Demo') }}
                            </button>
                            <Link class="btn btn-gray btn-lg" :href="route('contact-us')">
                                {{ trans('Get in Touch') }}
                            </Link>
                        </p>
                        <p>
                            <a :href="getShareUrl('facebook')" target="_blank" rel="noopener" aria-label="Facebook">
                                <i class="fab fa-facebook-f fa-fw fa-lg"></i>
                            </a>
                            <a :href="getShareUrl('twitter')" target="_blank" rel="noopener" aria-label="Twitter">
                                <i class="fab fa-twitter fa-fw fa-lg"></i>
                            </a>
                            <a :href="getShareUrl('linkedin')" target="_blank" rel="noopener" aria-label="LinkedIn">
                                <i class="fab fa-linkedin-in fa-fw fa-lg"></i>
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <section v-if="relatedProducts.length" class="section-small bg-white">
            <div class="container">
                <h3>{{ trans('Explore More Solutions') }}</h3>
                <div class="row grid-pad">
                    <div
                        v-for="item in relatedProducts"
                        :key="item.id"
                        class="col-sm-6 col-md-3"
                    >
                        <ProductCard :item="item" />
                    </div>
                </div>
            </div>
        </section>

        <ContactRequestModal
            ref="contactModal"
            modal-id="productDemoModal"
            :title="trans('Request Live Demo')"
            :description="demoModalDescription"
            :default-subject="demoSubject"
            :default-message="demoMessage"
            :submit-label="trans('Send Request')"
        />

        <CtaTwo />
    </app-layout>
</template>

<script setup>
import { computed, ref } from 'vue'
import { Head, Link, usePage } from '@inertiajs/vue3'
import AppLayout from '@/Layouts/App.vue'
import CtaTwo from '@/Components/CtaTwo.vue'
import ContactRequestModal from '@/Components/ContactRequestModal.vue'
import PageHeader from '@/Components/PageHeader.vue'
import ProductCard from '@/Components/ProductCard.vue'

const page = usePage()
const trans = (key) => page.props.translations[key] || key
const asset_path = computed(() => page.props.asset_path || '')
const product = computed(() => page.props.product || {})
const relatedProducts = computed(() => page.props.relatedProducts || [])
const meta = computed(() => page.props.meta || {})

const contactModal = ref(null)

const metaTitle = computed(() => meta.value.title || product.value.seo_title || product.value.name || '')
const metaDescription = computed(() => meta.value.description || product.value.seo_description || product.value.short_description || '')
const metaKeywords = computed(() => meta.value.keywords || '')
const metaImage = computed(() => meta.value?.og?.image || product.value.main_image_link || '')
const metaRobots = computed(() => meta.value.robots || 'index, follow')

const formattedPrice = computed(() => {
    const raw = product.value.price
    if (raw === null || raw === undefined || raw === '') {
        return ''
    }

    const amount = Number(raw).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })

    return `${amount} ${product.value.currency || 'USD'}`
})

const billingLabel = computed(() => {
    const type = product.value.billing_type
    if (!type || type === 'one_time') {
        return ''
    }

    const labels = {
        monthly: trans('/mo'),
        quarterly: trans('/quarter'),
        yearly: trans('/yr'),
    }

    return labels[type] || ''
})

const demoSubject = computed(() => `${trans('Live Demo Request')}: ${product.value.name || ''}`.trim())
const demoMessage = computed(() => {
    const intro = trans('I would like to request a live demo for this product.')
    const name = product.value.name ? `${trans('Product')}: ${product.value.name}` : ''

    return [intro, name].filter(Boolean).join('\n\n')
})
const demoModalDescription = computed(() => trans('Fill out the form below and our team will schedule your live demo.'))

const openDemoModal = () => {
    contactModal.value?.show()
}

const getShareUrl = (platform) => {
    if (typeof window === 'undefined') {
        return '#'
    }

    const url = encodeURIComponent(window.location.href)
    const title = encodeURIComponent(product.value.name || '')

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
</script>

<style scoped>
#shop h2 {
    font-size: 32px;
    line-height: 1.3;
    margin-top: 0;
}
#shop .lead {
    font-size: 22px;
    font-weight: 700;
}
#shop p,
#shop .product-copy {
    font-size: 18px;
    line-height: 1.8;
}
#shop .product-copy :deep(p),
#shop .product-copy :deep(li) {
    font-size: 18px;
    line-height: 1.8;
}
#shop .product-copy :deep(img) {
    max-width: 100%;
    height: auto;
}
#shop .btn {
    margin: 0 8px 12px 0;
    font-size: 16px !important;
}
html[dir="rtl"] #shop .btn {
    margin: 0 0 12px 8px;
}
</style>
