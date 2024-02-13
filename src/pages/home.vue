<script>

import { useAuthStore, useAlertStore } from '../stores'
import { fetchWrapper } from '../helpers/fetch-wrapper'

import Layout from '../components/Layout.vue';
import HomePage from '@/subcomponents/HomePage.vue'

const baseUrl = `${import.meta.env.VITE_API_URL}`;


export default {
    components: { Layout, HomePage },
    data() {
        return {
            breadcrumbList: [
                {
                    name: 'Dashboard',
                },
            ],
            list: [],
            listEmpty: false,
        }
    },
    created() {
        const authStore = useAuthStore();
        const title = "Home |  Billion Build"
        const description = "this is description for Home"

        authStore.chnageTitle(title, description)
        this.reminderData();
    },
    methods: {
        async reminderData() {
            this.listEmpty = false;

            var user_data = new FormData();
            user_data.append("rem_id", "");
            user_data.append("sort", "asc");
            user_data.append("page_no", "1");

            try {
                const response = await fetchWrapper.post(`${baseUrl}/reminder-list`, user_data);

                if (response.data && response.data.length !== 0) {
                    this.list = response.data;
                }
                else {
                    this.listEmpty = true;
                    const alertStore = useAlertStore();
                    alertStore.error(response.message);
                }

            } catch (error) {
                const alertStore = useAlertStore()
                alertStore.error(error)
            }

        },
        goToFollowUp() {
            this.$router.push({ name: 'ReminderList' })
        }
    },
}
</script>


<template>
    <Layout :breadcrumb="breadcrumbList">

        <HomePage />

        <div class="w-full max-w-sm bg-white border border-solid border-Grey_20 rounded-regualr overflow-hidden">
            <div class="px-5 py-2 border-b border-solid border-Grey_20">
                <h2 class="text-large_regular color-Grey_90">Follow Up List</h2>
            </div>
            <div v-if="listEmpty" class="data-not-found border-b border-Grey_20 border-solid">
                <img src="../assets/img/no-data.png">
            </div>
            <div class="overflow-y-auto max-h-96 relative">
                <ul v-if="!listEmpty">
                    <li class="border-b border-solid border-Grey_20 px-5 py-2" v-for="(item, index) in list" :key="index">
                        <div class="w-full flex justify-between items-start gap-3.5">
                            <div class="space-y-1.5">
                                <h6 class="color-Grey_90 text-md text-capitalize">{{ item.rem_cus }}</h6>
                                <p class="color-Grey_50 text-sm text-capitalize">{{ item.rem_notes }}</p>
                            </div>
                            <button class="btn-regular display-flex align-center gap-8px" @click="statusShow(index)">
                                <div class="ellipse-dot"
                                    :class="{ 'bg-emerald': item.rem_status_id === 3, 'bg-orange': item.rem_status_id === 2, 'bg-Grey_40': item.rem_status_id === 1 }">
                                </div>
                                <p class="text-sm_medium color-Grey_60 capitalize">{{ item.rem_status }}</p>
                            </button>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="px-5 py-2 bg-white bg-opacity-10 backdrop-blur-md">
                <button class="btn-regular btn-w-full" @click="goToFollowUp">See all</button>
            </div>
        </div>

    </Layout>
</template>