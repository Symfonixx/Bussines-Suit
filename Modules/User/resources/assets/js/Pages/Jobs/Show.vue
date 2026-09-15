<template>
    <Head :title="metaTitle">
    </Head>
    <AppLayout>
        <PageHeader
            :title="position.title"
            :subtitle="trans('Careers')"
            :background="asset_path + 'theme/img/main/30.jpg'"
        />

        <section class="job-detail py-5">
            <div class="container">
                <div class="row g-5">
                    <div class="col-lg-7">
                        <span class="job-department">{{ position.department }}</span>
                        <h2 class="mt-2">{{ position.title }}</h2>
                        <div class="job-meta mb-3">
                            <span><i class="fas fa-map-marker-alt"></i>{{ position.location }}</span>
                            <span><i class="fas fa-briefcase"></i>{{ formatEmploymentType(position.employment_type) }}</span>
                        </div>
                        <p class="text-muted">{{ trans('Posted') }}: {{ formatDate(position.posted_at) }}</p>
                        <div class="job-content">
                            <h3>{{ trans('About the role') }}</h3>
                            <div class="job-rich-content" v-html="position.description"></div>
                            <template v-if="position.requirements">
                                <h3>{{ trans('Requirements') }}</h3>
                                <div class="job-rich-content" v-html="position.requirements"></div>
                            </template>
                        </div>
                    </div>
                    <div class="col-lg-5">
                        <form class="job-form" @submit.prevent="submit">
                            <h3 class="job-form__title">{{ trans('Apply for this role') }}</h3>
                            <div v-if="success" class="alert alert-success">{{ trans('Your application has been submitted successfully.') }}</div>
                            <div class="mb-3">
                                <label for="full_name" class="form-label">{{ trans('Full Name') }} <span class="required-mark">*</span></label>
                                <input id="full_name" v-model="form.full_name" type="text" class="form-control" :class="{'is-invalid': form.errors.full_name}" required>
                                <div class="invalid-feedback">{{ form.errors.full_name }}</div>
                            </div>
                            <div class="mb-3">
                                <label for="email" class="form-label">{{ trans('Email') }} <span class="required-mark">*</span></label>
                                <input id="email" v-model="form.email" type="email" class="form-control" :class="{'is-invalid': form.errors.email}" required>
                                <div class="invalid-feedback">{{ form.errors.email }}</div>
                            </div>
                            <div class="mb-3">
                                <label for="phone" class="form-label">{{ trans('Phone') }} <span class="required-mark">*</span></label>
                                <input id="phone" v-model="form.phone" type="tel" class="form-control" :class="{'is-invalid': form.errors.phone}" required>
                                <div class="invalid-feedback">{{ form.errors.phone }}</div>
                            </div>
                            <div class="mb-3">
                                <label for="expected_salary" class="form-label">{{ trans('Expected Salary') }}</label>
                                <div class="input-group">
                                    <input id="expected_salary" v-model="form.expected_salary" type="number" min="0" step="0.01" class="form-control" :class="{'is-invalid': form.errors.expected_salary}">
                                    <span class="input-group-text">USD</span>
                                </div>
                                <div class="invalid-feedback">{{ form.errors.expected_salary }}</div>
                            </div>
                            <div class="mb-3">
                                <label for="motivation" class="form-label">{{ trans('Why do you want to work with us?') }} <span class="required-mark">*</span></label>
                                <textarea id="motivation" v-model="form.motivation" rows="4" class="form-control" :class="{'is-invalid': form.errors.motivation}" required></textarea>
                                <div class="invalid-feedback">{{ form.errors.motivation }}</div>
                            </div>
                            <div class="mb-3">
                                <label for="cover_letter" class="form-label">{{ trans('Cover Letter') }}</label>
                                <textarea id="cover_letter" v-model="form.cover_letter" rows="5" class="form-control" :class="{'is-invalid': form.errors.cover_letter}"></textarea>
                                <div class="invalid-feedback">{{ form.errors.cover_letter }}</div>
                            </div>
                            <div class="mb-4">
                                <label for="resume" class="form-label">{{ trans('Resume / CV') }} <span class="required-mark">*</span></label>
                                <input id="resume" type="file" accept=".pdf,.doc,.docx" class="form-control" :class="{'is-invalid': form.errors.resume}" required @change="form.resume = $event.target.files[0]">
                                <div class="form-text">{{ trans('Accepted file types: PDF, DOC, DOCX. Maximum size: 5 MB.') }}</div>
                                <div class="invalid-feedback">{{ form.errors.resume }}</div>
                            </div>
                            <button class="btn btn-dark" type="submit" :disabled="form.processing">
                                {{ form.processing ? trans('Submitting...') : trans('Submit Application') }}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    </AppLayout>
</template>

<script setup>
import {computed, ref} from 'vue'
import {Head, Link, useForm, usePage} from '@inertiajs/vue3'
import AppLayout from '@/Layouts/App.vue'
import PageHeader from '@/Components/PageHeader.vue'

const props = defineProps({position: {type: Object, required: true}})
const page = usePage()
const trans = (key) => page.props.translations[key] || key
const locale = computed(() => page.props.locale || 'en')
const asset_path = computed(() => page.props.asset_path || '')
const success = ref(false)
const metaTitle = computed(() => page.props.meta?.title || `${props.position.title} | ${page.props.seo?.website_name || page.props.appName}`)
const form = useForm({full_name: '', email: '', phone: '', expected_salary: '', motivation: '', cover_letter: '', resume: null})

const formatDate = (value) => new Intl.DateTimeFormat(locale.value, {year: 'numeric', month: 'long', day: 'numeric'}).format(new Date(`${value}T00:00:00`))
const formatEmploymentType = (value) => trans(String(value || '').replaceAll('_', ' ').replace(/\b\w/g, (letter) => letter.toUpperCase()))
const submit = () => form.post(route('jobs.apply', props.position.slug), {
    forceFormData: true,
    preserveScroll: true,
    onSuccess: () => { success.value = true; form.reset() },
    onError: () => { success.value = false },
})
</script>

<style scoped>
.job-detail { background: #f7f7f7; color: #222; }
.job-detail h2,
.job-detail h3,
.job-detail .form-label { color: #111; }
.job-content h3 { margin-top: 24px; font-size: 1.2rem; }
.job-department { font-weight: 700; text-transform: uppercase; letter-spacing: .08em; font-size: .8rem; }
.job-meta { display: flex; flex-wrap: wrap; gap: 12px 20px; }
.job-form { background: #fff; border: 1px solid #eee; padding: 24px; }
.job-form__title { margin-bottom: 24px; }
.required-mark { color: #ef4444; font-weight: 700; }
.job-rich-content :deep(p),
.job-rich-content :deep(ul),
.job-rich-content :deep(ol) { margin-bottom: 1rem; }
</style>
