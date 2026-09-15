<template>
    <Head>
        <title>{{ metaTitle }}</title>
    </Head>
    <app-layout>
        <PageHeader
            :title="custom_page.title[locale]"
            :background="banner || (asset_path + 'theme/img/main/30.jpg')"
        />

        <section class="section-small">
            <div class="container">
                <div class="content">
                  <div v-html="custom_page.content[locale]"></div>
                </div>
            </div>
        </section>
     </app-layout>
</template>

<script setup>
import {computed} from 'vue'
import {usePage, Head, Link} from '@inertiajs/vue3'
import PageHeader from '@/Components/PageHeader.vue'

const page = usePage()
const trans = (key) => page.props.translations[key] || key;
const seo = computed(() => page.props.seo)
const custom_page = computed(() => page.props.custom_page)
const asset_path = computed(() => page.props.asset_path || '')
const locale = computed(() => page.props.locale || 'en')
const banner = computed(() => page.props.banner)

const metaTitle = computed(() => {
    const pageTitle = custom_page.value?.title?.[locale.value] || ''
    return `${pageTitle} | ${seo.value.website_name || ''}`.trim()
})
</script>
<script>


import AppLayout from '@/Layouts/App.vue';

export default {
    components: {
        AppLayout
    }

};
</script>
