<template>
    <nav
        v-if="!isPortalPage"
        class="navbar navbar-Concept navbar-center navbar-custom navbar-fixed-top"
        :class="{ 'nav-bright': isHome }"
    >
        <div class="container">
            <div class="navbar-header">
                <button
                    class="navbar-toggle"
                    type="button"
                    data-toggle="collapse"
                    data-target=".navbar-main-collapse"
                >
                    <span class="sr-only">{{ trans('Toggle navigation') }}</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <Link class="navbar-brand page-scroll" :href="route('home')" :aria-label="trans('Symfonix home page')">
                    <img v-if="logoSrc" class="logo" :src="logoSrc" :alt="brandName">
                    <img v-if="logoSrc" class="logodark" :src="logoSrc" :alt="brandName">
                    <span v-if="!logoSrc" class="logodark">{{ brandName }}</span>
                </Link>
            </div>
            <div class="collapse navbar-collapse navbar-main-collapse">
                <MainMenuList />
            </div>
        </div>
    </nav>
</template>

<script setup>
import { computed } from 'vue'
import { Link, usePage } from '@inertiajs/vue3'
import MainMenuList from '@/Components/MainMenuList.vue'

const page = usePage()
const trans = (key) => page.props.translations[key] || key
const settings = computed(() => page.props.settings || {})
const storage_path = computed(() => page.props.storage_path || '')
const seo = computed(() => page.props.seo || {})
const brandName = computed(() => seo.value?.website_name || page.props.appName || 'Symfonix')
const isPortalPage = computed(() => /\/portal(\/|$)/.test(page.url))
const isHome = computed(() => {
    const url = (page.url || '').split('?')[0]
    return url === '/' || /^\/[a-z]{2}\/?$/.test(url)
})

const logoSrc = computed(() => {
    const logo = settings.value?.site_logo
    if (!logo || logo === false || logo === 'false' || logo === 'default.jpg') {
        return ''
    }
    if (/^https?:\/\//i.test(logo) || String(logo).startsWith('//') || String(logo).startsWith('/')) {
        return logo
    }
    return `${storage_path.value}${logo}`
})
</script>

<style scoped>
.navbar-brand img {
    max-height: 36px;
    width: auto;
}

:deep(.nav > li > a) {
    position: relative;
}

:deep(.nav > li > a:hover),
:deep(.nav > li > a:focus) {
    color: #7fc457;
}

:deep(.nav li.active a),
:deep(.nav li.active a:hover),
:deep(.nav li.active a:focus) {
    color: #7fc457 !important;
}

:deep(.nav > li.active > a::after) {
    content: "";
    position: absolute;
    left: 13px;
    right: 13px;
    bottom: 8px;
    height: 2px;
    background-color: #7fc457;
    border-radius: 2px;
}
</style>
