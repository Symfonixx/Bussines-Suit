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
        <header class="intro intro-fullscreen" :style="{ backgroundImage: `url(${asset_path}theme/img/main/33.jpg)` }">
            <div class="overlay"></div>
            <div class="intro-body">
                <h2>{{ trans('Register') }}</h2>
                <div class="container">
                    <div class="row">
                        <div class="col-md-4 col-md-offset-4">
                            <div v-if="flash.success" class="alert alert-success">{{ flash.success }}</div>
                            <div v-if="flash.error" class="alert alert-danger">{{ flash.error }}</div>
                            <form class="form-signin" @submit.prevent="form.post(route('register'))">
                                <div class="form-group">
                                    <input class="form-control input-lg" id="formName" v-model="form.name" type="text" :placeholder="trans('Name')" :disabled="form.processing" required>
                                    <p v-if="errors.name" class="help-block text-danger">{{ errors.name }}</p>
                                </div>
                                <div class="form-group">
                                    <input class="form-control input-lg" id="formEmail" v-model="form.email" type="email" :placeholder="trans('Email')" :disabled="form.processing" required>
                                    <p v-if="errors.email" class="help-block text-danger">{{ errors.email }}</p>
                                </div>
                                <div class="form-group">
                                    <input class="form-control input-lg" id="formPhone" v-model="form.mobile" type="text" :placeholder="trans('Phone')" :disabled="form.processing" required>
                                    <p v-if="errors.mobile" class="help-block text-danger">{{ errors.mobile }}</p>
                                </div>
                                <div class="form-group">
                                    <input class="form-control input-lg" id="formPassword" v-model="form.password" type="password" :placeholder="trans('Password')" :disabled="form.processing" required>
                                    <p v-if="errors.password" class="help-block text-danger">{{ errors.password }}</p>
                                </div>
                                <div class="form-group">
                                    <input class="form-control input-lg" id="formPasswordConfirm" v-model="form.password_confirmation" type="password" :placeholder="trans('Confirm Password')" :disabled="form.processing" required>
                                    <p v-if="errors.password_confirmation" class="help-block text-danger">{{ errors.password_confirmation }}</p>
                                </div>
                                <button class="btn btn-lg btn-dark btn-block" type="submit" :disabled="form.processing">
                                    {{ form.processing ? trans('Registering...') : trans('Register') }}
                                </button>
                            </form>
                            <p class="text-center">
                                {{ trans('Already Have An Account?') }}
                                <Link :href="route('login')">{{ trans('Login') }}</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    </app-layout>
</template>


<script>
import {computed} from 'vue';
import {usePage, Link, useForm, Head} from '@inertiajs/vue3';
import AppLayout from '@/Layouts/App.vue';

export default {
    components: {
        AppLayout, Link, Head
    },
    props: {
        errors: Object
    },
    setup() {
        const page = usePage();

           const locale = computed(() => page.props.locale)
        const seo = computed(() => page.props.seo)
        const settings = computed(() => page.props.settings || {})
        const asset_path = computed(() => page.props.asset_path)
        const flash = computed(() => page.props.flash || {})
        const meta = computed(() => page.props.meta || {})
        const trans = (key) => {
            try {
                return page.props.translations?.[key] || key;
            } catch (e) {
                return key;
            }
        };

        const metaTitle = computed(() => `${trans("Register")} | ${seo.value.website_name || ''}`.trim())
        const metaDescription = computed(() => {
            return meta.value.description || trans('Create a new account to access our services.')
        })
        const metaKeywords = computed(() => {
            return meta.value.keywords || trans('register, sign up, create account')
        })
        const metaImage = computed(() => {
            return meta.value?.og?.image || meta.value?.twitter?.image || settings.value?.meta_img || ''
        })
        const metaCanonical = computed(() => meta.value.canonical || '')
        const metaRobots = computed(() => meta.value.robots || 'noindex, nofollow')

        const form = useForm({
            name: '',
            email: '',
            mobile: '',
            password: '',
            password_confirmation: '',

        });

        return {
            form,
            seo,
            trans,
            locale,
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
