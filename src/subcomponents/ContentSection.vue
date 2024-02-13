<script>
export default {

}
</script>


<template>
    <div class="table-content">

        <div class="table-header display-flex-wrap">


            <slot name="table-header">



            </slot>


        </div>


        <div class="main-table">


            <slot name="main-table">


            </slot>


        </div>

        <div>

            <slot name="table-footer"></slot>

        </div>

    </div>
</template>

<style scoped>
.main-table {
    overflow-x: auto;
}
</style>