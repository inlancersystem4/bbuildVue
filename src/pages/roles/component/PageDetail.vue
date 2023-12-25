<script>
export default {
    props: {
        title: String,
        subTitle: String,
        btnText: String,
    },
    methods: {
        btnClick() {
            this.$emit('btn_click')
        }
    },
}
</script>


<template>
    <div class="details-content">

        <h6 class="color-Grey_90 text-xl_semibold">{{ title }}</h6>
        <p class="color-Grey_50 text-base_regular margin-top_4px">{{ subTitle }}
        </p>
        <button class="btn-regular btn-w-full margin-top_16px" @click="btnClick">{{ btnText }}</button>

    </div>
</template>