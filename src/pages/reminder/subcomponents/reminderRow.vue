<script>
export default {
    props: {
        list: Array,
        loading: Boolean,
    },
    data() {
        return {
            showStatus: []
        }
    },
    mounted() {
        document.addEventListener('click', this.closeStatusOnClickOutside);
    },
    beforeUnmount() {
        document.removeEventListener('click', this.closeStatusOnClickOutside);
    },
    methods: {
        closeStatusOnClickOutside(event) {
            const isDropdown = event.target.closest('.user-status');

            if (!isDropdown) {
                this.closeStatus();
            }
        },
        deleteItem(id) {
            this.showStatus = [];
            this.$emit('delete_item', id)
        },
        editItem(id) {
            this.showStatus = [];
            this.$emit('edit_item', id)
        },
        editStatus(id, s_id) {
            this.$emit('edit_status', id, s_id)
            this.showStatus = [];
        },
        statusShow(index) {
            this.showStatus = []
            this.showStatus[index] = !this.showStatus[index]
        },
        closeStatus() {
            this.showStatus = [];
        }
    },
}
</script>
<template>
    <template v-for="(items, index) in 6" :key="index">
        <tr v-if="loading">
            <td class="count skeleton-element"></td>
            <td class="user_name skeleton-element"></td>
            <td class="user_number skeleton-element"></td>
            <td class="user_address skeleton-element"></td>
            <td class="blank"></td>
            <td class="user-status relative skeleton-element"></td>
            <td class="dropdown skeleton-element"></td>
        </tr>
    </template>

    <template v-for="(items, index) in list" :key="index">
        <tr v-if="!loading">
            <td class="count">
                <p class="gap-8px text-sm_regular color-Grey_90">{{ index + 1 }}</p>
            </td>
            <td class="user_name">
                <div class="display-flex align-center gap-14px">
                    <p class="text-sm_regular color-Grey_90">{{ items.rem_cus }} </p>
                </div>
            </td>
            <td class="user_number">
                <p class="text-sm_regular color-Grey_90">{{ items.rem_date }}</p>
            </td>
            <td class="user_address">
                <p class="text-sm_regular color-Grey_90 line-clamp-1">{{ items.rem_notes }}</p>
            </td>
            <td class="blank"></td>
            <td class="user-status relative">
                <button class="btn-regular display-flex align-center gap-8px" @click="statusShow(index)">
                    <div class="ellipse-dot"
                        :class="{ 'bg-emerald': items.rem_status_id === 3, 'bg-orange': items.rem_status_id === 2, 'bg-Grey_40': items.rem_status_id === 1 }">
                    </div>
                    <p class="text-sm_medium color-Grey_60 capitalize">{{ items.rem_status }}</p>
                </button>
                <ul class="custom-dropdown-list" v-if="showStatus[index] && items.rem_status_id !== 3"
                    @click.self="closeStatus">
                    <li class="dropdown-item" @click="editStatus(items.rem_id, 1)">
                        <div class="dropdown-link">
                            <p class="dropdown-link-title capitalize"> pending </p>
                        </div>
                    </li>
                    <li class="dropdown-item" @click="editStatus(items.rem_id, 2)">
                        <div class="dropdown-link">
                            <p class="dropdown-link-title capitalize"> unanswered </p>
                        </div>
                    </li>
                    <li class="dropdown-item" @click="editStatus(items.rem_id, 3)">
                        <div class="dropdown-link">
                            <p class="dropdown-link-title capitalize"> complete </p>
                        </div>
                    </li>
                </ul>
            </td>
            <td class="dropdown">
                <div class="icon-btn icon-btn_32px  custom-dropdown">
                    <img src="../../../assets/img/icons/dots-icon.svg">
                    <ul class="custom-dropdown-list leftside icon-dropdown">
                        <li class="dropdown-item" @click="editItem(items.rem_id)">
                            <div class="dropdown-link">
                                <img src="../../../assets/img/icons/edit.svg">
                                <p class="dropdown-link-title"> Edit Follow Up </p>
                            </div>
                        </li>
                        <li class="dropdown-item" @click="deleteItem(items.rem_id)">
                            <div class="dropdown-link">
                                <img src="../../../assets/img/icons/trash.svg">
                                <p class="dropdown-link-title required"> Delete Follow Up </p>
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

.user-status .custom-dropdown-list {
    display: block;
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


.user_number {
    min-width: 20%;
    max-width: 20%;
    display: block;
}

.user_address {
    min-width: 22%;
    max-width: 22%;
    display: block;
    overflow: hidden;
}

.blank {
    min-width: 10%;
    max-width: 10%;
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