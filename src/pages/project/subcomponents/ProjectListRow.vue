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
        <td class="project_name">
            <p class="text-base_semibold color-Grey_90">{{ items.project_name }}</p>
        </td>
        <td class="project_stuactur">
            <p class="text-base_semibold color-Grey_90">{{ items.project_no_of_level }}</p>
        </td>
        <td class="project_address">
            <p class="text-base_semibold color-Grey_90 line-clamp-1"> {{ items.project_address }} </p>
        </td>
        <td class="blank"></td>
        <td class="dropdown">
            <div class="icon-btn icon-btn_32px  custom-dropdown">
                <img src="../../../assets/img/icons/dots-icon.svg">
                <ul class="custom-dropdown-list leftside icon-dropdown">
                    <li class="dropdown-item" @click="editItem(items.project_id)">
                        <div class="dropdown-link">
                            <img src="../../../assets/img/icons/edit.svg">
                            <p class="dropdown-link-title"> Edit Project </p>
                        </div>
                    </li>
                    <li class="dropdown-item" @click="deleteItem(items.project_id)">
                        <div class="dropdown-link">
                            <img src="../../../assets/img/icons/trash.svg">
                            <p class="dropdown-link-title required"> Delete Project </p>
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

.project_name {
    min-width: 25%;
    max-width: 25%;
    display: block;
}

.project_stuactur {
    min-width: 14%;
    max-width: 14%;
    display: block;
}

.project_address {
    min-width: 35%;
    max-width: 35%;
    display: block;
}

.blank {
    min-width: 8%;
    max-width: 8%;
    display: block;
}

.user-status {
    min-width: 10%;
    max-width: 10%;
    display: flex;
    justify-content: end;
}

.dropdown {
    min-width: 5%;
    max-width: 5%;
    display: flex;
    justify-content: end;
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