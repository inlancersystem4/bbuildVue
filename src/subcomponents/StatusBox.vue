<script>
export default {
    props: {
        items: Array
    },
    methods: {
        getstatus(item) {
            this.$emit('getstatus', item)
        }
    },
}
</script>

<template>
    <div v-if="!items || items.length === 0" class="w-full display-flex align-center display-flex-wrap gap-8px">
        <div class="skeleton-element btn-regular display-flex align-center bg-white" v-for="index in 6" :key="index">
            <div class="skeleton-dot ellipse-dot"></div>
            <p class="skeleton-text"></p>
        </div>
    </div>

    <div class="btn-regular display-flex align-center gap-8px bg-white" v-for="(item, index) in items" :key="index"
        @click="getstatus(item)">

        <div class="ellipse-dot"
            :class="{ 'bg-emerald': item.inv_status_id === 1, 'bg-rose': item.inv_status_id === 2, 'bg-orange': item.inv_status_id === 3, 'bg-blue': item.inv_status_id === 4, 'bg-Grey_40': item.inv_status_id === 5, 'bg-purple': item.inv_status_id === 6 }">
        </div>

        <p class="text-sm_medium color-Grey_60 text-uppercase">
            <span>{{ item.inv_status_name }}</span>
        </p>

    </div>
</template>


<style scoped>
.skeleton-element {
    margin-bottom: 10px;
}

.skeleton-dot {
    width: 8px;
    height: 8px;
    background-color: #ccc;
    border-radius: 50%;
    margin-right: 8px;
}

.skeleton-text {
    width: 50px;
    height: 12px;
    background-color: #ccc;
    border-radius: 4px;
}
</style>