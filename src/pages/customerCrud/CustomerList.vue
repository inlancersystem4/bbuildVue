<script>

import { useAuthStore, useAlertStore } from '../../stores'
import { fetchWrapper } from '../../helpers/fetch-wrapper'

import Layout from '../../components/Layout.vue';
import ContentSection from '../../subcomponents/ContentSection.vue';
import SearchBox from '../../subcomponents/common/SearchBox.vue';
import Pagination from '../../subcomponents/common/Pagination.vue';
import Customers from './component/CustomersRow.vue';
import DeleteModel from '../../subcomponents/common/DeleteModel.vue';
import TextArea from '../../subcomponents/common/TextArea.vue';
import Label from '../../subcomponents/common/Label.vue';
import Modal from '../inventeryList/subcomponents/Modal.vue';
import _debounce from 'lodash/debounce';

const baseUrl = `${import.meta.env.VITE_API_URL}`;

export default {
    components: { Layout, ContentSection, SearchBox, Pagination, Customers, DeleteModel, Modal, TextArea, Label },
    data() {
        return {
            breadcrumbList: [
                {
                    name: 'Dashboard',
                    link: '/'
                },
                {
                    name: 'Customers',
                }
            ],
            list: [],
            searchText: "",
            currentPage: 1,
            totalPages: 1,
            sort: "asc",
            deleteItemModal: false,
            itemId: "",
            remDate: "",
            remNote: "",
            reminderModal: false,
            listLoading: false,
            listEmpty: false
        }
    },
    created() {
        this.customerData();
        const authStore = useAuthStore();
        const title = "Customer List |  Billion Build"
        const description = "this is description for Customer List"

        authStore.chnageTitle(title, description)
    },
    computed: {
        remBtnDisabled() {
            const specialCharsRegex = /[!@#$%^&*()?":{}|<>]/;
            return !this.remDate || !this.remNote.trim() || specialCharsRegex.test(this.remNote);
        },
        formattedDate() {
            const date = new Date(this.remDate);

            const year = date.getFullYear();
            const month = `0${date.getMonth() + 1}`.slice(-2);
            const day = `0${date.getDate()}`.slice(-2);
            const hours = `0${date.getHours()}`.slice(-2);
            const minutes = `0${date.getMinutes()}`.slice(-2);
            const seconds = `0${date.getSeconds()}`.slice(-2);

            return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        },
    },
    methods: {

        addUserFun() {
            this.$router.push({ name: 'AddCustomer' })
        },


        searchTextFun: _debounce(function (event) {
            this.searchText = event.target.value.trim();
            this.customerData();
        }, 400),

        clearSearch() {
            this.searchText = '';
            this.customerData();
        },

        updatePage(Number) {
            this.currentPage = Number;
            this.customerData();
        },

        changesort() {
            this.sort = this.sort === 'desc' ? 'asc' : 'desc';
            this.customerData();
        },

        async customerData() {
            this.listLoading = true;
            this.listEmpty = false;

            var user_data = new FormData();
            user_data.append("cus_id", "");
            user_data.append("sort", this.sort);
            user_data.append("search", this.searchText);
            user_data.append("page_no", this.currentPage);

            try {
                const response = await fetchWrapper.post(`${baseUrl}/customer-list`, user_data);

                if (response.data && response.data.length !== 0) {
                    this.listLoading = false;
                    this.list = response.data;
                    this.totalPages = response.total_pages;
                }
                else {
                    const alertStore = useAlertStore()
                    alertStore.error(response.message)
                    this.listEmpty = true;
                    this.totalPages = 1;
                }

            } catch (error) {
                const alertStore = useAlertStore()
                alertStore.error(error)
            }

        },

        async statusUpdate(id) {
            var status_up = new FormData();

            status_up.append("cus_id", id);

            try {
                const data = await fetchWrapper.post(`${baseUrl}/customer-status`, status_up);

                if (data.success === 1) {
                    this.customerData();
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
            this.$router.push({ name: 'EditCustomer', params: { id: id } })
        },

        async deleteItem() {
            var delete_data = new FormData();

            delete_data.append("cus_id", this.itemId);

            try {
                const data = await fetchWrapper.post(`${baseUrl}/remove-customer`, delete_data);

                if (data.success === 1) {
                    this.customerData();
                    this.deleteItemModal = false
                }

            } catch (error) {
                const alertStore = useAlertStore()
                alertStore.error(error)
            }
        },

        addReminderId(id) {
            this.itemId = id
            this.reminderModal = true
        },

        async addReminder() {
            var customer_data = new FormData();
            customer_data.append("rem_id", "");
            customer_data.append("rem_self", "");
            customer_data.append("cus_id", this.itemId);
            customer_data.append("rem_notes", this.remNote);
            const formattedDateTime = this.formattedDate;
            customer_data.append("rem_date", formattedDateTime);

            try {
                const data = await fetchWrapper.post(`${baseUrl}/add-reminder`, customer_data);

                if (data.success === 1) {
                    this.customerData();
                    this.reminderModal = false
                    this.itemId = ""
                }

            } catch (error) {
                const alertStore = useAlertStore()
                alertStore.error(error)
            }
        }
    },
}
</script>



<template>
    <Layout :breadcrumb="breadcrumbList">


        <ContentSection>

            <template v-slot:table-header>

                <div class="w-100 margin-bottom_12px">
                    <h2 class="title">Customer List</h2>
                </div>


                <div class="table-options">

                    <button class="btn-regular display-flex align-center gap-8px" @click="changesort()">
                        <img src="../../assets/img/icons/adjustments.svg">
                        <span v-if="sort === 'asc'">Newest</span>
                        <span v-if="sort === 'desc'">Oldest</span>
                    </button>


                </div>

                <div class="table-options">

                    <SearchBox placeholder="Search Customer" :value="searchText" @input="searchTextFun"
                        @clear_search="clearSearch" />

                    <button class="btn-regular display-flex align-center w-100  gap-8px text-no-wrap" @click="addUserFun()">
                        <img src="../../assets/img/icons/plus-3.svg">
                        Add New Customer</button>

                </div>


            </template>

            <template v-slot:main-table>

                <div v-if="listEmpty" class="data-not-found border-b border-Grey_20 border-solid">
                    <img src="../../assets/img/no-data.png">
                </div>

                <table class="w-100 user-table" v-if="!listEmpty">
                    <tbody>
                        <tr>
                            <td class="count">
                                <p class="text-base_semibold color-Grey_50">No.</p>
                            </td>
                            <td class="user_name">
                                <p class="text-base_semibold color-Grey_50">Customer Name</p>
                            </td>
                            <td class="user_email">
                                <p class="text-base_semibold color-Grey_50">Customer Email</p>
                            </td>
                            <td class="user_number">
                                <p class="text-base_semibold color-Grey_50">Mobile No.</p>
                            </td>
                            <td class="user_number">
                                <p class="text-base_semibold color-Grey_50">Customer Address</p>
                            </td>
                            <td class="blank"></td>
                            <!-- <td class="user-status">
                                <p class="text-base_semibold color-Grey_50">Customer Status</p>
                            </td> -->
                            <td class="user-status">
                                <p class="text-base_semibold color-Grey_50">Follow Ups Counts</p>
                            </td>
                            <td class="dropdown">
                                <div class="icon-btn icon-btn_32px  custom-dropdown"></div>
                            </td>
                        </tr>
                        <Customers :list="list" @delete_item="getItemId" @edit_item="editItem" @edit_status="statusUpdate"
                            @add_reminder="addReminderId" :loading="listLoading" />

                    </tbody>
                </table>

            </template>

            <template v-slot:table-footer>


                <Pagination :currentPage="currentPage" :totalPages="totalPages" @update-page="updatePage" />


            </template>

        </ContentSection>




        <Modal v-if="reminderModal" @closeModal="this.reminderModal = !this.reminderModal">

            <template v-slot:header>
                <h4>Add Follow Up</h4>
            </template>

            <div class="padding-y_12px padding-x_16px">

                <div class="space-y-4">

                    <div class="space-y-8px col-span-1">
                        <Label label="Select Date" />
                        <VDatePicker v-model="remDate" color="sky-blue" :attributes='attributes' mode="dateTime"
                            @change="highlightSelectedDate" expanded />
                        <ErrorMessage msg="" v-if="!remDate && formSubmitted" />
                    </div>

                    <div class="space-y-8px col-span-2">
                        <Label label="Note (optional)" />
                        <TextArea placeholder="Enter Reminder Note" id="Note (optional)" :value="remNote"
                            @input="event => remNote = event.target.value" />
                    </div>

                </div>

            </div>

            <template v-slot:footer>
                <button class="btn-regular" @click="this.reminderModal = !this.reminderModal">Cancel</button>
                <button class="btn-regular" :disabled="remBtnDisabled" @click="addReminder">Save</button>
            </template>

        </Modal>



    </Layout>


    <DeleteModel model_title="Delete Customer" model_subtitle="Are you sure you want to delete this Customer?"
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
    min-width: 15%;
    max-width: 15%;
    display: block;
    overflow: hidden;
}

.blank {
    min-width: 14%;
    max-width: 14%;
    display: block;
}

.user-status {
    min-width: 10%;
    max-width: 10%;
    display: flex;
    justify-content: flex-end;
}

.dropdown {
    min-width: 5%;
    max-width: 5%;
    display: flex;
    justify-content: flex-end;
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