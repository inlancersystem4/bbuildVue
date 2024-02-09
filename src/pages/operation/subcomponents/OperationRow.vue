<script>
export default {
    props: {
        list: Array,
        loading: Boolean,
    },
    methods: {
        deleteItem(id) {
            this.$emit('delete_item', id)
        },
        editItem(id) {
            this.$emit('edit_item', id)
        },
        editStatus(id, s_id) {
            this.$emit('edit_status', id, s_id)
        },
        editReminder(id) {
            this.$router.push({ name: 'AddReminder', params: { reminderId: id } })
        }
    },
}
</script>
<template>
    <template v-for="(items, index) in 6" :key="index">
        <tr v-if="loading">
            <td class="count skeleton-element"></td>
            <td class="user_name skeleton-element"></td>
            <td class="user_email skeleton-element"></td>
            <td class="user_address skeleton-element"></td>
            <td class="blank"></td>
            <td class="user-status skeleton-element"></td>
            <td class="dropdown skeleton-element"></td>
        </tr>
    </template>

    <template v-for="(items, index) in list" :key="index">
        <tr v-if="!loading">

            <td class="count">
                <p class="gap-8px text-base_semibold color-Grey_90">{{ index + 1 }}</p>
            </td>
            <td class="user_name">
                <p class="text-base_semibold color-Grey_90"> {{ items.opern_inv }}</p>
            </td>
            <td class="user_email">
                <p class="text-base_semibold color-Grey_90">{{ items.opern_date }}</p>
            </td>
            <td class="user_address">
                <p class="text-base_semibold color-Grey_90 line-clamp-1">{{ items.opern_notes }}</p>
            </td>
            <td class="blank"></td>
            <td class="user-status">
                <button class="btn-regular display-flex align-center gap-8px" v-if="items.opern_status_id === 1">
                    <div class="ellipse-dot bg-rose"></div>
                    <p class="text-sm_medium color-Grey_60 capitalize">{{ items.opern_status }}</p>
                </button>
                <button class="btn-regular display-flex align-center gap-8px" v-if="items.opern_status_id === 2">
                    <div class="ellipse-dot bg-emerald"></div>
                    <p class="text-sm_medium color-Grey_60 capitalize">{{ items.opern_status }}</p>
                </button>
            </td>
            <td class="dropdown">
                <div class="icon-btn icon-btn_32px  custom-dropdown">
                    <img src="../../../assets/img/icons/dots-icon.svg">
                    <ul class="custom-dropdown-list leftside icon-dropdown">
                        <li class="dropdown-item" @click="editItem(items.opern_id)">
                            <div class="dropdown-link">
                                <img src="../../../assets/img/icons/edit.svg">
                                <p class="dropdown-link-title"> Edit Operation </p>
                            </div>
                        </li>
                        <li class="dropdown-item" @click="deleteItem(items.opern_id)">
                            <div class="dropdown-link">
                                <img src="../../../assets/img/icons/trash.svg">
                                <p class="dropdown-link-title required"> Delete Operation </p>
                            </div>
                        </li>
                        <li class="dropdown-item" @click="editStatus(items.opern_id, 1)"
                            v-if="items.opern_status_id === 2 && items.opern_status_id !== 2">
                            <div class="dropdown-link">
                                <p class="w20"></p>
                                <p class="dropdown-link-title"> Pending </p>
                            </div>
                        </li>
                        <li class="dropdown-item" @click="editStatus(items.opern_id, 2)" v-if="items.opern_status_id === 1">
                            <div class="dropdown-link">
                                <p class="w20"></p>
                                <p class="dropdown-link-title"> complete </p>
                            </div>
                        </li>
                    </ul>
                </div>
            </td>
        </tr>
    </template>
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
    min-width: 18%;
    max-width: 18%;
    display: block;
}

.user_name .user-img {
    width: 32px;
    height: 32px;
    border-radius: 999px;
}

.user_email {
    min-width: 15%;
    max-width: 15%;
    display: block;
}

.user_number {
    min-width: 10%;
    max-width: 10%;
    display: block;
}

.user_address {
    min-width: 25%;
    max-width: 25%;
    display: block;
    overflow: hidden;
}

.blank {
    min-width: 12%;
    max-width: 12%;
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

    .user_address {
        min-width: 180px;
        max-width: 180px;
        display: block;
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