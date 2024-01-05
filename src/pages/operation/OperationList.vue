<script>

import { useAuthStore, useAlertStore } from '../../stores'
import { fetchWrapper } from '../../helpers/fetch-wrapper'

import Layout from '../../components/Layout.vue';
import ContentSection from '../../subcomponents/ContentSection.vue';
import SearchBox from '../../subcomponents/common/SearchBox.vue';
import Pagination from '../../subcomponents/common/Pagination.vue';
import Operations from './subcomponents/OperationRow.vue';
import DeleteModel from '../../subcomponents/common/DeleteModel.vue';

const baseUrl = `${import.meta.env.VITE_API_URL}`;

export default {
    components: { Layout, ContentSection, SearchBox, Pagination, Operations, DeleteModel },
    data() {
        return {
            list: [],
            searchText: "",
            currentPage: 1,
            totalPages: 1,
            sort: "asc",
            deleteItemModal: false,
            itemId: "",
        }
    },
    created() {
        this.operationData();
        const authStore = useAuthStore();
        const title = "Operations |  Billion Build"
        const description = "this is description for Operations"

        authStore.chnageTitle(title, description)
    },
    methods: {

        searchTextFun(event) {
            this.searchText = event.target.value.trim();
            this.operationData();
        },

        updatePage(Number) {
            this.currentPage = Number;
            this.operationData();
        },

        chnageSort() {
            this.sort = this.sort === 'desc' ? 'asc' : 'desc';
            this.operationData();
        },

        async operationData() {
            var user_data = new FormData();
            user_data.append("operation_id", "");
            user_data.append("sort", this.sort);
            user_data.append("search", this.searchText);
            user_data.append("page_no", this.currentPage);

            try {
                const response = await fetchWrapper.post(`${baseUrl}/operation-list`, user_data);
                this.list = response.data;
                this.totalPages = response.total_pages;

            } catch (error) {
                const alertStore = useAlertStore()
                alertStore.error(error)
            }

        },

        async statusUpdate(id, s_id) {
            var status_up = new FormData();

            status_up.append("operation_id", id);
            status_up.append("operation_status", s_id);

            try {
                const data = await fetchWrapper.post(`${baseUrl}/operation-status`, status_up);

                if (data.success === 1) {
                    this.operationData();
                }

            } catch (error) {
                const alertStore = useAlertStore()
                alertStore.error(error)
            }
        },

        getItemId(id) {
            this.deleteItemModal = true
            this.itemId = id
        },

        // editItem(id) {
        //     this.$router.push({ name: 'EditCustomer', params: { id: id } })
        // },

        async deleteItem() {
            var delete_data = new FormData();

            delete_data.append("operation_id", this.itemId);

            try {
                const data = await fetchWrapper.post(`${baseUrl}/remove-operation`, delete_data);

                if (data.success === 1) {
                    this.operationData();
                    this.deleteItemModal = false
                }

            } catch (error) {
                const alertStore = useAlertStore()
                alertStore.error(error)
            }
        },
    },
}
</script>



<template>
    <Layout>


        <ContentSection>

            <template v-slot:table-header>

                <div class="w-100 margin-bottom_12px">
                    <h2 class="title">Operation List</h2>
                </div>


                <div class="table-options">

                    <button class="btn-regular display-flex align-center gap-8px" @click="chnageSort()">
                        <img src="../../assets/img/icons/adjustments.svg">
                        <span v-if="sort === 'asc'">Newest</span>
                        <span v-if="sort === 'desc'">Oddest</span>
                    </button>


                </div>

                <div class="table-options">

                    <SearchBox placeholder="Search Account" :value="searchText" @input="searchTextFun" />

                </div>


            </template>

            <template v-slot:main-table>

                <div v-if="!list" class="data-not-found border-b border-Grey_20 border-solid">
                    <img src="../../assets/img/no-data.png">
                </div>

                <table class="w-100 user-table" v-if="list">
                    <tbody>
                        <tr>
                            <td class="count">
                                <p class="text-base_semibold color-Grey_50">No.</p>
                            </td>
                            <td class="user_name">
                                <p class="text-base_semibold color-Grey_50"> Operation Name</p>
                            </td>
                            <td class="user_email">
                                <p class="text-base_semibold color-Grey_50">Operation Date</p>
                            </td>
                            <td class="user_address">
                                <p class="text-base_semibold color-Grey_50 line-clamp-1">Operation Note</p>
                            </td>
                            <td class="blank"></td>
                            <td class="user-status"></td>
                            <td class="dropdown">
                                <div class="icon-btn icon-btn_32px  custom-dropdown"></div>
                            </td>
                        </tr>
                        <Operations :list="list" @delete_item="getItemId" @edit_item="editItem"
                            @edit_status="statusUpdate" />

                    </tbody>
                </table>

            </template>

            <template v-slot:table-footer>


                <Pagination :currentPage="currentPage" :totalPages="totalPages" @update-page="updatePage" />


            </template>

        </ContentSection>


    </Layout>


    <DeleteModel model_title="Delete Operation" model_subtitle="Are you sure you want to delete this Operation?"
        v-if="deleteItemModal" @close_model="deleteItemModal = false" @delete_item="deleteItem()" />
</template>


<style scoped>
tr {
    display: flex;
    gap: 24px;
    align-items: center;
}

tr:nth-last-child(1) .custom-dropdown-list,
tr:nth-last-child(2) .custom-dropdown-list,
tr:nth-last-child(3) .custom-dropdown-list {
    top: auto;
    bottom: 90%;
}

.count {
    min-width: 3%;
    max-width: 3%;
    display: block;
}

.user_name {
    min-width: 18%;
    max-width: 18%;
    display: block;
}

.user_name .user-img {
    width: 32px;
    height: 32px;
    border-radius: 999px;
}

.user_email {
    min-width: 15%;
    max-width: 15%;
    display: block;
}

.user_number {
    min-width: 10%;
    max-width: 10%;
    display: block;
}

.user_address {
    min-width: 25%;
    max-width: 25%;
    display: block;
    overflow: hidden;
}

.blank {
    min-width: 12%;
    max-width: 12%;
    display: block;
}

.user-status {
    min-width: 10%;
    max-width: 10%;
    display: flex;
    justify-content: end;
}

.dropdown {
    min-width: 5%;
    max-width: 5%;
    display: flex;
    justify-content: end;
}

.custom-dropdown:hover .custom-dropdown-list {
    display: block;
}

@media (max-width:990px) {

    .count {
        min-width: 50px;
        max-width: 50px;
    }

    .user_name {
        min-width: 200px;
        max-width: 200px;
    }


    .user_email {
        min-width: 200px;
        max-width: 200px;
    }

    .user_number {
        min-width: 150px;
        max-width: 150px;
    }

    .user_address {
        min-width: 180px;
        max-width: 180px;
        display: block;
    }

    .blank {
        min-width: 50px;
        max-width: 50px;
    }

    .user-status {
        min-width: 100px;
        max-width: 100px;
    }

    .dropdown {
        min-width: 50px;
        max-width: 50px;
    }

}
</style>