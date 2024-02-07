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
    },
}
</script>

<template>
    <template v-for="(items, index) in 6" :key="index">
        <tr v-if="loading">
            <td class="count skeleton-element"></td>
            <td class="user_name skeleton-element"></td>
            <td class="user_number skeleton-element"></td>
            <td class="blank"></td>
            <td class="skeleton-element min-w-10 max-w-10 ml-[145px]"></td>
        </tr>
    </template>

    <template v-for="(items, index) in list" :key="index">
        <tr v-if="!loading">
            <td class="count">
                <p class="gap-8px text-base_semibold color-Grey_90">{{ index + 1 }}</p>
            </td>
            <td class="user_name">
                <p class="text-base_semibold color-Grey_90">{{ items.amenities_name }}</p>
            </td>
            <td class="user_number">
                <p class="text-base_semibold color-Grey_90">{{ items.amenities_details }}</p>
            </td>
            <td class="blank"></td>
            <td class="dropdown">
                <div class="icon-btn icon-btn_32px  custom-dropdown">
                    <img src="../../../assets/img/icons/dots-icon.svg">
                    <ul class="custom-dropdown-list leftside icon-dropdown">
                        <li class="dropdown-item" @click="editItem(items.amenities_id)">
                            <div class="dropdown-link">
                                <img src="../../../assets/img/icons/edit.svg">
                                <p class="dropdown-link-title"> Edit Amenities </p>
                            </div>
                        </li>
                        <li class="dropdown-item" @click="deleteItem(items.amenities_id)">
                            <div class="dropdown-link">
                                <img src="../../../assets/img/icons/trash.svg">
                                <p class="dropdown-link-title required"> Delete Amenities </p>
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
    min-width: 24%;
    max-width: 24%;
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
    min-width: 20%;
    max-width: 20%;
    display: block;
}

.user_address {
    min-width: 15%;
    max-width: 15%;
    display: block;
    overflow: hidden;
}

.blank {
    min-width: 30%;
    max-width: 30%;
    display: block;
}

.user-status {
    min-width: 10%;
    max-width: 10%;
    display: flex;
    justify-content: end;
}

.dropdown {
    min-width: 15%;
    max-width: 15%;
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