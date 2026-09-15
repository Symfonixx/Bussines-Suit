<template>
    <Head>
        <title>{{metaTitle}}</title>
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
        <!--Main Slider Two Start-->
        <section class="main-slider-two">
            <div class="swiper-slide swiper-slide-active main-slider-two__static">
                <div class="main-slider-two__bg"
                     :style="{ backgroundImage: `url(${asset_path}images/home/banner-bg.webp)` }"></div>
                <ul class="list-unstyled main-slider-two__menu">
                    <li><Link :href="route('about-us')">{{ trans('About') }}</Link></li>
                    <li><Link :href="route('contact-us')">{{ trans('Support') }}</Link></li>
                    <li><Link :href="route('faq')">{{ trans('FAQs') }}</Link></li>
                </ul>
                <div class="main-slider-two__social-box" v-if="settings.facebook || settings.linkedin || settings.twitter">
                    <h4 class="main-slider-two__social-title">{{ trans('Follow Us') }}:</h4>
                    <div class="main-slider-two__social-box-inner">
                        <a v-if="settings.facebook" :href="settings.facebook" target="_blank" rel="noopener noreferrer" :aria-label="trans('Facebook')"><span class="icon-facebook"></span></a>
                        <a v-if="settings.linkedin" :href="settings.linkedin" target="_blank" rel="noopener noreferrer" :aria-label="trans('LinkedIn')"><span class="icon-linkedin"></span></a>
                        <a v-if="settings.twitter" :href="settings.twitter" target="_blank" rel="noopener noreferrer" :aria-label="trans('Twitter')"><span class="icon-twitter"></span></a>
                    </div>
                </div>

                <div class="brand-two" v-if="clients && clients.length">
                    <div class="brand-two__wrapper">
                        <div class="brand-two__inner">
                            <div class="brand-two__left">
                                <div class="main-slider__trustpilot-box">
                                    <div class="main-slider__trustpilot-content-box">
                                        <div class="main-slider__trustpilot-rating-review">
                                            <p class="main-slider__trustpilot-rating">{{ trans('Trusted by businesses') }}</p>
                                            <p class="main-slider__trustpilot-review">{{ clients.length }}+ {{ trans('Clients') }}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="brand-two__right">
                                <div class="brand-two__carousel owl-theme owl-carousel">
                                    <div class="item" v-for="client in clients" :key="client.id">
                                        <div class="brand-two__single">
                                            <div class="brand-two__img">
                                                <a v-if="client.url" :href="client.url" target="_blank" rel="noopener noreferrer">
                                                    <img :src="client.logo_link" :alt="client.name" width="140" height="60" loading="lazy" decoding="async">
                                                </a>
                                                <img v-else :src="client.logo_link" :alt="client.name" width="140" height="60" loading="lazy" decoding="async">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="main-slider-two__shape-1"></div>
                <div class="main-slider-two__shape-2 float-bob-x">
                    <img :src="asset_path + 'images/shapes/main-slider-two-shape-2.png'" alt="" width="120" height="120" aria-hidden="true">
                </div>
                <div class="main-slider-two__shape-3 float-bob-y">
                    <img :src="asset_path + 'images/shapes/main-slider-two-shape-3.png'" alt="" width="120" height="120" aria-hidden="true">
                </div>
                <div class="container">
                    <div class="row">
                        <div class="col-xl-12">
                            <div class="main-slider-two__content">
                                <div class="main-slider-two__sub-title-box">
                                    <p class="main-slider-two__sub-title">{{ trans('IT Solutions Designed for Your Success') }}</p>
                                </div>
                                <h1 class="main-slider-two__title">
                                    {{ trans('Transform complex technical ideas into intelligent systems') }}
                                </h1>
                                <p class="main-slider-two__text">
                                    {{ trans('Help companies build practical technology solutions in Web, AI, automation, and cloud computing — designed for growth and sustainability') }}
                                </p>
                                <div class="main-slider-two__btns-box">
                                    <div class="main-slider-two__btn-box-1">
                                        <Link :href="route('contact-us')" class="thm-btn">
                                            {{ trans('Book your free consultation') }}
                                            <span :class="`icon-${locale === 'ar' ? 'left' : 'right'}-arrow`"></span>
                                        </Link>
                                    </div>
                                    <div class="main-slider-two__btn-box-2">
                                        <Link :href="route('services.index')" class="thm-btn">
                                            {{ trans('Explore Our Services') }}
                                            <span :class="`icon-${locale === 'ar' ? 'left' : 'right'}-arrow`"></span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!--Main Slider Two End-->

        <!--About Two Start -->
        <section class="about-two">
            <div class="about-two__shape-2"></div>
            <div class="about-two__shape-3">
                <img :src="asset_path + 'images/shapes/about-two-shape-3.png'" :alt="trans('Decorative shape')" width="120" height="120" loading="lazy" decoding="async" aria-hidden="true">
            </div>
            <div class="container">
                <div class="row">
                    <div class="col-xl-6">
                        <div class="about-two__left">
                            <div class="about-two__img-box">
                                <div class="about-two__img">
                                    <picture>
                                        <source :srcset="asset_path + 'images/home/about_us-640.webp'" type="image/webp">
                                        <img :src="asset_path + 'images/home/about_us.jpg'" :alt="trans('About us')" width="640" height="640" loading="lazy" decoding="async">
                                    </picture>
                                </div>
                                <div class="about-two__shape-1"></div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-6">
                        <div class="about-two__right">
                            <div class="section-title text-left sec-title-animation animation-style2">
                                <div class="section-title__tagline-box">
                                    <div class="section-title__tagline-shape-1"></div>
                                    <span class="section-title__tagline">{{ trans('About Us') }}</span>
                                    <div class="section-title__tagline-shape-2"></div>
                                </div>
                                <h2 class="section-title__title title-animation">
                                    {{ trans('Why Choose Symfonix for Web, AI, and Cloud') }}
                                </h2>
                            </div>
                            <p class="about-two__text">
                                {{ trans("Transform your business with our innovative IT solutions, tailored to address your unique challenges and drive growth in today's digital landscape.") }}
                            </p>
                            <div class="about-two__points-box">
                                <ul class="about-two__points-list list-unstyled">
                                    <li>
                                        <div class="icon"><span class="icon-tick-inside-circle"></span></div>
                                        <p>{{ trans('Developing Secure & Scalable Systems') }}</p>
                                    </li>
                                    <li>
                                        <div class="icon"><span class="icon-tick-inside-circle"></span></div>
                                        <p>{{ trans('Innovative IT Solutions Expert') }}</p>
                                    </li>
                                </ul>
                                <ul class="about-two__points-list list-unstyled">
                                    <li>
                                        <div class="icon"><span class="icon-tick-inside-circle"></span></div>
                                        <p>{{ trans('Cloud Solutions for Modern') }}</p>
                                    </li>
                                    <li>
                                        <div class="icon"><span class="icon-tick-inside-circle"></span></div>
                                        <p>{{ trans('AI-Driven Business Automation') }}</p>
                                    </li>
                                </ul>
                            </div>
                            <div class="about-two__experience-contact-and-btn">
                                <div class="about-two__call-box">
                                    <div class="about-two__call-icon">
                                        <span class="icon-customer-service-headset"></span>
                                    </div>
                                    <div class="about-two__call-content">
                                        <span>{{ trans('Call Any Time') }}</span>
                                        <p><a dir="ltr" :href="`tel:${settings.phone}`">{{ settings.phone }}</a></p>
                                    </div>
                                </div>
                                <div class="about-two__btn-box">
                                    <Link :href="route('about-us')" class="thm-btn">
                                        {{ trans('Learn More') }}
                                        <span :class="`icon-${locale === 'ar' ? 'left' : 'right'}-arrow`"></span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!--About Two End -->

        <!-- Services Two Start -->
        <section class="services-two" v-if="servicesCategories && servicesCategories.length">
            <div class="services-two__shape-1"></div>
            <div class="container">
                <div class="services-two__top">
                    <div class="section-title text-left sec-title-animation animation-style2">
                        <div class="section-title__tagline-box">
                            <div class="section-title__tagline-shape-1"></div>
                            <span class="section-title__tagline">{{ trans('Our Services') }}</span>
                            <div class="section-title__tagline-shape-2"></div>
                        </div>
                        <h2 class="section-title__title title-animation core-services-title">
                            {{ trans('What We Do') }}! <span>{{ trans('Core Services') }}</span>
                        </h2>
                    </div>
                    <Link :href="route('services.index')" class="services-two__round-text-box">
                        <div class="services-two__round-text-box-outer">
                            <div class="services-two__round-text-box-inner">
                                <div class="services-two__curved-circle">
                                    {{ trans('View All Services') }}
                                </div>
                                <div class="services-two__round-icon">
                                    <span :class="`icon-${locale === 'ar' ? 'left' : 'right'}-arrow`"></span>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
                <div class="services-two__bottom">
                    <div class="services-two__services-list">
                        <div
                            v-for="(servicesCategory, index) in servicesCategories.slice(0, 4)"
                            :key="servicesCategory.id"
                            :class="['services-two__services-list-single', index === 0 ? 'services-two__services-list-single-1' : '']"
                        >
                            <div class="services-two__count-and-title">
                                <div class="services-two__count"></div>
                                <h3 class="services-two__title">
                                    <Link :href="route('services.index', { category: servicesCategory.slug })">
                                        {{ translateField(servicesCategory.title) }}
                                    </Link>
                                </h3>
                            </div>
                            <div class="services-two__service-list-box">
                                <ul class="services-two__services-list-inner list-unstyled">
                                    <li v-for="(chunk, cIdx) in chunkHighlights(getCategoryHighlights(servicesCategory))" :key="cIdx">
                                        <p v-for="(item, iIdx) in chunk" :key="iIdx">
                                            <span class="icon-plus"></span>{{ item }}
                                        </p>
                                    </li>
                                </ul>
                            </div>
                            <div class="services-two__hover-img" v-if="servicesCategory.image_link">
                                <img :src="servicesCategory.image_link" :alt="translateField(servicesCategory.title)" width="400" height="300" loading="lazy" decoding="async">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- Services Two End -->

        <!-- Products Start -->
        <section class="home-products products-page" v-if="products && products.length">
            <div class="products-page__bg" aria-hidden="true">
                <div class="products-page__orb products-page__orb--one"></div>
                <div class="products-page__orb products-page__orb--two"></div>
                <div class="products-page__orb products-page__orb--three"></div>
            </div>
            <div class="container position-relative">
                <div class="section-title text-center sec-title-animation animation-style1 home-products__head">
                    <div class="section-title__tagline-box">
                        <div class="section-title__tagline-shape-1"></div>
                        <span class="section-title__tagline">{{ trans('Our Products') }}</span>
                        <div class="section-title__tagline-shape-2"></div>
                    </div>
                    <h2 class="section-title__title title-animation">
                        {{ trans('B2B Solutions Built for Scale') }}
                    </h2>
                    <p class="home-products__intro">
                        {{ trans('Discover enterprise-ready platforms and services designed to grow with your business.') }}
                    </p>
                </div>
                <div class="home-products__grid">
                    <div class="row g-4">
                        <div
                            v-for="(product, index) in products"
                            :key="product.id"
                            class="col-xl-4 col-lg-6 col-md-6 wow fadeInUp"
                            :data-wow-delay="`${(index % 3 + 1) * 100}ms`"
                        >
                            <ProductCard :item="product" :locale="locale" />
                        </div>
                    </div>
                </div>
                <div class="text-center home-products__cta">
                    <Link :href="route('product.index')" class="thm-btn">
                        {{ trans('View All Products') }}
                        <span :class="`icon-${locale === 'ar' ? 'left' : 'right'}-arrow`"></span>
                    </Link>
                </div>
            </div>
        </section>
        <!-- Products End -->

        <!--Why Choose One Start -->
        <section class="why-choose-one">
            <div class="container">
                <div class="row">
                    <div class="col-xl-5">
                        <div class="why-choose-one__left">
                            <div class="section-title text-left sec-title-animation animation-style2">
                                <div class="section-title__tagline-box">
                                    <div class="section-title__tagline-shape-1"></div>
                                    <span class="section-title__tagline">{{ trans('Why Choose Us') }}</span>
                                    <div class="section-title__tagline-shape-2"></div>
                                </div>
                                <h2 class="section-title__title title-animation">
                                    {{ trans('How do we deliver reliable, future-ready IT solutions?') }}
                                </h2>
                            </div>
                            <p class="why-choose-one__text">
                                {{ trans('We deliver exceptional products and services that consistently exceed expectations. Backed by years of experience and a proven track record, we are your reliable partner for success.') }}
                            </p>
                            <ul class="list-unstyled why-choose-two__points">
                                <li>
                                    <div class="icon"><span class="icon-quality"></span></div>
                                    <div class="content">
                                        <h3 class="h4">{{ trans('Unmatched Quality') }}</h3>
                                        <p>{{ trans('We deliver exceptional products and services that exceed expectations every time.') }}</p>
                                    </div>
                                </li>
                                <li>
                                    <div class="icon"><span class="icon-team"></span></div>
                                    <div class="content">
                                        <h3 class="h4">{{ trans('Trusted Expertise') }}</h3>
                                        <p>{{ trans('Backed by years of experience and a proven track record, we are your reliable partner for success.') }}</p>
                                    </div>
                                </li>
                                <li>
                                    <div class="icon"><span class="icon-customer-centricity"></span></div>
                                    <div class="content">
                                        <h3 class="h4">{{ trans('User-Centric Approach') }}</h3>
                                        <p>{{ trans('Your satisfaction is our priority, and we tailor solutions to meet your unique needs. Your happiness comes first.') }}</p>
                                    </div>
                                </li>
                            </ul>
                            <div class="why-choose-one__btn-and-client-info mt-4">
                                <div class="why-choose-one__btn-box">
                                    <Link :href="route('about-us')" class="thm-btn">
                                        {{ trans('About Us') }}
                                        <span :class="`icon-${locale === 'ar' ? 'left' : 'right'}-arrow`"></span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-7">
                        <div :class="`why-choose-one__right wow slideIn${locale !== 'ar' ? 'Right' : 'Left'}`"
                             data-wow-delay="100ms"
                             data-wow-duration="2500ms">
                            <div class="why-choose-one__img">
                                <picture>
                                    <source :srcset="asset_path + 'images/home/why_choose_us-640.webp'" type="image/webp">
                                    <img :src="asset_path + 'images/home/why_choose_us.jpg'"
                                         :alt="trans('Why choose us')"
                                         width="640"
                                         height="640"
                                         loading="lazy"
                                         decoding="async">
                                </picture>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- Why Choose One End -->

        <!-- Sliding Text Three Start -->
        <section class="sliding-text-three">
            <div class="sliding-text-three__wrap">
                <ul class="sliding-text-three__list list-unstyled marquee_mode">
                    <li>
                        <h2 data-hover="Web Development" class="sliding-text-three__title">{{ trans('Web Development') }}</h2>
                        <span class="icon-star"></span>
                    </li>
                    <li>
                        <h2 data-hover="Mobile Development" class="sliding-text-three__title">{{ trans('Mobile Development') }}</h2>
                        <span class="icon-star"></span>
                    </li>
                    <li>
                        <h2 data-hover="AI Agents" class="sliding-text-three__title">{{ trans('AI Agents & Automation') }}</h2>
                        <span class="icon-star"></span>
                    </li>
                    <li>
                        <h2 data-hover="Cloud" class="sliding-text-three__title">{{ trans('Cloud & Infrastructure') }}</h2>
                        <span class="icon-star"></span>
                    </li>
                    <li>
                        <h2 data-hover="Web Development" class="sliding-text-three__title">{{ trans('Web Development') }}</h2>
                        <span class="icon-star"></span>
                    </li>
                    <li>
                        <h2 data-hover="Mobile Development" class="sliding-text-three__title">{{ trans('Mobile Development') }}</h2>
                        <span class="icon-star"></span>
                    </li>
                </ul>
            </div>
        </section>
        <!-- Sliding Text Three End -->

        <!-- Process Two Start -->
        <section class="process-two">
            <div class="process-two__bg-shape float-bob-y"
                 :style="{ backgroundImage: `url(${asset_path}images/shapes/process-two-bg-shape.png)` }"></div>
            <div class="container">
                <div class="section-title text-center sec-title-animation animation-style1">
                    <div class="section-title__tagline-box">
                        <div class="section-title__tagline-shape-1"></div>
                        <span class="section-title__tagline">{{ trans('Our Process') }}</span>
                        <div class="section-title__tagline-shape-2"></div>
                    </div>
                    <h2 class="section-title__title title-animation">
                        {{ trans('How We Deliver') }}
                    </h2>
                </div>
                <ul class="row list-unstyled">
                    <li class="col-xl-4 col-lg-4">
                        <div class="process-two__single">
                            <div class="process-two__count"></div>
                            <h3 class="process-two__title">{{ trans('Web Development') }}</h3>
                            <p class="process-two__text">{{ trans('Custom web solutions built with cutting-edge technology to drive your business forward.') }}</p>
                        </div>
                    </li>
                    <li class="col-xl-4 col-lg-4">
                        <div class="process-two__single">
                            <div class="process-two__shape-1 float-bob-x">
                                <img :src="asset_path + 'images/shapes/process-two-shape-1.png'" alt="" width="80" height="80" aria-hidden="true">
                            </div>
                            <div class="process-two__shape-2 float-bob-x">
                                <img :src="asset_path + 'images/shapes/process-two-shape-2.png'" alt="" width="80" height="80" aria-hidden="true">
                            </div>
                            <div class="process-two__count"></div>
                            <h3 class="process-two__title">{{ trans('Mobile Development') }}</h3>
                            <p class="process-two__text">{{ trans('Native and cross-platform mobile applications that deliver exceptional user experiences.') }}</p>
                        </div>
                    </li>
                    <li class="col-xl-4 col-lg-4">
                        <div class="process-two__single">
                            <div class="process-two__count"></div>
                            <h3 class="process-two__title">{{ trans('Cloud & Infrastructure') }}</h3>
                            <p class="process-two__text">{{ trans('Secure, scalable, and efficient cloud services to power your growth and digital transformation.') }}</p>
                        </div>
                    </li>
                </ul>
            </div>
        </section>
        <!-- Process Two End -->

        <!-- Case Studies Start -->
        <section class="home-case-studies use-cases-page" v-if="useCases && useCases.length">
            <div class="use-cases-page__bg" aria-hidden="true">
                <div class="use-cases-page__orb use-cases-page__orb--one"></div>
                <div class="use-cases-page__orb use-cases-page__orb--two"></div>
            </div>
            <div class="container position-relative">
                <div class="section-title text-center sec-title-animation animation-style1">
                    <div class="section-title__tagline-box">
                        <div class="section-title__tagline-shape-1"></div>
                        <span class="section-title__tagline">{{ trans('Case Studies') }}</span>
                        <div class="section-title__tagline-shape-2"></div>
                    </div>
                    <h2 class="section-title__title title-animation">
                        {{ trans("How We've Empowered Businesses with Innovative Tech Solutions") }}
                    </h2>
                    <p class="home-case-studies__intro">
                        {{ trans("Explore our success stories and real-world solutions we've delivered for businesses.") }}
                    </p>
                </div>
                <div class="use-cases-page__grid">
                    <div class="row g-4">
                        <div
                            v-for="item in useCases"
                            :key="item.id"
                            class="col-xl-4 col-lg-6 col-md-6 wow fadeInUp"
                            data-wow-delay="100ms"
                        >
                            <UseCaseCard :item="item" :locale="locale" />
                        </div>
                    </div>
                </div>
                <div class="text-center home-case-studies__cta">
                    <Link :href="route('use-cases.index')" class="thm-btn">
                        {{ trans('View All Case Studies') }}
                        <span :class="`icon-${locale === 'ar' ? 'left' : 'right'}-arrow`"></span>
                    </Link>
                </div>
            </div>
        </section>
        <!-- Case Studies End -->

        <!--CTA One Start -->
        <section class="cta-one">
            <div class="cta-one__shape-bg float-bob-y"
                 :style="{ backgroundImage: `url(${asset_path}images/shapes/cta-one-shape-bg.png)` }">
            </div>
            <div class="container">
                <div class="cta-one__inner">
                    <h3 class="cta-one__title">
                        {{ trans('Let the Symfonix experts review your technical idea') }}
                    </h3>
                    <div class="cta-one__contact-info">
                        <div class="cta-one__contact-icon">
                            <span class="icon-customer-service-headset"></span>
                        </div>
                        <div class="cta-one__contact-details">
                            <p>{{ trans('Book your free consultation') }}</p>
                            <h4><a dir="ltr" :href="`tel:${settings.phone}`">{{ settings.phone }}</a></h4>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!--CTA One End -->

        <!-- Testimonial Two Start -->
        <section class="testimonial-two pb-5" v-if="testimonials && testimonials.length">
            <div class="testimonial-two__shape-1"></div>
            <div class="testimonial-two__shape-2"></div>
            <div class="container">
                <div class="section-title text-center sec-title-animation animation-style1">
                    <div class="section-title__tagline-box">
                        <div class="section-title__tagline-shape-1"></div>
                        <span class="section-title__tagline">{{ trans('Testimonials') }}</span>
                        <div class="section-title__tagline-shape-2"></div>
                    </div>
                    <h2 class="section-title__title title-animation">
                        {{ trans('What Our Clients Say') }}
                    </h2>
                </div>
                <div class="testimonial-two__carousel owl-theme owl-carousel">
                    <div class="item" v-for="testimonial in testimonials" :key="testimonial.id">
                        <div class="testimonial-two__single">
                            <div class="testimonial-two__single-inner">
                                <div class="testimonial-two__star">
                                    <span class="icon-pointed-star"></span>
                                    <span class="icon-pointed-star"></span>
                                    <span class="icon-pointed-star"></span>
                                    <span class="icon-pointed-star"></span>
                                    <span class="icon-pointed-star"></span>
                                </div>
                                <p class="testimonial-two__text">“{{ translateField(testimonial.quote) }}”</p>
                            </div>
                            <div class="testimonial-two__client-info">
                                <div class="testimonial-two__client-img">
                                    <img :src="testimonial.avatar_link"
                                         :alt="translateField(testimonial.name)"
                                         width="80"
                                         height="80"
                                         loading="lazy"
                                         decoding="async">
                                </div>
                                <div class="testimonial-two__client-content">
                                    <h4 class="testimonial-two__client-name">
                                        <Link :href="route('testimonials')">{{ translateField(testimonial.name) }}</Link>
                                    </h4>
                                    <p class="testimonial-two__sub-title">{{ translateField(testimonial.position) }}</p>
                                </div>
                            </div>
                            <div class="testimonial-two__quote">
                                <span class="icon-right-quote"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- Testimonial Two End -->

        <!-- Blog Two Start -->
        <section class="blog-two blog-three" v-if="posts && posts.length">
            <div class="container">
                <div class="section-title text-center sec-title-animation animation-style1">
                    <div class="section-title__tagline-box">
                        <div class="section-title__tagline-shape-1"></div>
                        <span class="section-title__tagline">{{ trans('Our Blog') }}</span>
                        <div class="section-title__tagline-shape-2"></div>
                    </div>
                    <h2 class="section-title__title title-animation">
                        {{ trans('Latest Insights & Articles') }}
                    </h2>
                </div>
                <div class="row">
                    <div class="col-xl-6" v-if="featuredPost">
                        <HomeBlogCard :post="featuredPost" variant="featured" />
                    </div>
                    <div class="col-xl-6">
                        <div class="row">
                            <div
                                class="col-xl-12"
                                v-for="post in sidePosts"
                                :key="post.id"
                            >
                                <HomeBlogCard :post="post" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="text-center mt-4">
                    <Link :href="route('blogs.index')" class="thm-btn">
                        {{ trans('View All Posts') }}
                        <span :class="`icon-${locale === 'ar' ? 'left' : 'right'}-arrow`"></span>
                    </Link>
                </div>
            </div>
        </section>
        <!-- Blog Two End -->

        <!-- Contact Two Start -->
        <section class="contact-two">
            <div class="contact-two__shape-1 float-bob-y">
                <img :src="asset_path + 'images/shapes/contact-two-shape-1.png'"
                     :alt="trans('Decorative shape')"
                     width="120"
                     height="120"
                     loading="lazy"
                     decoding="async"
                     aria-hidden="true">
            </div>
            <div class="container">
                <div class="row">
                    <div class="col-xl-6">
                        <div class="contact-two__left">
                            <div class="section-title text-left sec-title-animation animation-style2">
                                <div class="section-title__tagline-box">
                                    <div class="section-title__tagline-shape-1"></div>
                                    <span class="section-title__tagline">{{ trans('Contact Us') }}</span>
                                    <div class="section-title__tagline-shape-2"></div>
                                </div>
                                <h2 class="section-title__title title-animation">
                                    {{ trans('Get in Touch With Our Team') }}
                                </h2>
                            </div>
                            <p class="contact-two__text">
                                {{ trans('Have a project in mind? Reach out and our experts will help you turn your ideas into reality.') }}
                            </p>
                            <ul class="contact-two__contact-list list-unstyled">
                                <li v-if="settings.email">
                                    <div class="icon"><span class="icon-mail"></span></div>
                                    <div class="content">
                                        <h3 class="h4">{{ trans('Email') }}</h3>
                                        <p><a dir="ltr" :href="`mailto:${settings.email}`">{{ settings.email }}</a></p>
                                    </div>
                                </li>
                                <li v-if="settings.phone">
                                    <div class="icon"><span class="icon-phone-call"></span></div>
                                    <div class="content">
                                        <h3 class="h4">{{ trans('Phone') }}</h3>
                                        <p><a dir="ltr" :href="`tel:${settings.phone}`">{{ settings.phone }}</a></p>
                                    </div>
                                </li>
                                <li v-if="settings.address">
                                    <div class="icon"><span class="icon-pin"></span></div>
                                    <div class="content">
                                        <h3 class="h4">{{ trans('Our Location') }}</h3>
                                        <p>{{ settings.address }}</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-xl-6">
                        <div :class="`contact-two__right wow slideIn${locale === 'ar' ? 'Left' : 'Right'}`"
                             data-wow-delay="100ms"
                             data-wow-duration="2500ms">
                            <form class="contact-form-validated contact-one__form"
                                  @submit.prevent="handleContactSubmit">
                                <div class="row">
                                    <div class="col-xl-6 col-lg-6">
                                        <h3 class="h4 contact-one__input-title">{{ trans("Full Name") }}</h3>
                                        <div class="contact-one__input-box">
                                            <div class="contact-one__input-icon"><span class="icon-user-1"></span></div>
                                            <input
                                                v-model="contactForm.name"
                                                type="text"
                                                name="name"
                                                :placeholder="trans('Full Name')"
                                                :class="{ 'error': contactForm.errors.name }"
                                                :disabled="contactForm.processing"
                                                required>
                                        </div>
                                        <div v-if="contactForm.errors.name" class="text-danger mt-1 small">{{ contactForm.errors.name }}</div>
                                    </div>
                                    <div class="col-xl-6 col-lg-6">
                                        <h3 class="h4 contact-one__input-title">{{ trans('Email') }}</h3>
                                        <div class="contact-one__input-box">
                                            <div class="contact-one__input-icon"><span class="icon-email"></span></div>
                                            <input
                                                type="email"
                                                name="email"
                                                v-model="contactForm.email"
                                                :placeholder="trans('Email')"
                                                :disabled="contactForm.processing"
                                                :class="{ 'error': contactForm.errors.email }"
                                                required>
                                            <div v-if="contactForm.errors.email" class="text-danger mt-1 small">{{ contactForm.errors.email }}</div>
                                        </div>
                                    </div>
                                    <div class="col-xl-6 col-lg-6">
                                        <h3 class="h4 contact-one__input-title">{{ trans("Phone Number") }}</h3>
                                        <div class="contact-one__input-box">
                                            <div class="contact-one__input-icon"><span class="icon-phone-call"></span></div>
                                            <input
                                                v-model="contactForm.mobile"
                                                type="text"
                                                name="mobile"
                                                :placeholder="trans('Phone Number')"
                                                :class="{ 'error': contactForm.errors.mobile }"
                                                :disabled="contactForm.processing"
                                                required>
                                        </div>
                                        <div v-if="contactForm.errors.mobile" class="text-danger mt-1 small">{{ contactForm.errors.mobile }}</div>
                                    </div>
                                    <div class="col-xl-6 col-lg-6">
                                        <h3 class="h4 contact-one__input-title">{{ trans('Subject') }}</h3>
                                        <div class="contact-one__input-box">
                                            <div class="contact-one__input-icon"><span class="icon-edit"></span></div>
                                            <input
                                                type="text"
                                                name="subject"
                                                v-model="contactForm.subject"
                                                :placeholder="trans('Subject')"
                                                :disabled="contactForm.processing"
                                                :class="{ 'error': contactForm.errors.subject }"
                                                required>
                                            <div v-if="contactForm.errors.subject" class="text-danger mt-1 small">{{ contactForm.errors.subject }}</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xl-12">
                                    <h3 class="h4 contact-one__input-title">{{ trans("Message") }}</h3>
                                    <div class="contact-one__input-box text-message-box">
                                        <div class="contact-one__input-icon"><span class="icon-edit"></span></div>
                                        <textarea
                                            v-model="contactForm.message"
                                            name="message"
                                            :placeholder="trans('Write your message')"
                                            :class="{ 'error': contactForm.errors.message }"
                                            :disabled="contactForm.processing"
                                            required></textarea>
                                    </div>
                                    <div v-if="contactForm.errors.message" class="text-danger mt-1 small">{{ contactForm.errors.message }}</div>
                                    <div class="contact-one__btn-box">
                                        <button
                                            type="submit"
                                            class="thm-btn"
                                            :disabled="contactForm.processing"
                                            :class="{ 'opacity-50': contactForm.processing }">
                                            <span v-if="contactForm.processing">
                                                <i class="fa-solid fa-spinner fa-spin me-2"></i>{{ trans("Sending...") }}
                                            </span>
                                            <span v-else>
                                                <span>{{ trans("Submit") }}</span>
                                                <i :class="`icon-${locale === 'ar' ? 'left' : 'right'}-arrow mx-1`"></i>
                                            </span>
                                        </button>
                                    </div>
                                </div>
                                <div v-if="contactSubmitSuccess" class="col-12 mt-3">
                                    <div class="alert alert-success">
                                        {{ trans("Thank you for contacting us! We will get back to you soon.") }}
                                    </div>
                                </div>
                            </form>
                            <div class="result"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- Contact Two End -->
    </app-layout>
</template>

<script setup>
import {computed, onMounted, nextTick, ref} from 'vue'
import {usePage, useForm, Link, Head} from '@inertiajs/vue3'
import HomeBlogCard from '@/Components/HomeBlogCard.vue'

const page = usePage()
const trans = (key) => page.props.translations[key] || key;
const seo = computed(() => page.props.seo)
const settings = computed(() => page.props.settings || {})
const asset_path = computed(() => page.props.asset_path || '')
const locale = computed(() => page.props.locale)
const posts = computed(() => page.props.posts || [])
const servicesCategories = computed(() => page.props.servicesCategories || [])
const testimonials = computed(() => page.props.testimonials || [])
const teams = computed(() => page.props.teams || [])
const useCases = computed(() => page.props.useCases || [])
const products = computed(() => page.props.products || [])
const clients = computed(() => page.props.clients || [])
const meta = computed(() => page.props.meta || {})

const metaTitle = computed(() => {
    return meta.value.title || `${trans("Home")} | ${seo.value.website_name || ''}`.trim()
})
const metaDescription = computed(() => {
    return meta.value.description
        || trans('Empowering businesses with modern web, mobile, AI, and cloud solutions.')
        || seo.value.website_desc
        || ''
})
const metaKeywords = computed(() => {
    return meta.value.keywords
        || trans('IT solutions, web development, mobile apps, AI automation, cloud services')
        || seo.value.website_keywords
        || ''
})
const metaImage = computed(() => {
    return meta.value?.og?.image || meta.value?.twitter?.image || settings.value?.meta_img || ''
})
const metaCanonical = computed(() => meta.value.canonical || '')
const metaRobots = computed(() => meta.value.robots || 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1')

const featuredPost = computed(() => posts.value?.[0] || null)
const sidePosts = computed(() => (posts.value || []).slice(1, 5))


const translateField = (value) => {
    if (!value) {
        return '';
    }

    // If it's already a string, just return it.
    if (typeof value === 'string') {
        return value;
    }

    // If it's an object/array of translations, pick the current locale if available.
    const loc = locale.value;
    if (typeof value === 'object' && value !== null) {
        if (value[loc]) {
            return value[loc];
        }
    }

    return '';
};

const getCategoryHighlights = (category) => {
    if (!category || !Array.isArray(category.services)) {
        return [];
    }
    return category.services
        .map((service) => translateField(service.title))
        .filter(Boolean);
};

const chunkHighlights = (items, size = 2) => {
    const list = Array.isArray(items) ? items.slice(0, 6) : [];
    const chunks = [];
    for (let i = 0; i < list.length; i += size) {
        chunks.push(list.slice(i, i + size));
    }
    return chunks.length ? chunks : [[]];
};


// Contact form (shared with Support::ContactUsController)
const contactSubmitSuccess = ref(false)

const contactForm = useForm({
    name: '',
    email: '',
    mobile: '',
    subject: '',
    message: '',
})

const handleContactSubmit = () => {
    if (contactForm.processing) {
        return false;
    }

    if (!contactForm.name || !contactForm.name.trim()) return false;
    if (!contactForm.email || !contactForm.email.trim()) return false;
    if (!contactForm.mobile || !contactForm.mobile.trim()) return false;
    if (!contactForm.subject || !contactForm.subject.trim()) return false;
    if (!contactForm.message || !contactForm.message.trim()) return false;

    let contactUrl = route('contact-us.store');
    contactForm.post(contactUrl, {
        preserveScroll: true,
        preserveState: true,
        onBefore: () => {
            contactSubmitSuccess.value = false;
        },
        onSuccess: () => {
            contactSubmitSuccess.value = true;
            contactForm.reset();
            contactForm.clearErrors();
            setTimeout(() => {
                contactSubmitSuccess.value = false;
            }, 5000);
        },
        onError: () => {
            contactSubmitSuccess.value = false;
        },
    });

    return false;
};

onMounted(() => {
    nextTick(() => {
        const isRTL = page.props.locale === 'ar';
        const applyOwlDotAriaLabels = ($carousel) => {
            if (!$carousel || !$carousel.length) {
                return;
            }

            $carousel.find('.owl-dot').each(function (index) {
                $(this).attr('aria-label', `${trans('Go to slide')} ${index + 1}`);
            });
        };

        const waitForTheme = (predicate, tries = 40) => new Promise((resolve) => {
            const tick = () => {
                if (predicate()) {
                    resolve(true);
                    return;
                }
                if (tries-- <= 0) {
                    resolve(false);
                    return;
                }
                setTimeout(tick, 150);
            };
            tick();
        });

        const initHomeWidgets = () => {
        // Brand carousel in hero
        if (typeof $ !== 'undefined' && typeof $.fn?.owlCarousel === 'function' && $('.brand-two__carousel').length) {
            const $brandCarousel = $('.brand-two__carousel');
            if (!$brandCarousel.hasClass('owl-loaded')) {
                $brandCarousel.owlCarousel({
                    loop: clients.value.length > 4,
                    margin: 20,
                    nav: false,
                    dots: false,
                    smartSpeed: 500,
                    autoplay: true,
                    autoplayTimeout: 4000,
                    rtl: isRTL,
                    responsive: {
                        0: {items: 2},
                        576: {items: 3},
                        992: {items: 4},
                        1200: {items: 5}
                    }
                });
            }
        }

        // Initialize Testimonials Owl Carousel (Home 1)
        if (typeof $ !== 'undefined' && typeof $.fn?.owlCarousel === 'function' && $('.testimonial-two__carousel').length) {
            const $testimonialCarousel = $('.testimonial-two__carousel');
            if (!$testimonialCarousel.hasClass('owl-loaded')) {
            $testimonialCarousel.owlCarousel({
                loop: testimonials.value.length > 2,
                margin: 30,
                nav: false,
                dots: true,
                smartSpeed: 500,
                autoplay: true,
                autoplayTimeout: 7000,
                rtl: isRTL,
                responsive: {
                    0: {items: 1},
                    768: {items: 1},
                    992: {items: 2},
                    1200: {items: 3}
                }
            }).on('initialized.owl.carousel refreshed.owl.carousel', function () {
                applyOwlDotAriaLabels($(this));
            });
            applyOwlDotAriaLabels($testimonialCarousel);
            }
        }

        // Marquee sliding text
        if (typeof $ !== 'undefined' && typeof $.fn?.marquee === 'function' && $('.marquee_mode').length) {
            $('.marquee_mode').each(function () {
                const $el = $(this);
                if ($el.data('marquee-initialized')) {
                    return;
                }
                $el.marquee({
                    speed: 50,
                    gap: 50,
                    delayBeforeStart: 0,
                    direction: isRTL ? 'right' : 'left',
                    duplicated: true,
                    pauseOnHover: true,
                });
                $el.data('marquee-initialized', true);
            });
        }

        // Initialize WOW animations
        if (typeof WOW !== 'undefined') {
            new WOW().init();
        }

        // Initialize GSAP title animations
        // Use the same comprehensive implementation as script.js but handle Arabic properly
        if (typeof gsap !== 'undefined' && typeof SplitText !== 'undefined') {
            const titleAnimations = document.querySelectorAll(".sec-title-animation .title-animation");
            if (titleAnimations.length) {
                titleAnimations.forEach(quote => {
                    // Reset if needed
                    if (quote.animation) {
                        quote.animation.progress(1).kill();
                        if (quote.split) quote.split.revert();
                    }

                    // Handle Arabic text - capitalize and set proper styling
                    if (isRTL) {
                        const text = quote.textContent;
                        if (/[\u0600-\u06FF]/.test(text)) {
                            quote.style.textTransform = 'none';
                            quote.style.fontVariant = 'normal';
                            // Don't set fontSize to inherit - let CSS handle it
                            // quote.style.fontSize = 'inherit'; // REMOVED - was causing small font size
                        }
                    }

                    var getclass = quote.closest('.sec-title-animation').className;
                    var animation = getclass.split('animation-');
                    if (animation[1] == "style4") return;

                    // Check if text contains Arabic characters
                    const text = quote.textContent;
                    const hasArabic = /[\u0600-\u06FF]/.test(text);

                    // Skip SplitText char splitting on RTL pages (and for Arabic text).
                    // SplitText reverses char/word nodes under direction:rtl, which garbles
                    // Latin fallback strings that lack an Arabic translation.
                    if (isRTL || hasArabic) {
                        // No character splitting — animate the whole element
                        gsap.set(quote, {
                            perspective: 400,
                            opacity: 0,
                            y: isRTL ? -50 : 50
                        });

                        quote.animation = gsap.to(quote, {
                            scrollTrigger: {
                                trigger: quote,
                                start: "top 90%",
                                toggleActions: "play none none none"
                            },
                            y: 0,
                            opacity: 1,
                            duration: 1,
                            ease: Back.easeOut
                        });
                    } else {
                        // For non-Arabic: Use character splitting
                        quote.split = new SplitText(quote, {
                            type: "lines,words,chars",
                            linesClass: "split-line"
                        });

                        gsap.set(quote, {
                            perspective: 400
                        });

                        const xValue = isRTL ? "-50" : "50";
                        const yValue = isRTL ? "-90%" : "90%";

                        if (animation[1] == "style1") {
                            gsap.set(quote.split.chars, {
                                opacity: 0,
                                y: yValue,
                                rotateX: "-40deg"
                            });
                        }
                        if (animation[1] == "style2") {
                            gsap.set(quote.split.chars, {
                                opacity: 0,
                                x: xValue
                            });
                        }
                        if (animation[1] == "style3") {
                            gsap.set(quote.split.chars, {
                                opacity: 0,
                            });
                        }

                        quote.animation = gsap.to(quote.split.chars, {
                            scrollTrigger: {
                                trigger: quote,
                                start: "top 90%",
                                toggleActions: "play none none none"
                            },
                            x: "0",
                            y: "0",
                            rotateX: "0",
                            opacity: 1,
                            duration: 1,
                            ease: Back.easeOut,
                            stagger: 0.02
                        });
                    }
                });
            }
        }

        // Refresh ScrollTrigger after a short delay
        setTimeout(() => {
            if (typeof ScrollTrigger !== 'undefined') {
                ScrollTrigger.refresh();
            }
        }, 300);

        // Initialize Marquee
        if (typeof $ !== 'undefined' && $('.marquee_mode-2').length && $.fn.marquee) {
            $('.marquee_mode-2').marquee({
                speed: 50,
                gap: 50,
                delayBeforeStart: 0,
                direction: isRTL ? 'right' : 'left',
                duplicated: true,
                pauseOnHover: true,
                startVisible: true
            });
        }

        // Initialize simple count-up animation for latest-counter__content numbers
        try {
            if (typeof window !== 'undefined') {
                const counters = document.querySelectorAll('.latest-counter__content .count');

                const animateCount = (el) => {
                    if (!el || el.dataset.countInitialized === '1') return;

                    const rawText = el.textContent || '';
                    const target = parseInt(rawText.replace(/[^\d]/g, ''), 10);
                    if (!target || isNaN(target)) return;

                    el.dataset.countInitialized = '1';

                    // Increase duration for a slower, smoother count-up
                    const duration = 8000; // ms
                    const start = 0;
                    const startTime = performance.now();

                    const step = (now) => {
                        const progress = Math.min((now - startTime) / duration, 1);
                        const value = Math.floor(start + (target - start) * progress);
                        el.textContent = value.toString();

                        if (progress < 1) {
                            requestAnimationFrame(step);
                        } else {
                            el.textContent = target.toString();
                        }
                    };

                    requestAnimationFrame(step);
                };

                if (counters.length) {
                    if ('IntersectionObserver' in window) {
                        const observer = new IntersectionObserver((entries, obs) => {
                            entries.forEach((entry) => {
                                if (entry.isIntersecting) {
                                    animateCount(entry.target);
                                    obs.unobserve(entry.target);
                                }
                            });
                        }, {threshold: 0.3});

                        counters.forEach((el) => observer.observe(el));
                    } else {
                        counters.forEach((el) => animateCount(el));
                    }
                }
            }
        } catch (e) {
            // Fail silently if the browser doesn't support required APIs
        }
        };

        waitForTheme(() => typeof window.$ !== 'undefined' && typeof window.$.fn?.owlCarousel === 'function')
            .then((ready) => {
                if (ready) {
                    initHomeWidgets();
                }
            });
    });
});

</script>

<script>


import AppLayout from '@/Layouts/App.vue';
import UseCaseCard from '@/Components/UseCaseCard.vue';
import ProductCard from '@/Components/ProductCard.vue';

export default {
    components: {
        AppLayout,
        UseCaseCard,
        ProductCard,
    }

};
</script>

<style scoped>
.home-products {
    position: relative;
    display: block;
    padding: 140px 0 140px;
    overflow: hidden;
    z-index: 1;
}

.home-products__head {
    margin-bottom: 58px;
}

.home-products__head :deep(.section-title__title) {
    color: #fff;
}

.home-products__head :deep(.section-title__tagline) {
    color: rgba(255, 255, 255, 0.85);
}

.home-products__intro {
    max-width: 720px;
    margin: 18px auto 0;
    font-size: 1.05rem;
    line-height: 1.7;
    color: rgba(255, 255, 255, 0.78);
}

.home-products__grid {
    position: relative;
    z-index: 1;
}

.home-products :deep(.product-card) {
    margin-bottom: 30px;
}

.home-products__cta {
    position: relative;
    z-index: 1;
    margin-top: 40px;
}

.home-products .products-page__bg {
    position: absolute;
    inset: 0;
    background: linear-gradient(
        145deg,
        #0b192c 0%,
        #0f2844 35%,
        #155a8a 65%,
        rgba(33, 137, 202, 0.55) 85%,
        rgba(127, 196, 87, 0.2) 100%
    );
    pointer-events: none;
}

.home-products .products-page__orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    opacity: 0.45;
}

.home-products .products-page__orb--one {
    width: 420px;
    height: 420px;
    top: -120px;
    left: -80px;
    background: #2189ca;
}

.home-products .products-page__orb--two {
    width: 360px;
    height: 360px;
    top: 40%;
    right: -100px;
    background: #7fc457;
}

.home-products .products-page__orb--three {
    width: 280px;
    height: 280px;
    bottom: -60px;
    left: 35%;
    background: #1a5f8a;
}

.home-case-studies {
    position: relative;
    display: block;
    padding: 140px 0 140px;
    overflow: hidden;
    z-index: 1;
}

.home-case-studies .section-title {
    margin-bottom: 58px;
}

.home-case-studies__intro {
    max-width: 720px;
    margin: 18px auto 0;
    color: rgba(255, 255, 255, 0.78);
    line-height: 1.7;
}

.use-cases-page {
    position: relative;
    overflow: hidden;
}

.use-cases-page__bg {
    position: absolute;
    inset: 0;
    background: linear-gradient(
        145deg,
        #0b192c 0%,
        #0f2844 35%,
        #155a8a 65%,
        rgba(33, 137, 202, 0.55) 85%,
        rgba(127, 196, 87, 0.2) 100%
    );
    pointer-events: none;
}

.use-cases-page__orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    opacity: 0.45;
}

.use-cases-page__orb--one {
    width: 420px;
    height: 420px;
    top: -120px;
    left: -80px;
    background: #2189ca;
}

.use-cases-page__orb--two {
    width: 360px;
    height: 360px;
    top: 40%;
    right: -100px;
    background: #7fc457;
}

.use-cases-page__grid {
    position: relative;
    z-index: 1;
}

.home-case-studies :deep(.use-case-card) {
    margin-bottom: 30px;
}

.home-case-studies__cta {
    position: relative;
    z-index: 1;
    margin-top: 40px;
}
</style>

