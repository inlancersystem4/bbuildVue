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
        <div class="w-full border border-solid border-Grey_20 rounded-regualr bg-white  all-border-t">

            <div class="bg-Grey_10 flex items-stretch">

                <div class="padding-y_8px padding-x_16px  w-1/3 border-r border-solid border-Grey_20">
                    <p class="color-Grey_60 text-base_semibold capitalize">Option title</p>
                </div>

                <div class="padding-y_8px padding-x_16px   w-2/3">
                    <p class="color-Grey_60 text-base_semibold capitalize">Variations</p>
                </div>

            </div>


            <div class="flex items-stretch">

                <div class="padding-y_8px padding-x_16px w-1/3 border-r border-solid border-Grey_20">
                    <p class="color-Grey_90 text-base_semibold capitalize">Select Status</p>
                </div>

                <div class="padding-y_8px padding-x_16px  w-2/3 relative">
                    <slot name="status"></slot>

                </div>

            </div>

            <div class="flex items-stretch">

                <div class="padding-y_8px padding-x_16px w-1/3 border-r border-solid border-Grey_20">
                    <p class="color-Grey_90 text-base_semibold capitalize">Select Customer</p>
                </div>

                <div class="padding-y_8px padding-x_16px  w-2/3 relative">
                    <slot name="customer"></slot>

                </div>

            </div>

            <div class="flex items-stretch">

                <div class="padding-y_8px padding-x_16px w-1/3 border-r border-solid border-Grey_20">
                    <p class="color-Grey_90 text-base_semibold capitalize">Note</p>
                </div>

                <div class="padding-y_8px padding-x_16px  w-2/3">
                    <slot name="note"></slot>

                </div>

            </div>


            <div class="w-full">

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