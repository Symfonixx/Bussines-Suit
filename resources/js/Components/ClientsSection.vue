<template>
    <section v-if="clients.length" class="section-small" id="partners">
        <div class="container text-center">
            <h2>{{ trans('Our Clients') }}</h2>
            <div class="row wow fadeInUp">
                <div v-for="client in clients.slice(0, 6)" :key="client.id" class="col-md-2">
                    <a v-if="client.url" :href="client.url" target="_blank" rel="noopener noreferrer">
                        <img class="center-block img-responsive" :src="client.logo_link" :alt="client.name">
                    </a>
                    <img v-else class="center-block img-responsive" :src="client.logo_link" :alt="client.name">
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { computed } from 'vue'
import { usePage } from '@inertiajs/vue3'

const page = usePage()
const trans = (key) => page.props.translations[key] || key
defineProps({
    clients: { type: Array, default: () => [] },
})
</script>
