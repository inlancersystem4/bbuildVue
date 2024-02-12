<script>
import Layout from '../../components/Layout.vue';
import { useAuthStore, useAlertStore } from '../../stores'
import { fetchWrapper } from '../../helpers/fetch-wrapper'

const baseUrl = `${import.meta.env.VITE_API_URL}`;

export default {
    components: { Layout },
    data() {
        return {
            multiEmailAddress: "",
            breadcrumbList: [
                {
                    name: 'Dashboard',
                    link: '/'
                },
                {
                    name: 'Settings',
                }
            ],
            options: [
                {
                    title: "Projects",
                    sub_title: "Manage your Projects",
                    icon: "project-list-icon",
                    link: "/project-list"
                },
                // {
                //     title: "Operation List",
                //     sub_title: "Manage your Operation List",
                //     icon: "operation-list-icon",
                //     link: "/operation-list"
                // },
                {
                    title: "Amenities",
                    sub_title: "Manage your Amenities",
                    icon: "amenities-list-icon",
                    link: "/amenities-list"
                },
            ]
        }
    },
    computed: {
        btnDisabled() {
            return !this.multiEmailAddress.trim();
        }
    },
    created() {
        this.getSettingEmail();
        const authStore = useAuthStore();
        const title = "Setting | Billion Build"
        const description = "this is description for Setting"

        authStore.chnageTitle(title, description)
    },
    methods: {
        handleClick(item) {
            if (item.link) {
                this.$router.push({ path: item.link });
            }
        },
        async getSettingEmail() {
            try {
                const response = await fetchWrapper.post(`${baseUrl}/get-setting`);

                if (response.success === 1) {
                    this.multiEmailAddress = response.data;
                }
                else {
                    const alertStore = useAlertStore();
                    alertStore.error(response.message);
                }

            } catch (error) {
                const alertStore = useAlertStore();
                alertStore.error(error);
            }
        },

        async multiEmailSave() {
            var item_data = new FormData();
            item_data.append("receiver_email", this.multiEmailAddress);

            try {
                const data = await fetchWrapper.post(`${baseUrl}/setting-save`, item_data);
                console.log(data);
                if (data.success === 1) {
                    const alertStore = useAlertStore();
                    alertStore.success(data.message);
                    this.$router.push({ name: 'Settings' });
                }
                else {
                    const alertStore = useAlertStore();
                    alertStore.error(data.message);
                }

            } catch (error) {
                const alertStore = useAlertStore();
                alertStore.error(error);
            }
        }
    },
}
</script>

<template>
    <Layout :breadcrumb="breadcrumbList">

        <div>

            <h2 class="text-2xl_semibold color-Grey_90">Settings</h2>
            <p class="text-base_regular color-Grey_50">Manage Settings for Billion Build</p>

        </div>

        <div class="setting-options-grid">

            <button class="options" v-for="item in options" :key="item.title" @click="handleClick(item)">
                <div class="display-flex align-center gap-24px">

                    <div class="icon-border icon-border-20 icon-border_40px">
                        <div class="icon-bg icon-bg_32px bg-Grey_10">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                v-if="item.icon === 'project-list-icon'">
                                <path d="M2.25 9H21.75L12 3L2.25 9Z" stroke="#6B7280" stroke-width="1.5"
                                    stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M5.25 9V16.5" stroke="#6B7280" stroke-width="1.5" stroke-linecap="round"
                                    stroke-linejoin="round" />
                                <path d="M9.75 9V16.5" stroke="#6B7280" stroke-width="1.5" stroke-linecap="round"
                                    stroke-linejoin="round" />
                                <path d="M14.25 9V16.5" stroke="#6B7280" stroke-width="1.5" stroke-linecap="round"
                                    stroke-linejoin="round" />
                                <path d="M18.75 9V16.5" stroke="#6B7280" stroke-width="1.5" stroke-linecap="round"
                                    stroke-linejoin="round" />
                                <path d="M3 16.5H21" stroke="#6B7280" stroke-width="1.5" stroke-linecap="round"
                                    stroke-linejoin="round" />
                                <path d="M1.5 19.5H22.5" stroke="#6B7280" stroke-width="1.5" stroke-linecap="round"
                                    stroke-linejoin="round" />
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                v-if="item.icon === 'operation-list-icon'">
                                <path
                                    d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
                                    stroke="#6B7280" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path
                                    d="M12 15.75C14.0711 15.75 15.75 14.0711 15.75 12C15.75 9.92893 14.0711 8.25 12 8.25C9.92893 8.25 8.25 9.92893 8.25 12C8.25 14.0711 9.92893 15.75 12 15.75Z"
                                    stroke="#6B7280" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M9.34678 9.34531L5.63428 5.63281" stroke="#6B7280" stroke-width="1.5"
                                    stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M14.6533 9.34531L18.3658 5.63281" stroke="#6B7280" stroke-width="1.5"
                                    stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M14.6533 14.6523L18.3658 18.3648" stroke="#6B7280" stroke-width="1.5"
                                    stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M9.34678 14.6523L5.63428 18.3648" stroke="#6B7280" stroke-width="1.5"
                                    stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                v-if="item.icon === 'amenities-list-icon'">
                                <path d="M7.5 12.75H16.5" stroke="#6B7280" stroke-width="1.5" stroke-linecap="round"
                                    stroke-linejoin="round" />
                                <path
                                    d="M4.5 9V6.75C4.5 5.95435 4.81607 5.19129 5.37868 4.62868C5.94129 4.06607 6.70435 3.75 7.5 3.75H16.5C17.2956 3.75 18.0587 4.06607 18.6213 4.62868C19.1839 5.19129 19.5 5.95435 19.5 6.75V9"
                                    stroke="#6B7280" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path
                                    d="M7.5 15.75V12C7.5 11.4067 7.32405 10.8266 6.99441 10.3333C6.66477 9.83994 6.19623 9.45543 5.64805 9.22836C5.09987 9.0013 4.49667 8.94189 3.91473 9.05765C3.33279 9.1734 2.79824 9.45912 2.37868 9.87868C1.95912 10.2982 1.6734 10.8328 1.55765 11.4147C1.44189 11.9967 1.5013 12.5999 1.72836 13.1481C1.95543 13.6962 2.33994 14.1648 2.83329 14.4944C3.32664 14.8241 3.90666 15 4.5 15V18.75C4.5 18.9489 4.57902 19.1397 4.71967 19.2803C4.86032 19.421 5.05109 19.5 5.25 19.5H18.75C18.9489 19.5 19.1397 19.421 19.2803 19.2803C19.421 19.1397 19.5 18.9489 19.5 18.75V15C20.0933 15 20.6734 14.8241 21.1667 14.4944C21.6601 14.1648 22.0446 13.6962 22.2716 13.1481C22.4987 12.5999 22.5581 11.9967 22.4424 11.4147C22.3266 10.8328 22.0409 10.2982 21.6213 9.87868C21.2018 9.45912 20.6672 9.1734 20.0853 9.05765C19.5033 8.94189 18.9001 9.0013 18.352 9.22836C17.8038 9.45543 17.3352 9.83994 17.0056 10.3333C16.6759 10.8266 16.5 11.4067 16.5 12V15.75"
                                    stroke="#6B7280" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </div>
                    </div>

                    <div>
                        <h6 class="color-Grey_90 text-base_semibold">{{ item.title }}</h6>
                        <p class="text-base_regular color-Grey_50 line-clamp-1">{{ item.sub_title }}
                        </p>
                    </div>

                </div>

                <button class="btn">
                    <img src="../../assets/img/icons/chevron-right.svg">
                </button>

            </button>

        </div>

        <div class="input-group bg-white p-4 border border-solid border-Grey_20 rounded-regualr">
            <label for="multiEmail">Emails:</label>
            <textarea id="multiEmail" placeholder="Enter Emails.." rows="4" cols="122" v-model="multiEmailAddress"
                class="input-1 resize-none bg-white"></textarea>
            <button class="w-fit btn-regular margin-top_8px" type="submit" @click="multiEmailSave()"
                :disabled="btnDisabled">Save</button>
        </div>
    </Layout>
</template>

<style scoped>
.options {
    text-align: left;
}

label {
    font-size: 14px;
    text-transform: capitalize;
    font-family: 500;
    letter-spacing: 0.2px;
    display: block;
    cursor: pointer;
}
</style>