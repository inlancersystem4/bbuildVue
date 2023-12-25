<script>
export default {
    props: {
        drawer_title: String,
    },
    methods: {
        closeDrawer() {
            this.$emit('close_drawer')
        },
        drawerBtn() {
            this.$emit('drawebtn_clicked')
        }
    },
}
</script>

<template>
    <div class="drawer rightside drawer-show">

        <div class="drawer-header">
            <div class="display-flex align-center gap-16px">
                <h4 class="drawer-title">{{ drawer_title }}</h4>
            </div>
            <button class="close-icon" @click="closeDrawer()">
                <img src="../assets/img/icons/close-icon.svg">
            </button>

        </div>

        <div class="drawer-body">

            <slot></slot>

        </div>

        <div class="drawer-footer">
            <div class="button-group">
                <button class="btn" @click="closeDrawer()">Cancel</button>
                <button class="btn bg-purple color-white" @click="drawerBtn()">Save and close</button>
            </div>
        </div>



    </div>
    <div class="overlay"> </div>
</template>

<style scoped>
.overlay {
    position: fixed;
    z-index: 99;
    inset: 0;
    width: 100%;
    height: 100%;
    opacity: 0.4;
    background: #111827;
}
</style>