<script>
export default {
    props: {
        model_title: String,
        Btn_text: String,
        isButtonDisabled: Boolean,
    },
    data() {
        return {
        };
    },
    methods: {
        modelBtn() {
            this.$emit('modelbtn_clicked');
        },
        modelClose() {
            this.$emit('model_close')
        }
    },
}
</script>

<template>
    <div class="full-screen-model">

        <div class="model-content">

            <div class="model-header">

                <button class="border border-solid border-Grey_20 rounded-regualr Model_Close_btn" @click="modelClose">
                    <img src="../assets/img/icons/close-icon.svg" class="img-not-selected">
                </button>

                <button class="btn-regular" @click="modelBtn" :disabled="isButtonDisabled">{{ Btn_text }}</button>
            </div>

            <div class="model-body">

                <div class="model-body-content">

                    <h4 class="model-title">{{ model_title }}</h4>

                    <slot></slot>

                </div>

            </div>

        </div>

    </div>
</template>