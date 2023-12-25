<script>
import Layout from '../../components/Layout.vue';
import ContentSection from '../../subcomponents/ContentSection2.vue';
import Label from '../../subcomponents/common/Label.vue';
import Input from '../../subcomponents/common/Input.vue';
import ErrorMessage from '../../subcomponents/common/ErrorMessage.vue';

import { useAuthStore, useAlertStore } from '../../stores'
import { fetchWrapper } from '../../helpers/fetch-wrapper'

const baseUrl = `${import.meta.env.VITE_API_URL}`;

export default {
    components: { Layout, ContentSection, Label, Input, ErrorMessage },
    computed: {
        btnDisabled() {
            return !this.roleName.trim()
        },
    },
    data() {
        return {
            formSubmitted: false,
            roleName: "",
            permissionsList: [],
            checked: "",
            checkedPermissions: [],
        }
    },
    created() {
        this.featchPermissionsList();
    },
    methods: {
        async featchPermissionsList() {
            var role_data = new FormData();

            try {
                const response = await fetchWrapper.post(`${baseUrl}/permission-list`, role_data);
                this.permissionsList = response.data;

            } catch (error) {
                const alertStore = useAlertStore()
                alertStore.error(error)
            }
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
            role_data.append("role_id", "");
            role_data.append("role_name", this.roleName);
            role_data.append("role_permission", joinedPermissions);

            try {
                const data = await fetchWrapper.post(`${baseUrl}/role-add-or-edit`, role_data);

                if (data.success === 1) {
                    this.$router.push({ name: 'Roles' });
                }

            }
            catch (error) {
                const alertStore = useAlertStore()
                alertStore.error(error)
            }

        }
    },
};
</script>

<template>
    <Layout>

        <ContentSection title="Add Role">

            <div class="col-8">

                <div class="address-form">

                    <div class="space-y-8px">
                        <Label label="Role Name" />
                        <Input placeholder="Enter Role Name" id="Role Name" :value="roleName"
                            @input="event => roleName = event.target.value" />
                        <ErrorMessage msg="" v-if="!roleName && formSubmitted" />
                    </div>



                    <div class="space-y-8px col-span-2">
                        <Label label="Add Permissions" />

                        <div v-for="(permissionData, permissionIndex) in permissionsList" :key="permissionIndex">

                            <div class="margin-top_16px display-flex align-center gap-20px Lg_flex-wrap">

                                <p class="text-small_semibold color-Grey_50 text-capitalize w_140px">
                                    {{ permissionData.name }}
                                    permission:-</p>

                                <div
                                    class=" display-flex align-center gap-18px justify-between  Md_w-100  Mobile_grid-cols-2 Mobile_display-grid">


                                    <template v-for="(permissionlist, permissionlistIndex) in permissionData.permissions"
                                        :key="permissionlistIndex">

                                        <div class="img-not-selected ">
                                            <div class="custom-toogle-btn display-flex align-center gap-8px ">

                                                <input type="checkbox" class="form-toogle-btn"
                                                    @change="updateCheckedPermissions(permissionlist.permission_id)"
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
                    Role
                </button>

            </div>

        </ContentSection>

    </Layout>
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