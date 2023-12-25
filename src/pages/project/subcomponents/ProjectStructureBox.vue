<script>
import Label from '@/subcomponents/common/Label.vue'
import Input from '@/subcomponents/common/Input.vue'

export default {
    components: { Input, Label },
    props: {
        items: Array
    },
    data() {
        return {
            structureNumber: [
                {
                    "name": "numbers",
                    "value": "1",
                },
                {
                    "name": "abcd",
                    "value": "A",
                }
            ]
        }
    },
    methods: {
        deleteItem(index) {
            this.$emit('deleteItem', index)
        },
        enterStructureLevel(index, e) {
            this.$emit('enterStructureLevel', index, e)
        },
        handleCheck(index, value) {
            this.$emit('handleCheck', index, value)
        }
    },
}
</script>

<template>
    <div class="w-full border border-solid border-Grey_20 rounded-regualr bg-white" v-for="(item, index) in items"
        :key="index">

        <div class="w-full all-child-border-t">

            <div
                class="padding-x_32px  Sm_padding-x_28px Mobile_padding-x_24px  Sm_padding-y_18px Mobile_padding-y_16px padding-y_24px ">

                <div class="display-flex align-center justify-between w-100 gap-12px">

                    <h4 class="text-xl_semibold color-Grey_90">{{ item.structure_name }}</h4>

                    <button class="icon-btn icon-btn_32px custom-dropdown">

                        <img src="../../../assets/img/icons/dots-icon.svg" />

                        <ul class="custom-dropdown-list leftside icon-dropdown">
                            <li class="dropdown-item" @click="deleteItem(index)">
                                <div class="dropdown-link">
                                    <img src="../../../assets/img/icons/trash.svg" />
                                    <p class="dropdown-link-title required"> Delete Structure
                                    </p>
                                </div>
                            </li>
                        </ul>

                    </button>

                </div>

                <div class="display-flex gap-8px margin-top_8px">
                    <p class="color-Grey_50 text-base_regular">Structure Parent:-</p>
                    <p class="color-Grey_90 text-base_semibold">{{ item.structure_parent }}</p>
                </div>

            </div>

            <div
                class="padding-x_32px  Sm_padding-x_28px Mobile_padding-x_24px  Sm_padding-y_18px Mobile_padding-y_16px padding-y_24px">

                <div class="address-form">

                    <div class="space-y-8px">
                        <Label :label="'Structure Levels' + '_' + index" />
                        <Input placeholder="Enter Structure Levels" :id="'Structure Levels' + '_' + index" type="number"
                            :value="item.structure_levels" @input="enterStructureLevel(index, $event)" />
                    </div>

                    <div></div>

                    <div class="col-span-2  space-y-16px">

                        <Label label="Select Structure number" />

                        <div class="display-flex align-center gap-24px">

                            <div class="display-flex align-center gap-12px custom-toogle-btn"
                                v-for="(structureNumberitems, structureNumberindex) in structureNumber"
                                :key="structureNumberindex">

                                <input type="radio" class="form-toogle-btn"
                                    :checked="item.structure_number === structureNumberitems.value"
                                    @change="handleCheck(index, structureNumberitems.value)" :name="radio + '_' + index"
                                    :id="structureNumberitems.name + _ + structureNumberindex + _ + index" />

                                <label class="text-capitalize text-large_semibold color-Grey_90"
                                    :for="structureNumberitems.name + _ + structureNumberindex + _ + index">{{
                                        structureNumberitems.name }}</label>

                            </div>

                        </div>

                    </div>

                </div>

            </div>


        </div>

    </div>
</template>


<style  scoped>
.custom-dropdown:hover .custom-dropdown-list {
    display: block;
}
</style>