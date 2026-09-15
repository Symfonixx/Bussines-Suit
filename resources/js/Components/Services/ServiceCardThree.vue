<template>
    <article class="service-card" :class="{ 'service-card--featured': featured }">
        <Link :href="link" class="service-card__link">
            <div v-if="hasImage && imageUsable" class="service-card__media">
                <img :src="image" :alt="title" loading="lazy" decoding="async" @load="onImageLoad">
                <span v-if="featured" class="service-card__badge">{{ trans('Featured') }}</span>
            </div>
            <div class="service-card__body">
                <p v-if="featured && !(hasImage && imageUsable)" class="service-card__featured-label">{{ trans('Featured') }}</p>
                <p v-if="categoryLabel" class="service-card__category">{{ categoryLabel }}</p>
                <h3 class="service-card__title">
                    <i v-if="!(hasImage && imageUsable)" :class="[iconClass, 'icon-big']" aria-hidden="true"></i>
                    {{ title }}
                </h3>
                <p v-if="excerptText" class="service-card__excerpt">{{ excerptText }}</p>
                <ul v-if="visibleHighlights.length" class="service-card__tags list-unstyled">
                    <li v-for="tag in visibleHighlights" :key="tag">{{ tag }}</li>
                </ul>
                <div class="service-card__footer">
                    <span class="btn btn-dark btn-xs">{{ buttonText }}</span>
                    <span v-if="Number(readingTime)" class="service-card__meta">
                        <i class="far fa-clock" aria-hidden="true"></i>
                        {{ readingTime }} {{ readingTimeLabel }}
                    </span>
                </div>
            </div>
        </Link>
    </article>
</template>

<script setup>
import { computed, ref } from 'vue'
import { Link, usePage } from '@inertiajs/vue3'

const page = usePage()
const trans = (key) => page.props.translations?.[key] || key

const props = defineProps({
    title: { type: String, required: true },
    shortDesc: { type: String, default: '' },
    description: { type: String, default: '' },
    highlights: { type: Array, default: () => [] },
    link: { type: String, required: true },
    image: { type: String, default: '' },
    buttonLabel: { type: String, default: 'Read More' },
    isRtl: { type: Boolean, default: false },
    readingTime: { type: [Number, String], default: 0 },
    readingTimeLabel: { type: String, default: 'min read' },
    category: { type: String, default: '' },
    featured: { type: Boolean, default: false },
    iconClass: { type: String, default: 'ion-ios-analytics-outline' },
})

const buttonText = computed(() => trans(props.buttonLabel))
const categoryLabel = computed(() => props.category || '')

const imageUsable = ref(true)

const hasImage = computed(() => {
    const src = String(props.image || '')
    return src !== '' && !src.includes('blank.png')
})

const onImageLoad = (event) => {
    const img = event?.target
    if (!img) {
        return
    }
    imageUsable.value = img.naturalWidth >= 240 && img.naturalHeight >= 80
}

const excerptText = computed(() => {
    const raw = props.shortDesc || props.description || ''
    const text = String(raw).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
    if (text.length <= 140) {
        return text
    }
    return `${text.slice(0, 140).trim()}…`
})

const visibleHighlights = computed(() => {
    return (props.highlights || [])
        .map((item) => String(item || '').trim())
        .filter(Boolean)
        .slice(0, 3)
})
</script>

<style scoped>
.service-card {
    height: 100%;
    background: #fff;
    border: 1px solid #eee;
    text-align: left;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
}
.service-card:hover {
    border-color: #ccc;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
}
.service-card__link {
    display: flex;
    flex-direction: column;
    height: 100%;
    color: inherit;
    text-decoration: none;
}
.service-card__link:hover,
.service-card__link:focus {
    color: inherit;
    text-decoration: none;
}
.service-card__media {
    position: relative;
    overflow: hidden;
    height: 200px;
    background: #f5f5f5;
}
.service-card__media img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.4s ease;
}
.service-card:hover .service-card__media img {
    transform: scale(1.06);
}
.service-card__badge {
    position: absolute;
    top: 12px;
    inset-inline-start: 12px;
    padding: 4px 10px;
    background: #18191B;
    color: #fff;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
}
.service-card__body {
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: 22px 22px 24px;
}
.service-card__category {
    margin: 0 0 8px;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #777;
}
.service-card__featured-label {
    margin: 0 0 8px;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: #18191B;
}
.service-card__title {
    margin: 0 0 12px;
    font-size: 22px;
    line-height: 1.3;
    color: #111;
    text-transform: none;
}
.service-card__title .icon-big {
    display: block;
    margin-bottom: 8px;
}
.service-card__excerpt {
    margin: 0 0 16px;
    font-size: 15px;
    line-height: 1.7;
    color: #555;
}
.service-card__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin: 0 0 18px;
    padding: 0;
}
.service-card__tags li {
    padding: 4px 10px;
    background: #f5f5f5;
    border: 1px solid #eee;
    font-size: 12px;
    color: #555;
}
.service-card__footer .btn {
    margin: 0;
}
.service-card__meta {
    font-size: 13px;
    color: #777;
    white-space: nowrap;
}
.service-card__meta i {
    margin-inline-end: 6px;
}

html[dir="rtl"] .service-card {
    text-align: right;
}
</style>
