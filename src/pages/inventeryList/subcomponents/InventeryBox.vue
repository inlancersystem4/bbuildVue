<script>
import VueSimpleContextMenu from 'vue-simple-context-menu';
export default {
    components: {
        VueSimpleContextMenu,
    },
    props: {
        items: Array
    },
    data() {
        return {
            options: [
                { name: 'Edit', action: 'edit' },
                { name: 'View', action: 'view' },
                { name: 'Status Chnage', action: 'Chnage' },
            ],
            selectedItem: null
        }
    },
    methods: {
        handleContextMenu(event, item) {
            event.preventDefault();
            this.selectedItem = item;
            this.$refs.vueSimpleContextMenu.showMenu(event, item)
        },
        selectInven(data) {
            this.$emit('selectInventery', data)
        },
        updateDetail(data) {
            this.$emit('updateDetails', data)
        },
        viewdateDetail(data){
            this.$emit('viewInvDetails', data)
        },
        optionClicked(option) {
            if (option.option.action === 'Chnage') {
                if (this.selectedItem) {
                    this.selectInven(this.selectedItem);
                }
            }
            if (option.option.action === 'edit') {
                if (this.selectedItem) {
                    this.updateDetail(this.selectedItem);
                }
            }
            if (option.option.action === 'view') {
                if (this.selectedItem) {
                    this.viewdateDetail(this.selectedItem);
                }
            }
        }
    }
}
</script>

<template>
    <vue-simple-context-menu element-id="myUniqueId" :options="options" ref="vueSimpleContextMenu"
        @option-clicked="optionClicked" />


    <div v-for="(item, index) in items" :key="index" class="flex items-start gap-3">

        <div v-for="(itemArrays, itemArraysindex) in item" :key="itemArraysindex"
            class="w-full  min-w-[320px] max-w-96 bg-Grey_10  border border-solid border-Grey_20 rounded-regualr overflow-hidden">

            <div v-for="(inventeryitem, inventeryitemindex) in itemArrays" :key="inventeryitemindex">

                <div class="padding-x_24px padding-y_12px border-b border-solid border-Grey_20 list flex bg-white">

                    <p> {{ inventeryitem.title }} </p>

                </div>

                <div class="p-2 space-y-2">

                    <p v-if="!inventeryitem.data || inventeryitem.data.length === 0"
                        class="h-12 flex items-center justify-center text-center">no module Find
                    </p>


                    <div v-for="(inventerydata, inventerydataindex) in inventeryitem.data" :key="inventerydataindex"
                        class="bg-white border border-solid border-Grey_20 rounded-regualr overflow-hidden">

                        <div class="py-2 px-4 border-b border-solid border-Grey_20">
                            <p> {{ inventerydata.title }} </p>
                        </div>

                        <div class="py-2 px-4 flex items-center flex-wrap">

                            <div v-for="(inventeryitemdata, inventeryitemdataindex) in inventerydata.items"
                                :key="inventeryitemdataindex" class="flex flex-wrap p-0.5">

                                <buttton @contextmenu.prevent="handleContextMenu($event, inventeryitemdata)"
                                    class="btn-regular display-flex align-center gap-8px bg-white">

                                    <div class="ellipse-dot"
                                        :class="{ 'bg-emerald': inventeryitemdata.inv_status === 1, 'bg-rose': inventeryitemdata.inv_status === 2, 'bg-orange': inventeryitemdata.inv_status === 3, 'bg-blue': inventeryitemdata.inv_status === 4, 'bg-Grey_40': inventeryitemdata.inv_status === 5, 'bg-purple': inventeryitemdata.inv_status === 6 }">
                                    </div>

                                    <p class="text-sm_medium color-Grey_60 text-uppercase">{{ inventeryitemdata.inv_name }}
                                    </p>

                                </buttton>

                            </div>

                        </div>

                    </div>

                </div>

            </div>


        </div>


    </div>


    <!-- <div v-for="(item, index) in items" :key="index"
        class="w-full  min-w-[320px] max-w-96 bg-Grey_10  border border-solid border-Grey_20 rounded-regualr overflow-hidden">

        <div v-for="(inventeryitem, inventeryitemindex) in item" :key="inventeryitemindex">
            <div class="">

                <div class="padding-x_24px padding-y_12px border-b border-solid border-Grey_20 list flex bg-white">

                    <p> {{ inventeryitem.title }} </p>

                </div>

                <div class="padding-x_24px padding-y_12px flex flex-wrap gap-2">

                    <div v-for="(inventeryitemdata, inventeryitemdataindex) in inventeryitem.items"
                        :key="inventeryitemdataindex" class="flex flex-wrap">

                        <buttton @contextmenu.prevent="handleContextMenu($event, inventeryitemdata)"
                            class="btn-regular display-flex align-center gap-8px bg-white">

                            <div class="ellipse-dot"
                                :class="{ 'bg-emerald': inventeryitemdata.inv_status === 1, 'bg-rose': inventeryitemdata.inv_status === 2, 'bg-orange': inventeryitemdata.inv_status === 3, 'bg-blue': inventeryitemdata.inv_status === 4, 'bg-Grey_40': inventeryitemdata.inv_status === 5, 'bg-purple': inventeryitemdata.inv_status === 6 }">
                            </div>

                            <p class="text-sm_medium color-Grey_60 text-uppercase">{{ inventeryitemdata.inv_name }}</p>

                        </buttton>

                    </div>

                    <p class="text-center no-conetnt-show-section w-full capitalize"
                        v-if="!inventeryitem.items || inventeryitem.items.length == 0">no module found</p>

                </div>

            </div>

        </div>

        <p v-if="!item.inventory || item.inventory.length > 0" class="  text-center  ">no module Find</p> 

    </div> -->


    <!-- <li class="w-full rounded-regualr border border-solid border-Grey_20 overflow-hidden" v-for="(item, index) in items"
        :key="index">

        <div class="bg-white padding-x_24px padding-y_16px  border-b border-solid border-Grey_20">

            <div class="w-full display-flex align-center justify-between">

                <p class="text-base_semibold color-Grey_90 display-flex align-center  list">
                    <span>{{ item.str_name }}</span>
                    <span v-for="(inventeryitem, inventeryitemindex) in item.inventery" :key="inventeryitemindex">{{
                        inventeryitem.str_name }}</span>
                </p>

            </div>

        </div>

        <div class="padding-x_24px padding-y_16px"> -->

    <!-- <div>

                <div v-for="(inventeryitem, inventeryitemindex) in item.inventery" :key="inventeryitemindex"
                    class="w-full display-flex align-center display-flex-wrap gap-16px">

                    {{ inventeryitem.inv_status }}

                    <div v-for="(inventeryiteminventery, inventeryitemindex) in inventeryitem.inventery"
                        :key="inventeryitemindex">

                        <div class="btn-regular display-flex align-center gap-8px bg-white">

                            <div class="ellipse-dot"
                                :class="{ 'bg-emerald': inventeryiteminventery.inv_status === 1, 'bg-rose': inventeryiteminventery.inv_status === 2, 'bg-orange': inventeryiteminventery.inv_status === 3, 'bg-blue': inventeryiteminventery.inv_status === 4, 'bg-Grey_40': inventeryiteminventery.inv_status === 5, 'bg-purple': inventeryiteminventery.inv_status === 6 }">
                            </div>

                            <p class="text-sm_medium color-Grey_60 text-uppercase">{{ inventeryiteminventery.inv_name }}</p>

                        </div>

                    </div>

                </div>

            </div> -->

    <!-- <div class="w-full display-flex align-center display-flex-wrap gap-16px">

                <div v-for="(inventeryitem, inventeryitemindex) in item.inventery" :key="inventeryitemindex">


                    <buttton @click="selectInven(inventeryitem)"
                        class="btn-regular display-flex align-center gap-8px bg-white">

                        <div class="ellipse-dot"
                            :class="{ 'bg-emerald': inventeryitem.inv_status === 1, 'bg-rose': inventeryitem.inv_status === 2, 'bg-orange': inventeryitem.inv_status === 3, 'bg-blue': inventeryitem.inv_status === 4, 'bg-Grey_40': inventeryitem.inv_status === 5, 'bg-purple': inventeryitem.inv_status === 6 }">
                        </div>

                        <p class="text-sm_medium color-Grey_60 text-uppercase">{{ inventeryitem.inv_name }}</p>

                    </buttton>


                </div>

            </div>

        </div>

    </li> -->


    <!-- <li v-for="(item, index) in items" :key="index" class="space-y-16px">

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
                                </div>
                            </div>


                            <div class="display-flex gap-8px">
                                <button class="icon-btn icon-btn_32px toggle_shipping_details"
                                    @click="toggleinventery(projectStructureIndex, structureindex)">
                                    <img src="../../../assets/img/icons/chevron-down.svg"
                                        class="img-not-selected w_20px h_20px">
                                </button>

                            </div>

                        </div>

                        <div class="shipping_details padding-top_16px display-block"
                            v-if="inventoryItemVisible[projectStructureIndex, structureindex]">

                            <div class="w-full padding-x_32px Sm_padding-x_28px Mobile_padding-x_24px
                                padding-bottom_32px space-y-8px">

                                <div v-for="(structureInventery, structureInventeryindex) in structure.inventery"
                                    :key="structureInventeryindex"
                                    class="padding-y_12px padding-x_16px Mobile_padding-x_12px Mobile_padding-y_8px Mobile_padding-x_12px Mobile_padding-y_8px rounded-regualr border border-Grey_20 border-solid">

                                    <div
                                        class="display-flex align-center justify-between w-100 Sm_flex-column Sm_align-start Sm_gap-6px">

                                        <div>
                                            <h6 class="color-Grey_90 text-sm_medium">{{ structureInventery.inv_name }}</h6>
                                        </div>

                                        <div class="display-flex align-center gap-16px Sm_w-100 Sm_justify-between">
                                            <button @click="selectInven(structureInventery)"
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

                                            </button>
                                        </div>
                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    </li> -->

    <!-- <li v-for="(item, index) in items" :key="index" class="space-y-16px">

        {{ item.str_name }}


        <div v-for="(projectStructure, projectStructureIndex) in item.structure" :key="projectStructureIndex">

            <div class="flex items-center w-full flex-wrap">

                {{ projectStructure.str_name }}

                <div v-for="(structure, structureindex) in projectStructure.structure" :key="structureindex"
                    class="w-full flex items-center gap-4 flex-col">

                    {{ structure.str_name }}

                    <div class="flex items-center">

                        <div class="" v-for="(structureInventery, structureInventeryindex) in structure.inventery"
                            :key="structureInventeryindex">

                            {{ structureInventery.inv_name }}

                        </div>

                    </div>

                </div>

            </div>

        </div>



    </li> -->


    <!-- <li v-for="(item, index) in items" :key="index" class="flex gap-6 flex-wrap  w-full">

        {{ item.str_name }}

        <div v-for="(projectStructure, projectStructureIndex) in item.structure" :key="projectStructureIndex"
            class="flex items-center flex-col">

            <p> {{ projectStructure.str_name }} </p>

            <div class="flex gap-2">

                <div v-for="(structure, structureindex) in projectStructure.structure" :key="structureindex" class="">

                    {{ structure.str_name }}

                </div>

            </div>

        </div>

    </li> -->


    <!-- <ul v-for="(item, index) in items" :key="index" class="space-y-12">

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

                                <buttton @click="selectInven(inventerydata)"
                                    class="btn-regular display-flex align-center gap-8px bg-white">

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

    </ul> -->
</template>

<style scoped>
li {
    list-style: none;
}

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
