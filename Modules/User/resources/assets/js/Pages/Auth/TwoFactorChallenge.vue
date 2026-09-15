<template>
    <Head>
        <title>{{ metaTitle }}</title>
        <meta name="description" :content="metaDescription">
        <meta name="robots" content="noindex, nofollow">
    </Head>

    <app-layout>
        <PageHeader
            :title="trans('Two-Factor Authentication')"
            :background="asset_path + 'theme/img/main/32.jpg'"
        />
        <section class="section-small">
            <div class="container">
                <div class="row">
                    <div class="col-md-4 col-md-offset-4">
                        <h2 class="text-center">{{ trans('Two-Factor Authentication') }}</h2>
                        <p class="text-center">
                            {{ trans('Please confirm access to your account by entering the authentication code provided by your authenticator application.') }}
                        </p>
                        <form @submit.prevent="submit">
                            <div v-if="!useRecoveryCode" class="form-group">
                                <input
                                    class="form-control input-lg"
                                    v-model="form.code"
                                    type="text"
                                    inputmode="numeric"
                                    autocomplete="one-time-code"
                                    :placeholder="trans('Authentication Code')"
                                    :disabled="form.processing"
                                    required
                                    autofocus
                                >
                                <p v-if="form.errors.code" class="help-block text-danger">{{ form.errors.code }}</p>
                            </div>
                            <div v-else class="form-group">
                                <input
                                    class="form-control input-lg"
                                    v-model="form.recovery_code"
                                    type="text"
                                    autocomplete="one-time-code"
                                    :placeholder="trans('Recovery Code')"
                                    :disabled="form.processing"
                                    required
                                    autofocus
                                >
                                <p v-if="form.errors.recovery_code" class="help-block text-danger">{{ form.errors.recovery_code }}</p>
                            </div>
                            <p class="text-center">
                                <button type="button" class="btn btn-link" :disabled="form.processing" @click="toggleRecovery">
                                    {{ useRecoveryCode ? trans('Use an authentication code') : trans('Use a recovery code') }}
                                </button>
                            </p>
                            <button class="btn btn-lg btn-dark btn-block" type="submit" :disabled="form.processing">
                                {{ form.processing ? trans('Signing In...') : trans('Login') }}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    </app-layout>
</template>

<script>
import { computed, ref } from 'vue';
import { usePage, useForm, Head } from '@inertiajs/vue3';
import AppLayout from '@/Layouts/App.vue';
import PageHeader from '@/Components/PageHeader.vue';

export default {
    components: {
        AppLayout,
        Head,
        PageHeader,
    },
    setup() {
        const page = usePage();
        const useRecoveryCode = ref(false);

        const locale = computed(() => page.props.locale);
        const seo = computed(() => page.props.seo);
        const asset_path = computed(() => page.props.asset_path || '');
        const meta = computed(() => page.props.meta || {});

        const trans = (key) => {
            try {
                return page.props.translations?.[key] || key;
            } catch (e) {
                return key;
            }
        };

        const metaTitle = computed(() => `${trans('Two-Factor Authentication')} | ${seo.value.website_name || ''}`.trim());
        const metaDescription = computed(() => {
            return meta.value.description || trans('Please confirm access to your account by entering the authentication code provided by your authenticator application.');
        });

        const form = useForm({
            code: '',
            recovery_code: '',
        });

        const toggleRecovery = () => {
            useRecoveryCode.value = !useRecoveryCode.value;
            form.code = '';
            form.recovery_code = '';
            form.clearErrors();
        };

        const submit = () => {
            form.post(route('two-factor.login.store'), {
                preserveScroll: true,
            });
        };

        return {
            form,
            locale,
            trans,
            asset_path,
            metaTitle,
            metaDescription,
            useRecoveryCode,
            toggleRecovery,
            submit,
        };
    },
};
</script>
