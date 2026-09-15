<template>
    <div class="portfolio-item">
        <Link :href="cardUrl">
            <img :src="item.image_link" :alt="item.title">
            <div class="portfolio-overlay">
                <div class="caption">
                    <h5>{{ item.title }}</h5>
                    <span>{{ item.category_tag || item.summary }}</span>
                </div>
            </div>
        </Link>
    </div>
</template>

<script setup>
import { computed } from 'vue'
import { Link } from '@inertiajs/vue3'

const props = defineProps({
    item: { type: Object, required: true },
    variant: { type: String, default: 'default' },
})
const cardUrl = computed(() => {
    try {
        return route('use-cases.show', props.item.slug)
    } catch (e) {
        return '#'
    }
})
</script>
