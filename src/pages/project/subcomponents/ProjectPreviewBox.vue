<script>
export default {
    props: {
        items: Array
    },
    data() {
        return {
            inventoryItemVisible: []
        }
    },
    methods: {
        toggleinventery(index) {
            this.inventoryItemVisible[index] = !this.inventoryItemVisible[index]
        }
    },
}
</script>



<template>
    <div v-for="(item, index) in items" :key="index" class="bg-white rounded-regualr border border-Grey_20 border-solid">


        <div
            class="w-full padding-x_32px  Sm_padding-x_28px  Mobile_padding-x_24px   padding-top_24px padding-bottom_32px border-b border-solid border-Grey_20">

            <p class="text-small_semibold color-Grey_50">Shipping from</p>

            <div
                class="display-flex align-center justify-between w-100 margin-top_8px Md_flex-column Md_align-start  Md_gap-12px">

                <div class="display-flex align-center gap-16px">
                    <div class="icon-border icon-border-20 icon-border_40px">
                        <div class="icon-bg icon-bg_32px bg-Grey_10">
                            <img src="../../../assets/img/icons/buildings.svg" class="img-not-selected">
                        </div>
                    </div>
                    <div>
                        <div class="display-flex align-center gap-8px">
                            <h6 class="color-Grey_90 text-base_semibold">{{ item.str_name }}</h6>
                        </div>
                        <p class="color-Grey_50 text-small_regular text-capitalize">{{ item.ptoject_address }}</p>
                    </div>
                </div>


                <div class="display-flex gap-8px Md_w-100">

                    <button class="btn-regular Md_w-100">Connect provider</button>

                </div>

            </div>
        </div>


        <div class="w-full  padding-top_24px ">

            <p class="text-small_semibold color-Grey_50 padding-x_32px  Sm_padding-x_28px  Mobile_padding-x_24px">
                Shipping to</p>

            <div class="all-border-t">

                <div v-for="(inventeryitem, inventeryIndex) in item.inventery" :key="inventeryIndex">

                    <div
                        class="display-flex align-center justify-between w-100 margin-top_8px padding-x_32px  Sm_padding-x_28px  Mobile_padding-x_24px   padding-bottom_24px">


                        <div class="display-flex align-center gap-16px">
                            <div class="icon-border icon-border-20 icon-border_40px">
                                <div class="icon-bg icon-bg_32px bg-Grey_10">
                                    <img src="../../../assets/img/icons/map.svg" class="img-not-selected">
                                </div>
                            </div>
                            <div>
                                <div class="display-flex align-center gap-8px">
                                    <h6 class="color-Grey_90 text-base_semibold">{{ inventeryitem.str_name }}
                                    </h6>
                                </div>
                                <p class="color-Grey_50 text-small_regular text-capitalize">str number <b>
                                        {{ inventeryitem.str_number }} </b> , str parent id
                                    <b> {{ inventeryitem.str_parent_id }} </b>
                                </p>
                            </div>
                        </div>


                        <div class="display-flex gap-8px">

                            <button class="icon-btn icon-btn_32px toggle_shipping_details"
                                @click="toggleinventery(inventeryIndex)">
                                <img src="../../../assets/img/icons/chevron-down.svg"
                                    class="img-not-selected w_20px h_20px">
                            </button>

                        </div>

                    </div>


                    <div class="shipping_details padding-top_16px display-block"
                        v-if="inventoryItemVisible[inventeryIndex]">

                        <div class="w-full padding-x_32px  Sm_padding-x_28px  Mobile_padding-x_24px   padding-bottom_32px">

                            <p class="text-small_semibold color-Grey_50">Shipping options
                            </p>


                            <div class="margin-top_8px space-y-8px">


                                <div v-for="(inventeryitemdata, inventeryitemdataIndex) in inventeryitem.inventery"
                                    :key="inventeryitemdataIndex"
                                    class="padding-y_12px padding-x_16px    Mobile_padding-x_12px Mobile_padding-y_8px Mobile_padding-x_12px Mobile_padding-y_8px rounded-regualr border border-Grey_20 border-solid">

                                    <div
                                        class="display-flex align-center justify-between w-100 Sm_flex-column Sm_align-start Sm_gap-6px">
                                        <div>
                                            <h6 class="color-Grey_90 text-sm_medium">{{ inventeryitemdata.inv_name }}</h6>
                                            <div class="display-flex align-center gap-8px">
                                                <p class="text-sm_regular color-Grey_50 text-capitalize">
                                                    inv str
                                                    {{ inventeryitemdata.inv_str }}
                                                </p>
                                            </div>
                                        </div>
                                        <div class="display-flex align-center gap-16px Sm_w-100 Sm_justify-between">
                                            <div
                                                class="display-flex align-center gap-6px border border-solid border-Grey_20 rounded-regualr padding-x_8px padding-y_2px store-shipping">
                                                <span class="ellipse-dot"></span>
                                                <p class="text-sm_medium color-Grey_60">
                                                    Store
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                            </div>


                        </div>


                    </div>

                </div>


            </div>

        </div>


    </div>
</template>