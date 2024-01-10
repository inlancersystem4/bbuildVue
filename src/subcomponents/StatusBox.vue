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

    <button class="btn-regular display-flex align-center gap-8px  bg-opacity-15" v-for="(item, index) in items" :key="index"
        @click="getstatus(item)"
        :class="{ 'bg-[#10B981] border-[#10B981]': item.inv_status_id === 1, 'bg-[#F43F5E] border-[#F43F5E]': item.inv_status_id === 2, 'bg-[#F97316] border-[#F97316]': item.inv_status_id === 3, 'bg-[#1E3A8A] border-[#1E3A8A]': item.inv_status_id === 4, 'bg-[#808080] border-[#808080]': item.inv_status_id === 5, 'bg-[#7C3AED] border-[#7C3AED]': item.inv_status_id === 6 }">

        <div class="ellipse-dot"
            :class="{ 'bg-emerald': item.inv_status_id === 1, 'bg-rose': item.inv_status_id === 2, 'bg-orange': item.inv_status_id === 3, 'bg-blue': item.inv_status_id === 4, 'bg-Grey_40': item.inv_status_id === 5, 'bg-purple': item.inv_status_id === 6 }">
        </div>

        <p class="text-sm_medium color-Grey_60 text-uppercase">
            <span>{{ item.inv_status_name }}</span>
        </p>

    </button>
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