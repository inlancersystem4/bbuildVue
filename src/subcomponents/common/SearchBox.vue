<script>
export default {
    props: {
        placeholder: String,
        value: String
    },
    data() {
        return {
            inputValue: this.value || ''
        };
    },
    watch: {
        value(newValue) {
            this.inputValue = newValue;
        }
    },
    methods: {
        clearInput() {
            this.$emit('clear_search');
            this.inputValue = ""
        }
    },
}
</script>


<template>
    <div class="search-wrraper w-100">
        <button class="icon">
            <img src="../../assets/img/icons/search.svg" class="img-not-selected">
        </button>
        <input type="text" class=" w-100" :placeholder="placeholder" v-model="inputValue">
        <button class="icon val_clear" style="cursor: pointer;" v-if="inputValue" @click="clearInput">
            <img src="../../assets/img/icons/close-icon.svg" class="img-not-selected">
        </button>
    </div>
</template>