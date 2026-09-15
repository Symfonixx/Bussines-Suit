<template>
    <div class="modal fade product-contact-modal" :id="modalId" tabindex="-1" role="dialog" :aria-labelledby="`${modalId}Label`" ref="modalElement">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" :aria-label="trans('Close')"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title" :id="`${modalId}Label`">{{ title }}</h4>
                </div>
                <div class="modal-body">
                    <p v-if="description">{{ description }}</p>
                    <form @submit.prevent="handleSubmit">
                        <div class="form-group">
                            <input class="form-control" v-model="contactForm.name" type="text" :placeholder="trans('Full Name')" :disabled="contactForm.processing" required>
                            <p v-if="contactForm.errors.name" class="help-block text-danger">{{ contactForm.errors.name }}</p>
                        </div>
                        <div class="form-group">
                            <input class="form-control" v-model="contactForm.email" type="email" :placeholder="trans('Email')" :disabled="contactForm.processing" required>
                            <p v-if="contactForm.errors.email" class="help-block text-danger">{{ contactForm.errors.email }}</p>
                        </div>
                        <div class="form-group">
                            <input class="form-control" v-model="contactForm.mobile" type="text" :placeholder="trans('Phone Number')" :disabled="contactForm.processing" required>
                            <p v-if="contactForm.errors.mobile" class="help-block text-danger">{{ contactForm.errors.mobile }}</p>
                        </div>
                        <div class="form-group">
                            <input class="form-control" v-model="contactForm.subject" type="text" :placeholder="trans('Subject')" :disabled="contactForm.processing" required>
                            <p v-if="contactForm.errors.subject" class="help-block text-danger">{{ contactForm.errors.subject }}</p>
                        </div>
                        <div class="form-group">
                            <textarea class="form-control" v-model="contactForm.message" rows="4" :placeholder="trans('Message')" :disabled="contactForm.processing" required></textarea>
                            <p v-if="contactForm.errors.message" class="help-block text-danger">{{ contactForm.errors.message }}</p>
                        </div>
                        <div v-if="submitSuccess" class="alert alert-success">
                            {{ trans('Thank you for contacting us! We will get back to you soon.') }}
                        </div>
                        <button type="submit" class="btn btn-dark" :disabled="contactForm.processing">
                            {{ contactForm.processing ? trans('Sending...') : submitLabel }}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useForm, usePage } from '@inertiajs/vue3'

const props = defineProps({
    modalId: {
        type: String,
        default: 'productContactModal',
    },
    title: {
        type: String,
        default: 'Contact Us',
    },
    description: {
        type: String,
        default: '',
    },
    defaultSubject: {
        type: String,
        default: '',
    },
    defaultMessage: {
        type: String,
        default: '',
    },
    submitLabel: {
        type: String,
        default: 'Submit',
    },
})

const page = usePage()
const trans = (key) => page.props.translations[key] || key

const modalElement = ref(null)
const submitSuccess = ref(false)

const contactForm = useForm({
    name: '',
    email: '',
    mobile: '',
    subject: props.defaultSubject,
    message: props.defaultMessage,
})

watch(() => props.defaultSubject, (value) => {
    contactForm.subject = value
})

watch(() => props.defaultMessage, (value) => {
    contactForm.message = value
})

const handleSubmit = () => {
    if (contactForm.processing) {
        return
    }

    contactForm.post(route('contact-us.store'), {
        preserveScroll: true,
        preserveState: true,
        onBefore: () => {
            submitSuccess.value = false
        },
        onSuccess: () => {
            submitSuccess.value = true
            contactForm.reset('name', 'email', 'mobile')
            contactForm.subject = props.defaultSubject
            contactForm.message = props.defaultMessage
            contactForm.clearErrors()
            setTimeout(() => {
                submitSuccess.value = false
                hide()
            }, 2500)
        },
        onError: () => {
            submitSuccess.value = false
        },
    })
}

const show = () => {
    contactForm.subject = props.defaultSubject
    contactForm.message = props.defaultMessage

    if (window.jQuery && modalElement.value) {
        window.jQuery(modalElement.value).modal('show')
    }
}

const hide = () => {
    if (window.jQuery && modalElement.value) {
        window.jQuery(modalElement.value).modal('hide')
    }
}

defineExpose({
    show,
    hide,
})
</script>

<style scoped>
.product-contact-modal .modal-content {
    border: 0;
    border-radius: 16px;
    overflow: hidden;
    background: #fff;
}

.product-contact-modal .modal-title {
    font-weight: 700;
    color: #0b192c;
}

.product-contact-modal .modal-body :deep(.text-muted) {
    color: #475569 !important;
}

.product-contact-modal__description {
    color: #475569;
    font-size: 0.95rem;
    line-height: 1.6;
    margin-bottom: 1.25rem;
}

.product-contact-modal :deep(.contact-one__input-title) {
    color: #0b192c;
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 8px;
}

.product-contact-modal :deep(.contact-one__input-box) {
    margin-bottom: 0;
}

.product-contact-modal :deep(.contact-one__input-box::before) {
    display: none;
}

.product-contact-modal :deep(.contact-one__input-box input[type="text"]),
.product-contact-modal :deep(.contact-one__input-box input[type="email"]),
.product-contact-modal :deep(.contact-one__input-box textarea) {
    background-color: #f8fafc;
    border: 1px solid #cbd5e1;
    color: #1e293b;
    border-radius: 12px;
    transition: border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease;
}

.product-contact-modal :deep(.contact-one__input-box input[type="text"]::placeholder),
.product-contact-modal :deep(.contact-one__input-box input[type="email"]::placeholder),
.product-contact-modal :deep(.contact-one__input-box textarea::placeholder) {
    color: #94a3b8;
    opacity: 1;
}

.product-contact-modal :deep(.contact-one__input-box input[type="text"]:focus),
.product-contact-modal :deep(.contact-one__input-box input[type="email"]:focus),
.product-contact-modal :deep(.contact-one__input-box textarea:focus) {
    background-color: #fff;
    border-color: #2189ca;
    box-shadow: 0 0 0 3px rgba(33, 137, 202, 0.15);
    outline: none;
}

.product-contact-modal :deep(.contact-one__input-icon span) {
    color: #64748b;
}

.product-contact-modal :deep(.contact-one__input-box:focus-within .contact-one__input-icon span) {
    color: #2189ca;
}

.product-contact-modal :deep(.contact-one__btn-box) {
    margin-top: 8px;
}
</style>
