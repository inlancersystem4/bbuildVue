<script>
export default {
    methods: {
        closeModal() {
            this.$emit('closeModal')
        }
    },
}
</script>

<template>
    <div class="status-chnageBox">
        <div class="w-full border border-solid border-Grey_20 rounded-regualr bg-white ">

            <div class="w-full border-b border-solid border-Gray_20">

                <div class="padding-y_8px padding-x_16px">
                    <slot name="header">

                    </slot>

                </div>

            </div>

            <slot></slot>

            <div class="w-full border-t border-solid border-Gray_20">

                <div class="padding-y_8px padding-x_16px flex items-center justify-end gap-8px">

                    <slot name="footer">



                    </slot>

                </div>

            </div>

        </div>
    </div>
    <div class="overlay" @click="closeModal"></div>
</template>

<style  scoped>
.all-border-t>*+* {
    padding-top: 0 !important;
}

.status-chnageBox {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 98%;
    max-width: 550px;
    z-index: 101;
}

.overlay {
    position: fixed;
    z-index: 99;
    inset: 0;
    width: 100%;
    height: 100%;
    opacity: 0.4;
    background: #111827;
    margin-top: 0 !important;
}
</style>