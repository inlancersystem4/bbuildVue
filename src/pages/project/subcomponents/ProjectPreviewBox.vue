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
    <ul v-for="(item, index) in items" :key="index" class="space-y-12">

        <li v-for="(projectStructure, projectStructureIndex) in item.structure" :key="projectStructureIndex"
            class="space-y-4">

            <div v-for="(projectStructureinventery, projectStructureinventeryIndex) in projectStructure.structure"
                :key="projectStructureinventeryIndex" class="space-y-2">

                <div class="w-full border border-solid border-Grey_20 rounded-regualr overflow-hidden">

                    <div class="bg-white  padding-x_28px padding-y_12px border-b  border-solid border-Grey_20">

                        <p class="text-base_regular color-Grey_90 capitalize list">
                            {{ item.str_name }}
                            <span>
                                {{ projectStructure.str_name }}
                            </span>
                            <span>
                                {{ projectStructureinventery.str_name }}
                            </span>
                        </p>

                    </div>

                    <div class="bg-transparent padding-x_28px padding-y_24px">

                        <div class="flex flex-wrap items-center gap-2">

                            <div v-for="(inventerydata, inventerydataIndex) in projectStructureinventery.inventery"
                                :key="inventerydataIndex">

                                <buttton class="btn-regular display-flex align-center gap-8px bg-white">

                                    <div class="ellipse-dot"
                                        :class="{ 'bg-emerald': inventerydata.inv_status === 1, 'bg-rose': inventerydata.inv_status === 2, 'bg-orange': inventerydata.inv_status === 3, 'bg-blue': inventerydata.inv_status === 4, 'bg-Grey_40': inventerydata.inv_status === 5, 'bg-purple': inventerydata.inv_status === 6 }">
                                    </div>

                                    <p class="text-sm_medium color-Grey_60 text-uppercase">{{ inventerydata.inv_name }} </p>

                                </buttton>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </li>

    </ul>

    <!-- <div v-for="(item, index) in items" :key="index" class="space-y-16px">

        <div
            class=" bg-white border border-solid border-Grey_20 rounded-regualr w-full padding-x_32px  Sm_padding-x_28px  Mobile_padding-x_24px  padding-top_24px padding-bottom_24px">

            <div class="display-flex align-center gap-16px">

                <div class="icon-border icon-border-20 icon-border_40px">
                    <div class="icon-bg icon-bg_32px bg-Grey_10">
                        <img src="../../../assets/img/icons/taxes.svg" class="img-not-selected">
                    </div>
                </div>

                <div>
                    <h6 class="color-Grey_90  text-large_semibold">{{ item.str_name }}</h6>
                    <p class="color-Grey_50 text-small_regular text-capitalize">{{ item.ptoject_address }}</p>
                </div>

            </div>

        </div>

        <div class="bg-white rounded-regualr border border-Grey_20 border-solid"
            v-for="(projectStructure, projectStructureIndex) in item.structure" :key="projectStructureIndex">


            <div
                class="w-full padding-x_32px  Sm_padding-x_28px  Mobile_padding-x_24px   padding-top_24px padding-bottom_24px border-b border-solid border-Grey_20">

                <div class="display-flex align-center gap-16px">
                    <div class="icon-border icon-border-20 icon-border_40px">
                        <div class="icon-bg icon-bg_32px bg-Grey_10">
                            <img src="../../../assets/img/icons/buildings.svg" class="img-not-selected">
                        </div>
                    </div>
                    <h6 class="color-Grey_90 text-base_semibold">{{ projectStructure.str_name }}</h6>
                </div>

            </div>

            <div class="w-full padding-top_24px">

                <div class="all-border-t">

                    <div v-for="(structure, structureindex) in projectStructure.structure" :key="structureindex">


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
                                        <h6 class="color-Grey_90 text-base_semibold"> {{ structure.str_name }}
                                        </h6>
                                    </div>
                                  <p class="color-Grey_50 text-small_regular text-capitalize">str number <b>
                                        {{ inventeryitem.str_number }} </b> , str parent id
                                    <b> {{ inventeryitem.str_parent_id }} </b>
                                </p>
    </div>
    </div>


    <div class="display-flex gap-8px">

        <button class="icon-btn icon-btn_32px toggle_shipping_details" @click="toggleinventery(structureindex)">
            <img src="../../../assets/img/icons/chevron-down.svg" class="img-not-selected w_20px h_20px">
        </button>

    </div>

    </div>

    <div class="shipping_details padding-top_16px display-block" v-if="inventoryItemVisible[structureindex]">

        <div class="w-full padding-x_32px Sm_padding-x_28px Mobile_padding-x_24px
                                padding-bottom_32px space-y-8px">

            <div v-for="(structureInventery, structureInventeryindex) in structure.inventery" :key="structureInventeryindex"
                class="padding-y_12px padding-x_16px Mobile_padding-x_12px Mobile_padding-y_8px Mobile_padding-x_12px Mobile_padding-y_8px rounded-regualr border border-Grey_20 border-solid">

                <div class="display-flex align-center justify-between w-100 Sm_flex-column Sm_align-start Sm_gap-6px">

                    <div>
                        <h6 class="color-Grey_90 text-sm_medium">{{ structureInventery.inv_name }}</h6>
                    </div>

                    <div class="display-flex align-center gap-16px Sm_w-100 Sm_justify-between">
                        <div
                            class="display-flex align-center gap-6px border border-solid border-Grey_20 rounded-regualr padding-x_8px padding-y_2px store-shipping">

                            <div class="ellipse-dot"
                                :class="{ 'bg-emerald': structureInventery.inv_status === 1, 'bg-rose': structureInventery.inv_status === 2, 'bg-orange': structureInventery.inv_status === 3, 'bg-blue': structureInventery.inv_status === 4, 'bg-Grey_40': structureInventery.inv_status === 5, 'bg-purple': structureInventery.inv_status === 6 }">
                            </div>

                            <p class="text-sm_medium color-Grey_60 text-uppercase"
                                v-if="structureInventery.inv_status === 1">
                                AVAILABLE
                            </p>
                            <p class="text-sm_medium color-Grey_60 text-uppercase"
                                v-if="structureInventery.inv_status === 2">
                                NOT AVAILABLE
                            </p>
                            <p class="text-sm_medium color-Grey_60 text-uppercase"
                                v-if="structureInventery.inv_status === 3">
                                HOLD
                            </p>
                            <p class="text-sm_medium color-Grey_60 text-uppercase"
                                v-if="structureInventery.inv_status === 4">
                                BOOKED
                            </p>
                            <p class="text-sm_medium color-Grey_60 text-uppercase"
                                v-if="structureInventery.inv_status === 5">\
                                SOLD
                            </p>
                            <p class="text-sm_medium color-Grey_60 text-uppercase"
                                v-if="structureInventery.inv_status === 6">
                                CANCELLED
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

    </div> -->


    <!-- <div
                class="w-full padding-x_32px  Sm_padding-x_28px  Mobile_padding-x_24px   padding-top_24px padding-bottom_32px border-b border-solid border-Grey_20">

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

                </div>
            </div>


            <div class="w-full  padding-top_24px">

                <div class="all-border-t">

                    <div>

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

                        </div>

                    </div>

                </div>

            </div> -->


    <!-- <div v-for="(item, index) in items" :key="index" class="bg-white rounded-regualr border border-Grey_20 border-solid">


        <div
            class="w-full padding-x_32px  Sm_padding-x_28px  Mobile_padding-x_24px   padding-top_24px padding-bottom_32px border-b border-solid border-Grey_20">

            <p class="text-small_semibold color-Grey_50">Project is</p>

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

            </div>
        </div>

        <p class="no-conetnt-show-section py-10" v-if="!item.structure || item.structure.length === 0">no data in this
            module
        </p>

        <div class="w-full  padding-top_24px " v-if="item.structure.length > 0">

            <p class="text-small_semibold color-Grey_50 padding-x_32px  Sm_padding-x_28px  Mobile_padding-x_24px">
                Shipping to</p>

            <div class="all-border-t">

                <div v-for="(inventeryitem, inventeryIndex) in item.structure" :key="inventeryIndex">

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


                                <div v-for="(inventeryitemdata, inventeryitemdataIndex) in inventeryitem.structure"
                                    :key="inventeryitemdataIndex"
                                    class="padding-y_12px padding-x_16px    Mobile_padding-x_12px Mobile_padding-y_8px Mobile_padding-x_12px Mobile_padding-y_8px rounded-regualr border border-Grey_20 border-solid">

                                    {{ inventeryitemdata.str_name }}

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


    </div> -->


    <!-- <div class="w-full rounded-regualr border border-solid border-Grey_20 overflow-hidden" v-for="(item, index) in items"
        :key="index">

        <div class="bg-white padding-x_24px padding-y_16px  border-b border-solid border-Grey_20">

            <div class="w-full display-flex align-center justify-between">

                <h6 class="text-base_semibold color-Grey_90 display-flex align-center list">
                    <p v-for="(inventeryitem, inventeryitemindex) in items" :key="inventeryitemindex">
                        <span v-if="inventeryitem.is_main === 1"> {{ inventeryitem.str_name }}</span>
                    </p>
                    <span>{{ item.str_name }}</span>
                </h6>

            </div>

        </div>

        <div class="padding-x_24px padding-y_16px">

            <p v-if="item.inventery.length === 0" class="capitalize color-Grey_90 text-base_semibold text-center py-10">no
                have any
                modules</p>

            <div class="w-full display-flex align-center display-flex-wrap gap-16px" v-if="item.inventery.length > 0">

                <div v-for="(inventeryitem, inventeryitemindex) in item.inventery" :key="inventeryitemindex">

                    <div class="btn-regular display-flex align-center gap-8px bg-white">

                        <div class="ellipse-dot"
                            :class="{ 'bg-emerald': inventeryitem.inv_status === 1, 'bg-rose': inventeryitem.inv_status === 2, 'bg-orange': inventeryitem.inv_status === 3, 'bg-blue': inventeryitem.inv_status === 4, 'bg-Grey_40': inventeryitem.inv_status === 5, 'bg-purple': inventeryitem.inv_status === 6 }">
                        </div>

                        <p class="text-sm_medium color-Grey_60 text-uppercase">{{ inventeryitem.inv_name }}</p>

                    </div>

                </div>

            </div>

        </div>

    </div> -->
</template>
 

<style scoped>
.list span {
    position: relative;
    margin-left: 20px;
}




.list span:after {
    content: "";
    position: absolute;
    left: -12px;
    top: 50%;
    transform: translateY(-50%);
    width: 5px;
    height: 5px;
    border-radius: 999px;
    overflow: hidden;
    background-color: black;
}
</style>