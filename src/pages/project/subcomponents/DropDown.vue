<script>
export default {
    props: {
        items: Array
    },
    data() {
        return {
            selectDropdownOpen: false,
            selectedOption: null,
            selectedOptionVal: null,
            customValue: "",
        }
    },
    methods: {
        toggleDropdown() {
            this.selectDropdownOpen = !this.selectDropdownOpen;
        },
        selectOption(item) {
            this.selectedOption = item.sug_name;
            this.selectedOptionVal = item.sug_name;
            this.selectDropdownOpen = false;
        },
        sendSelectedOption() {
            this.$emit('option-selected', this.selectedOptionVal);
        },
        customType() {
            this.$emit('option-selected', this.customValue);
        }
    },
}
</script>

<template>
    <div class="dropdown-contain">
        <div class="dropdown">
            <div class="custom-select custom-dropdown">
                <p @click="toggleDropdown" class="cursor-pointer">
                    {{ selectedOption ? selectedOption : 'Select Option' }}
                </p>
                <ul class="custom-dropdown-list show-dropdown" id="TypeDrop2" v-if="selectDropdownOpen">
                    <li class="dropdown-item" v-for="(item, index) in items" :key="index" @click="selectOption(item)">
                        <button class="dropdown-link"
                            :class="{ 'selected-dropdown-option': this.selectedOptionVal === item }">
                            <p class="dropdown-link-title">{{ item.sug_name }}</p>
                        </button>
                    </li>
                    <li class="dropdown-item">
                        <div class="add-custom-option">
                            <input type="text" placeholder="Add custom type" v-model="customValue">
                            <button class="add_new-custom-option" v-if="customValue.trim().length > 0" @click="customType">
                                <img src="../../../assets/img/icons/plus.svg">
                            </button>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <button class="btn-regular bg-white" v-if="selectedOptionVal" @click="sendSelectedOption">Submit</button>
    </div>
</template>

<style scoped>
.dropdown-contain {
    position: fixed;
    width: 100%;
    height: 100dvh;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    z-index: 100;
    flex-direction: column;
    background: #1118274a;
    gap: 12px;
}

.dropdown {
    min-width: 320px;
    max-width: 320px;
}

.btn-regular {
    min-width: 320px;
    max-width: 320px;
}

.custom-dropdown-list {
    max-height: 250px;
}

.add_new-custom-option {
    display: flex !important;
}
</style>