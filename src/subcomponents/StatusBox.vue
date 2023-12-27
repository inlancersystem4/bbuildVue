<script>
export default {
    props: {
        items: Array
    }
}
</script>

<template>
    <div class="btn-regular display-flex align-center gap-8px bg-white" v-for="(item, index) in items" :key="index">

        <div class="ellipse-dot"
            :class="{ 'bg-emerald': item.inv_status_id === 1, 'bg-rose': item.inv_status_id === 2, 'bg-orange': item.inv_status_id === 3, 'bg-blue': item.inv_status_id === 4, 'bg-Grey_40': item.inv_status_id === 5, 'bg-purple': item.inv_status_id === 6 }">
        </div>

        <p class="text-sm_medium color-Grey_60 text-uppercase">
            <span v-if="item.inv_status_id === 1">{{ item.inv_status_name }}</span>
            <span v-if="item.inv_status_id === 2">{{ item.inv_status_name }}</span>
            <span v-if="item.inv_status_id === 3">{{ item.inv_status_name }}</span>
            <span v-if="item.inv_status_id === 4">{{ item.inv_status_name }}</span>
            <span v-if="item.inv_status_id === 5">{{ item.inv_status_name }}</span>
            <span v-if="item.inv_status_id === 6">{{ item.inv_status_name }}</span>
        </p>

    </div>
</template>