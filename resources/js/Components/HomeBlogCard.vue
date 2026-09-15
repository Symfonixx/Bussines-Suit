<template>
    <div class="wow fadeIn">
        <Link :href="postUrl">
            <img class="img-responsive center-block news-card-image" :src="imageSrc" :alt="localize(post.title)" @error="handleImageError">
            <h5>{{ truncate(localize(post.title), 70) }}</h5>
        </Link>
        <p>{{ truncate(localize(post.description), 140) }}</p>
        <Link class="btn btn-gray btn-xs" :href="postUrl">{{ trans('Read More') }}</Link>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { Link, usePage } from '@inertiajs/vue3'

const page = usePage()
const trans = (key) => page.props.translations[key] || key
const props = defineProps({
    post: { type: Object, required: true },
    variant: { type: String, default: 'featured' },
    locale: { type: String, default: 'en' },
    assetPath: { type: String, default: '' },
    imageFallbackIndex: { type: Number, default: 1 },
    preferTheme: { type: Boolean, default: false },
})

const imageFailed = ref(false)

const translateField = (value) => {
    if (!value) return ''
    if (typeof value === 'string') return value
    if (typeof value === 'object') {
        return value[props.locale] || value.en || Object.values(value)[0] || ''
    }
    return ''
}

const truncate = (text, length) => {
    const str = String(text || '')
    if (str.length <= length) return str
    return `${str.slice(0, length).trim()}…`
}

const postUrl = computed(() => {
    try {
        return route('blogs.show', props.post.slug)
    } catch (e) {
        return '#'
    }
})

const localize = (value) => {
    const text = translateField(value)
    if (!text) return ''
    return trans(text)
}

const fallbackImage = computed(() => `${props.assetPath}theme/img/main/${42 + (props.imageFallbackIndex || 1)}.jpg`)

const imageSrc = computed(() => {
    if (props.preferTheme || imageFailed.value) {
        return fallbackImage.value
    }
    const src = props.post.image_link || ''
    if (!src || src.includes('blank.png')) {
        return fallbackImage.value
    }
    return src
})

const handleImageError = () => {
    imageFailed.value = true
}
</script>
