<script>

import Layout from '../components/Layout.vue'

export default {
    components: { Layout },
    created() {
        document.title = 'Settings | Billion Build'
    },
    data() {
        return {
            options: [
                // {
                //     title: "User",
                //     sub_title: "Manage your user details",
                //     icon: "/src/assets/img/icons/users.svg",
                //     link: "/userlist"
                // },
                // {
                //     title: "Projects",
                //     sub_title: "Manage your Projects details",
                //     icon: "/src/assets/img/icons/taxes.svg",
                //     link: "/project/0"
                // },
                // {
                //     title: "Customers",
                //     sub_title: "Manage your Customers details",
                //     icon: "/src/assets/img/icons/users.svg",
                //     link: "/customerlist"
                // },
                {
                    title: "inventery list",
                    sub_title: "Manage your inventery list details",
                    icon: "/src/assets/img/icons/users.svg",
                    link: "/inventory-list"
                },
            ]
        }
    },
}
</script>


<template>
    <Layout>
        <div>

            <h2 class="text-2xl_semibold color-Grey_90">Settings</h2>
            <p class="text-base_regular color-Grey_50">Manage the settings for your Medusa Store</p>

        </div>

        <div class="setting-options-grid">

            <router-link class="options" v-for="item in options" :key="item.title" :to="item.link">
                <div class="display-flex align-center gap-24px">

                    <div class="icon-border icon-border-20 icon-border_40px">
                        <div class="icon-bg icon-bg_32px bg-Grey_10">
                            <img :src="item.icon" class="img-not-selected">
                        </div>
                    </div>

                    <div>
                        <h6 class="color-Grey_90 text-base_semibold">{{ item.title }}</h6>
                        <p class="text-base_regular color-Grey_50 line-clamp-1">{{ item.sub_title }}
                        </p>
                    </div>

                </div>

                <button class="btn">
                    <img src="../assets/img/icons/chevron-right.svg">
                </button>

            </router-link>


        </div>
    </Layout>
</template>