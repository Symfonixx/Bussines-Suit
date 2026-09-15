<template>
    <Head>
        <title>{{ metaTitle }}</title>
        <meta name="description" :content="metaDescription">
        <meta name="keywords" :content="metaKeywords">
        <meta name="robots" :content="metaRobots">
        <link v-if="metaCanonical" rel="canonical" :href="metaCanonical">
        <meta property="og:title" :content="metaTitle">
        <meta property="og:description" :content="metaDescription">
        <meta v-if="metaImage" property="og:image" :content="metaImage">
        <meta v-if="metaCanonical" property="og:url" :content="metaCanonical">
        <meta property="og:type" content="article">
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:title" :content="metaTitle">
        <meta name="twitter:description" :content="metaDescription">
        <meta v-if="metaImage" name="twitter:image" :content="metaImage">
    </Head>
    <app-layout>
        <PageHeader
            :title="blog.title"
            :subtitle="trans('Blogs')"
            :parent-href="route('blogs.index')"
            :crumb="blog.created_at_formatted || ''"
            :background="headerBackground"
            compact
        />

        <section class="section-small" id="news-single">
            <div class="container">
                <div class="row">
                    <article class="col-md-8 news-article">
                        <p v-if="blog.description" class="news-lead">{{ blog.description }}</p>

                        <img
                            v-if="blog.image_link"
                            class="img-responsive news-hero"
                            :src="blog.image_link"
                            :alt="blog.title"
                            loading="lazy"
                            decoding="async"
                        >

                        <ul class="list-inline news-meta">
                            <li v-if="blog.created_at_formatted">
                                <i class="fa fa-calendar" aria-hidden="true"></i>
                                {{ blog.created_at_formatted }}
                            </li>
                            <li v-if="blog.reading_time">
                                <i class="fa fa-clock" aria-hidden="true"></i>
                                {{ blog.reading_time }} {{ trans('min read') }}
                            </li>
                            <li v-if="blog.category">
                                <i class="fa fa-folder-open" aria-hidden="true"></i>
                                <Link :href="route('blogs.index', { category: blog.category.slug })">
                                    {{ blog.category.name }}
                                </Link>
                            </li>
                        </ul>

                        <div class="news-content" v-html="blog.content"></div>

                        <div class="news-footer">
                            <div v-if="keywordList.length" class="news-tags">
                                <strong>{{ trans('Tags') }}:</strong>
                                <Link
                                    v-for="keyword in keywordList"
                                    :key="keyword"
                                    class="btn btn-gray btn-xs"
                                    :href="route('blogs.index', { search: keyword })"
                                >{{ keyword }}</Link>
                            </div>
                            <div class="news-share">
                                <strong>{{ trans('Share On:') }}</strong>
                                <a :href="getShareUrl('facebook')" target="_blank" rel="noopener" aria-label="Facebook">
                                    <i class="fab fa-facebook-f fa-fw"></i>
                                </a>
                                <a :href="getShareUrl('twitter')" target="_blank" rel="noopener" aria-label="Twitter">
                                    <i class="fab fa-twitter fa-fw"></i>
                                </a>
                                <a :href="getShareUrl('linkedin')" target="_blank" rel="noopener" aria-label="LinkedIn">
                                    <i class="fab fa-linkedin-in fa-fw"></i>
                                </a>
                                <a :href="getShareUrl('whatsapp')" target="_blank" rel="noopener" aria-label="WhatsApp">
                                    <i class="fab fa-whatsapp fa-fw"></i>
                                </a>
                            </div>
                        </div>
                    </article>

                    <aside class="col-md-3 col-md-offset-1 news-sidebar">
                        <form class="form-inline subscribe-form" @submit.prevent="handleSearch">
                            <div class="input-group">
                                <input
                                    class="form-control"
                                    type="search"
                                    v-model="searchQuery"
                                    :placeholder="trans('Search Blogs')"
                                >
                                <span class="input-group-btn">
                                    <button class="btn btn-dark" type="submit" :aria-label="trans('Search')">
                                        <i class="fa fa-search"></i>
                                    </button>
                                </span>
                            </div>
                        </form>
                        <hr>
                        <h4>{{ trans('Categories') }}</h4>
                        <ul class="list-unstyled news-cats">
                            <li v-for="category in categories" :key="category.id">
                                <Link
                                    :href="route('blogs.index', { category: category.slug })"
                                    :class="{ active: blog.category?.slug === category.slug }"
                                >
                                    {{ category.name }}
                                    <span>({{ category.blogs_count }})</span>
                                </Link>
                            </li>
                        </ul>
                        <hr>
                        <h4>{{ trans('Recent Post') }}</h4>
                        <ul class="list-unstyled recent-posts">
                            <li v-for="recentPost in recentPosts" :key="recentPost.id" class="recent-post">
                                <Link :href="route('blogs.show', recentPost.slug)">
                                    <img
                                        :src="recentPost.image_link || fallbackImage"
                                        :alt="recentPost.title"
                                        loading="lazy"
                                        decoding="async"
                                    >
                                    <span class="recent-post__body">
                                        <strong>{{ recentPost.title }}</strong>
                                        <small v-if="recentPost.created_at">{{ recentPost.created_at }}</small>
                                    </span>
                                </Link>
                            </li>
                        </ul>
                    </aside>
                </div>
            </div>
        </section>

        <section v-if="relatedBlogs.length" class="section-small bg-white">
            <div class="container grid-pad">
                <h3>{{ trans('Related Blogs') }}</h3>
                <div class="row">
                    <div
                        v-for="relatedBlog in relatedBlogs"
                        :key="relatedBlog.id"
                        class="col-sm-6 col-md-4"
                    >
                        <Link :href="route('blogs.show', relatedBlog.slug)">
                            <img
                                class="img-responsive center-block"
                                :src="relatedBlog.image_link || fallbackImage"
                                :alt="relatedBlog.title"
                                loading="lazy"
                                decoding="async"
                            >
                            <h5>{{ relatedBlog.title }}</h5>
                        </Link>
                        <p v-if="relatedExcerpt(relatedBlog)">{{ relatedExcerpt(relatedBlog) }}</p>
                    </div>
                </div>
            </div>
        </section>

        <div class="section section-small">
            <div class="container">
                <nav aria-label="blog pagination">
                    <ul class="news-pager">
                        <li class="news-pager__side">
                            <Link
                                v-if="previousPost"
                                class="text-muted"
                                :href="route('blogs.show', previousPost.slug)"
                            >
                                <i :class="isRtl ? 'fa fa-angle-right' : 'fa fa-angle-left'"></i>
                                {{ trans('Prev Blog') }}
                                <span class="news-pager__title">{{ previousPost.title }}</span>
                            </Link>
                        </li>
                        <li class="news-pager__index">
                            <Link :href="route('blogs.index')" :aria-label="trans('All Blogs')">
                                <i class="fa fa-th fa-2x"></i>
                            </Link>
                        </li>
                        <li class="news-pager__side news-pager__side--end">
                            <Link
                                v-if="nextPost"
                                class="text-muted"
                                :href="route('blogs.show', nextPost.slug)"
                            >
                                {{ trans('Next Blog') }}
                                <i :class="isRtl ? 'fa fa-angle-left' : 'fa fa-angle-right'"></i>
                                <span class="news-pager__title">{{ nextPost.title }}</span>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>

        <CtaTwo />
    </app-layout>
</template>

<script setup>
import { computed, ref } from 'vue'
import { Head, Link, router, usePage } from '@inertiajs/vue3'
import AppLayout from '@/Layouts/App.vue'
import CtaTwo from '@/Components/CtaTwo.vue'
import PageHeader from '@/Components/PageHeader.vue'

const page = usePage()
const trans = (key) => page.props.translations[key] || key
const asset_path = computed(() => page.props.asset_path || '')
const locale = computed(() => page.props.locale || 'en')
const isRtl = computed(() => locale.value === 'ar')
const blog = computed(() => page.props.blog || {})
const relatedBlogs = computed(() => page.props.relatedBlogs || [])
const categories = computed(() => page.props.categories || [])
const recentPosts = computed(() => page.props.recentPosts || [])
const previousPost = computed(() => page.props.previousPost)
const nextPost = computed(() => page.props.nextPost)
const meta = computed(() => page.props.meta || {})
const seo = computed(() => page.props.seo || {})
const settings = computed(() => page.props.settings || {})

const fallbackImage = computed(() => `${asset_path.value}theme/img/main/12.jpg`)
const headerBackground = computed(() => fallbackImage.value)

const metaTitle = computed(() => meta.value.title || blog.value?.title || '')
const metaDescription = computed(() => meta.value.description || blog.value?.description || seo.value.website_desc || '')
const metaKeywords = computed(() => meta.value.keywords || blog.value?.keywords || seo.value.website_keywords || '')
const metaImage = computed(() => meta.value?.og?.image || blog.value?.image_link || settings.value?.meta_img || '')
const metaCanonical = computed(() => meta.value.canonical || '')
const metaRobots = computed(() => meta.value.robots || 'index, follow')

const keywordList = computed(() => {
    const keywords = blog.value?.keywords
    if (!keywords) {
        return []
    }
    if (typeof keywords === 'string') {
        return keywords.split(',').map((item) => item.trim()).filter(Boolean).slice(0, 6)
    }
    return []
})

const searchQuery = ref('')

const relatedExcerpt = (item) => {
    const raw = String(item?.description || '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
    if (!raw) {
        return ''
    }
    return raw.length > 140 ? `${raw.slice(0, 140).trim()}…` : raw
}

const getShareUrl = (platform) => {
    if (typeof window === 'undefined') {
        return '#'
    }

    const url = encodeURIComponent(window.location.href)
    const title = encodeURIComponent(blog.value.title || '')

    switch (platform) {
        case 'twitter':
            return `https://twitter.com/intent/tweet?url=${url}&text=${title}`
        case 'facebook':
            return `https://www.facebook.com/sharer/sharer.php?u=${url}`
        case 'linkedin':
            return `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}`
        case 'whatsapp':
            return `https://wa.me/?text=${title}%20${url}`
        default:
            return '#'
    }
}

const handleSearch = () => {
    const query = searchQuery.value.trim()
    if (query) {
        router.get(route('blogs.index'), { search: query })
    }
}
</script>

<style scoped>
#news-single .news-lead {
    font-size: 20px;
    line-height: 1.7;
    color: #444;
    margin-bottom: 28px;
}
#news-single .news-hero {
    width: 100%;
    margin-bottom: 24px;
}
#news-single .news-meta {
    margin: 0 0 28px;
    color: #777;
}
#news-single .news-meta li {
    margin-inline-end: 18px;
}
#news-single .news-meta i {
    margin-inline-end: 6px;
}
#news-single .news-content {
    overflow: hidden;
    word-wrap: break-word;
    font-size: 18px;
    line-height: 1.85;
}
#news-single .news-content :deep(p),
#news-single .news-content :deep(li) {
    font-size: 18px;
    line-height: 1.85;
}
#news-single .news-content :deep(img),
#news-single .news-content :deep(iframe),
#news-single .news-content :deep(video) {
    max-width: 100%;
    height: auto;
}
#news-single .news-content :deep(blockquote) {
    margin: 28px 0;
    padding: 8px 24px;
    font-size: 20px;
    line-height: 1.6;
}
.news-footer {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    margin-top: 36px;
    padding-top: 24px;
    border-top: 1px solid #eee;
}
.news-tags .btn-xs {
    margin: 0 4px 6px 0;
    margin-inline-end: 4px;
}
.news-share a {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    margin: 0 2px;
    color: #333;
}
.news-share a:hover {
    color: #000;
}
.news-cats li {
    margin-bottom: 10px;
}
.news-cats a.active {
    font-weight: 700;
    color: #111;
}
.recent-posts {
    margin-top: 8px;
}
.recent-post {
    margin-bottom: 18px;
}
.recent-post a {
    display: flex;
    gap: 12px;
    align-items: flex-start;
    color: inherit;
}
.recent-post img {
    width: 70px;
    height: 70px;
    object-fit: cover;
    flex-shrink: 0;
}
.recent-post__body {
    display: flex;
    flex-direction: column;
    min-width: 0;
}
.recent-post__body strong {
    display: block;
    line-height: 1.4;
}
.recent-post__body small {
    color: #999;
    margin-top: 4px;
}
.news-pager {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    gap: 16px;
    align-items: center;
    list-style: none;
    padding: 0;
    margin: 0;
}
.news-pager__side--end {
    text-align: end;
}
.news-pager a {
    display: inline-block;
    text-decoration: none;
}
.news-pager__title {
    display: block;
    margin-top: 6px;
    font-size: 13px;
    color: #999;
    max-width: 220px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.news-pager__side--end .news-pager__title {
    margin-left: auto;
    margin-right: 0;
}
html[dir="rtl"] .news-pager__side--end .news-pager__title {
    margin-left: 0;
    margin-right: auto;
}
@media (max-width: 767px) {
    .news-pager {
        grid-template-columns: 1fr;
        text-align: center;
    }
    .news-pager__side,
    .news-pager__side--end {
        text-align: center;
    }
    .news-pager__title {
        max-width: none;
        margin-left: auto;
        margin-right: auto;
    }
    .news-footer {
        flex-direction: column;
        align-items: flex-start;
    }
}
</style>
