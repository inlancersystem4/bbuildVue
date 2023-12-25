<script>

export default {

    props: {
        options: {
            type: Array,
            required: true,
        },
        responseData: {
            type: Array,
            default: null
        },
    },

    data() {
        return {
            selectDropdownOpen: false,
            selectedOption: null,
            selectedOptionVal: null,
            responseOption: "",
            selectedOptions: [],
        }
    },
    created() {
    },
    computed: {

    },
    methods: {
        toggleDropdown() {
            this.selectDropdownOpen = !this.selectDropdownOpen;
        },
        selectOption(option) {
            const index = this.selectedOptions.findIndex(
                (selOption) => selOption.module_name === option.module_name
            );

            if (index === -1 && !option.disabled) {
                this.selectedOptions.push(option);
            } else if (index !== -1 && !option.disabled) {
                this.selectedOptions.splice(index, 1);
            }

            this.selectDropdownOpen = false;
            this.$emit('option-selected', this.selectedOptions);
        },
        clearSelection(index) {
            this.selectedOptions.splice(index, 1);
            this.selectDropdownOpen = false;
            this.$emit('option-selected', this.selectedOptions);
        },
        clearResSelection(id, index, data) {
            this.responseData.splice(id, 1);
            this.responseData.splice(index, 1);
            this.selectDropdownOpen = false;
            // this.$emit('option-selected', this.selectedOptions, data);
            this.$emit('selected-option_Del', data, id);
            // console.log("data", data)
            // console.log("selectedOptions", this.selectedOptions)
        },
        isSelected(option) {

            if (!this.selectedOptions || !this.responseData) {
                return false;
            }

            const isInSelectedOptions = this.selectedOptions.some(
                (selectedOption) => selectedOption.module_name === option.module_name
            );

            const isInResponseData = this.responseData.some(
                (selectOp) => selectOp.module_name === option.module_name
            );

            return isInSelectedOptions || isInResponseData;
        }
    },
}

</script>


<template>
    <div class="select">
        <div v-if="responseData" class="display-flex align-center gap-8px w-fit">

            <div v-for="(selectOp, index) in responseData" :key="index"
                class="rounded-regualr bg-Grey_20 padding-y_2px padding-left_12px padding-right_8px display-flex align-center gap-4px">
                <p class="color-Grey_60 text-base_medium text-capitalize">{{ selectOp.module_name }}</p>
                <button class="icon-btn icon-btn_24px" @click="clearResSelection(selectOp.module_id, selectOp, index)">
                    <img src="../../assets/img/icons/close-icon2.svg">
                </button>
            </div>
        </div>

        <div class="display-flex align-center gap-8px w-fit">
            <div v-for="(selectedOption, index) in selectedOptions" :key="index"
                class="rounded-regualr bg-Grey_20 padding-y_2px padding-left_12px padding-right_8px display-flex align-center gap-4px">
                <p class="color-Grey_60 text-base_medium text-capitalize">{{ selectedOption.module_name
                }}</p>
                <button class="icon-btn icon-btn_24px" @click="clearSelection(index)">
                    <img src="../../assets/img/icons/close-icon2.svg">
                </button>
            </div>
        </div>


        <div class=" display-flex align-center justify-between w-100" @click="toggleDropdown">

            <div class="cursor-pointer">

                <p class="w-100 capitalize color-Grey_50 font-medium img-not-selected">
                    Select Option
                </p>

            </div>


            <div class="select-icon cursor-pointer">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M19.5 9L12 16.5L4.5 9" stroke="#191C1F" stroke-width="1.5" stroke-linecap="round"
                            stroke-linejoin="round" />
                    </svg>
                </div>
            </div>

        </div>


        <div v-if="selectDropdownOpen" class="select-option">

            <ul class="w-100">

                <p class="no-conetnt-show-section" v-if="!options">
                    Oops No data Found !!
                </p>

                <li v-for="(option, index) in options" :key="index" @click="selectOption(option)" class="capitalize"
                    :class="{ 'disabled': option.disabled || isSelected(option) }">
                    <div>
                        {{ option.module_name }}
                    </div>
                </li>
            </ul>

        </div>

    </div>
</template>


<style scoped>
.select {
    width: 100%;
    border-width: 1px;
    border-style: solid;
    border-color: var(--Grey-20);
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 12px;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    padding-left: 0.75rem;
    padding-right: 0.75rem;
    border-radius: 0.375rem;
    position: relative;
}

.select-option {
    width: 100%;
    position: absolute;
    top: 90%;
    border-width: 1px;
    border-style: solid;
    border-color: var(--Grey-20);
    background-color: #ffffff;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    border-radius: 0.375rem;
    left: 0;
    margin-top: 0.5rem;
    max-height: 240px;
    overflow-y: auto;
    z-index: 99;
}



.select-icon {
    display: flex;
    align-items: center;
    gap: 6px;
}

.select-option li {
    display: block;
    padding-left: 1rem;
    padding-right: 1rem;
    padding-top: 0.375rem;
    padding-bottom: 0.375rem;
    cursor: pointer;
    text-transform: capitalize;
    border-bottom: 1px solid var(--Grey-20);
}

.search-wrraper {
    border: 1px solid var(--Grey-20);
}

.search-wrraper:focus {
    box-shadow: none;
}

.select-option li:hover {
    background-color: var(--Grey-20);
}

.select-option li.disabled {
    pointer-events: none;
    opacity: 0.5;
    cursor: no-drop;
}
</style>
