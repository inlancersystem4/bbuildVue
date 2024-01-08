<script>
export default {
    props: {
        accordionItems: {
            type: Array,
            required: true
        }
    },
    methods: {
        toggleAccordion(index) {
            this.$set(this.accordionItems[index], 'isActive', !this.accordionItems[index].isActive);
        }
    }
};
</script>


<template>
    <div class="custom-accordion">
        <div v-for="(item, index) in accordionItems" :key="index" class="accordion-items"
            :class="{ 'active-accordion': item.isActive }">
            <div class="accordion-header" @click="toggleAccordion(index)">
                <div>
                    <h4 class="accordion-title">{{ item.title }}</h4>
                    <p class="accordion-sub-title">{{ item.subtitle }}</p>
                </div>
                <div class="accordion-icons">
                    <img v-if="!item.isActive" src="../assets/img/icons/plus-2.svg" class="img-not-selected plus_icon">
                    <img v-if="item.isActive" src="../assets/img/icons/minus.svg" class="img-not-selected minus_icon">
                </div>
            </div>
            <div class="accordion-body">
                <slot :index="index"></slot>
            </div>
        </div>
    </div>
</template>

