<script>
export default {
    props: {
        label: String,
        required:Boolean
    }
}
</script>


<template>
    <label :for="label">{{ label }} <span class="text-rose" v-if="required">*</span> </label>
</template>

<style scoped>
label {
    font-size: 14px;
    text-transform: capitalize;
    font-family: 500;
    letter-spacing: 0.2px;
    display: block;
    cursor: pointer;
}
</style>