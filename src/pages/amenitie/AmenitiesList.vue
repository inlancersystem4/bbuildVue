<script>

import { useAuthStore, useAlertStore } from '../../stores'
import { fetchWrapper } from '../../helpers/fetch-wrapper'

import Layout from '../../components/Layout.vue';
import ContentSection from '../../subcomponents/ContentSection.vue';
import SearchBox from '../../subcomponents/common/SearchBox.vue';
import Pagination from '../../subcomponents/common/Pagination.vue';
import AmenitiesRow from './subcomponents/AmenitiesRow.vue';
import DeleteModel from '../../subcomponents/common/DeleteModel.vue';
import Input from '../../subcomponents/common/Input.vue';
import TextArea from '../../subcomponents/common/TextArea.vue';
import Label from '../../subcomponents/common/Label.vue';
import ErrorMessage from '../../subcomponents/common/ErrorMessage.vue';
import _debounce from 'lodash/debounce';


const baseUrl = `${import.meta.env.VITE_API_URL}`;

export default {
    components: { Layout, ContentSection, ErrorMessage, SearchBox, Pagination, AmenitiesRow, DeleteModel, Input, TextArea, Label },
    data() {
        return {
            breadcrumbList: [
                {
                    name: 'Dashboard',
                    link: '/'
                },
                {
                    name: 'Settings',
                    link: '/settings'
                },
                {
                    name: 'Amenities',
                }
            ],
            list: [],
            searchText: "",
            currentPage: 1,
            totalPages: 1,
            sort: "asc",
            deleteItemModal: false,
            itemId: "",
            amenitiesName: "",
            amenitiesNote: "",
            amenitiesModal: false,
            listLoading: false,
            listEmpty: false,
            isValidAmenitiesName: true,
            isValidAmenitiesNote: true,
        }
    },
    created() {
        this.amenitieData();
        const authStore = useAuthStore();
        const title = "Amenities List |  Billion Build"
        const description = "this is description for Amenities List"

        authStore.chnageTitle(title, description)
    },
    computed: {
        addamenitiesBtn() {
            const specialCharsRegex = /[!@#$%^&*()?":{}|<>]/;
            return !this.amenitiesName.trim() || !this.amenitiesNote.trim() || specialCharsRegex.test(this.amenitiesNote)
        }
    },
    methods: {

        validateField(value) {
            const specialCharsRegex = /[!@#$%^&*()?":{}|<>]/;
            return value.trim() === '' || !specialCharsRegex.test(value);
        },

        addUserFun() {
            this.amenitiesModal = true
            this.amenitiesName = ""
            this.amenitiesNote = ""
            this.itemId = ""
        },

        searchTextFun: _debounce(function (event) {
            this.searchText = event.target.value.trim();
            this.amenitieData();
        }, 400),

        clearSearch() {
            this.searchText = '';
            this.amenitieData();
        },

        updatePage(Number) {
            this.currentPage = Number;
            this.amenitieData();
        },

        changesort() {
            this.sort = this.sort === 'desc' ? 'asc' : 'desc';
            this.amenitieData();
        },

        async amenitieData() {

            this.listLoading = true;
            this.listEmpty = false;

            var user_data = new FormData();
            user_data.append("amenities_id", "");
            user_data.append("sort", this.sort);
            user_data.append("search", this.searchText);
            user_data.append("page_no", this.currentPage);

            try {
                const response = await fetchWrapper.post(`${baseUrl}/amenity-list`, user_data);
                if (response.data && response.data.length !== 0) {
                    this.listLoading = false;
                    this.list = response.data;
                    this.totalPages = response.total_pages;
                }
                else {
                    const alertStore = useAlertStore();
                    alertStore.error("No Data Found");
                    this.listEmpty = true;
                    this.totalPages = 1;
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

        async editItem(id) {
            this.itemId = id
            var user_data = new FormData();
            user_data.append("amenities_id", id);
            user_data.append("sort", this.sort);
            user_data.append("search", this.searchText);
            user_data.append("page_no", this.currentPage);

            try {
                const response = await fetchWrapper.post(`${baseUrl}/amenity-list`, user_data);

                this.amenitiesModal = true
                this.amenitiesName = response.data.amenities_name
                this.amenitiesNote = response.data.amenities_details

            } catch (error) {
                const alertStore = useAlertStore()
                alertStore.error(error)
            }
        },

        async deleteItem() {
            var delete_data = new FormData();

            delete_data.append("amenities_id", this.itemId);

            try {
                const data = await fetchWrapper.post(`${baseUrl}/remove-amenities`, delete_data);

                if (data.success === 1) {
                    this.amenitieData();
                    this.deleteItemModal = false
                    this.itemId = ""
                }

            } catch (error) {
                const alertStore = useAlertStore()
                alertStore.error(error)
            }
        },

        async addAmenities() {
            var amenities_data = new FormData();
            amenities_data.append("amenities_id", this.itemId || '');
            amenities_data.append("amenities_name", this.amenitiesName);
            amenities_data.append("amenities_details", this.amenitiesNote);

            try {
                const data = await fetchWrapper.post(`${baseUrl}/add-amenities`, amenities_data);

                if (data.success === 1) {
                    this.amenitieData();
                    this.deleteItemModal = false
                    this.amenitiesModal = false
                    this.amenitiesName = ""
                    this.amenitiesNote = ""
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
                    <h2 class="title">Amenities List</h2>
                </div>


                <div class="table-options">

                    <button class="btn-regular display-flex align-center gap-8px" @click="changesort()">
                        <img src="../../assets/img/icons/adjustments.svg">
                        <span v-if="sort === 'asc'">A to Z</span>
                        <span v-if="sort === 'desc'">Z to A</span>
                    </button>

                </div>

                <div class="table-options table-grid">

                    <SearchBox placeholder="Search Amenities" :value="searchText" @input="searchTextFun"
                        @clear_search="clearSearch" />

                    <button class="btn-regular display-flex align-center w-100  gap-8px text-no-wrap" @click="addUserFun()">
                        <img src="../../assets/img/icons/plus-3.svg">
                        Add New Amenities</button>

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
                                <p class="text-base_semibold color-Grey_50">Amenities Name</p>
                            </td>
                            <td class="user_number">
                                <p class="text-base_semibold color-Grey_50">Amenities Details</p>
                            </td>
                            <td class="blank"></td>
                            <td class="dropdown">
                                <div class="icon-btn icon-btn_32px  custom-dropdown">

                                </div>
                            </td>
                        </tr>
                        <AmenitiesRow :list="list" @delete_item="getItemId" @edit_item="editItem" :loading="listLoading" />

                    </tbody>
                </table>

            </template>

            <template v-slot:table-footer>


                <Pagination :currentPage="currentPage" :totalPages="totalPages" @update-page="updatePage" />


            </template>

        </ContentSection>


        <div class="status-chnageBox" v-if="amenitiesModal">
            <div class="w-full border border-solid border-Grey_20 rounded-regualr bg-white ">

                <div class="w-full border-b border-solid border-Gray_20">

                    <div class="padding-y_8px padding-x_16px">

                        <h4 v-if="!this.itemId"> Add Amenities</h4>
                        <h4 v-if="this.itemId"> Edit Amenities</h4>

                    </div>

                </div>

                <div class="padding-y_12px padding-x_16px space-y-4">

                    <div class="space-y-4px">
                        <Label label="Amenities Name" required />
                        <Input placeholder="Enter Amenities Name" id="Amenities Name" :value="amenitiesName"
                            @input="amenitiesName = $event.target.value; isValidAmenitiesName = this.validateField(this.amenitiesName)" />
                        <ErrorMessage msg="Amenities name cannot contain special characters" v-if="!isValidAmenitiesName" />
                    </div>

                    <div class="space-y-4px">
                        <Label label="Amenities details" required />
                        <TextArea placeholder="Enter Amenities details" id="Amenities details" :value="amenitiesNote"
                            @input="amenitiesNote = $event.target.value; isValidAmenitiesNote = this.validateField(this.amenitiesNote)" />
                        <ErrorMessage msg="Amenities Note cannot contain special characters" v-if="!isValidAmenitiesNote" />

                    </div>

                </div>

                <div class="w-full border-t border-solid border-Gray_20">

                    <div class="padding-y_8px padding-x_16px flex items-center justify-end gap-8px">

                        <button class="btn-regular" @click="this.amenitiesModal = !this.amenitiesModal">Cancel</button>
                        <button class="btn-regular" :disabled="addamenitiesBtn" @click="addAmenities"
                            v-if="!this.itemId">Save</button>
                        <button class="btn-regular" :disabled="addamenitiesBtn" @click="addAmenities"
                            v-if="this.itemId">Update</button>

                    </div>

                </div>

            </div>
        </div>
        <div class="overlay" @click="this.amenitiesModal = !this.amenitiesModal" v-if="amenitiesModal"></div>

    </Layout>


    <DeleteModel model_title="Delete Amenities" model_subtitle="Are you sure you want to delete this Amenities?"
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
    min-width: 24%;
    max-width: 24%;
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
    min-width: 20%;
    max-width: 20%;
    display: block;
}

.user_address {
    min-width: 15%;
    max-width: 15%;
    display: block;
    overflow: hidden;
}

.blank {
    min-width: 30%;
    max-width: 30%;
    display: block;
}

.user-status {
    min-width: 10%;
    max-width: 10%;
    display: flex;
    justify-content: flex-end;
}

.dropdown {
    min-width: 15%;
    max-width: 15%;
    display: flex;
    justify-content: flex-end;
}

.custom-dropdown:hover .custom-dropdown-list {
    display: block;
}

.all-border-t>*+* {
    padding-top: 0 !important;
}

.status-chnageBox {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 98%;
    max-width: 550px;
    z-index: 101;
}

.overlay {
    position: fixed;
    z-index: 99;
    inset: 0;
    width: 100%;
    height: 100%;
    opacity: 0.4;
    background: #111827;
    margin-top: 0 !important;
}

@media (max-width:768px) {

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
        min-width: 25px;
        max-width: 25px;
    }

    .icon-btn_32px {
        height: 15px;
        width: 15px;
        min-width: 25px;
        max-width: 25px;
        min-height: 25px;
        max-height: 25px;
    }
}


@media (min-width:768px) {
    .table-grid {
        display: flex;
        justify-content: space-evenly;
        flex-flow: nowrap;
    }
}
</style>