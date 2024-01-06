<script>
export default {
    props: {
        height: String
    },
    methods: {
        closeModal() {
            this.$emit('closeModal')
        }
    },
}
</script>

<template>
    <div class="status-chnageBox" :class="{ 'h-fit': height, 'h-full': !height }">
        <div
            class="w-full border border-solid border-Grey_20 rounded-regualr bg-white overflow-auto h-full min-h-max flex flex-col justify-between">

            <div class="w-full border-b border-solid border-Gray_20">

                <div class="padding-y_8px padding-x_16px">
                    <slot name="header">

                    </slot>

                </div>

            </div>

            <div class="h-full overflow-y-auto">

                <slot></slot>

            </div>

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
    overflow-y: hidden;
    padding: 12px 0;
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
    overflow: hidden;
}
</style>