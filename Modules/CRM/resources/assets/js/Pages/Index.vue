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
            :title="trans('Contact Us')"
            :subtitle="trans('Get In Touch')"
            :background="asset_path + 'theme/img/main/36.jpg'"
        />

        <section class="section-small" id="contact2">
            <div class="container">
                <div class="contact-page__intro">
                    <p class="contact-page__kicker">{{ trans('Get In Touch') }}</p>
                    <h2>{{ trans('How Can We Help You?') }}</h2>
                    <p>
                        {{ trans("We're here to listen! Whether you have questions, feedback, or just want to say hello, feel free to reach out") }}
                    </p>
                </div>

                <div class="row contact-page__row">
                    <div class="col-lg-6 contact-page__col">
                        <form class="contact-page__form" @submit.prevent="handleSubmit" novalidate>
                            <h3>{{ trans('Send a message') }}</h3>
                            <p class="contact-page__form-lead">
                                {{ trans("Fill out the form below and we'll get back to you as soon as possible") }}
                            </p>

                            <div class="row">
                                <div class="col-sm-6">
                                    <div class="form-group" :class="{ 'has-error': contactForm.errors.name }">
                                        <label class="sr-only" for="contact-name">{{ trans('Full Name') }}</label>
                                        <input
                                            id="contact-name"
                                            class="form-control input-lg"
                                            v-model="contactForm.name"
                                            type="text"
                                            name="name"
                                            autocomplete="name"
                                            :placeholder="trans('Full Name')"
                                            :disabled="contactForm.processing"
                                            required
                                        >
                                        <span v-if="contactForm.errors.name" class="help-block text-danger">{{ contactForm.errors.name }}</span>
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <div class="form-group" :class="{ 'has-error': contactForm.errors.email }">
                                        <label class="sr-only" for="contact-email">{{ trans('Email') }}</label>
                                        <input
                                            id="contact-email"
                                            class="form-control input-lg"
                                            v-model="contactForm.email"
                                            type="email"
                                            name="email"
                                            autocomplete="email"
                                            :placeholder="trans('Email')"
                                            :disabled="contactForm.processing"
                                            required
                                        >
                                        <span v-if="contactForm.errors.email" class="help-block text-danger">{{ contactForm.errors.email }}</span>
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-sm-6">
                                    <div class="form-group" :class="{ 'has-error': contactForm.errors.mobile }">
                                        <label class="sr-only" for="contact-mobile">{{ trans('Phone Number') }}</label>
                                        <input
                                            id="contact-mobile"
                                            class="form-control input-lg"
                                            v-model="contactForm.mobile"
                                            type="tel"
                                            name="mobile"
                                            autocomplete="tel"
                                            :placeholder="trans('Phone Number')"
                                            :disabled="contactForm.processing"
                                            required
                                        >
                                        <span v-if="contactForm.errors.mobile" class="help-block text-danger">{{ contactForm.errors.mobile }}</span>
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <div class="form-group" :class="{ 'has-error': contactForm.errors.subject }">
                                        <label class="sr-only" for="contact-subject">{{ trans('Subject') }}</label>
                                        <input
                                            id="contact-subject"
                                            class="form-control input-lg"
                                            v-model="contactForm.subject"
                                            type="text"
                                            name="subject"
                                            :placeholder="trans('Subject')"
                                            :disabled="contactForm.processing"
                                            required
                                        >
                                        <span v-if="contactForm.errors.subject" class="help-block text-danger">{{ contactForm.errors.subject }}</span>
                                    </div>
                                </div>
                            </div>

                            <div class="form-group" :class="{ 'has-error': contactForm.errors.message }">
                                <label class="sr-only" for="contact-message">{{ trans('Message') }}</label>
                                <textarea
                                    id="contact-message"
                                    class="form-control input-lg"
                                    v-model="contactForm.message"
                                    name="message"
                                    rows="5"
                                    :placeholder="trans('Write your message')"
                                    :disabled="contactForm.processing"
                                    required
                                ></textarea>
                                <span v-if="contactForm.errors.message" class="help-block text-danger">{{ contactForm.errors.message }}</span>
                            </div>

                            <div v-if="submitSuccess" class="alert alert-success" role="alert">
                                {{ trans('Thank you for contacting us! We will get back to you soon.') }}
                            </div>

                            <button class="btn btn-dark btn-lg" type="submit" :disabled="contactForm.processing">
                                {{ contactForm.processing ? trans('Sending...') : trans('Send Message') }}
                            </button>
                        </form>
                    </div>

                    <div class="col-lg-6 contact-page__col">
                        <aside v-if="hasContactDetails" class="contact-page__aside">
                            <h3>{{ trans('Start the Conversation') }}</h3>
                            <p>{{ trans('Reach Out Anytime') }}</p>
                            <ul class="contact-page__details list-unstyled">
                                <li v-if="phoneNumber">
                                    <span class="contact-page__icon" aria-hidden="true"><i class="fa fa-phone"></i></span>
                                    <div>
                                        <strong>{{ trans('Phone') }}</strong>
                                        <a dir="ltr" :href="`tel:${phoneNumber}`">{{ phoneNumber }}</a>
                                    </div>
                                </li>
                                <li v-if="emailAddress">
                                    <span class="contact-page__icon" aria-hidden="true"><i class="fa fa-envelope"></i></span>
                                    <div>
                                        <strong>{{ trans('Email') }}</strong>
                                        <a :href="`mailto:${emailAddress}`">{{ emailAddress }}</a>
                                    </div>
                                </li>
                                <li v-if="officeAddress">
                                    <span class="contact-page__icon" aria-hidden="true"><i class="fa fa-map-marker"></i></span>
                                    <div>
                                        <strong>{{ trans('Our Location') }}</strong>
                                        <span>{{ officeAddress }}</span>
                                    </div>
                                </li>
                            </ul>
                            <ul v-if="socialLinks.length" class="contact-page__social list-inline">
                                <li v-for="item in socialLinks" :key="item.label">
                                    <a :href="item.href" target="_blank" rel="noopener" :aria-label="item.label">
                                        <i :class="item.icon"></i>
                                    </a>
                                </li>
                            </ul>
                        </aside>

                        <div v-else class="contact-page__visual">
                            <img
                                :src="visualImage"
                                :alt="trans('Contact Us')"
                                loading="lazy"
                                decoding="async"
                            >
                            <div class="contact-page__visual-copy">
                                <span>{{ trans('Get In Touch') }}</span>
                                <strong>{{ trans('Reach Out Anytime') }}</strong>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </app-layout>
</template>

<script setup>
import {computed, ref} from 'vue'
import {usePage, useForm, Head} from '@inertiajs/vue3'
import PageHeader from '@/Components/PageHeader.vue'
import AppLayout from '@/Layouts/App.vue'

const page = usePage()
const trans = (key) => page.props.translations[key] || key
const seo = computed(() => page.props.seo || {})
const settings = computed(() => page.props.settings || {})
const asset_path = computed(() => page.props.asset_path || '')
const meta = computed(() => page.props.meta || {})
const siteName = computed(() => seo.value.website_name || page.props.appName || 'Symfonix')

const metaTitle = computed(() => {
    return meta.value.title || `${trans('Contact Us')} | ${siteName.value}`
})
const metaDescription = computed(() => {
    return meta.value.description
        || trans('Contact our team for support, inquiries, or project discussions.')
        || seo.value.website_desc
        || ''
})
const metaKeywords = computed(() => {
    return meta.value.keywords
        || trans('contact, support, get in touch, customer service')
        || seo.value.website_keywords
        || ''
})
const metaImage = computed(() => {
    return meta.value?.og?.image || meta.value?.twitter?.image || settings.value?.meta_img || ''
})
const metaCanonical = computed(() => meta.value.canonical || '')
const metaRobots = computed(() => meta.value.robots || 'index, follow')
const submitSuccess = ref(false)

const filled = (value) => String(value || '').trim() !== ''
const phoneNumber = computed(() => filled(settings.value.phone) ? settings.value.phone : '')
const emailAddress = computed(() => filled(settings.value.email) ? settings.value.email : '')
const officeAddress = computed(() => filled(settings.value.address) ? settings.value.address : '')
const hasContactDetails = computed(() => Boolean(phoneNumber.value || emailAddress.value || officeAddress.value))
const visualImage = computed(() => `${asset_path.value}images/home/about_us.jpg`)

const socialLinks = computed(() => {
    const items = [
        { key: 'whatsapp', icon: 'fab fa-whatsapp', label: trans('Whatsapp') },
        { key: 'facebook', icon: 'fab fa-facebook-f', label: trans('Facebook') },
        { key: 'twitter', icon: 'fab fa-twitter', label: trans('Twitter') },
        { key: 'linkedin', icon: 'fab fa-linkedin-in', label: trans('LinkedIn') },
        { key: 'instagram', icon: 'fab fa-instagram', label: trans('Instagram') },
    ]

    return items
        .map((item) => {
            const raw = String(settings.value[item.key] || '').trim()
            if (!raw) {
                return null
            }

            let href = raw
            if (item.key === 'whatsapp' && !raw.startsWith('http')) {
                href = `https://wa.me/${raw.replace(/[^\d]/g, '')}`
            }

            return { ...item, href }
        })
        .filter(Boolean)
})

const contactForm = useForm({
    name: '',
    email: '',
    mobile: '',
    subject: '',
    message: '',
})

const handleSubmit = () => {
    if (contactForm.processing) {
        return false
    }

    if (!contactForm.name || !contactForm.name.trim()) {
        return false
    }

    if (!contactForm.email || !contactForm.email.trim()) {
        return false
    }

    if (!contactForm.mobile || !contactForm.mobile.trim()) {
        return false
    }

    if (!contactForm.subject || !contactForm.subject.trim()) {
        return false
    }

    if (!contactForm.message || !contactForm.message.trim()) {
        return false
    }

    contactForm.post(route('contact-us.store'), {
        preserveScroll: true,
        preserveState: true,
        onBefore: () => {
            submitSuccess.value = false
        },
        onSuccess: () => {
            submitSuccess.value = true
            contactForm.reset()
            contactForm.clearErrors()
            setTimeout(() => {
                submitSuccess.value = false
            }, 5000)
        },
        onError: () => {
            submitSuccess.value = false
        },
    })

    return false
}
</script>

<style scoped>
.contact-page__intro {
    max-width: 720px;
    margin: 0 auto 48px;
    text-align: center;
}
.contact-page__kicker {
    margin: 0 0 10px;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #888;
}
.contact-page__intro h2 {
    margin: 0 0 14px;
    color: #111;
}
.contact-page__intro p {
    margin: 0;
    font-size: 16px;
    line-height: 1.8;
    color: #555;
}
.contact-page__row {
    display: flex;
    flex-wrap: wrap;
    align-items: stretch;
}
.contact-page__col {
    display: flex;
    margin-bottom: 24px;
}
.contact-page__form,
.contact-page__aside,
.contact-page__visual {
    width: 100%;
    min-height: 560px;
}
.contact-page__form,
.contact-page__aside {
    background: #fff;
    border: 1px solid #eee;
    padding: 36px;
}
.contact-page__form h3,
.contact-page__aside h3 {
    margin: 0 0 8px;
    font-size: 24px;
    color: #111;
}
.contact-page__form-lead,
.contact-page__aside > p {
    margin: 0 0 28px;
    color: #666;
    line-height: 1.7;
}
.contact-page__form .form-group {
    margin-bottom: 18px;
}
.contact-page__form .form-control {
    border-radius: 0;
    box-shadow: none;
}
.contact-page__form .btn {
    min-width: 180px;
    margin-top: 8px;
}
.contact-page__form .alert {
    margin-bottom: 18px;
}
.contact-page__details {
    margin: 0;
    padding: 0;
}
.contact-page__details li {
    display: flex;
    gap: 16px;
    align-items: flex-start;
    padding: 18px 0;
    border-bottom: 1px solid #f0f0f0;
}
.contact-page__details li:last-child {
    border-bottom: 0;
}
.contact-page__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 46px;
    height: 46px;
    flex: 0 0 46px;
    background: #f6f6f6;
    color: #111;
}
.contact-page__details strong {
    display: block;
    margin-bottom: 4px;
    font-size: 13px;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: #888;
}
.contact-page__details a,
.contact-page__details span {
    color: #111;
    font-size: 16px;
    word-break: break-word;
}
.contact-page__details a:hover {
    color: #555;
    text-decoration: none;
}
.contact-page__social {
    margin: 28px 0 0;
    padding-top: 8px;
}
.contact-page__social a {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    margin: 0 4px 8px 0;
    border: 1px solid #eee;
    color: #111;
}
.contact-page__social a:hover {
    background: #111;
    color: #fff;
    text-decoration: none;
}
.contact-page__visual {
    position: relative;
    overflow: hidden;
    background: #111;
}
.contact-page__visual img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center 68%;
}
.contact-page__visual-copy {
    position: absolute;
    left: 28px;
    right: 28px;
    bottom: 28px;
    z-index: 1;
    color: #fff;
    text-align: start;
    text-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
}
.contact-page__visual-copy span {
    display: block;
    margin-bottom: 6px;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
}
.contact-page__visual-copy strong {
    display: block;
    font-size: 28px;
    line-height: 1.3;
}
.contact-page__visual::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.05) 35%, rgba(0, 0, 0, 0.55) 100%);
}

@media (max-width: 991px) {
    .contact-page__form,
    .contact-page__aside,
    .contact-page__visual {
        min-height: 420px;
    }
    .contact-page__form,
    .contact-page__aside {
        padding: 24px;
    }
}
@media (max-width: 767px) {
    .contact-page__intro {
        margin-bottom: 32px;
        text-align: inherit;
    }
    .contact-page__form,
    .contact-page__aside,
    .contact-page__visual {
        min-height: 360px;
    }
}

html[dir="rtl"] .contact-page__social a {
    margin: 0 0 8px 4px;
}
</style>
