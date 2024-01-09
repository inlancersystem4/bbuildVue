<script>
export default {
    props: {
        items: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            foundInventory: null,
            show: [],
            inventoryList: [],
            dataArray: [],
            allProjectData: []
        }
    },
    // computed: {
    //     computedNestedStructure() {
    //         const computedStructure = [];

    //         this.items.forEach((item, index) => {
    //             const nestedStructure = this.sum_numbers(item, index);
    //             computedStructure.push(nestedStructure);
    //         });

    //         return computedStructure;
    //     }
    // },
    methods: {
        // sum_numbers(arr, n) {
        //     if (n <= 0) {
        //         return 0;
        //     }
        //     if (arr.length > 0) {
        //         return arr[0];
        //     } else {
        //         return this.sum_numbers(arr, n - 1) + arr[n - 1];
        //     }
        // }
        // const modifiedArray = arr.map(item => item);
        // const modifiedArray2 = modifiedArray.map(item => item.structure);
        // modifiedArray2.forEach(item => {
        //     item.structure
        // });
        // const modifiedArray3 = modifiedArray2.map(item => item);
        // modifiedArray3.forEach(structure => {
        //     structure.forEach(item => {
        //         if (item.inventery && item.inventery.length > 0) {
        //             console.log(item.inventery);
        //         }
        //     });
        // });



        // arr.forEach(item => {
        //     if (item.inventery && item.inventery.length > 0) {
        //         console.log(item.inventory);
        //     } else {
        //         console.log("Inventory is empty or does not exist for this item");
        //     }
        // });

        // sum_numbers(arr) {

        //     // console.log(arr.structure)

        //     if (Array.isArray(arr.structure) && arr.structure.length !== 0) {
        //         arr.structure.forEach(item => {
        //             arr = item
        //             if (Array.isArray(arr.structure) && arr.structure.length == 0) {
        //                 if (Array.isArray(arr.inventery) && arr.inventery.length !== 0) {
        //                     this.inventoryList = arr.inventery
        //                     console.log(this.inventoryList)
        //                 } else {
        //                     console.log("Inventory is empty or does not exist for this item");
        //                 }
        //             }
        //             else {
        //                 if (Array.isArray(arr.structure) && arr.structure.length !== 0) {
        //                     arr.structure.forEach(item => {
        //                         console.log(item)
        //                         arr = item
        //                         this.sum_numbers(arr)
        //                     });
        //                 }
        //             }
        //         }
        //         )
        //     }
        //     else {
        //         if (Array.isArray(arr.inventery) && arr.inventery.length !== 0) {
        //             this.inventoryList = arr.inventery
        //             console.log(this.inventoryList)
        //         } else {
        //             console.log("Inventory is empty or does not exist for this item");
        //         }
        //     }

        //     this.projectData = arr

        // },

        //     processStructure(structure) {
        //         structure.forEach(item => {
        //             if (Array.isArray(item.structure) && item.structure.length !== 0) {
        //                 this.processStructure(item.structure);
        //             } else {
        //                 this.processInventory(item);
        //             }
        //         });
        //     },
        //     processInventory(item) {
        //         if (Array.isArray(item.inventery) && item.inventery.length !== 0) {
        //             this.allProjectData.push(item.inventery);
        //         } else {
        //             this.allProjectData.push("inventery is empty or does not exist for this item");
        //         }
        //     }
        // }


        // sum_numbers(arr) {

        // }





        // if (Array.isArray(arr) && arr.length !== 0) {
        //     arr.forEach(item => {
        //         arr = item
        //         if (Array.isArray(arr.structure) && arr.structure.length == 0) {
        //             if (Array.isArray(arr.inventery) && arr.inventery.length !== 0) {
        //                 this.inventoryList = arr.inventery
        //                 // console.log(this.inventoryList)
        //             } else {
        //                 console.log("Inventory is empty or does not exist for this item");
        //             }
        //         }
        //         else {
        //             if (Array.isArray(arr.structure) && arr.structure.length !== 0) {
        //                 arr.structure.forEach(item => {
        //                     arr = item
        //                     this.sum_numbers(arr)
        //                 });
        //             }
        //         }
        //     });
        // }

        // if (n <= 0) {
        //     console.log("this is  index", n)
        //     return 0;
        // }
        // if (arr.inventory && arr.inventory.length > 0) {
        //     // console.log("this is array", arr)
        //     return arr.inventory.length;
        // } else {
        //     // console.log("new function", this.sum_numbers(arr, n - 1) + arr[n - 1])
        //     return this.sum_numbers(arr, n - 1) + arr[n - 1];
        // }
        // }

        // sum_numbers(arr, n) {
        //     console.log(arr)
        //     // if (n <= 0) {
        //     //     console.log("Reached index 0");
        //     //     return 0;
        //     // }

        //     if (Array.isArray(arr)) {
        //         let sum = 0;

        //         arr.forEach(item => {
        //             if (item.inventory && item.inventory.length > 0) {
        //                 console.log("Found inventory:", item.inventory);
        //                 return item.inventory.length;
        //             } else if (Array.isArray(item.structure)) {
        //                 sum += this.sum_numbers(item.structure, n - 1);
        //             } else if (!isNaN(item)) {
        //                 sum += item;
        //             }
        //         });

        //         return sum;
        //     } else {
        //         console.log("Input is not an array");
        //         return 0;
        //     }
        // }

        // sum_numbers(arr) {
        //     if (!arr || arr.length === 0) {
        //         return 0;
        //     } else {
        //         return this.calculateSum(arr, 0);
        //     }
        // },
        // calculateSum(arr, index) {
        //     if (index >= arr.length) {
        //         return 0;
        //     } else {
        //         const currentValue = parseFloat(arr[index]);
        //         const recursiveSum = this.calculateSum(arr, index + 1);
        //         return isNaN(currentValue) ? recursiveSum : recursiveSum + currentValue;
        //     }
        // }
        // findInventory(structure) {
        //     const foundItems = [];

        //     const searchInventory = (currentStructure) => {
        //         for (let i = 0; i < currentStructure.length; i++) {
        //             const currentItem = currentStructure[i];
        //             if (Array.isArray(currentItem)) {
        //                 console.log('Nested Array found');
        //                 searchInventory(currentItem); // Recursively search nested arrays
        //             } else if (currentItem && currentItem.inventory === 'inventory') {
        //                 console.log('Inventory found:', currentItem); // Log found inventory
        //                 foundItems.push(currentItem); // Found inventory, add it to the array
        //             }
        //         }
        //     };

        //     searchInventory(structure); // Start searching from the main structure

        //     console.log('Found items:', foundItems); // Log all found items

        //     return foundItems; // Return the array of found inventory items
        // }
    }
}
</script>


<template>
    <div v-for="(item, index) in items" :key="index"
        class="w-full  min-w-[320px] max-w-96 bg-Grey_10 flex flex-col   border border-solid border-Grey_20 rounded-regualr overflow-hidden h-fit">

        <div v-for="(structureItem, structureIndex) in item" :key="structureIndex">

            <div class="padding-x_24px padding-y_12px border-b border-solid border-Grey_20 list flex bg-white"
                v-if="structureItem.nam">

                <p> {{ structureItem.nam }}</p>

            </div>

        </div>

        <div v-for="(structureItem, structureIndex) in item[1]" :key="structureIndex">

            <div v-for="(structureList, structureIndex) in structureItem" :key="structureIndex" class="p-2">


                <div class="border border-solid bg-Grey_20 rounded-regualr overflow-hidden">


                    <ul class="flex padding-x_24px padding-y_12px border-b border-solid border-Grey_20 bg-white list">

                        <li v-for="(structurebread, structurebreadIndex) in structureList.breadcrumb"
                            :key="structurebreadIndex">

                            <span> {{ structurebread }} </span>

                        </li>

                    </ul>


                    <div class="flex flex-wrap py-2 px-4 bg-white">

                        <ul v-for="(inventeryitem, inventeryitemIndex) in structureList.items" :key="inventeryitemIndex">
                            <li class="p-0.5">
                                <buttton class="btn-regular display-flex align-center gap-8px bg-white">

                                    <div class="ellipse-dot"
                                        :class="{ 'bg-emerald': inventeryitem.inv_status === 1, 'bg-rose': inventeryitem.inv_status === 2, 'bg-orange': inventeryitem.inv_status === 3, 'bg-blue': inventeryitem.inv_status === 4, 'bg-Grey_40': inventeryitem.inv_status === 5, 'bg-purple': inventeryitem.inv_status === 6 }">
                                    </div>

                                    <p class="text-sm_medium color-Grey_60 text-uppercase">{{ inventeryitem.inv_name }}
                                    </p>

                                </buttton>
                            </li>

                        </ul>

                    </div>


                </div>

            </div>

        </div>

    </div>









    <!-- <div v-for="(item, index) in items" :key="index" class="flex items-start gap-3">

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

                                <buttton 
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


    </div> -->












    <!-- <div v-for="(item, index) in items" :key="index" class="flex items-stretch gap-4">

        <template v-for="(inventeryitem, inventeryitemindex) in item.inventory" :key="inventeryitemindex">

            <div v-if="inventeryitem.items"
                class="w-full  min-w-[320px] max-w-96 bg-white border border-solid border-Grey_20 rounded-regualr overflow-hidden">

                <div class="padding-x_24px padding-y_12px border-b border-solid border-Grey_20 list flex">

                    <p class=""> {{ inventeryitem.parent }} </p>

                    <span> {{ inventeryitem.title }} </span>

                </div>

                <div class="padding-x_24px padding-y_12px flex flex-wrap gap-2">

                    <div v-for="(inventeryitemdata, inventeryitemdataindex) in inventeryitem.items"
                        :key="inventeryitemdataindex" class="flex flex-wrap">

                        <buttton class="btn-regular display-flex align-center gap-8px bg-white">

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

        </template>

    </div> -->


    <!-- <div v-for="(item, index) in items" :key="index" class="flex items-stretch gap-4">

        <div v-for="(inventeryitem, inventeryitemindex) in item.structure" :key="inventeryitemindex"
            class="w-full  min-w-[320px] max-w-96 bg-white border border-solid border-Grey_20 rounded-regualr overflow-hidden">

            <div class="padding-x_24px padding-y_12px border-b border-solid border-Grey_20">

                {{ inventeryitem.str_name }}

            </div>

            <div class="padding-x_24px padding-y_12px flex flex-wrap gap-2">

                <div v-for="(inventeryitem, inventeryitemindex) in inventeryitem.inventery" :key="inventeryitemindex"
                    class="flex flex-wrap">

                    <buttton @click="selectInven(inventeryitem)"
                        class="btn-regular display-flex align-center gap-8px bg-white">

                        <div class="ellipse-dot"
                            :class="{ 'bg-emerald': inventeryitem.inv_status === 1, 'bg-rose': inventeryitem.inv_status === 2, 'bg-orange': inventeryitem.inv_status === 3, 'bg-blue': inventeryitem.inv_status === 4, 'bg-Grey_40': inventeryitem.inv_status === 5, 'bg-purple': inventeryitem.inv_status === 6 }">
                        </div>

                        <p class="text-sm_medium color-Grey_60 text-uppercase">{{ inventeryitem.inv_name }}</p>

                    </buttton>

                </div>

                <p class="text-center no-conetnt-show-section w-full capitalize"
                    v-if="!inventeryitem.inventery || inventeryitem.inventery.length == 0">no module found</p>

            </div>

        </div>

    </div> -->



    <!-- <div>
        <ul v-if="items.length > 0" class="space-y-12">
            <li v-for="(item, index) in items" :key="index">
                <template v-if="Array.isArray(item.structure)">
                    <NestedStructure :structures="item.structure" />
                </template>
                <template v-else>
                    <div>{{ item.structure }}</div>
                </template>
            </li>
        </ul>
        <div v-else>
            No data available.
        </div>
    </div> -->



    <!-- <ul>
        <li v-for="(nestedItem, nestedIndex) in computedNestedStructure" :key="nestedIndex">
            <div v-for="(projectStructure, projectStructureIndex) in nestedItem" :key="projectStructureIndex">
                {{ sum_numbers() }}
            </div>
        </li>
    </ul> -->


    <!-- <div v-for="item in items" :key="item.str_name">
        <p>{{ ' '.repeat(indentation * 2) + item.str_name }} - {{ item.str_number }}</p>

        <div v-if="item.inventory && item.inventory.length > 0">
            <div v-for="inventoryItem in item.inventory" :key="inventoryItem.inv_name">
                <p>{{ ' '.repeat((indentation + 1) * 2) + inventoryItem.inv_name }} - {{ inventoryItem.inv_number }}</p>
            </div>
        </div>
    </div> -->


    <!-- <ul v-for="(item, index) in items" :key="index" class="space-y-12">

        {{ sum_numbers(item) }}

        {{ projectData }}

    </ul> -->

    <!-- <div>
        <ul v-for="(item, index) in items" :key="index" class="space-y-12">
            <li v-if="Array.isArray(item.structure) && item.structure.length !== 0">
                {{ processStructure(item.structure) }}
            </li>
            <li v-else>
                {{ processInventory(item) }}
            </li>
        </ul>
        <div v-if="allProjectData.length !== 0">
            <h2>All Project Data</h2>
            <ul>
                <li v-for="(data, dataIndex) in allProjectData" :key="dataIndex">
                    <div v-for="(inventerydata, inventerydataIndex) in data" :key="inventerydataIndex">

                        <buttton class="btn-regular display-flex align-center gap-8px bg-white">

                            <div class="ellipse-dot"
                                :class="{ 'bg-emerald': inventerydata.inv_status === 1, 'bg-rose': inventerydata.inv_status === 2, 'bg-orange': inventerydata.inv_status === 3, 'bg-blue': inventerydata.inv_status === 4, 'bg-Grey_40': inventerydata.inv_status === 5, 'bg-purple': inventerydata.inv_status === 6 }">
                            </div>

                            <p class="text-sm_medium color-Grey_60 text-uppercase">{{ inventerydata.inv_name }} </p>

                        </buttton>

                    </div>
                </li>
            </ul>
        </div>
        <div v-else>
            <p>No project data available.</p>
        </div>
    </div> -->

    <!-- {{ dataArray.str_name }}

    {{ inventoryList }}

    <div v-for="(inventerydata, inventerydataIndex) in inventoryList" :key="inventerydataIndex">


        <buttton class="btn-regular display-flex align-center gap-8px bg-white">

            <div class="ellipse-dot"
                :class="{ 'bg-emerald': inventerydata.inv_status === 1, 'bg-rose': inventerydata.inv_status === 2, 'bg-orange': inventerydata.inv_status === 3, 'bg-blue': inventerydata.inv_status === 4, 'bg-Grey_40': inventerydata.inv_status === 5, 'bg-purple': inventerydata.inv_status === 6 }">
            </div>

            <p class="text-sm_medium color-Grey_60 text-uppercase">{{ inventerydata.inv_name }} </p>

        </buttton>

    </div> -->


    <!-- <div v-if="findInventory(item.structure).length > 0">
            <p>Found inventories:</p>
            <ul>
                <li v-for="(foundItem, foundIndex) in findInventory(item.structure)" :key="foundIndex">
                    {{ foundItem.name }}
                </li>
            </ul>
        </div>
        <div v-else>
            <p>No inventory found.</p>
        </div> -->

    <!-- <li v-for="(projectStructure, projectStructureIndex1) in item.structure" :key="projectStructureIndex1"
            class="space-y-4">

            <div v-if="findInventory(projectStructure.structure, 0)">
                <p>Found inventory: {{ foundInventory.name }}</p>
            </div>
            <div v-else>
                <p>Inventory not found.</p>
            </div> -->

    <!-- <div v-for="(projectStructure2, projectStructureIndex2) in projectStructureIndex1.structure"
                    :key="projectStructureIndex2">

                    <div v-for="(projectStructure3, projectStructureIndex3) in projectStructureIndex3.structure"
                        :key="projectStructureIndex3">

                        <div v-for="(inventerydata, inventerydataIndex) in projectStructure3.inventery"
                            :key="inventerydataIndex"></div>

                    </div>

                </div> -->

    <!-- <div v-for="(projectStructureinventery, projectStructureinventeryIndex) in projectStructure.structure"
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

            </div> -->

    <!-- </li> -->

    <!-- </ul> -->

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