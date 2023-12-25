<script>

import { useAuthStore, useAlertStore } from '../../stores'
import { fetchWrapper } from '../../helpers/fetch-wrapper'

import Layout from '../../components/Layout.vue';
import ContentSection from '../../subcomponents/ContentSection.vue';
import SearchBox from '../../subcomponents/common/SearchBox.vue';
import Pagination from '../../subcomponents/common/Pagination.vue';
import UserRow from './component/UserRow.vue';
import DeleteModel from '../../subcomponents/common/DeleteModel.vue';

const baseUrl = `${import.meta.env.VITE_API_URL}`;

export default {
    components: { Layout, ContentSection, SearchBox, Pagination, UserRow, DeleteModel },
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
        this.userData();
    },
    methods: {

        addUserFun() {
            this.$router.push({ name: 'AddUser' })
        },

        pushRoles() {
            this.$router.push({ name: 'Roles' })
        },

        searchTextFun(event) {
            this.searchText = event.target.value.trim();
            this.userData();
        },

        updatePage(Number) {
            this.currentPage = Number;
            this.userData();
        },

        chnageSort() {
            this.sort = this.sort === 'desc' ? 'asc' : 'desc';
            this.userData();
        },

        async userData() {
            var user_data = new FormData();
            // user_data.append("user_id", "");
            user_data.append("sort", this.sort);
            user_data.append("search", this.searchText);
            user_data.append("page_no", this.currentPage);

            try {
                const response = await fetchWrapper.post(`${baseUrl}/user-list`, user_data);
                this.list = response.data;
                this.totalPages = response.total_pages;


            } catch (error) {
                console.log(error);
            }

        },

        async statusUpdate(id) {
            var status_up = new FormData();

            status_up.append("user_id", id);

            try {
                const data = await fetchWrapper.post(`${baseUrl}/user-status`, status_up);

                if (data.success === 1) {
                    this.userData();
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

        editItem(id) {
            this.$router.push({ name: 'EditUser', params: { id: id } })
        },

        async deleteItem() {
            var delete_data = new FormData();

            delete_data.append("user_id", this.itemId);

            try {
                const data = await fetchWrapper.post(`${baseUrl}/remove-user`, delete_data);

                if (data.success === 1) {
                    this.userData();
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
                    <h2 class="title">User List</h2>
                </div>


                <div class="table-options">

                    <button class="btn-regular display-flex align-center gap-8px" @click="chnageSort()">
                        <img src="../../assets/img/icons/adjustments.svg">
                        <span v-if="sort === 'asc'">Newest</span>
                        <span v-if="sort === 'desc'">Oddest</span>
                    </button>

                    <button class=" btn-regular display-flex align-center gap-8px" @click="pushRoles()">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <path
                                d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
                                stroke="#111827" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M12 12V3" stroke="#111827" stroke-width="1.5" stroke-linecap="round"
                                stroke-linejoin="round" />
                            <path d="M19.7907 7.5L4.20947 16.5" stroke="#111827" stroke-width="1.5" stroke-linecap="round"
                                stroke-linejoin="round" />
                        </svg>
                        <span>Roles & Permissions</span>
                    </button>

                </div>

                <div class="table-options">

                    <SearchBox placeholder="Search Account" :value="searchText" @input="searchTextFun" />

                    <button class="btn-regular display-flex align-center  gap-8px text-no-wrap" @click="addUserFun()">
                        <img src="../../assets/img/icons/plus-3.svg">
                        Add New User</button>

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
                                <p class="text-sm_regular color-Grey_50">No.</p>
                            </td>
                            <td class="user_name">
                                <p class="text-sm_regular color-Grey_50">User Name</p>
                            </td>
                            <td class="user_email">
                                <p class="text-sm_regular color-Grey_50">User Email</p>
                            </td>
                            <td class="user_number">
                                <p class="text-sm_regular color-Grey_50">User No.</p>
                            </td>
                            <td class="blank"></td>
                            <td class="user-status">
                                <p class="text-sm_regular color-Grey_50">User staus</p>
                            </td>
                            <td class="dropdown">

                            </td>
                        </tr>
                        <UserRow :list="list" @delete_item="getItemId" @edit_item="editItem" @edit_status="statusUpdate" />

                    </tbody>
                </table>

            </template>

            <template v-slot:table-footer>


                <Pagination :currentPage="currentPage" :totalPages="totalPages" @update-page="updatePage" />


            </template>

        </ContentSection>


    </Layout>


    <DeleteModel model_title="Delete User" model_subtitle="Are you sure you want to delete this User?"
        v-if="deleteItemModal" @close_model="deleteItemModal = false" @delete_item="deleteItem()" />
</template>

<style scoped>
tr {
    display: flex;
    gap: 24px;
    align-items: center;
}

.count {
    min-width: 3%;
    max-width: 3%;
    display: block;
}

.user_name {
    min-width: 20%;
    max-width: 20%;
    display: block;
}

.user_name .user-img {
    width: 32px;
    height: 32px;
    border-radius: 999px;
}

.user_email {
    min-width: 18%;
    max-width: 18%;
    display: block;
}

.user_number {
    min-width: 18%;
    max-width: 18%;
    display: block;
}

.blank {
    min-width: 15%;
    max-width: 15%;
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