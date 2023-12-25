<script>

export default {
    props: {
        roleList: Array,
        permissionList: Array,
    },
    methods: {
        deleteItem(id) {
            this.$emit('delete_item', id)
        },
        editItem(id, name) {
            this.$emit('edit_item', id, name)
        },
        editStatus(id) {
            this.$emit('edit_status', id)
        },
        checkPermission(rolePermissions, permissionId) {
            if (!rolePermissions) return false;
            const permissionsArray = rolePermissions.split(',');
            return permissionsArray.includes(permissionId.toString());
        },
    },
}
</script>

<template>
    <li class="w-full rounded-regualr bg-white border border-Grey_20 border-solid" v-for="item in  roleList" :key="item.id">

        <div class="padding-y_24px padding-x_32px Sm_padding-x_28px Mobile_padding-x_24px">

            <div
                class="display-flex align-center justify-between w-100 gap-12px Mobile-fit_flex-column Mobile-fit_gap-6px Mobile-fit_align-start">
                <div class="display-flex align-center gap-8px Mobile-fit_justify-between Mobile-fit_w-100">
                    <h2 class="text-xl_semibold color-Grey_90 text-capitalize">{{ item.role_name }}</h2>
                </div>

                <div class="display-flex align-center gap-8px Mobile-fit_justify-between Mobile-fit_w-100">

                    <button class="btn-regular custom-dropdown display-flex align-center gap-8px"
                        v-if="item.role_status === true">
                        <div class="ellipse-dot bg-emerald"></div>
                        <p class="text-sm_medium color-Grey_60">Enabled</p>
                    </button>

                    <button class="btn-regular custom-dropdown display-flex align-center gap-8px"
                        v-if="item.role_status === false">
                        <div class="ellipse-dot bg-rose"></div>
                        <p class="text-sm_medium color-Grey_60">Disabled</p>
                    </button>


                    <button class="icon-btn icon-btn_32px border-Grey_20 border border-solid custom-dropdown">
                        <img src="../../../assets/img/icons/dots-icon.svg">

                        <ul class="custom-dropdown-list leftside icon-dropdown">
                            <li class="dropdown-item" @click="editItem(item.role_id, item.role_name)">
                                <div class="dropdown-link">
                                    <img src="../../../assets/img/icons/edit.svg">
                                    <p class="dropdown-link-title"> Edit Role
                                    </p>
                                </div>
                            </li>
                            <li class="dropdown-item" @click="deleteItem(item.role_id)">
                                <div class="dropdown-link">
                                    <img src="../../../assets/img/icons/trash.svg">
                                    <p class="dropdown-link-title required">Delete Role
                                    </p>
                                </div>
                            </li>
                            <li class="dropdown-item" @click="editStatus(item.role_id)" v-if="item.role_status === false">
                                <div class="dropdown-link">
                                    <p class="w20"></p>
                                    <p class="dropdown-link-title"> Enable </p>
                                </div>
                            </li>
                            <li class="dropdown-item" @click="editStatus(item.role_id)" v-if="item.role_status === true">
                                <div class="dropdown-link">
                                    <p class="w20"></p>
                                    <p class="dropdown-link-title"> Disable </p>
                                </div>
                            </li>
                        </ul>

                    </button>
                </div>
            </div>
            <p class="margin-top_4px Mobile-fit_margin-top_12px text-base_regular color-Grey_50">
                Available Roles at our Panel</p>
        </div>


        <div class="padding-y_24px  padding-x_32px Sm_padding-x_28px Mobile_padding-x_24px border-t border-solid border-Grey_20"
            v-if="permissionList === null || permissionList === 'null' || !permissionList || permissionList.length === 0">
            <p class="no-conetnt-show-section">No Any Module</p>
        </div>


        <div v-for="(permissionData, permissionIndex ) in permissionList" :key="permissionIndex">

            <div
                class="padding-y_18px padding-x_32px Sm_padding-x_28px Mobile_padding-x_24px border-t border-solid border-Grey_20 display-flex align-center gap-18px  Lg_flex-wrap">

                <p class="text-small_semibold color-Grey_50 text-capitalize w_140px">{{ permissionData.name }}
                    permission:-</p>

                <div
                    class=" display-flex align-center gap-18px justify-between  Md_w-100  Mobile_grid-cols-2 Mobile_display-grid">

                    <template v-for="(permissionlist, permissionlistIndex) in permissionData.permissions"
                        :key="permissionlistIndex">

                        <div class="img-not-selected cursor-no-drop">
                            <div class="custom-toogle-btn display-flex align-center gap-8px ">

                                <input type="checkbox" class="form-toogle-btn cursor-no-drop"
                                    :checked="checkPermission(item.role_permission, permissionlist.permission_id)"
                                    :id="item.role_id + '_' + permissionIndex + '_' + permissionlistIndex" disabled />

                                <label class="text-capitalize text-large_semibold color-Grey_90 cursor-no-drop"
                                    :id="item.role_id + '_' + permissionIndex + '_' + permissionlistIndex">
                                    {{ permissionlist.permission_name }}
                                </label>
                            </div>
                        </div>

                    </template>

                </div>

            </div>

        </div>

    </li>
</template>

<style scoped>
.custom-dropdown:hover .custom-dropdown-list {
    display: block;
}

.cursor-no-drop {
    cursor: no-drop !important;
}
</style>
