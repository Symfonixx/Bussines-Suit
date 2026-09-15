<template>
    <div class="portfolio-item">
        <Link :href="cardUrl">
            <img :src="item.main_image_link" :alt="item.name">
            <div class="portfolio-overlay">
                <div class="caption">
                    <h5>{{ item.name }}</h5>
                    <span>{{ item.category?.name || trans('Products') }}</span>
                </div>
            </div>
        </Link>
    </div>
</template>

<script setup>
import { computed } from 'vue'
import { Link, usePage } from '@inertiajs/vue3'

const page = usePage()
const trans = (key) => page.props.translations[key] || key
const props = defineProps({
    item: { type: Object, required: true },
    variant: { type: String, default: 'default' },
})
const cardUrl = computed(() => {
    try {
        return route('product.show', props.item.slug)
    } catch (e) {
        return '#'
    }
})
</script>
