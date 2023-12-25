<script>
export default {
    props: {
        model_title: String,
        model_subtitle: String,
        model_content: String,
    },
    methods: {
        closeModel() {
            this.$emit('close_model')
        },
        delectItem() {
            this.$emit('delete_item')
        }
    },
}
</script>


<template>
    <div class="model center-align_model">
        <div class="delete-model">
            <div class="w-100 space-y-6px">
                <h4 class="color-Grey_90 text-large_semibold">{{ model_title }}</h4>
                <p class="text-base_regular color-Grey_50">{{ model_subtitle }}</p>
            </div>
            <div class="display-flex gap-8px">
                <button class="btn-regular" @click="closeModel()">No, cancel</button>
                <button class="btn-regular btn-danger" @click="delectItem()">Yes, delete {{ model_content }}</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.center-align_model {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background: rgb(17, 24, 39, 0.4)
}

.btn-danger {
    transition: background-color .1s;
}

.delete-model .btn-danger:hover {
    background-color: transparent;
    color: red;
}
</style>