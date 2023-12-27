<script>
export default {
    props: {
        list: Array,
        placeholder: String,
        value: String
    },
    data() {
        return {
            inputValue: this.value || '',
            selectoption: "",
        };
    },
    watch: {
        value(newValue) {
            this.inputValue = newValue;
        }
    },
    methods: {
        clearOption() {
            this.selectoption = ""
            this.$emit('selectitem')
        },
        selectitem(item) {
            this.$emit('selectitem', item)
            this.inputValue = ""
            this.selectoption = item.cus_first_name + " " + item.cus_last_name
        }
    },
}
</script>

<template>
    <div class="absolute inset-0 w-full h-full z-20">
        <div v-if="selectoption" class="px-2 flex items-center h-full">
            <div
                class="rounded-regualr bg-Grey_20 display-flex align-center gap-8px padding-y_2px padding-left_12px padding-right_8px color-Grey_60 text-sm_medium w-fit">
                <span class="capitalize"> {{ selectoption }}</span>
                <button class="icon-btn icon-btn_24px" @click="clearOption">
                    <img src="../../../assets/img/icons/close-icon2.svg">
                </button>
            </div>
        </div>
        <input type="text" :placeholder="placeholder" v-model="inputValue" v-if="!selectoption"
            class="outline-none w-full h-full  focus:outline-none border-none  padding-x_8px focus-within:outline-none rounded-none">
        <div class="relative w-full h-fit" v-if="inputValue">
            <ul
                class="w-full absolute left-0 top-full bg-white border border-Grey_20 border-solid rounded-regualr min-w-[275px]  shadow-xl all-border-t overflow-x-hidden max-h-[250px] overflow-y-auto">
                <li class="padding-x_16px padding-y_8px" v-for="(item, index) in list" :key="index"
                    @click="selectitem(item)">
                    <p class="color-Grey_90 text-base_regular capitalize" v-if="item.cus_id">
                        {{ item.cus_first_name }}
                        {{ item.cus_last_name }}
                    </p>
                    <p class="color-Grey_90 text-base_regular capitalize" v-if="item.inv_status_id">
                        {{ item.inv_status_name }}
                    </p>
                </li>
                <li v-if="!list" class="py-8 text-center px-2">

                    No data data not found !!

                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped>
li:hover {
    background-color: var(--Grey-20);
    cursor: pointer;
}
</style>