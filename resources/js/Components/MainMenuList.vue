<template>
    <ul class="nav navbar-nav">
        <li class="hidden"><a href="#page-top"></a></li>
        <li :class="{ active: isActive('home', { exact: ['/'] }) }">
            <Link :href="route('home')">{{ trans('Home') }}</Link>
        </li>
        <li :class="{ active: isActive('about-us', { prefixes: ['/about-us'] }) }">
            <Link :href="route('about-us')">{{ trans('About Us') }}</Link>
        </li>
        <li :class="{ active: isActive(['services.index', 'services.show'], { prefixes: ['/services', '/service'] }) }">
            <Link :href="route('services.index')">{{ trans('Our Services') }}</Link>
        </li>
        <li :class="{ active: isActive(['use-cases.index', 'use-cases.show'], { prefixes: ['/use-cases', '/portfolio'] }) }">
            <Link :href="route('use-cases.index')">{{ trans('Case Studies') }}</Link>
        </li>
        <li :class="{ active: isActive(['product.index', 'product.show'], { prefixes: ['/products', '/product'] }) }">
            <Link :href="route('product.index')">{{ trans('Products') }}</Link>
        </li>
        <li :class="{ active: isActive(['blogs.index', 'blogs.show'], { prefixes: ['/blogs', '/blog'] }) }">
            <Link :href="route('blogs.index')">{{ trans('Blogs') }}</Link>
        </li>
        <li
            v-if="headerPages.length"
            :class="{ active: isActive('page.view', { prefixes: ['/p'] }) }"
        >
            <a href="#">{{ trans('Pages') }} <span class="caret"></span></a>
            <ul class="dropdown-menu">
                <li v-for="cmsPage in headerPages" :key="cmsPage.id" :class="{ active: isPageActive(cmsPage) }">
                    <Link :href="route('page.view', cmsPage.slug)">
                        {{ cmsPage.title[locale] }}
                    </Link>
                </li>
            </ul>
        </li>
        <li :class="{ active: isActive('contact-us', { prefixes: ['/contact-us'] }) }">
            <Link :href="route('contact-us')">{{ trans('Contact Us') }}</Link>
        </li>
    </ul>
    <ul class="nav navbar-nav pull-right">
        <li v-if="!auth" :class="{ active: isActive('login', { prefixes: ['/login'] }) }">
            <Link :href="loginUrl">{{ trans('Login') }}</Link>
        </li>
        <li v-if="auth?.type === 'admin'">
            <a :href="adminDashboardUrl">{{ trans('Dashboard') }}</a>
        </li>
        <li v-if="auth?.type === 'customer'">
            <a href="#">{{ auth.name }} <span class="caret"></span></a>
            <ul class="dropdown-menu">
                <li>
                    <Link :href="route('portal.dashboard')">{{ portalLabel('menu.my_dashboard') }}</Link>
                </li>
                <li>
                    <Link :href="route('portal.projects.index')">{{ portalLabel('menu.projects') }}</Link>
                </li>
                <li>
                    <Link :href="route('portal.tickets.index')">{{ portalLabel('menu.tickets') }}</Link>
                </li>
                <li>
                    <Link :href="route('logout')" method="post" as="a">{{ portalLabel('menu.logout') }}</Link>
                </li>
            </ul>
        </li>
        <li>
            <a href="#"><i class="fa fa-globe fa-lg"></i> {{ currentLanguageLabel }}<span class="caret"></span></a>
            <ul class="dropdown-menu">
                <li><a href="#" @click.prevent="switchLocale('en')">English</a></li>
                <li><a href="#" @click.prevent="switchLocale('ar')">العربية</a></li>
                <li><a href="#" @click.prevent="switchLocale('tr')">Türkçe</a></li>
                <li><a href="#" @click.prevent="switchLocale('de')">Deutsch</a></li>
            </ul>
        </li>
    </ul>
</template>

<script setup>
import { computed } from 'vue'
import { Link, usePage } from '@inertiajs/vue3'

const page = usePage()
const trans = (key) => page.props.translations[key] || key
const locale = computed(() => page.props.locale)
const headerPages = computed(() => page.props.headerPages || [])
const auth = computed(() => page.props.auth)
const portalTranslations = computed(() => page.props.portal?.translations || {})

const currentLanguageLabel = computed(() => {
    const labels = { en: 'English', ar: 'العربية', tr: 'Türkçe', de: 'Deutsch' }
    return labels[locale.value] || 'English'
})

const portalLabel = (key) => {
    const parts = key.split('.')
    let value = portalTranslations.value
    for (const part of parts) {
        value = value?.[part]
    }
    if (typeof value === 'string') {
        return value
    }
    const fallbacks = {
        'menu.my_dashboard': 'My Dashboard',
        'menu.projects': 'My Projects',
        'menu.tickets': 'My Tickets',
        'menu.logout': 'Logout',
    }
    return fallbacks[key] || key
}

const localizedPath = (path = '') => {
    const normalized = path.startsWith('/') ? path : `/${path}`
    const localePrefix = locale.value ? `/${locale.value}` : ''
    if (!localePrefix) {
        return normalized === '/' ? '/' : normalized
    }
    if (normalized === '/') {
        return localePrefix
    }
    return `${localePrefix}${normalized}`
}

const safeRoute = (name, fallbackPath = '/', params = undefined) => {
    try {
        return params !== undefined ? route(name, params) : route(name)
    } catch (e) {
        return localizedPath(fallbackPath)
    }
}

const loginUrl = computed(() => safeRoute('login', '/login'))
const adminDashboardUrl = computed(() => localizedPath('/admin/dashboard'))

const normalizePath = (path) => {
    if (!path) return ''
    const withoutQuery = path.split('?')[0]
    if (withoutQuery === '/') return '/'
    return withoutQuery.replace(/\/+$/, '')
}

const getPathFromUrl = (url) => {
    if (!url) return ''
    try {
        return new URL(url, window.location.origin).pathname
    } catch (e) {
        return url
    }
}

const expandPrefixes = (prefixes = []) => {
    const localePrefix = locale.value ? `/${locale.value}` : ''
    return prefixes.flatMap((prefix) => {
        const normalized = prefix.startsWith('/') ? prefix : `/${prefix}`
        if (!localePrefix) {
            return [normalized]
        }
        return [normalized, `${localePrefix}${normalized}`]
    })
}

const isActive = (routeName, options = {}) => {
    const routeNames = Array.isArray(routeName) ? routeName : [routeName]
    const prefixes = expandPrefixes(options.prefixes || [])
    const exactPaths = expandPrefixes(options.exact || [])
    const currentPath = normalizePath(page.url)
    const hasPathOptions = exactPaths.length > 0 || prefixes.length > 0

    if (exactPaths.some((path) => currentPath === normalizePath(path))) {
        return true
    }

    if (prefixes.some((prefix) => {
        const normalized = normalizePath(prefix)
        return currentPath === normalized || currentPath.startsWith(`${normalized}/`)
    })) {
        return true
    }

    if (hasPathOptions) {
        return false
    }

    try {
        return routeNames.some((name) => route().current(name))
    } catch (e) {
        return false
    }
}

const isCurrentUrl = (targetUrl) => {
    const targetPath = normalizePath(getPathFromUrl(targetUrl))
    const currentPath = normalizePath(page.url)
    return currentPath === targetPath
}

const isPageActive = (pageItem) => {
    if (!pageItem || !pageItem.slug) return false
    try {
        return isCurrentUrl(route('page.view', pageItem.slug))
    } catch (e) {
        return false
    }
}

const switchLocale = (newLocale) => {
    const currentPath = window.location.pathname
    const currentLocale = locale.value
    let pathWithoutLocale = currentPath
    if (currentLocale && currentPath.startsWith(`/${currentLocale}`)) {
        pathWithoutLocale = currentPath.substring(`/${currentLocale}`.length) || '/'
    }
    if (!pathWithoutLocale.startsWith('/')) {
        pathWithoutLocale = '/' + pathWithoutLocale
    }
    const newPath = `/${newLocale}${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`
    window.location.href = newPath + window.location.search + window.location.hash
}
</script>
