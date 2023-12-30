<script>

import { useAuthStore, useAlertStore } from "@/stores";
import { fetchWrapper } from "@/helpers";
import axios from "axios";
import DeleteModel from '../subcomponents/common/DeleteModel.vue';

export default {
    components: {
        DeleteModel,
        useAuthStore,
        useAlertStore,
        fetchWrapper
    },
    data() {
        return {
            personal_optionDrop: false,
            logOutModal: false,
            profilePic: "",
        }
    },
    mounted() {
        document.body.addEventListener('click', this.handleClickOutside);
        const userDetails = localStorage.getItem('user_details');
        if (userDetails) {
            const userDetailsObj = JSON.parse(userDetails);
            this.profilePic = userDetailsObj.user_profile_pic;
        }
    },
    methods: {
        goToPreviousPage() {
            this.$router.go(-1);
        },
        goToNextPage() {
            this.$router.go(1);
        },
        toggleDropdown() {
            this.personal_optionDrop = !this.personal_optionDrop;
        },
        goToProfile() {
            this.$router.push({ name: "Profile" })
        },
        logout() {
            const aa = useAuthStore();

            localStorage.removeItem('currentprojectId');
            localStorage.removeItem('currentprojectName');

            aa.logout();
        },
        responsiveMenu() {
            this.$emit('responsiveMenu')
        }
    },
}
</script>

<template>
    <header class="main-content-header">

        <div class="header-btn-group">
            <button class="layout-buttons" @click="goToPreviousPage">
                <img src="../assets/img/icons/arrow-left.svg" class="img-not-selected">
            </button>
            <button class="layout-buttons" @click="goToNextPage">
                <img src="../assets/img/icons/arrow-right.svg" class="img-not-selected">
            </button>
        </div>


        <div class="header-btn-group">
            <div class="user-avtar" @click="toggleDropdown()" ref="dropdownContainer">
                <div class="avtar">
                    <img :src="this.profilePic" v-if="this.profilePic">
                    <img src="https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg"
                        v-if="!this.profilePic">
                </div>
                <ul class="user-personal-option" v-show="personal_optionDrop">
                    <li>
                        <button @click="goToProfile">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M14.25 10.5H18" stroke="#191C1F" stroke-width="1.5" stroke-linecap="round"
                                    stroke-linejoin="round" />
                                <path d="M14.25 13.5H18" stroke="#191C1F" stroke-width="1.5" stroke-linecap="round"
                                    stroke-linejoin="round" />
                                <path
                                    d="M8.63428 13.5C9.87692 13.5 10.8843 12.4926 10.8843 11.25C10.8843 10.0074 9.87692 9 8.63428 9C7.39164 9 6.38428 10.0074 6.38428 11.25C6.38428 12.4926 7.39164 13.5 8.63428 13.5Z"
                                    stroke="#191C1F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path
                                    d="M5.72803 15.7481C5.89325 15.1028 6.26855 14.5308 6.79476 14.1223C7.32097 13.7139 7.96815 13.4922 8.63428 13.4922C9.30041 13.4922 9.94759 13.7139 10.4738 14.1223C11 14.5308 11.3753 15.1028 11.5405 15.7481"
                                    stroke="#191C1F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path
                                    d="M20.25 4.5H3.75C3.33579 4.5 3 4.83579 3 5.25V18.75C3 19.1642 3.33579 19.5 3.75 19.5H20.25C20.6642 19.5 21 19.1642 21 18.75V5.25C21 4.83579 20.6642 4.5 20.25 4.5Z"
                                    stroke="#191C1F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            personal Details
                        </button>
                    </li>
                    <li>
                        <button class="required" @click="logOutModal = !logOutModal">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M16.3125 8.0625L20.25 12L16.3125 15.9375" stroke="#F43F5E" stroke-width="1.5"
                                    stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M9.75 12H20.25" stroke="#F43F5E" stroke-width="1.5" stroke-linecap="round"
                                    stroke-linejoin="round" />
                                <path
                                    d="M9.75 20.25H4.5C4.30109 20.25 4.11032 20.171 3.96967 20.0303C3.82902 19.8897 3.75 19.6989 3.75 19.5V4.5C3.75 4.30109 3.82902 4.11032 3.96967 3.96967C4.11032 3.82902 4.30109 3.75 4.5 3.75H9.75"
                                    stroke="#F43F5E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            Log out
                        </button>
                    </li>
                </ul>
            </div>
            <button class="layout-buttons" @click="responsiveMenu" id="Responsive_Open_sidebar">
                <img src="../assets/img/icons/burger-menu.svg" class="img-not-selected">
            </button>
        </div>


    </header>


    <DeleteModel model_title="Logout" model_subtitle="Are you sure you want to Logout?" v-if="logOutModal"
        @close_model="logOutModal = false" @delete_item="logout()" model_content="Logout" />
</template>


<style scoped>
.user-avtar {
    position: relative;
}

.user-avtar .avtar {
    width: 42px;
    height: 42px;
    border-radius: 999px;
    border: 1px solid var(--Grey-20);
    padding: 2px;
    overflow: hidden;
    cursor: pointer;
}

.user-avtar .avtar img {
    width: 100%;
    height: 100%;
    border-radius: 999px;
}

.user-avtar .user-personal-option {
    position: absolute;
    right: 50%;
    top: 110%;
    background-color: white;
    padding: 6px;
    border: 1px solid var(--Grey-20);
    border-radius: 8px;
    min-width: 240px;
    max-width: 240px;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    z-index: 99;
}

.user-avtar .user-personal-option button {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 6px 12px;
    font-size: 14px;
    text-transform: capitalize;
    border-radius: 4px;
    color: var(--Grey-90);
    font-weight: bold;
}

.user-avtar .user-personal-option button svg,
.user-avtar .user-personal-option button img {
    width: 24px;
    height: 24px;
}

.user-avtar .user-personal-option button:hover {
    background-color: var(--Grey-20);
}
</style>