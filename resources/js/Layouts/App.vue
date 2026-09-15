<template>
    <MainMenuNav />

    <slot />

    <template v-if="!isPortalPage">
        <section class="section-small bg-white footer">
            <div class="container">
                <div class="row">
                    <div class="col-md-3 footer-menu">
                        <h4>{{ trans('Subscribe to Our Newsletter') }}</h4>
                        <form @submit.prevent="handleSubscribeSubmit">
                            <div class="form-group">
                                <input
                                    class="form-control"
                                    type="email"
                                    name="email"
                                    v-model="subscribeForm.email"
                                    :placeholder="trans('Enter your email address')"
                                    :disabled="subscribeForm.processing"
                                    required
                                >
                                <div v-if="subscribeForm.errors.email" class="help-block text-danger">
                                    {{ subscribeForm.errors.email }}
                                </div>
                            </div>
                            <button class="btn btn-dark btn-sm" type="submit" :disabled="subscribeForm.processing">
                                {{ subscribeForm.processing ? trans('Subscribing...') : trans('Subscribe Now') }}
                            </button>
                            <p class="small no-pad-btm">
                                <Link :href="route('privacy-policy')">
                                    {{ trans('By subscribing, you accept our privacy policy') }}
                                </Link>
                            </p>
                            <div v-if="subscribeSuccess" class="alert alert-success">
                                {{ trans('Thank you for subscribing to our newsletter!') }}
                            </div>
                        </form>
                    </div>
                    <div class="col-md-4 col-md-offset-1 footer-menu">
                        <h4>{{ trans('About') }}</h4>
                        <p>{{ seo.about_us || seo.main_title || seo.website_desc }}</p>
                        <p v-if="settings.email">
                            <a :href="`mailto:${settings.email}`">{{ settings.email }}</a><br>
                            <a v-if="settings.phone" dir="ltr" :href="`tel:${settings.phone}`">{{ settings.phone }}</a>
                        </p>
                    </div>
                    <div class="col-md-3 col-md-offset-1 footer-menu">
                        <h4>{{ trans('Quick Links') }}</h4>
                        <ul class="list-unstyled">
                            <li><Link :href="route('home')">{{ trans('Home') }}</Link></li>
                            <li><Link :href="route('about-us')">{{ trans('About Us') }}</Link></li>
                            <li><Link :href="route('contact-us')">{{ trans('Contact Us') }}</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
        <section class="section-small bg-gray footer">
            <div class="container">
                <div class="row">
                    <div class="col-lg-3">
                        <ul class="list-inline no-pad">
                            <li v-if="settings.twitter">
                                <a :href="settings.twitter" target="_blank" rel="noopener" :aria-label="trans('Twitter')">
                                    <i class="fab fa-twitter fa-fw fa-lg"></i>
                                </a>
                            </li>
                            <li v-if="settings.facebook">
                                <a :href="settings.facebook" target="_blank" rel="noopener" :aria-label="trans('Facebook')">
                                    <i class="fab fa-facebook-f fa-fw fa-lg"></i>
                                </a>
                            </li>
                            <li v-if="settings.linkedin">
                                <a :href="settings.linkedin" target="_blank" rel="noopener" :aria-label="trans('LinkedIn')">
                                    <i class="fab fa-linkedin-in fa-fw fa-lg"></i>
                                </a>
                            </li>
                            <li v-if="settings.instagram">
                                <a :href="settings.instagram" target="_blank" rel="noopener" :aria-label="trans('Instagram')">
                                    <i class="fab fa-instagram fa-fw fa-lg"></i>
                                </a>
                            </li>
                            <li v-if="settings.github">
                                <a :href="settings.github" target="_blank" rel="noopener" :aria-label="trans('GitHub')">
                                    <i class="fab fa-github-alt fa-fw fa-lg"></i>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div class="col-lg-4 col-lg-offset-1">
                        <h5 class="no-pad">
                            {{ trans('All rights are reserved') }} {{ new Date().getFullYear() }} ©
                            <Link :href="route('home')">{{ seo.website_name }}</Link>
                        </h5>
                    </div>
                    <div class="col-lg-3 col-lg-offset-1">
                        <h5 class="no-pad">{{ settings.address }}</h5>
                    </div>
                </div>
            </div>
        </section>
    </template>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { Link, router, useForm, usePage } from '@inertiajs/vue3'
import MainMenuNav from '@/Components/MainMenuNav.vue'

const page = usePage()
const trans = (key) => page.props.translations[key] || key
const settings = computed(() => page.props.settings || {})
const seo = computed(() => page.props.seo || {})
const isPortalPage = computed(() => /\/portal(\/|$)/.test(page.url))

const subscribeSuccess = ref(false)
const subscribeForm = useForm({ email: '' })

const handleSubscribeSubmit = () => {
    if (subscribeForm.processing) {
        return false
    }
    if (!subscribeForm.email || !subscribeForm.email.trim()) {
        return false
    }
    subscribeForm.post(route('subscribe'), {
        preserveScroll: true,
        preserveState: true,
        onBefore: () => {
            subscribeSuccess.value = false
        },
        onSuccess: () => {
            subscribeSuccess.value = true
            subscribeForm.reset()
            subscribeForm.clearErrors()
            setTimeout(() => {
                subscribeSuccess.value = false
            }, 5000)
        },
        onError: () => {
            subscribeSuccess.value = false
        },
    })
    return false
}

const reinitTheme = () => {
    window.setTimeout(() => {
        if (typeof window.initConceptTheme === 'function') {
            window.initConceptTheme()
        }
    }, 50)
}

onMounted(() => {
    reinitTheme()
    const unregister = router.on('success', () => {
        window.scrollTo(0, 0)
        reinitTheme()
    })
    onUnmounted(() => {
        unregister()
    })
})
</script>
