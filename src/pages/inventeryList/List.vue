<script>
import { fetchWrapper } from '../../helpers/fetch-wrapper'
import Layout from '../../components/Layout.vue'
import Select from '../../subcomponents/common/Select.vue'
import TextArea from '../../subcomponents/common/TextArea.vue'
import Input from '../../subcomponents/common/Input.vue'
import Label from '../../subcomponents/common/Label.vue'
import InventeryBox from './subcomponents/InventeryBox.vue'
import InventeryBoxStatus from './subcomponents/InventeryBoxStatus.vue'
import StatusChnage from './subcomponents/StatusChnage.vue'
import SelectCustomer from './subcomponents/SelectCustomer.vue';
import Modal from './subcomponents/Modal.vue';
import DeleteModel from '@/subcomponents/common/DeleteModel.vue';
import { useAuthStore, useAlertStore } from '../../stores'


const baseUrl = `${import.meta.env.VITE_API_URL}`;

export default {
    components: { Layout, InventeryBox, InventeryBoxStatus, Select, StatusChnage, SelectCustomer, TextArea, Modal, Input, Label, DeleteModel },
    data() {
        return {
            projectarray: [],
            projectId: "",
            currentproject: "",
            currentprojectName: "",
            structureList: [],
            customerList: [],
            searchText: "",
            changestatus: false,
            customerId: "",
            inventeryId: "",
            statusNote: "",
            statusList: [],
            selectedStatus: "",
            structureListLoader: false,
            searchProject: "",
            structureListerror: "",
            notneedcustomer: false,
            fiflterShow: false,
            selectStatusforFilter: "",
            invStatusId: "",
            updateDetailsModal: false,
            invUpArea: "",
            invUpPrice: "",
            inventerydetaiId: "",
            updateInvDetaiType: [
                {
                    "name": "2bhk",
                    "value": "2bhk",
                },
                {
                    "name": "3bhk",
                    "value": "3bhk",
                }
            ],
            invDetailsModal: false,
            invViewData: "",
            invUpdateName: "",
            invUpdateNote: "",
            amenitiesList: [],
            updateInvModal: false,
            checkedamenities: [],
            checkedAme: "",
            deleteItemModal: false,
            operationNote: "",
            addoperationModal: false,
            selectedCustomer: "",
            selectedStatusName: "",
        }
    },
    created() {
        this.projectData();
        this.project();
        this.customerData();
        this.statusData();
        const authStore = useAuthStore();
        const title = "Inventory List |  Billion Build"
        const description = "this is description for Inventory List"

        authStore.chnageTitle(title, description)
    },
    computed: {
        statusChnageBtn() {
            if (this.selectedStatus == 6 || this.selectedStatus == 2 || this.selectedStatus == 1) {
                return !this.statusNote.trim() || !this.inventeryId || !this.selectedStatus;
            } else {
                return !this.statusNote.trim() || !this.customerId || !this.inventeryId || !this.selectedStatus;
            }
        },
        updateDetailsMBtn() {
            const isValidArea = !!(this.invUpArea && typeof this.invUpArea === 'string' && this.invUpArea.trim() !== '');
            const isValidPrice = !!(this.invUpPrice && typeof this.invUpPrice === 'string' && this.invUpPrice.trim() !== '');
            return !(isValidArea || isValidPrice) || this.selectinvUpType;
        },
        addOperationBtn() {
            const specialCharsRegex = /[!@#$%^&*(),.?":{}|<>]/;
            return !this.operationNote.trim() || specialCharsRegex.test(this.operationNote);
        }
    },
    methods: {
        searchProjectFun(event) {
            this.searchProject = event.target.value.trim();
            this.projectData();
        },
        async projectData() {
            var project_data = new FormData();
            project_data.append("sort", "asc");
            project_data.append("search", this.searchProject);
            project_data.append("page_no", "1");

            try {
                const response = await fetchWrapper.post(`${baseUrl}/project-list`, project_data);


                if (Array.isArray(response.data) && response.data.length > 0) {
                    this.projectarray = response.data;

                    const currentprojectId = localStorage.getItem('currentprojectId');
                    const currentprojectName = localStorage.getItem('currentprojectName');

                    if (!currentprojectId && !currentprojectName) {
                        const firstProject = this.projectarray[0];
                        if (firstProject) {
                            localStorage.setItem('currentprojectId', firstProject.project_id);
                            localStorage.setItem('currentprojectName', firstProject.project_name);
                            this.project();
                        }
                    }
                }
                else {
                    const alertStore = useAlertStore()
                    alertStore.error(response.message)
                }

            } catch (error) {
                const alertStore = useAlertStore()
                alertStore.error(error)
            }

        },
        searchTextFun(event) {
            this.searchText = event.target.value.trim();
            this.customerData();
        },
        async customerData() {
            var customer_data = new FormData();
            customer_data.append("cus_id", "");
            customer_data.append("sort", "asc");
            customer_data.append("search", this.searchText);
            customer_data.append("page_no", "1");

            try {
                const response = await fetchWrapper.post(`${baseUrl}/customer-list`, customer_data);
                this.customerList = response.data;

            } catch (error) {
                const alertStore = useAlertStore()
                alertStore.error(error)
            }

        },
        async statusData() {
            var customer_data = new FormData();

            try {
                const response = await fetchWrapper.post(`${baseUrl}/inventory-status`, customer_data);
                this.statusList = response.data;

            } catch (error) {
                const alertStore = useAlertStore()
                alertStore.error(error)
            }

        },
        onOptionSelected(option) {
            this.projectId = option.project_id
            localStorage.setItem('currentprojectId', option.project_id);
            localStorage.setItem('currentprojectName', option.project_name);
            this.project();
        },
        statusSelectofFilter(status) {
            this.invStatusId = status.inv_status_id
            this.project();
            this.fiflterShow = false
        },
        removeFilter() {
            this.invStatusId = ""
            this.project();
        },
        async project() {

            this.currentproject = localStorage.getItem('currentprojectId');
            this.currentprojectName = localStorage.getItem('currentprojectName');

            var project_data = new FormData();
            project_data.append("project_id", this.currentproject);
            project_data.append("status_id", this.invStatusId);

            this.structureListLoader = true
            this.structureList = []

            try {
                const response = await fetchWrapper.post(`${baseUrl}/get-inv-list`, project_data);

                this.structureList = response.data

                if (response.success === 1) {
                    this.structureListLoader = false
                }
                else {
                    this.structureListLoader = false
                    this.structureListerror = response.message
                    const alertStore = useAlertStore()
                    alertStore.error(response.message)
                }

            } catch (error) {
                const alertStore = useAlertStore()
                alertStore.error(error)
            }

        },
        selectedInventery(data) {
            this.inventeryId = String(data.inv_id)
            this.changestatus = true
            this.getinvData();
        },
        selectoption(data) {
            this.customerId = String(data.cus_id)
        },
        statusSelect(data) {
            this.selectedStatus = data.inv_status_id
            if (this.selectedStatus == 6 || this.selectedStatus == 2 || this.selectedStatus == 1) {
                this.notneedcustomer = true
                this.customerId = ""
            }
            else {
                this.notneedcustomer = false
            }
        },
        async statusChnageIt() {
            var status_data = new FormData();
            status_data.append("invent_id", this.inventeryId);
            status_data.append("invent_status", this.selectedStatus);
            status_data.append("cus_id", this.customerId);
            status_data.append("notes", this.statusNote);

            try {
                const data = await fetchWrapper.post(`${baseUrl}/change-status`, status_data);

                if (data.success === 1) {
                    this.project();
                    this.inventeryId = ""
                    this.customerId = ""
                    this.statusNote = ""
                    this.changestatus = false
                }
                else {
                    const alertStore = useAlertStore()
                    alertStore.error(data.message)
                }

            } catch (error) {
                const alertStore = useAlertStore()
                alertStore.error(error)
            }

        },
        deleteInventery(data) {
            this.inventeryId = data.inv_id
            this.deleteItemModal = true
        },
        async deleteItem() {
            var delete_data = new FormData();

            delete_data.append("invent_id", this.inventeryId);

            try {
                const data = await fetchWrapper.post(`${baseUrl}/inventory-delete`, delete_data);

                if (data.success === 1) {
                    this.project();
                    this.deleteItemModal = false
                }

            } catch (error) {
                const alertStore = useAlertStore()
                alertStore.error(error)
            }
        },
        updatedDetails(data) {
            this.inventeryId = String(data.inv_id)
            this.inventerydetaiId = String(data.inv_details)
            this.updateDetailsModal = true
            this.getinvData();
        },
        handleCheck(data) {
            this.selectinvUpType = data
        },
        async invUpdated() {
            var status_data = new FormData();
            if (this.inventerydetaiId === '0') {
                status_data.append("detail_id", "");
            }
            else {
                status_data.append("detail_id", this.inventerydetaiId);
            }
            status_data.append("inv_id", this.inventeryId);
            status_data.append("inv_area", this.invUpArea);
            status_data.append("inv_price", this.invUpPrice);
            status_data.append("inv_type", this.selectinvUpType);

            try {
                const data = await fetchWrapper.post(`${baseUrl}/update-details`, status_data);

                if (data.success === 1) {
                    this.project();
                    this.inventeryId = ""
                    this.invUpArea = ""
                    this.invUpPrice = ""
                    this.inventerydetaiId = ""
                    this.selectinvUpType = ""
                    this.updateDetailsModal = false
                }
                else {
                    const alertStore = useAlertStore()
                    alertStore.error(data.message)
                }

            } catch (error) {
                const alertStore = useAlertStore()
                alertStore.error(error)
            }

        },
        async getinvData() {
            var status_data = new FormData();
            status_data.append("inv_id", this.inventeryId);
            try {
                const response = await fetchWrapper.post(`${baseUrl}/inventory-details`, status_data);
                if (response.success === 1) {
                    this.invViewData = response.data;
                    this.invUpArea = response.data.inv_details.inv_area
                    this.invUpPrice = response.data.inv_details.inv_price
                    this.selectinvUpType = response.data.inv_details.inv_type
                    this.invUpdateName = response.data.inv_name
                    this.invUpdateNote = response.data.inv_notes
                    this.statusNote = response.data.inv_notes
                    this.selectedStatus = response.data.inv_status_id
                    this.selectedStatusName = response.data.inv_status
                    this.selectedCustomer = response.data.inv_cus
                    this.customerId = String(response.data.inv_cus_id)
                    // this.checkedamenities = response.data.amenities.map(amenity => amenity.amenities_id).join(', ')
                    // console.log(this.checkedamenities)
                    // this.isChecked = this.checkedamenities
                }
                else {
                    const alertStore = useAlertStore()
                    alertStore.error(response.message)
                }
            }
            catch (error) {
                const alertStore = useAlertStore();
                alertStore.error(error);
            }
        },
        updateInventery(data) {
            this.inventeryId = String(data.inv_id)
            this.updateInvModal = true
            this.getinvData();
            this.getAmenList();
        },
        async getAmenList() {
            var status_data = new FormData();
            try {
                const response = await fetchWrapper.post(`${baseUrl}/amenities-list`, status_data);

                if (response.success === 1) {
                    this.amenitiesList = response.data;
                }
            }
            catch (error) {
                const alertStore = useAlertStore();
                alertStore.error(error);
            }
        },

        selectAmen(data) {
            const index = this.checkedamenities.indexOf(data.amenities_id);
            if (index !== -1) {
                this.checkedamenities.splice(index, 1);
            } else {
                this.checkedamenities.push(data.amenities_id);
            }
        },
        async inventoryUpdated() {
            var status_data = new FormData();

            const joinedamenities = this.checkedamenities.join(',');

            status_data.append("inv_id", this.inventeryId);
            status_data.append("inv_name", this.invUpdateName);
            status_data.append("inv_notes", this.invUpdateNote);
            status_data.append("inv_amenities", joinedamenities);

            try {
                const data = await fetchWrapper.post(`${baseUrl}/inventory-update`, status_data);

                if (data.success === 1) {
                    this.project();
                    this.inventeryId = ""
                    this.invUpdateName = ""
                    this.invUpdateNote = ""
                    this.checkedamenities = []
                    this.updateInvModal = false
                }

            } catch (error) {
                const alertStore = useAlertStore()
                alertStore.error(error)
            }

        },
        async viewInvData(data) {
            const id = String(data.inv_id)
            this.$router.push({ name: 'InventeryDetails', params: { inventoryId: id } })
        },
        inventeryAddOper(data) {
            this.inventeryId = String(data.inv_id)
            this.addoperationModal = true
        },
        async addOperation() {
            var status_data = new FormData();
            status_data.append("inventory_id", this.inventeryId);
            status_data.append("operation_id", "");
            status_data.append("operation_notes", this.operationNote);
            status_data.append("operation_type", "2");
            status_data.append("project_id", "");

            try {
                const data = await fetchWrapper.post(`${baseUrl}/add-operation`, status_data);

                if (data.success === 1) {
                    this.project();
                    this.inventeryId = ""
                    this.operationNote = ""
                    this.addoperationModal = false
                }
                else {
                    const alertStore = useAlertStore()
                    alertStore.error(data.message)
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

        <div class="display-flex items-center justify-between w-full margin-bottom_12px gap-8px">

            <div class="flex items-center gap-2">

                <div class="icon-border icon-border-20 icon-border_40px">
                    <div class="icon-bg icon-bg_32px bg-Grey_20">
                        <img src="../../assets/img/icons/taxes.svg" class="img-not-selected">
                    </div>
                </div>

                <div>
                    <h6 class="color-Grey_90  text-large_semibold capitalize">{{ currentprojectName }}</h6>
                </div>

            </div>

            <div class="flex items-center gap-3">

                <div class="dropdown">

                    <Select :options="projectarray" @option-selected="onOptionSelected" :value="searchProject"
                        @input="searchProjectFun" />

                </div>

                <div class="relative">

                    <button class="btn-regular flex items-center gap-1.5 bg-white"
                        @click="this.fiflterShow = !this.fiflterShow">

                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d="M12.75 16.125H3.75" stroke="#191C1F" stroke-width="1.5" stroke-linecap="round"
                                stroke-linejoin="round" />
                            <path d="M20.25 16.125H15.75" stroke="#191C1F" stroke-width="1.5" stroke-linecap="round"
                                stroke-linejoin="round" />
                            <path d="M6.75 7.875H3.75" stroke="#191C1F" stroke-width="1.5" stroke-linecap="round"
                                stroke-linejoin="round" />
                            <path d="M20.25 7.875H9.75" stroke="#191C1F" stroke-width="1.5" stroke-linecap="round"
                                stroke-linejoin="round" />
                            <path d="M9.75 5.625V10.125" stroke="#191C1F" stroke-width="1.5" stroke-linecap="round"
                                stroke-linejoin="round" />
                            <path d="M15.75 18.375V13.875" stroke="#191C1F" stroke-width="1.5" stroke-linecap="round"
                                stroke-linejoin="round" />
                        </svg>

                        Filter

                    </button>

                    <div v-if="fiflterShow"
                        class="absolute right-0  top-[110%] bg-white  z-20 min-w-[350px] shadow-lg  border border-solid border-Grey_20 rounded-md">

                        <InventeryBoxStatus @getstatusSel="statusSelectofFilter" />

                    </div>


                </div>

                <button class="btn-regular bg-white" v-if="this.invStatusId" @click="removeFilter">
                    Remove Filter
                </button>

            </div>

        </div>

        <div class="display-flex align-start gap-12px w-full">

            <div class="w-full overflow-x-auto pb-4">

                <div class="w-full h-96 flex items-center justify-center" v-if="structureListLoader">

                    <img src="../../assets/img/loader3.gif">

                </div>

                <div class="gap-4 flex" v-if="this.currentproject">

                    <div class="h-40 w-full text-center flex items-center justify-center"
                        v-if="!this.structureList || this.structureList > 0 || this.structureList.length === 0">

                        <p>{{ structureListerror }}</p>

                    </div>

                    <InventeryBox :items="structureList" @selectInventery="selectedInventery" @deleteInv="deleteInventery"
                        @updateDetails="updatedDetails" @viewInvDetails="viewInvData" @updateInv="updateInventery"
                        @invAddOper="inventeryAddOper" />

                </div>

            </div>

        </div>



        <StatusChnage v-if="changestatus" @closeModal="this.changestatus = !this.changestatus">

            <template v-slot:status>
                <Select :options="statusList" @option-selected="statusSelect" />
            </template>

            <template v-slot:customer>
                <h6 class="text-base color-Grey_50" v-if="notneedcustomer">This status not need customer</h6>
                <SelectCustomer :list="customerList" @input="searchTextFun" placeholder="Enter Customer" :value="searchText"
                    @selectitem="selectoption" v-if="!notneedcustomer" :responseData="selectedCustomer" />
            </template>

            <template v-slot:note>

                <TextArea placeholder="Enter Note" :value="statusNote" @input="event => statusNote = event.target.value" />

            </template>

            <template v-slot:footer>
                <button class="btn-regular" @click="this.changestatus = !this.changestatus">Cancel</button>
                <button class="btn-regular bg-purple color-white" @click="statusChnageIt" :disabled="statusChnageBtn">Status
                    Change</button>
            </template>

        </StatusChnage>


        <Modal v-if="updateDetailsModal" @closeModal="this.updateDetailsModal = !this.updateDetailsModal" height="yes">

            <template v-slot:header>
                <h4>Update Details</h4>
            </template>

            <div class="padding-y_12px padding-x_16px">

                <div class="space-y-4">

                    <div class="space-y-4px">
                        <Label label="Area" />
                        <Input placeholder="Enter Area" id="Area" :value="invUpArea"
                            @input="event => invUpArea = event.target.value" />
                    </div>

                    <div class="space-y-4px">
                        <Label label="Price" />
                        <Input placeholder="Enter Price" id="Price" :value="invUpPrice" type="number"
                            @input="event => invUpPrice = event.target.value" />
                    </div>

                    <div class="space-y-8px">

                        <Label label="Select Type" />

                        <div class="display-flex align-center gap-24px">

                            <div class="display-flex align-center gap-12px custom-toogle-btn"
                                v-for="(updateInvDetaiTypeitems, updateInvDetaiTypeindex) in updateInvDetaiType"
                                :key="updateInvDetaiTypeindex">

                                <input type="radio" class="form-toogle-btn"
                                    :checked="this.selectinvUpType === updateInvDetaiTypeitems.value"
                                    @change="handleCheck(updateInvDetaiTypeitems.value)" :name="radio + '_' + index"
                                    :id="updateInvDetaiTypeitems.name + _ + updateInvDetaiTypeindex" />

                                <label class="text-capitalize text-large_semibold color-Grey_90"
                                    :for="updateInvDetaiTypeitems.name + _ + updateInvDetaiTypeindex">
                                    {{ updateInvDetaiTypeitems.name }}
                                </label>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

            <template v-slot:footer>
                <button class="btn-regular" @click="this.updateDetailsModal = !this.updateDetailsModal">Cancel</button>
                <button class="btn-regular bg-purple color-white" :disabled="updateDetailsMBtn"
                    @click="invUpdated">Updated</button>
            </template>

        </Modal>

        <Modal v-if="updateInvModal" @closeModal="this.updateInvModal = !this.updateInvModal">

            <template v-slot:header>
                <h4>Update inventory</h4>
            </template>

            <div class="padding-y_12px padding-x_16px">

                <div class="space-y-4">

                    <div class="space-y-4px">
                        <Label label="Name" />
                        <Input placeholder="Enter Name" id="Name" :value="invUpdateName"
                            @input="event => invUpdateName = event.target.value" />
                    </div>

                    <div class="space-y-4px">
                        <Label label="Note" />
                        <TextArea placeholder="Enter Note" id="Note" :value="invUpdateNote"
                            @input="event => invUpdateNote = event.target.value" />
                    </div>

                    <div class="space-y-8px">

                        <Label label="Select Amenities" />

                        <div class="flex flex-wrap gap-4 flex-col">

                            <div v-for="(updateInvDetaiTypeitems, updateInvDetaiTypeindex) in amenitiesList"
                                :key="updateInvDetaiTypeindex">

                                <div class="display-flex align-center gap-12px justify-between w-100">

                                    <div>
                                        <h6 class="color-Grey_90 text-base_semibold"> {{
                                            updateInvDetaiTypeitems.amenities_name }}</h6>
                                        <p class="color-Grey_50 text-base_regular margin-top_4px">{{
                                            updateInvDetaiTypeitems.amenities_details }}</p>
                                    </div>

                                    <div class="custom-toogle-btn">
                                        <input type="checkbox" class="form-toogle-btn"
                                            @input="selectAmen(updateInvDetaiTypeitems)">
                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

            <template v-slot:footer>
                <button class="btn-regular" @click="this.updateInvModal = !this.updateInvModal">Cancel</button>
                <button class="btn-regular bg-purple color-white" :disabled="inventoryUpdatedBtn"
                    @click="inventoryUpdated">Updated</button>
            </template>

        </Modal>

        <Modal v-if="addoperationModal" @closeModal="this.addoperationModal = !this.addoperationModal" height="yes">

            <template v-slot:header>
                <h4>Add Operation</h4>
            </template>

            <div class="padding-y_12px padding-x_16px">

                <div class="space-y-4px">
                    <Label label="Note" />
                    <TextArea placeholder="Enter Note" id="Note" :value="operationNote"
                        @input="event => operationNote = event.target.value" />
                </div>

            </div>

            <template v-slot:footer>
                <button class="btn-regular" @click="this.addoperationModal = !this.addoperationModal">Cancel</button>
                <button class="btn-regular bg-purple color-white" :disabled="addOperationBtn" @click="addOperation">Add
                    Operation</button>
            </template>

        </Modal>

    </Layout>

    <DeleteModel model_title="Delete Inventery" model_subtitle="Are you sure you want to delete this Inventery?"
        v-if="deleteItemModal" @close_model="deleteItemModal = false" @delete_item="deleteItem()" />
</template>

<style scoped>
.dropdown {
    background-color: white;
    min-width: 240px;
}

.dropdown .select {
    padding: 6px 12px !important;
}

.dropdown .select .display-flex .cursor-pointer p {
    font-size: 12px !important;
}

.sticky {
    position: sticky;
    top: 0;
}
</style>