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
        <section class="bg-gray" id="about">
            <div class="container offcet-art-main">
                <div class="row">
                    <div class="col-lg-10 col-lg-offset-2 text-center">
                        <img
                            class="center-block img-responsive"
                            :src="heroImage"
                            :alt="brandName"
                        >
                        <div class="offcet-art offcet-art-dark">
                            <h1 :class="{ rotate: !isRtl }">{{ heroHeadline }}</h1>
                            <p>
                                {{ trans('Help companies build practical technology solutions in Web, AI, automation, and cloud computing — designed for growth and sustainability') }}
                            </p>
                            <p class="no-pad text-right">
                                <span class="classic">{{ brandName }}</span>
                                <small>— {{ trans('IT Solutions Designed for Your Success') }}</small>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section v-if="flatServices.length" class="section-small text-center" id="services">
            <div class="container">
                <div class="row">
                    <h2>{{ trans('Our Services') }}</h2>
                    <div
                        v-for="(service, index) in flatServices.slice(0, 4)"
                        :key="service.id"
                        class="col-lg-3 col-sm-6 wow fadeIn"
                        :data-wow-delay="`${(index + 1) * 0.2}s`"
                    >
                        <h4>
                            <i :class="[serviceIcons[index % serviceIcons.length], 'icon-big']"></i>
                            {{ localize(service.title) }}
                        </h4>
                        <p>{{ excerpt(localize(service.short_desc || service.description), 120) }}</p>
                        <Link class="btn btn-dark btn-xs" :href="serviceUrl(service)">{{ trans('Read More') }}</Link>
                    </div>
                </div>
            </div>
        </section>

        <section v-if="carouselItems.length" class="no-pad" id="action-slider">
            <div class="carousel slide" id="carousel-light">
                <div class="carousel-inner" role="listbox">
                    <div
                        v-for="(item, index) in carouselItems"
                        :key="item.id"
                        class="item"
                        :class="{ active: index === 0 }"
                    >
                        <div class="container-fluid bg-gray no-pad">
                            <div class="row">
                                <div class="col-lg-6 carousel-item">
                                    <img
                                        class="img-responsive center-block"
                                        :src="item.image"
                                        :alt="item.title"
                                        @error="onMediaError($event, item.fallback)"
                                    >
                                </div>
                                <div class="col-lg-3 col-lg-offset-1 carousel-item-text">
                                    <h2>{{ item.title }}</h2>
                                    <p>{{ item.text }}</p>
                                    <Link class="btn btn-lg btn-dark" :href="item.url">{{ trans('Get it Now!') }}</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <a class="left carousel-control" href="#carousel-light" data-slide="prev">
                    <span class="icon-prev"></span>
                </a>
                <a class="right carousel-control" href="#carousel-light" data-slide="next">
                    <span class="icon-next"></span>
                </a>
            </div>
        </section>

        <section v-if="clients.length" class="section-small" id="partners">
            <div class="container text-center">
                <div class="row wow fadeInUp" data-wow-duration="2s" data-wow-delay=".2s">
                    <div v-for="client in clients.slice(0, 6)" :key="client.id" class="col-md-2">
                        <a v-if="client.url" :href="client.url" target="_blank" rel="noopener noreferrer">
                            <img class="center-block img-responsive" :src="client.logo_link" :alt="client.name">
                        </a>
                        <img v-else class="center-block img-responsive" :src="client.logo_link" :alt="client.name">
                    </div>
                </div>
            </div>
        </section>

        <section v-if="featuredWorks.length" class="section-small" id="gallery">
            <div class="container text-center">
                <h2>{{ trans('Our Works') }}</h2>
                <div class="row">
                    <div class="col-sm-6 no-pad">
                        <div class="portfolio-item gallery-feature">
                            <Link :href="route('use-cases.show', featuredWorks[0].slug)">
                                <img
                                    :src="featuredWorks[0].image"
                                    :alt="featuredWorks[0].title"
                                    @error="onMediaError($event, featuredWorks[0].fallback)"
                                >
                                <div class="portfolio-overlay">
                                    <div class="caption">
                                        <h3>{{ featuredWorks[0].title }}</h3>
                                        <span>{{ featuredWorks[0].summary }}</span>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div v-if="featuredWorks.length > 1" class="col-sm-6 no-pad">
                        <div
                            v-for="work in featuredWorks.slice(1)"
                            :key="work.id"
                            class="portfolio-item"
                        >
                            <Link :href="route('use-cases.show', work.slug)">
                                <img
                                    :src="work.image"
                                    :alt="work.title"
                                    @error="onMediaError($event, work.fallback)"
                                >
                                <div class="portfolio-overlay">
                                    <div class="caption">
                                        <h3>{{ work.title }}</h3>
                                        <span>{{ work.summary }}</span>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
                <p class="text-center">
                    <Link class="btn btn-dark" :href="route('use-cases.index')">{{ trans('Case Studies') }}</Link>
                </p>
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
                            :src="featuredTestimonial.image_link || (asset_path + 'theme/img/testimonials/1.jpg')"
                            :alt="featuredTestimonial.name"
                        >
                    </div>
                    <div class="col-md-6">
                        <h2 class="dark-gray">{{ featuredTestimonial.content || featuredTestimonial.comment }}</h2>
                        <div class="classic">{{ featuredTestimonial.name }}</div>
                        <small v-if="featuredTestimonial.company">— {{ featuredTestimonial.company }}</small>
                    </div>
                </div>
            </div>
        </section>

        <section class="section-small" id="why">
            <div class="container offcet-art-main">
                <div class="row">
                    <div class="col-lg-10 col-lg-offset-2 text-center">
                        <img
                            class="img-responsive center-block"
                            :src="whyImage"
                            :alt="trans('About Us')"
                        >
                        <div class="offcet-art">
                            <h3>{{ trans('Why Choose Symfonix for Web, AI, and Cloud') }}</h3>
                            <p>
                                {{ trans("Transform your business with our innovative IT solutions, tailored to address your unique challenges and drive growth in today's digital landscape.") }}
                            </p>
                            <Link class="btn btn-sm btn-gray" :href="route('about-us')">{{ trans('LEARN MORE') }}</Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section v-if="posts.length" class="section-small bg-gray" id="news">
            <div class="container">
                <h3 class="pull-left">{{ trans('News') }}</h3>
                <div class="pull-right">
                    <h4>{{ trans('OUR LATEST NEWS') }}</h4>
                </div>
                <div class="clearfix"></div>
                <div class="row grid-pad">
                    <div v-for="(post, index) in posts.slice(0, 3)" :key="post.id" class="col-sm-6 col-md-4">
                        <HomeBlogCard :post="post" :locale="locale" :asset-path="asset_path" :image-fallback-index="index + 1" prefer-theme />
                    </div>
                </div>
            </div>
        </section>

        <section class="section-small" id="contact-home">
            <div class="container">
                <div class="row">
                    <div class="col-md-4">
                        <h3 v-if="settings.phone">
                            <i class="fa fa-phone"></i>
                            <a dir="ltr" :href="`tel:${settings.phone}`">{{ settings.phone }}</a>
                        </h3>
                        <form @submit.prevent="handleContactSubmit" novalidate>
                            <div class="control-group">
                                <div class="form-group floating-label-form-group controls">
                                    <label class="sr-only" for="home-name">{{ trans('Name') }}</label>
                                    <input
                                        id="home-name"
                                        class="form-control"
                                        type="text"
                                        v-model="contactForm.name"
                                        :placeholder="trans('Name')"
                                        required
                                    >
                                    <span v-if="contactForm.errors.name" class="help-block text-danger">{{ contactForm.errors.name }}</span>
                                </div>
                            </div>
                            <div class="control-group">
                                <div class="form-group floating-label-form-group controls">
                                    <label class="sr-only" for="home-email">{{ trans('Email') }}</label>
                                    <input
                                        id="home-email"
                                        class="form-control"
                                        type="email"
                                        v-model="contactForm.email"
                                        :placeholder="trans('Email')"
                                        required
                                    >
                                    <span v-if="contactForm.errors.email" class="help-block text-danger">{{ contactForm.errors.email }}</span>
                                </div>
                            </div>
                            <div class="control-group">
                                <div class="form-group floating-label-form-group controls">
                                    <label class="sr-only" for="home-mobile">{{ trans('Phone') }}</label>
                                    <input
                                        id="home-mobile"
                                        class="form-control"
                                        type="text"
                                        v-model="contactForm.mobile"
                                        :placeholder="trans('Phone')"
                                        required
                                    >
                                    <span v-if="contactForm.errors.mobile" class="help-block text-danger">{{ contactForm.errors.mobile }}</span>
                                </div>
                            </div>
                            <div class="control-group">
                                <div class="form-group floating-label-form-group controls">
                                    <label class="sr-only" for="home-subject">{{ trans('Subject') }}</label>
                                    <input
                                        id="home-subject"
                                        class="form-control"
                                        type="text"
                                        v-model="contactForm.subject"
                                        :placeholder="trans('Subject')"
                                        required
                                    >
                                    <span v-if="contactForm.errors.subject" class="help-block text-danger">{{ contactForm.errors.subject }}</span>
                                </div>
                            </div>
                            <div class="control-group">
                                <div class="form-group floating-label-form-group controls">
                                    <label class="sr-only" for="home-message">{{ trans('Message') }}</label>
                                    <textarea
                                        id="home-message"
                                        class="form-control"
                                        rows="2"
                                        v-model="contactForm.message"
                                        :placeholder="trans('Message')"
                                        required
                                    ></textarea>
                                    <span v-if="contactForm.errors.message" class="help-block text-danger">{{ contactForm.errors.message }}</span>
                                </div>
                            </div>
                            <button class="btn btn-dark" type="submit" :disabled="contactForm.processing">
                                {{ contactForm.processing ? trans('Sending...') : trans('Send') }}
                            </button>
                            <div v-if="contactSubmitSuccess" class="alert alert-success">
                                {{ trans('Thank you for contacting us! We will get back to you soon.') }}
                            </div>
                        </form>
                    </div>
                    <div class="col-md-6 col-md-offset-2">
                        <h2>{{ trans('Get in Touch With Our Team') }}</h2>
                        <p>{{ trans('Have a project in mind? Reach out and our experts will help you turn your ideas into reality.') }}</p>
                        <p v-if="settings.email">
                            <a :href="`mailto:${settings.email}`">{{ settings.email }}</a>
                        </p>
                        <p v-if="settings.address">{{ settings.address }}</p>
                    </div>
                </div>
            </div>
        </section>

        <CtaTwo />
    </app-layout>
</template>

<script setup>
import { computed, ref } from 'vue'
import { Head, Link, useForm, usePage } from '@inertiajs/vue3'
import AppLayout from '@/Layouts/App.vue'
import HomeBlogCard from '@/Components/HomeBlogCard.vue'
import CtaTwo from '@/Components/CtaTwo.vue'

const page = usePage()
const trans = (key) => page.props.translations[key] || key
const seo = computed(() => page.props.seo || {})
const settings = computed(() => page.props.settings || {})
const asset_path = computed(() => page.props.asset_path || '')
const locale = computed(() => page.props.locale)
const isRtl = computed(() => locale.value === 'ar')
const posts = computed(() => page.props.posts || [])
const servicesCategories = computed(() => page.props.servicesCategories || [])
const testimonials = computed(() => page.props.testimonials || [])
const useCases = computed(() => page.props.useCases || [])
const products = computed(() => page.props.products || [])
const clients = computed(() => page.props.clients || [])
const meta = computed(() => page.props.meta || {})
const brandName = computed(() => seo.value.website_name || page.props.appName || 'Symfonix')
const serviceIcons = ['ion-ios-pie-outline', 'ion-ios-game-controller-b-outline', 'ion-ios-analytics-outline', 'ion-ios-clock-outline']
const themeAsset = (path) => `${asset_path.value}theme/img/${path}`
const heroImage = computed(() => themeAsset('main/0.jpg'))
const whyImage = computed(() => themeAsset('main/6.jpg'))
const heroHeadline = computed(() => {
    if (isRtl.value) {
        return `${trans('We are')} ${brandName.value}`
    }
    return `${trans('We are')} ${brandName.value}, ${trans('We are creative')}, ${trans('We have a dream')}, ${trans('We love to design')}, ${trans('We love to code')}`
})

const metaTitle = computed(() => meta.value.title || `${trans('Home')} | ${seo.value.website_name || ''}`.trim())
const metaDescription = computed(() => meta.value.description || trans('Empowering businesses with modern web, mobile, AI, and cloud solutions.') || seo.value.website_desc || '')
const metaKeywords = computed(() => meta.value.keywords || trans('IT solutions, web development, mobile apps, AI automation, cloud services') || seo.value.website_keywords || '')
const metaImage = computed(() => meta.value?.og?.image || meta.value?.twitter?.image || settings.value?.meta_img || '')
const metaCanonical = computed(() => meta.value.canonical || '')
const metaRobots = computed(() => meta.value.robots || 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1')

const translateField = (value) => {
    if (!value) return ''
    if (typeof value === 'string') return value
    if (typeof value === 'object' && value !== null) {
        return value[locale.value] || value.en || ''
    }
    return ''
}

const localize = (value) => {
    const text = translateField(value)
    if (!text) return ''
    return trans(text)
}

const excerpt = (value, length = 140) => {
    const text = String(value || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
    if (text.length <= length) return text
    return `${text.slice(0, length).trim()}…`
}

const isBlankMedia = (src) => !src || String(src).includes('blank.png')

const mediaSrc = (src, fallback) => (isBlankMedia(src) ? fallback : src)

const onMediaError = (event, fallback) => {
    if (event?.target && fallback && event.target.src !== fallback) {
        event.target.src = fallback
    }
}

const flatServices = computed(() => {
    const list = []
    for (const category of servicesCategories.value) {
        if (Array.isArray(category.services)) {
            list.push(...category.services)
        }
    }
    return list
})

const serviceUrl = (service) => {
    try {
        return route('services.show', service.slug)
    } catch (e) {
        return '#'
    }
}

const carouselFallbacks = ['main/40.jpg', 'main/41.jpg', 'main/42.jpg']

const carouselItems = computed(() => {
    const source = products.value.length
        ? products.value.slice(0, 3).map((product, index) => ({
            id: `p-${product.id}`,
            title: localize(product.name),
            text: excerpt(localize(product.short_description), 180),
            fallback: themeAsset(carouselFallbacks[index] || carouselFallbacks[0]),
            image: themeAsset(carouselFallbacks[index] || carouselFallbacks[0]),
            url: route('product.show', product.slug),
        }))
        : useCases.value.slice(0, 3).map((useCase, index) => ({
            id: `u-${useCase.id}`,
            title: localize(useCase.title),
            text: excerpt(localize(useCase.summary), 180),
            fallback: themeAsset(carouselFallbacks[index] || carouselFallbacks[0]),
            image: themeAsset(carouselFallbacks[index] || carouselFallbacks[0]),
            url: route('use-cases.show', useCase.slug),
        }))
    return source
})

const workFallbacks = ['main/15.jpg', 'main/5.jpg', 'main/16.jpg']

const featuredWorks = computed(() => useCases.value.slice(0, 3).map((useCase, index) => {
    const fallback = themeAsset(workFallbacks[index] || workFallbacks[0])
    return {
        ...useCase,
        title: localize(useCase.title),
        summary: excerpt(localize(useCase.summary), 90),
        fallback,
        image: fallback,
    }
}))

const featuredTestimonial = computed(() => {
    const item = testimonials.value[0]
    if (!item) return null
    return {
        ...item,
        name: translateField(item.name) || item.client_name || item.author,
        content: translateField(item.content || item.comment || item.message),
        company: translateField(item.company || item.position),
        image_link: item.image_link || item.avatar || item.photo,
    }
})

const contactSubmitSuccess = ref(false)
const contactForm = useForm({
    name: '',
    email: '',
    mobile: '',
    subject: '',
    message: '',
})

const handleContactSubmit = () => {
    if (contactForm.processing) return false
    contactForm.post(route('contact-us.store'), {
        preserveScroll: true,
        preserveState: true,
        onBefore: () => { contactSubmitSuccess.value = false },
        onSuccess: () => {
            contactSubmitSuccess.value = true
            contactForm.reset()
            contactForm.clearErrors()
            setTimeout(() => { contactSubmitSuccess.value = false }, 5000)
        },
    })
    return false
}
</script>
