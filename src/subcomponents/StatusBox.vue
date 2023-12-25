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
            :class="{ 'bg-emerald': item.status === 1, 'bg-rose': item.status === 2, 'bg-orange': item.status === 3, 'bg-blue': item.status === 4, 'bg-Grey_40': item.status === 5, 'bg-purple': item.status === 6 }">
        </div>

        <p class="text-sm_medium color-Grey_60 text-uppercase">
            <span v-if="item.status === 1">unsold</span>
            <span v-if="item.status === 2">sold</span>
            <span v-if="item.status === 3">booked</span>
            <span v-if="item.status === 4">freeze</span>
            <span v-if="item.status === 5">hold</span>
            <span v-if="item.status === 6">rent</span>
        </p>

    </div>
</template>