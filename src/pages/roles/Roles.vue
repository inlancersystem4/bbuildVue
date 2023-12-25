<script>

import { useAuthStore, useAlertStore } from '../../stores'
import { fetchWrapper } from '../../helpers/fetch-wrapper'

import Layout from '../../components/Layout.vue';
import SettingPage from '../../subcomponents/SettingPage.vue';
import PageDetail from './component/PageDetail.vue';
import RoleBox from './component/RoleBox.vue';
import DeleteModel from '../../subcomponents/common/DeleteModel.vue';

const baseUrl = `${import.meta.env.VITE_API_URL}`;

export default {
    components: { Layout, SettingPage, PageDetail, RoleBox, DeleteModel },
    data() {
        return {
            roleList: [],
            // moduleList: [],
            permissionList: [],
            deleteItemModal: false,
            itemId: "",
        }
    },
    created() {
        this.featchRoleList();
        // this.featchModuleList();
        this.featchPermissionList();
    },
    methods: {
        addRole() {
            this.$router.push({ name: 'AddRole' })
        },
        async featchRoleList() {
            var role_data = new FormData();
            role_data.append("role_id", "");

            try {
                const response = await fetchWrapper.post(`${baseUrl}/role-list`, role_data);
                this.roleList = response.data;


            } catch (error) {
                console.log(error);
            }
        },
        // async featchModuleList() {
        //     var role_data = new FormData();

        //     try {
        //         const response = await fetchWrapper.post(`${baseUrl}/module-list`, role_data);
        //         this.moduleList = response.data;


        //         const moduleNames = this.moduleList.map(module => module.module_name);

        //         await this.featchPermissionList(moduleNames);

        //     } catch (error) {
        //         console.log(error);
        //     }
        // },
        async featchPermissionList() {
            var role_data = new FormData();

            try {
                const response = await fetchWrapper.post(`${baseUrl}/permission-list`, role_data);
                this.permissionList = response.data;


            } catch (error) {
                console.log(error);
            }
        },

        getItemId(id) {
            this.deleteItemModal = true
            this.itemId = id
        },

        async deleteItem() {
            var delete_data = new FormData();

            delete_data.append("role_id", this.itemId);

            try {
                const data = await fetchWrapper.post(`${baseUrl}/remove-role`, delete_data);

                if (data.success === 1) {
                    this.featchRoleList();
                    this.deleteItemModal = false
                }

            } catch (error) {
                const alertStore = useAlertStore()
                alertStore.error(error)
            }
        },

        async statusUpdate(id) {

            var status_up = new FormData();

            status_up.append("role_id", id);

            try {
                const data = await fetchWrapper.post(`${baseUrl}/role-status`, status_up);

                if (data.success === 1) {
                    this.featchRoleList();
                }

            } catch (error) {
                const alertStore = useAlertStore()
                alertStore.error(error)
            }
        },

        editRole(id, name) {
            this.$router.push({ name: 'EditRole', params: { id: id, name: name } })
        }

    },
}
</script>


<template>
    <Layout>

        <SettingPage>

            <PageDetail title="Roles and permissions" subTitle="Control all modul roles and permissions"
                btnText="Add New Roles & permissions" @btn_click="addRole" />

            <div class="main-content">

                <ul class="space-y-8px">

                    <RoleBox @edit_status="statusUpdate" :roleList="roleList" :permissionList="permissionList"
                        @delete_item="getItemId" @edit_item="editRole" />

                </ul>

            </div>

        </SettingPage>
    </Layout>

    <DeleteModel model_title="Delete Role" model_subtitle="Are you sure you want to delete this Role?"
        v-if="deleteItemModal" @close_model="deleteItemModal = false" @delete_item="deleteItem()" />
</template>