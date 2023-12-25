<script>
import Layout from '../../../components/Layout.vue';
import ContentSection from '../../../subcomponents/ContentSection2.vue';
import Label from '../../../subcomponents/common/Label.vue';
import Input from '../../../subcomponents/common/Input.vue';
import ErrorMessage from '../../../subcomponents/common/ErrorMessage.vue';

import { useAuthStore, useAlertStore } from '../../../stores'
import { fetchWrapper } from '../../../helpers/fetch-wrapper'

const baseUrl = `${import.meta.env.VITE_API_URL}`;

export default {
    components: { Layout, ContentSection, Label, Input, ErrorMessage },
    data() {
        return {
            formSubmitted: false,
            permissionsList: [],
            checked: "",
            roleData: "",
            userId: "",
            role: "",
            checkedPermissions: [],
            checkedPer: "",
        }
    },
    created() {
        this.userId = this.$route.params.id;
        this.role = this.$route.params.name;
        this.featchPermissionsList();
        this.featchRoleList();
    },
    methods: {
        async featchRoleList() {


            var role_data = new FormData();
            role_data.append("user_id", this.userId);

            try {
                const response = await fetchWrapper.post(`${baseUrl}/edit-user`, role_data);

                this.checkedPer = response.data.user_permission


                const permissionsArray = this.checkedPer.split(',').map(Number);

                this.checkedPermissions.push(...permissionsArray);


            } catch (error) {
                console.log(error);
            }
        },
        async featchPermissionsList() {
            var role_data = new FormData();

            try {
                const response = await fetchWrapper.post(`${baseUrl}/permission-list`, role_data);
                this.permissionsList = response.data;


            } catch (error) {
                console.log(error);
            }
        },

        checkPermission(rolePermissions, permissionId) {
            if (!rolePermissions) return false;
            const permissionsArray = rolePermissions.split(',');
            return permissionsArray.includes(permissionId.toString());
        },

        updateCheckedPermissions(permissionId) {

            const index = this.checkedPermissions.indexOf(permissionId);
            if (index !== -1) {
                this.checkedPermissions.splice(index, 1);
            } else {
                this.checkedPermissions.push(permissionId);
            }
        },

        async addRole() {

            const joinedPermissions = this.checkedPermissions.join(',');

            var role_data = new FormData();
            role_data.append("id", this.userId);
            role_data.append("check", joinedPermissions);

            try {
                const data = await fetchWrapper.post(`${baseUrl}/add-permissions`, role_data);

                if (data.success === 1) {
                    this.$router.push({ name: 'UserList' });
                }

            }
            catch (error) {
                console.log(error);
            }

        }
    },
};
</script>

<template>
    <ContentSection :title="`Edit Permissions`">

        <div class="col-8">

            <div class="address-form">

                <div class="space-y-8px col-span-2">

                    <div v-for="(permissionData, permissionIndex) in permissionsList" :key="permissionIndex">

                        <div class="margin-top_16px display-flex align-center gap-20px    Lg_flex-wrap">

                            <p class="text-small_semibold color-Grey_50 text-capitalize w_140px">
                                {{ permissionData.name }}
                                permission:-</p>

                            <div class=" display-flex align-center gap-18px Mobile_flex-wrap">
                                <template v-for="(permissionlist, permissionlistIndex) in permissionData.permissions"
                                    :key="permissionlistIndex">

                                    <div class="img-not-selected ">
                                        <div class="custom-toogle-btn display-flex align-center gap-8px ">

                                            <input type="checkbox" class="form-toogle-btn"
                                                @change="updateCheckedPermissions(permissionlist.permission_id)"
                                                :checked="checkPermission(this.checkedPer, permissionlist.permission_id)"
                                                :id="permissionIndex + '_' + permissionlistIndex" />
                                            {{ checked }}
                                            <label class="text-capitalize text-large_semibold color-Grey_90"
                                                :for="permissionIndex + '_' + permissionlistIndex">
                                                {{ permissionlist.permission_name }}
                                            </label>
                                        </div>
                                    </div>
                                </template>
                            </div>

                        </div>

                    </div>



                </div>

            </div>

            <button type="submit" class="btn-regular margin-top_24px" :disabled="btnDisabled" @click="addRole">Add
                Permissions
            </button>

        </div>

    </ContentSection>
</template>

<style scoped>
.col-8 {
    width: 80%;
}

.w_160px {
    width: 160px;
}

@media (max-width:790px) {


    .col-8 {
        width: 100%;
    }

}
</style>