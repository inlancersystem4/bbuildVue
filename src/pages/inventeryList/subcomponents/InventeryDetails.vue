<script>
import Layout from '@/components/Layout.vue';
import TextArea from '@/subcomponents/common/TextArea.vue';
import { fetchWrapper } from '@/helpers/fetch-wrapper'
import { useAuthStore, useAlertStore } from '@/stores'

const baseUrl = `${import.meta.env.VITE_API_URL}`;

export default {
    components: { Layout, TextArea },
    data() {
        return {
            inventoryId: "",
            invViewData: "",
            operViewData: [],
            operationModal: false,
            operationNote: "",
            operationInvId: "",
            operationType: "",
            operationProId: "",
            operationId: "",
        };
    },
    created() {
        const authStore = useAuthStore();
        const title = "Inventery Details |  Billion Build";
        const description = "this is description for Inventery Details";
        authStore.chnageTitle(title, description);
        this.inventoryId = this.$route.params.inventoryId;
        this.viewInvData();
        this.viewOpervData();
    },
    computed: {
        addOperationBtn() {
            const specialCharsRegex = /[!@#$%^&*(),.?":{}|<>]/;
            return !this.operationNote.trim() || specialCharsRegex.test(this.operationNote)
        }
    },
    methods: {
        async viewInvData() {
            var status_data = new FormData();
            status_data.append("inv_id", this.inventoryId);
            try {
                const response = await fetchWrapper.post(`${baseUrl}/inventory-details`, status_data);
                if (response.success === 1) {
                    this.invViewData = response.data;
                }
            }
            catch (error) {
                const alertStore = useAlertStore();
                alertStore.error(error);
            }
        },
        async viewOpervData() {
            var status_data = new FormData();
            status_data.append("inv_id", this.inventoryId);
            try {
                const response = await fetchWrapper.post(`${baseUrl}/inv-opern-list`, status_data);
                if (response.success === 1) {
                    this.operViewData = response.data;
                }
            }
            catch (error) {
                const alertStore = useAlertStore();
                alertStore.error(error);
            }
        },
        editOperation(data) {
            this.operationNote = data.opern_notes
            this.operationInvId = data.opern_inv_id
            this.operationType = data.opern_type
            this.operationProId = data.opern_proj
            this.operationId = data.opern_id
            this.operationModal = true
        },
        async addOperation() {
            var status_data = new FormData();
            status_data.append("inventory_id", this.inventoryId);
            if (this.operationId) {
                status_data.append("operation_id", this.operationId);
            }
            else {
                status_data.append("operation_id", "");
            }
            if (this.operationType) {
                status_data.append("operation_type", this.operationType);
            }
            else {
                status_data.append("operation_type", "2");
            }
            if (this.operationProId) {
                status_data.append("project_id", this.operationProId);
            }
            else {
                status_data.append("project_id", "");
            }
            status_data.append("operation_notes", this.operationNote);


            try {
                const data = await fetchWrapper.post(`${baseUrl}/add-operation`, status_data);

                if (data.success === 1) {
                    this.viewOpervData()
                    this.operationNote = ""
                    this.operationNote = ""
                    this.operationInvId = ""
                    this.operationType = ""
                    this.operationProId = ""
                    this.operationId = ""
                    this.operationModal = false
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

        <div class="grid-cols-3 Lg_grid-cols-1 display-grid gap-16px">

            <div class="col-span-2 Lg_col-span-1 space-y-8px">

                <div
                    class="bg-white border border-solid border-Grey_20 rounded-regualr padding-x_32px Sm_padding-x_28px Mobile_padding-x_24px Mobile-fit_padding-x_18px padding-top_24px padding-bottom_24px">


                    <div class="space-y-6">

                        <div class="flex items-start justify-between w-full">

                            <div class="display-flex align-center gap-16px padding-y_4px">

                                <div class="icon-border icon-border_40px border-Grey_20">
                                    <div class="icon-bg_32px bg-Grey_10 icon-bg">
                                        <img src="../../../assets/img/icons/buildings.svg">
                                    </div>
                                </div>

                                <div>
                                    <h6 class="color-Grey_90 text-base_semibold list flex">
                                        <p>{{ invViewData.inv_project }}</p>
                                        <span v-if="invViewData.inv_str">{{ invViewData.inv_str }}</span>
                                        <span v-if="invViewData.inv_name">{{ invViewData.inv_name }}</span>
                                        <span v-if="invViewData.inv_nam">{{ invViewData.inv_nam }}</span>
                                    </h6>
                                    <p class="text-base_regular color-Grey_90">{{ invViewData.inv_notes }}</p>
                                </div>

                            </div>

                            <div>
                                <div class="btn-regular display-flex align-center gap-8px bg-white">

                                    <div class="ellipse-dot"
                                        :class="{ 'bg-emerald': invViewData.inv_status_id === 1, 'bg-rose': invViewData.inv_status_id === 2, 'bg-orange': invViewData.inv_status_id === 3, 'bg-blue': invViewData.inv_status_id === 4, 'bg-Grey_40': invViewData.inv_status_id === 5, 'bg-purple': invViewData.inv_status_id === 6 }">
                                    </div>

                                    <p class="text-sm_medium color-Grey_60 text-uppercase">
                                        <span>{{ invViewData.inv_status }}</span>
                                    </p>

                                </div>
                            </div>

                        </div>

                        <div class="display-flex align-center gap-16px">

                            <div
                                class="w_42px h_42px border border-solid border-Grey_20  rounded-full padding-4px display-flex align-center justify-center">
                                <div class="w-100 h-100 rounded-full  bg-Grey_10 display-flex align-center justify-center">
                                    <p class="color-Grey_50 text-sm_semibold text-center text-uppercase"
                                        v-if="invViewData.inv_cus">
                                        {{ invViewData.inv_cus.charAt(0) }}
                                    </p>
                                </div>
                            </div>

                            <div>
                                <h6 class="color-Grey_90 text-base_semibold capitalize">{{ invViewData.inv_cus }}</h6>
                            </div>

                        </div>

                    </div>

                </div>

                <div class="bg-white border border-solid border-Grey_20 rounded-regualr">

                    <div
                        class="padding-x_32px Sm_padding-x_28px Mobile_padding-x_24px Mobile-fit_padding-x_18px padding-y_24px display-flex align-center justify-between Sm_flex-column Sm_align-start Sm_gap-6px">

                        <h4 class="color-Grey_90 text-xl_semibold capitalize">
                            <span v-if="invViewData.inv_name">
                                {{ invViewData.inv_name }}
                            </span> details
                        </h4>

                    </div>

                    <div
                        class="padding-x_32px Sm_padding-x_28px Mobile_padding-x_24px Mobile-fit_padding-x_18px padding-bottom_24px">

                        <ul class="">

                            <li class="padding-y_4px display-flex align-center justify-between">

                                <div class="text-base_regular color-Grey_90"> <span v-if="invViewData.inv_nam">
                                        {{ invViewData.inv_name }}
                                    </span> area</div>

                                <div class="display-flex align-center gap-8px">
                                    <p class="text-base_regular color-Grey_90 text-right">
                                        {{ invViewData.inv_details.inv_area }}
                                    </p>
                                </div>

                            </li>

                            <li class="padding-y_4px display-flex align-center justify-between">

                                <div class="text-base_regular color-Grey_90"> <span v-if="invViewData.inv_name">
                                        {{ invViewData.inv_name }}
                                    </span> inv_price</div>

                                <div class="display-flex align-center gap-8px">
                                    <p class="text-base_regular color-Grey_90 text-right">
                                        {{ invViewData.inv_details.inv_price }}
                                    </p>
                                </div>

                            </li>

                            <li class="padding-y_4px display-flex align-center justify-between">

                                <div class="text-base_regular color-Grey_90"> <span v-if="invViewData.inv_name">
                                        {{ invViewData.inv_name }}
                                    </span> Type</div>

                                <div class="display-flex align-center gap-8px">
                                    <p class="text-base_regular color-Grey_90 text-right">
                                        {{ invViewData.inv_details.inv_type }}
                                    </p>
                                </div>

                            </li>

                        </ul>

                    </div>

                </div>

                <div class="bg-white border border-solid border-Grey_20 rounded-regualr"
                    v-if="invViewData.amenities.length !== 0">

                    <div
                        class="padding-x_32px Sm_padding-x_28px Mobile_padding-x_24px Mobile-fit_padding-x_18px padding-y_24px display-flex align-center justify-between Sm_flex-column Sm_align-start Sm_gap-6px">

                        <h4 class="color-Grey_90 text-xl_semibold capitalize">
                            <span v-if="invViewData.inv_name">
                                {{ invViewData.inv_name }}
                            </span> amenities
                        </h4>

                    </div>

                    <div
                        class="padding-x_32px Sm_padding-x_28px Mobile_padding-x_24px Mobile-fit_padding-x_18px padding-bottom_24px">

                        <ul class="grid grid-cols-3 gap-2">

                            <li v-for="(item, index) in invViewData.amenities" :key="index"
                                class="border-r border-solid border-Grey_20 px-2.5">

                                <h6 class="color-Grey_90  text-base_semibold capitalize">
                                    {{ item.amenities_name }}
                                </h6>
                                <p class="text-sm_regular color-Grey_90">
                                    {{ item.amenities_details }}
                                </p>

                            </li>

                        </ul>

                    </div>

                </div>

                <div class="bg-white border border-solid border-Grey_20 rounded-regualr"
                    v-if="invViewData.tracking.length !== 0">

                    <div
                        class="padding-x_32px Sm_padding-x_28px Mobile_padding-x_24px Mobile-fit_padding-x_18px padding-y_24px display-flex align-center justify-between Sm_flex-column Sm_align-start Sm_gap-6px">

                        <h4 class="color-Grey_90 text-xl_semibold capitalize">
                            <span v-if="invViewData.inv_name">
                                {{ invViewData.inv_name }}
                            </span> tracking
                        </h4>

                    </div>

                    <div
                        class="padding-x_32px Sm_padding-x_28px Mobile_padding-x_24px Mobile-fit_padding-x_18px padding-bottom_24px">

                        <ul class="space-y-2">

                            <li v-for="(item, index) in invViewData.tracking" :key="index"
                                class="padding-y_12px padding-x_16px  Mobile_padding-x_12px Mobile_padding-y_8px Mobile_padding-x_12px Mobile_padding-y_8px rounded-regualr border border-Grey_20 border-solid">

                                <div
                                    class="display-flex align-center justify-between w-100 Sm_flex-column Sm_align-start Sm_gap-6px">
                                    <div class="space-y-0.5">
                                        <h6 class="color-Grey_90 text-sm_medium capitalize">
                                            {{ item.cus }}
                                            <span v-if="!item.cus" class="color-Grey_50">{{ invViewData.inv_nam }} is on {{
                                                item.status }}</span>
                                        </h6>
                                        <div class="display-flex align-center gap-8px">
                                            <p class="text-sm_regular color-Grey_50">
                                                {{ item.track_date }}
                                            </p>
                                        </div>
                                    </div>
                                    <div class="display-flex align-center gap-16px Sm_w-100 Sm_justify-between">
                                        <div
                                            class="display-flex align-center gap-6px border border-solid border-Grey_20 rounded-regualr padding-x_8px padding-y_2px store-shipping">
                                            <div class="ellipse-dot"
                                                :class="{ 'bg-emerald': item.inv_status === 1, 'bg-rose': item.inv_status === 2, 'bg-orange': item.inv_status === 3, 'bg-blue': item.inv_status === 4, 'bg-Grey_40': item.inv_status === 5, 'bg-purple': item.inv_status === 6 }">
                                            </div>
                                            <p class="text-sm_medium color-Grey_60">
                                                {{ item.status }}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                            </li>

                        </ul>

                    </div>

                </div>

            </div>


            <ul class="space-y-4px">

                <li v-for="(item, index) in operViewData" :key="index"
                    class="bg-white border border-solid border-Grey_20 rounded-regualr p-4" @click="editOperation(item)">

                    <div class="flex items-center justify-between mb-3">
                        <h6 class="text-large_semibold color-Grey_90">{{ item.opern_inv }}</h6>
                        <p class="text-sm_semibold color-Grey_50">{{ item.opern_date }}</p>
                    </div>

                    <p class="text-base color-Grey_50">{{ item.opern_notes }}</p>

                </li>

                <li class="bg-white border border-solid border-Grey_20 rounded-regualr p-2 cursor-pointer"
                    @click="this.operationModal = !this.operationModal, this.operationId = '', this.operationNote = ''">

                    <div class="flex items-center justify-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path
                                d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
                                stroke="#191C1F" stroke-width="1.5" stroke-miterlimit="10" />
                            <path d="M8.25 12H15.75" stroke="#191C1F" stroke-width="1.5" stroke-linecap="round"
                                stroke-linejoin="round" />
                            <path d="M12 8.25V15.75" stroke="#191C1F" stroke-width="1.5" stroke-linecap="round"
                                stroke-linejoin="round" />
                        </svg>
                        <p class="text-sm">Add New Operation</p>
                    </div>

                </li>

            </ul>


        </div>



        <div class="status-chnageBox" v-if="operationModal">
            <div class="w-full border border-solid border-Grey_20 rounded-regualr bg-white ">

                <div class="w-full border-b border-solid border-Gray_20">

                    <div class="padding-y_8px padding-x_16px">

                        <h4> <span v-if="!this.operationId"> Add </span> <span v-if="this.operationId">Edit</span> Operation
                        </h4>

                    </div>

                </div>

                <div class="padding-y_12px padding-x_16px space-y-4">

                    <div class="space-y-4px">
                        <Label label="operatio Note" />
                        <TextArea placeholder="Enter operatio Note" id="operatio Note" :value="operationNote"
                            @input="event => operationNote = event.target.value" />
                    </div>

                </div>

                <div class="w-full border-t border-solid border-Gray_20">

                    <div class="padding-y_8px padding-x_16px flex items-center justify-end gap-8px">

                        <button class="btn-regular" @click="this.operationModal = !this.operationModal">Cancel</button>
                        <button class="btn-regular bg-purple color-white" :disabled="addOperationBtn" @click="addOperation">
                            <span v-if="!this.operationId"> Add Opration </span>
                            <span v-if="this.operationId">Save Operation</span>
                        </button>

                    </div>

                </div>

            </div>
        </div>

        <div class="overlay" @click="this.operationModal = !this.operationModal" v-if="operationModal"></div>

    </Layout>
</template>

<style scoped>
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

.list span {
    position: relative;
    margin-left: 20px;
}




.list span:after {
    content: "";
    position: absolute;
    left: -12px;
    top: 50%;
    transform: translateY(-50%);
    width: 5px;
    height: 5px;
    border-radius: 999px;
    overflow: hidden;
    background-color: black;
}
</style>