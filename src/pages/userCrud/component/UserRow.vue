<script>
export default {
    props: {
        list: Array,
    },
    methods: {
        deleteItem(id) {
            this.$emit('delete_item', id)
        },
        editItem(id) {
            this.$emit('edit_item', id)
        },
        editStatus(id) {
            this.$emit('edit_status', id)
        }
    },
}
</script>

<template>
    <tr v-for="(items, index) in list" :key="index">
        <td class="count">
            <p class="gap-8px text-base_semibold color-Grey_90">{{ index + 1 }}</p>
        </td>
        <td class="user_name">
            <div class="display-flex align-center gap-14px">
                <img :src="items.profile_pic" class="user-img" v-if="items.profile_pic">
                <img src="https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745" class="user-img"
                    v-if="!items.profile_pic">
                <p class="text-base_semibold color-Grey_90">{{ items.user_first_name }} {{ items.user_last_name }}</p>
            </div>
        </td>
        <td class="user_email">
            <p class="text-base_semibold color-Grey_90">{{ items.user_email }}</p>
        </td>
        <td class="user_number">
            <p class="text-base_semibold color-Grey_90">{{ items.user_mobile_number }}</p>
        </td>
        <td class="blank"></td>
        <td class="user-status">
            <button class="btn-regular display-flex align-center gap-8px" v-if="items.user_status === true">
                <div class="ellipse-dot bg-emerald"></div>
                <p class="text-sm_medium color-Grey_60">Enable</p>
            </button>
            <button class="btn-regular display-flex align-center gap-8px" v-if="items.user_status === false">
                <div class="ellipse-dot bg-rose"></div>
                <p class="text-sm_medium color-Grey_60">Disable</p>
            </button>
        </td>
        <td class="dropdown">
            <div class="icon-btn icon-btn_32px  custom-dropdown">
                <img src="../../../assets/img/icons/dots-icon.svg">
                <ul class="custom-dropdown-list leftside icon-dropdown">
                    <li class="dropdown-item" @click="editItem(items.user_id)">
                        <div class="dropdown-link">
                            <img src="../../../assets/img/icons/edit.svg">
                            <p class="dropdown-link-title"> Edit User </p>
                        </div>
                    </li>
                    <li class="dropdown-item" @click="deleteItem(items.user_id)">
                        <div class="dropdown-link">
                            <img src="../../../assets/img/icons/trash.svg">
                            <p class="dropdown-link-title required"> Delete User </p>
                        </div>
                    </li>
                    <li class="dropdown-item" @click="editStatus(items.user_id)" v-if="items.user_status === false">
                        <div class="dropdown-link">
                            <p class="w20"></p>
                            <p class="dropdown-link-title"> Enable </p>
                        </div>
                    </li>
                    <li class="dropdown-item" @click="editStatus(items.user_id)" v-if="items.user_status === true">
                        <div class="dropdown-link">
                            <p class="w20"></p>
                            <p class="dropdown-link-title"> Disable </p>
                        </div>
                    </li>
                </ul>
            </div>
        </td>
    </tr>
</template>

<style scoped>
tr {
    display: flex;
    gap: 24px;
    align-items: center;
}

tr:nth-last-child(1) .custom-dropdown-list,
tr:nth-last-child(2) .custom-dropdown-list,
tr:nth-last-child(3) .custom-dropdown-list {
    top: auto;
    bottom: 90%;
}

.count {
    min-width: 3%;
    max-width: 3%;
    display: block;
}

.user_name {
    min-width: 20%;
    max-width: 20%;
    display: block;
}

.user_name .user-img {
    width: 32px;
    height: 32px;
    border-radius: 999px;
}

.user_email {
    min-width: 18%;
    max-width: 18%;
    display: block;
}

.user_number {
    min-width: 18%;
    max-width: 18%;
    display: block;
}

.blank {
    min-width: 15%;
    max-width: 15%;
    display: block;
}

.user-status {
    min-width: 10%;
    max-width: 10%;
    display: flex;
    justify-content: flex-end;
}

.dropdown {
    min-width: 5%;
    max-width: 5%;
    display: flex;
    justify-content: flex-end;
}

.custom-dropdown:hover .custom-dropdown-list {
    display: block;
}

@media (max-width:990px) {

    .count {
        min-width: 50px;
        max-width: 50px;
    }

    .user_name {
        min-width: 200px;
        max-width: 200px;
    }


    .user_email {
        min-width: 200px;
        max-width: 200px;
    }

    .user_number {
        min-width: 150px;
        max-width: 150px;
    }

    .blank {
        min-width: 50px;
        max-width: 50px;
    }

    .user-status {
        min-width: 100px;
        max-width: 100px;
    }

    .dropdown {
        min-width: 50px;
        max-width: 50px;
    }

}
</style>