<script>
import { fetchWrapper } from '../../helpers/fetch-wrapper'
import Layout from '../../components/Layout.vue'
import Select from '../../subcomponents/common/Select.vue'
import TextArea from '../../subcomponents/common/TextArea.vue'
import InventeryBox from './subcomponents/InventeryBox.vue'
import InventeryBoxStatus from './subcomponents/InventeryBoxStatus.vue'
import StatusChnage from './subcomponents/StatusChnage.vue'
import SelectCustomer from './subcomponents/SelectCustomer.vue';
import { useAuthStore, useAlertStore } from '../../stores'


const baseUrl = `${import.meta.env.VITE_API_URL}`;

export default {
    components: { Layout, InventeryBox, InventeryBoxStatus, Select, StatusChnage, SelectCustomer, TextArea },
    data() {
        return {
            projectarray: [],
            projectId: "",
            currentproject: "",
            currentprojectName: "",
            structureList: [],
            customerList: [],
            searchText: "",
            chnageStatus: false,
            customerId: "",
            inventeryId: "",
            statusNote: "",
            statusList: [],
            selectedStatus: "",
            structureListLoader: false,
            searchProject: "",
            structureListerror: "",
            notneedcustomer: false
        }
    },
    created() {
        this.projectData();
        this.project();
        this.customerData();
        this.statusData();
    },
    computed: {
        statusChnageBtn() {
            if (this.selectedStatus == 6 || this.selectedStatus == 2 || this.selectedStatus == 1) {
                return !this.statusNote.trim() || !this.inventeryId || !this.selectedStatus;
            } else {
                return !this.statusNote.trim() || !this.customerId || !this.inventeryId || !this.selectedStatus;
            }
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
        async project() {

            this.currentproject = localStorage.getItem('currentprojectId');
            this.currentprojectName = localStorage.getItem('currentprojectName');


            var project_data = new FormData();
            project_data.append("project_id", this.currentproject);

            this.structureListLoader = true
            this.structureList = []

            try {
                const response = await fetchWrapper.post(`${baseUrl}/structure-preview`, project_data);

                this.structureList = response.data

                if (response.success === 1) {
                    this.structureListLoader = false
                }
                else {
                    this.structureListLoader = false
                    this.structureListerror = response.message
                }

            } catch (error) {
                const alertStore = useAlertStore()
                alertStore.error(error)
            }

        },
        selectedInventery(data) {
            this.inventeryId = String(data.inv_id)
            this.chnageStatus = true
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
                    this.chnageStatus = false
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

        <!-- <div class="display-flex align-center justify-end w-100 margin-bottom_12px gap-8px">

            <div class="dropdown">

                <Select :options="projectarray" @option-selected="onOptionSelected" :value="searchProject"
                    @input="searchProjectFun" />

            </div>

            <span class="btn-regular bg-white">{{ currentprojectName }}</span>

        </div> -->

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

        </div>

        <div class="display-flex align-start gap-12px w-full">

            <div class="w-full overflow-x-auto">

                <div class="w-full h-96 flex items-center justify-center" v-if="structureListLoader">

                    <img src="../../assets/img/loader3.gif">

                </div>

                <div class="space-y-8px w-full" v-if="this.currentproject">


                    <div class="h-40 w-full text-center flex items-center justify-center"
                        v-if="!this.structureList || this.structureList > 0 || this.structureList.length === 0">

                        <p>{{ structureListerror }}</p>

                    </div>

                    <InventeryBox :items="structureList" @selectInventery="selectedInventery" />

                </div>


            </div>

        </div>

        <StatusChnage v-if="chnageStatus" @closeModal="this.chnageStatus = !this.chnageStatus">

            <template v-slot:status>
                <Select :options="statusList" @option-selected="statusSelect" />
            </template>

            <template v-slot:customer>
                <h6 class="text-base color-Grey_50" v-if="notneedcustomer">This status not need customer</h6>
                <SelectCustomer :list="customerList" @input="searchTextFun" placeholder="Enter Customer" :value="searchText"
                    @selectitem="selectoption" v-if="!notneedcustomer" />
            </template>

            <template v-slot:note>

                <TextArea placeholder="Enter Note" :value="statusNote" @input="event => statusNote = event.target.value" />

            </template>

            <template v-slot:footer>
                <button class="btn-regular" @click="this.chnageStatus = !this.chnageStatus">Cancel</button>
                <button class="btn-regular bg-purple color-white" @click="statusChnageIt" :disabled="statusChnageBtn">Status
                    Chnage</button>
            </template>

        </StatusChnage>

    </Layout>
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