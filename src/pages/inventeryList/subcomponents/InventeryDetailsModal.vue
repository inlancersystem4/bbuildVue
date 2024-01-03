<script>
export default {
    props: {
        data: Object
    },
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

            <div class="px-5 pt-4 pb-2.5 flex items-center justify-between w-full  border-b border-solid border-Grey_20">

                <div class="flex items-center gap-3">

                    <div class="icon-border icon-border-20 icon-border_40px">
                        <div class="icon-bg icon-bg_32px bg-Grey_20">
                            <img src="../../../assets/img/icons/taxes.svg" class="img-not-selected">
                        </div>
                    </div>

                    <div class="space-y-0.5">

                        <div class="flex">
                            <h5 class="color-Grey_90 text-base">{{ data }}</h5>
                        </div>

                        <p class="text-xs color-Grey_50">{{ data.inv_notes }}</p>
                    </div>

                </div>

                <div>

                    <button class="Default-tag">Jeet Kasundra</button>

                </div>

            </div>

            <div class="px-5 pb-4 pt-4">

                <p class=" mb-2.5 capitalize text-sm color-Grey_50">Item Details</p>

                <div class=" grid grid-cols-3 gap-6">

                    <div class="flex items-stretch gap-1.5">

                        <div class="icon-border icon-border-20 icon-border_40px">
                            <div class="icon-bg icon-bg_32px bg-Grey_20">
                                <img src="../../../assets/img/icons/taxes.svg" class="img-not-selected">
                            </div>
                        </div>

                        <div
                            class="w-full h-full border border-solid border-Grey_20 rounded-lg bg-Grey_10 flex items-center justify-start px-2">
                            <p class="text-base color-Grey_90">128937937</p>
                        </div>

                    </div>

                    <div class="flex items-stretch gap-1.5">

                        <div class="icon-border icon-border-20 icon-border_40px">
                            <div class="icon-bg icon-bg_32px bg-Grey_20">
                                <img src="../../../assets/img/icons/taxes.svg" class="img-not-selected">
                            </div>
                        </div>

                        <div
                            class="w-full h-full border border-solid border-Grey_20 rounded-lg bg-Grey_10 flex items-center justify-start px-2">
                            <p class="text-base color-Grey_90">128937937</p>
                        </div>

                    </div>

                    <div class="flex items-stretch gap-1.5">

                        <div class="icon-border icon-border-20 icon-border_40px">
                            <div class="icon-bg icon-bg_32px bg-Grey_20">
                                <img src="../../../assets/img/icons/taxes.svg" class="img-not-selected">
                            </div>
                        </div>

                        <div
                            class="w-full h-full border border-solid border-Grey_20 rounded-lg bg-Grey_10 flex items-center justify-start px-2">
                            <p class="text-base color-Grey_90">128937937</p>
                        </div>

                    </div>

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
    max-width: 780px;
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