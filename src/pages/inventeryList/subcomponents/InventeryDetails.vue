<script>
import Layout from '@/components/Layout.vue';
import { fetchWrapper } from '@/helpers/fetch-wrapper'
import { useAuthStore, useAlertStore } from '@/stores'

const baseUrl = `${import.meta.env.VITE_API_URL}`;

export default {
    components: { Layout },
    data() {
        return {
            inventoryId: "",
            invViewData: "",
            operViewData: [],
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
                            <span v-if="invViewData.inv_nam">
                                {{ invViewData.inv_nam }}
                            </span> details
                        </h4>

                    </div>

                    <div
                        class="padding-x_32px Sm_padding-x_28px Mobile_padding-x_24px Mobile-fit_padding-x_18px padding-bottom_24px">

                        <ul class="">

                            <li class="padding-y_4px display-flex align-center justify-between">

                                <div class="text-base_regular color-Grey_90"> <span v-if="invViewData.inv_nam">
                                        {{ invViewData.inv_nam }}
                                    </span> area</div>

                                <div class="display-flex align-center gap-8px">
                                    <p class="text-base_regular color-Grey_90 text-right">
                                        {{ invViewData.inv_details.inv_area }}
                                    </p>
                                </div>

                            </li>

                            <li class="padding-y_4px display-flex align-center justify-between">

                                <div class="text-base_regular color-Grey_90"> <span v-if="invViewData.inv_nam">
                                        {{ invViewData.inv_nam }}
                                    </span> inv_price</div>

                                <div class="display-flex align-center gap-8px">
                                    <p class="text-base_regular color-Grey_90 text-right">
                                        {{ invViewData.inv_details.inv_price }}
                                    </p>
                                </div>

                            </li>

                            <li class="padding-y_4px display-flex align-center justify-between">

                                <div class="text-base_regular color-Grey_90"> <span v-if="invViewData.inv_nam">
                                        {{ invViewData.inv_nam }}
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
                            <span v-if="invViewData.inv_nam">
                                {{ invViewData.inv_nam }}
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
                            <span v-if="invViewData.inv_nam">
                                {{ invViewData.inv_nam }}
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
                    class="bg-white border border-solid border-Grey_20 rounded-regualr p-4">

                    <div class="flex items-center justify-between mb-3">
                        <h6 class="text-large_semibold color-Grey_90">{{ item.opern_inv }}</h6>
                        <p class="text-sm_semibold color-Grey_50">{{ item.opern_date }}</p>
                    </div>

                    <p class="text-base color-Grey_50">{{ item.opern_notes }}</p>

                </li>

            </ul>


        </div>

    </Layout>
</template>

<style scoped>
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