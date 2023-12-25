<script>
export default {
    props: {
        placeholder: String,
        value: String,
        id: String,
    }
}
</script>


<template>
    <textarea :placeholder="placeholder" :value="value" :id="id" class="input-1"></textarea>
</template>

<style scoped>
textarea {
    min-height: 120px;
    max-height: 150px;
    resize: none;
}
</style>