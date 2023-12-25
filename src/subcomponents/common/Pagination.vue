<script>
export default {
    props: {
        currentPage: Number,
        totalPages: Number
    },
    methods: {
        prevPage() {
            this.$emit('update-page', this.currentPage - 1);
        },
        nextPage() {
            this.$emit('update-page', this.currentPage + 1);
        }
    }
}
</script>

<template>
    <div class="table-footer">

        <div class="table-resuits-count custom-dropdown">

            <!-- <p class="all-items-list-count">

                                                                    <span>1</span>

                                                                    -

                                                                    <span>13</span>

                                                                    of

                                                                    <span>200</span>

                                                                    results

                                                                </p> -->

        </div>


        <div class="table-pagination">

            <p class="total-pages-count">
                <span> {{ currentPage }} </span>
                of
                <span>{{ totalPages }}</span>
                pages
            </p>


            <div class="pagination-btn-group">
                <button @click="prevPage" :disabled="currentPage === 1" class="pagination-btn">Prev</button>
                <button @click="nextPage" :disabled="currentPage === totalPages" class="pagination-btn">Next</button>
            </div>

        </div>

    </div>
</template>



<style scoped>
@media (max-width:440px) {
    .table-resuits-count {
        display: none;
    }
}

.table-resuits-count .custom-dropdown-list {
    bottom: 100%;
    left: 100%;
    transform: none;
}
</style>