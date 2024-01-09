<script>

import { useAuthStore, useAlertStore } from '../../stores'
import { fetchWrapper } from '../../helpers/fetch-wrapper'

import Layout from '../../components/Layout.vue';
import ContentSection from '../../subcomponents/ContentSection.vue';
import SearchBox from '../../subcomponents/common/SearchBox.vue';
import Pagination from '../../subcomponents/common/Pagination.vue';
import DeleteModel from '../../subcomponents/common/DeleteModel.vue';
import TextArea from '../../subcomponents/common/TextArea.vue';
import Label from '../../subcomponents/common/Label.vue';
import reminderRow from './subcomponents/reminderRow.vue'
import Modal from '../inventeryList/subcomponents/Modal.vue';

const baseUrl = `${import.meta.env.VITE_API_URL}`;

export default {
    components: { Layout, ContentSection, SearchBox, Pagination, DeleteModel, reminderRow, Modal, TextArea, Label },
    data() {
        return {
            list: [],
            // searchText: "",
            currentPage: 1,
            totalPages: 1,
            sort: "asc",
            deleteItemModal: false,
            itemId: "",
            remDate: "",
            remNote: "",
            reminderModal: false,
            attributes: [],
        }
    },
    created() {
        this.reminderData();
        const authStore = useAuthStore();
        const title = "Reminder List |  Billion Build"
        const description = "this is description for Reminder List"

        authStore.chnageTitle(title, description)
    },
    computed: {
        remBtnDisabled() {
            const specialCharsRegex = /[!@#$%^&*(),.?":{}|<>]/;
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

        // searchTextFun(event) {
        //     this.searchText = event.target.value.trim();
        //     this.reminderData();
        // },

        updatePage(Number) {
            this.currentPage = Number;
            this.reminderData();
        },

        chnageSort() {
            this.sort = this.sort === 'desc' ? 'asc' : 'desc';
            this.reminderData();
        },

        async reminderData() {
            var user_data = new FormData();
            user_data.append("rem_id", "");
            user_data.append("sort", this.sort);
            // user_data.append("search", this.searchText);
            user_data.append("page_no", this.currentPage);

            try {
                const response = await fetchWrapper.post(`${baseUrl}/reminder-list`, user_data);
                this.list = response.data;
                this.totalPages = response.total_pages;

            } catch (error) {
                const alertStore = useAlertStore()
                alertStore.error(error)
            }

        },

        async statusUpdate(id, s_id) {
            var status_up = new FormData();

            status_up.append("rem_id", id);
            status_up.append("rem_status", s_id);

            try {
                const data = await fetchWrapper.post(`${baseUrl}/reminder-status`, status_up);

                if (data.success === 1) {
                    this.reminderData();
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
            this.itemId = id
            this.reminderModal = true
            this.getReminderData(id);
        },

        async getReminderData(id) {
            var user_data = new FormData();
            user_data.append("rem_id", id);
            user_data.append("sort", this.sort);
            user_data.append("page_no", this.currentPage);

            try {
                const response = await fetchWrapper.post(`${baseUrl}/reminder-list`, user_data);
                this.totalPages = response.total_pages;

                if (response.success === 1) {
                    this.remNote = response.data.rem_notes;
                    this.remDate = response.data.rem_date
                    this.attributes = {
                        content: 'black',
                        highlight: true,
                        dot: true,
                        bar: true,
                        popover: {
                            title: 'Selected Date',
                            label: this.remNote,
                        },
                        dates: new Date(this.remDate),
                        order: 0
                    }
                }

            } catch (error) {
                const alertStore = useAlertStore()
                alertStore.error(error)
            }

        },

        async addReminder() {
            var customer_data = new FormData();
            customer_data.append("rem_id", this.itemId);
            customer_data.append("rem_self", "");
            customer_data.append("cus_id", this.itemId);
            customer_data.append("rem_notes", this.remNote);
            const formattedDateTime = this.formattedDate;
            customer_data.append("rem_date", formattedDateTime);

            try {
                const data = await fetchWrapper.post(`${baseUrl}/add-reminder`, customer_data);

                if (data.success === 1) {
                    this.reminderModal = false
                    this.reminderData()
                }

            } catch (error) {
                const alertStore = useAlertStore()
                alertStore.error(error)
            }
        },

        async deleteItem() {
            var delete_data = new FormData();

            delete_data.append("rem_id", this.itemId);

            try {
                const data = await fetchWrapper.post(`${baseUrl}/reminder-delete`, delete_data);

                if (data.success === 1) {
                    this.reminderData();
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
                    <h2 class="title">Reminder List</h2>
                </div>


                <div class="table-options w-100">


                </div>

                <div class="table-options w-100 justify-end">

                    <button class="btn-regular display-flex align-center gap-8px" @click="chnageSort()">
                        <img src="../../assets/img/icons/adjustments.svg">
                        <span v-if="sort === 'asc'">Newest</span>
                        <span v-if="sort === 'desc'">Oldest</span>
                    </button>

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
                                <p class="gap-8px text-base_semibold color-Grey_50">No.</p>
                            </td>
                            <td class="user_name">
                                <div class="display-flex align-center gap-14px">
                                    <p class="text-base_semibold color-Grey_50">Customer Name</p>
                                </div>
                            </td>
                            <td class="user_number">
                                <p class="text-base_semibold color-Grey_50">Date & Time</p>
                            </td>
                            <td class="user_address">
                                <p class="text-base_semibold color-Grey_50 line-clamp-1">Note</p>
                            </td>
                            <td class="blank"></td>
                            <td class="user-status relative">
                            </td>
                            <td class="dropdown">
                                <div class="icon-btn icon-btn_32px  custom-dropdown">
                                </div>
                            </td>
                        </tr>
                        <reminderRow :list="list" @delete_item="getItemId" @edit_item="editItem"
                            @edit_status="statusUpdate" />

                    </tbody>
                </table>

            </template>

            <template v-slot:table-footer>


                <Pagination :currentPage="currentPage" :totalPages="totalPages" @update-page="updatePage" />


            </template>

        </ContentSection>



        <Modal v-if="reminderModal" @closeModal="this.reminderModal = !this.reminderModal">

            <template v-slot:header>
                <h4>Add Reminder</h4>
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
                <button class="btn-regular bg-purple color-white" :disabled="remBtnDisabled" @click="addReminder">Save
                    Changes</button>
            </template>

        </Modal>



    </Layout>


    <DeleteModel model_title="Delete Remider" model_subtitle="Are you sure you want to delete this Remider?"
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

.user-status .custom-dropdown-list {
    display: block;
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


.user_number {
    min-width: 20%;
    max-width: 20%;
    display: block;
}

.user_address {
    min-width: 22%;
    max-width: 22%;
    display: block;
    overflow: hidden;
}

.blank {
    min-width: 10%;
    max-width: 10%;
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