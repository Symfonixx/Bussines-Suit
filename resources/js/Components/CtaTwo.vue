<template>
    <section class="section-small bg-gray2 action">
        <div class="container">
            <div class="row">
                <div class="col-md-3">
                    <h2 class="no-pad">{{ trans('Have an idea?') }}</h2>
                </div>
                <div class="col-md-4 col-md-offset-1">
                    <p class="no-pad">
                        {{ trans('Are you ready to take your project to the next stage?') }}
                    </p>
                </div>
                <div class="col-md-2 col-md-offset-1">
                    <Link class="btn btn-dark btn-lg" :href="route('contact-us')">
                        {{ trans('Get Started') }}
                    </Link>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { Link, usePage } from '@inertiajs/vue3'

const page = usePage()
const trans = (key) => page.props.translations[key] || key
</script>
