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
        },
        closedropp() {
            this.$emit('close_dropdown');
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
            <div class="close-icon" @click="closedropp">
                <img src="../../../assets/img/icons/close-icon.svg">
            </div>
        </div>
        <button class="btn-regular bg-white" v-if="selectedOptionVal" @click="sendSelectedOption">Submit</button>
    </div>
    <div class="overlay" @click="closedropp"></div>
</template>

<style scoped>
.dropdown-contain {
    z-index: 100;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}

.overlay {
    position: fixed;
    width: 100%;
    height: 100dvh;
    inset: 0;
    background: #1118274a;
    z-index: 99;
    margin-top: 0 !important;
}

.dropdown {
    min-width: 320px;
    max-width: 320px;
    position: relative;
}

.close-icon {
    width: 36px;
    position: absolute;
    right: -2.5rem;
    top: -2rem;
    height: 36px;
    border-radius: 999px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    cursor: pointer;
}

.btn-regular {
    min-width: 320px;
    max-width: 320px;
    margin-top: 12px;
}

.custom-dropdown-list {
    max-height: 250px;
}

.add_new-custom-option {
    display: flex !important;
}
</style>