<script>
import Layout from '../../components/Layout.vue';
import UserInfo from './component/UserInfo.vue';
import UserPassword from './component/UserPassword.vue';
import UserPermissions from './component/UserPermissions.vue';

export default {
    components: { Layout, UserInfo, UserPassword, UserPermissions },
    data() {
        return {
            userId: "",
            activeTab: 0,
            tabs: [
                'User Info',
                'Password',
                'Role & Permissions',
            ]
        }
    },
    created() {
        this.userId = this.$route.params.id;
    }
}
</script>



<template>
    <Layout>

        <ul class="tab-list">
            <li class="tab-items" v-for="(tab, index) in tabs" :key="index">
                <button class="tab-button" @click="activeTab = index" :class="{ 'active-tab-button': activeTab === index }">
                    {{ tab }}
                </button>
            </li>
        </ul>


        <div v-show="activeTab === 0">

            <UserInfo />

        </div>

        <div v-show="activeTab === 1">

            <UserPassword />

        </div>

        <div v-show="activeTab === 2">

            <UserPermissions />

        </div>

    </Layout>
</template>


