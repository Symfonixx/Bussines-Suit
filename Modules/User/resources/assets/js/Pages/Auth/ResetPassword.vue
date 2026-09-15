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
            :title="trans('Reset Password')"
            :background="asset_path + 'theme/img/main/32.jpg'"
        />
        <section class="section-small">
            <div class="container">
                <div class="row">
                    <div class="col-md-4 col-md-offset-4">
                        <h2 class="text-center">{{ trans('Set New Password') }}</h2>
                        <div v-if="flash.success" class="alert alert-success">{{ flash.success }}</div>
                        <div v-if="flash.error" class="alert alert-danger">{{ flash.error }}</div>
                        <form @submit.prevent="form.post(route('password.update'))">
                            <input :value="form.token" name="token" type="hidden">
                            <div class="form-group">
                                <input id="email" class="form-control input-lg" v-model="form.email" type="email" autocomplete="email" :placeholder="trans('Email')" :disabled="form.processing" required>
                                <p v-if="errors.email" class="help-block text-danger">{{ errors.email }}</p>
                            </div>
                            <div class="form-group">
                                <input id="password" class="form-control input-lg" v-model="form.password" type="password" autocomplete="new-password" :placeholder="trans('Password')" :disabled="form.processing" required>
                                <p v-if="errors.password" class="help-block text-danger">{{ errors.password }}</p>
                            </div>
                            <div class="form-group">
                                <input id="password_confirmation" class="form-control input-lg" v-model="form.password_confirmation" type="password" autocomplete="new-password" :placeholder="trans('Confirm Password')" :disabled="form.processing" required>
                                <p v-if="errors.password_confirmation" class="help-block text-danger">{{ errors.password_confirmation }}</p>
                            </div>
                            <button class="btn btn-lg btn-dark btn-block" type="submit" :disabled="form.processing">
                                {{ form.processing ? trans('Resetting...') : trans('Reset Password') }}
                            </button>
                        </form>
                        <p class="text-center">
                            <Link :href="route('login')">{{ trans('Back to Login') }}</Link>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    </app-layout>
</template>


<script>
import {computed} from 'vue';
import {usePage, Link, useForm, Head} from '@inertiajs/vue3';
import AppLayout from '@/Layouts/App.vue';
import PageHeader from '@/Components/PageHeader.vue';

export default {
    components: {
        AppLayout, Link, Head, PageHeader
    },
    props: {
        errors: Object
    },
    setup() {
        const page = usePage();

           const locale = computed(() => page.props.locale)
        const seo = computed(() => page.props.seo)
        const settings = computed(() => page.props.settings || {})
        const asset_path = computed(() => page.props.asset_path || '')
        const flash = computed(() => page.props.flash || {})
        const meta = computed(() => page.props.meta || {})
        const trans = (key) => {
            try {
                return page.props.translations?.[key] || key;
            } catch (e) {
                return key;
            }
        };
        const metaTitle = computed(() => `${trans("Reset Password")} | ${seo.value.website_name || ''}`.trim())
        const metaDescription = computed(() => {
            return meta.value.description || trans('Set a new password to secure your account.')
        })
        const metaKeywords = computed(() => {
            return meta.value.keywords || trans('reset password, account security, set new password')
        })
        const metaImage = computed(() => {
            return meta.value?.og?.image || meta.value?.twitter?.image || settings.value?.meta_img || ''
        })
        const metaCanonical = computed(() => meta.value.canonical || '')
        const metaRobots = computed(() => meta.value.robots || 'noindex, nofollow')
        const params = new URLSearchParams(window.location.search);
        const form = useForm({
            email: '',
            password: '',
            password_confirmation: '',
            token: params.get('token') || ''
        });

        return {
            form,
            seo,
            locale,
            trans,
            asset_path,
            flash,
            metaTitle,
            metaDescription,
            metaKeywords,
            metaImage,
            metaCanonical,
            metaRobots
        };
    }
}

</script>

<style scoped>
.thm-btn.opacity-50 {
    opacity: 0.6;
}

input.error {
    border-color: #dc3545;
}

.text-danger {
    color: #dc3545;
}

.flash-message {
    border-radius: 10px;
    margin-bottom: 20px;
    padding: 12px 16px;
}

.flash-message--success {
    background-color: #d1e7dd;
    border: 1px solid #badbcc;
    color: #0f5132;
}

.flash-message--error {
    background-color: #f8d7da;
    border: 1px solid #f5c2c7;
    color: #842029;
}
</style>
