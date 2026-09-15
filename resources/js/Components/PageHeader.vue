<template>
    <header
        class="intro introhalf"
        :class="{ 'intro-compact': compact }"
        :data-background="background"
        :style="background ? { backgroundImage: `url(${background})` } : {}"
    >
        <div class="overlay"></div>
        <div class="intro-body">
            <div class="container">
                <div class="page-header-copy">
                    <h1>{{ title }}</h1>
                    <h4 class="page-breadcrumb">
                        <Link :href="route('home')">{{ trans('Home') }}</Link>
                        <template v-if="subtitle">
                            <span aria-hidden="true"> / </span>
                            <Link v-if="parentHref" :href="parentHref">{{ subtitle }}</Link>
                            <span v-else>{{ subtitle }}</span>
                        </template>
                        <template v-if="crumb">
                            <span aria-hidden="true"> / </span>
                            <span>{{ crumb }}</span>
                        </template>
                        <template v-if="!subtitle && !crumb">
                            <span aria-hidden="true"> / </span>
                            <span>{{ title }}</span>
                        </template>
                    </h4>
                </div>
            </div>
        </div>
    </header>
</template>

<script setup>
import { Link, usePage } from '@inertiajs/vue3'

defineProps({
    title: { type: String, required: true },
    subtitle: { type: String, default: '' },
    parentHref: { type: String, default: '' },
    crumb: { type: String, default: '' },
    background: { type: String, default: '' },
    compact: { type: Boolean, default: false },
})

const page = usePage()
const trans = (key) => page.props.translations[key] || key
</script>

<style scoped>
.page-header-copy {
    display: block;
    width: 100%;
    text-align: center;
}
.page-header-copy h1,
.page-breadcrumb {
    display: block;
    width: 100%;
    text-align: center;
}
.page-breadcrumb {
    margin: 12px 0 0;
    color: rgba(255, 255, 255, 0.85);
    font-size: 16px;
    unicode-bidi: isolate;
}
.page-breadcrumb a {
    color: #fff;
}
.intro-body,
.intro-body .container {
    width: 100%;
    text-align: center;
}
.intro-compact h1 {
    font-size: clamp(28px, 4vw, 48px);
    line-height: 1.25;
}
</style>
