<script>

import { useAuthStore, useAlertStore, useProfileStore } from "@/stores";
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
    props: {
        breadcrumbList: Array
    },
    data() {
        return {
            personal_optionDrop: false,
            logOutModal: false,
            profilePic: "",
        }
    },
    computed: {
        profilePicUrl() {
            return useProfileStore().profilePicUrl;
        }
    },
    // mounted() {
    //     document.body.addEventListener('click', this.handleClickOutside);
    //     const userDetails = localStorage.getItem('user_details');
    //     if (userDetails) {
    //         const userDetailsObj = JSON.parse(userDetails);
    //         this.profilePic = userDetailsObj.user_profile_pic;
    //     }
    // },
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
        goToSetting() {
            this.$router.push({ name: "Settings" })
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
            <ul class="breadcrumb-list">
                <li v-for="(breadcrumb, index) in breadcrumbList" :key="index">
                    <router-link :to="breadcrumb.link" v-if="breadcrumb.link">
                        {{ breadcrumb.name }}
                    </router-link>
                    <span v-else>
                        {{ breadcrumb.name }}
                    </span>
                </li>
            </ul>
        </div>


        <div class="header-btn-group">
            <div class="user-avtar" @click="toggleDropdown()" ref="dropdownContainer">
                <div class="avtar">
                    <img :src="profilePicUrl" v-if="profilePicUrl">
                    <!-- <img :src="this.profilePic" v-if="this.profilePic"> -->
                    <img src="https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg"
                        v-if="!profilePicUrl">
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
                        <button @click="goToSetting">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"
                                    fill="none">
                                    <path
                                        d="M10.1623 2.5H9.83703C9.44488 2.5 9.0688 2.65804 8.79151 2.93934C8.51422 3.22064 8.35844 3.60218 8.35844 4V4.135C8.35817 4.39804 8.28972 4.65639 8.15996 4.88413C8.0302 5.11186 7.84369 5.30098 7.61914 5.4325L7.30124 5.62C7.07647 5.75165 6.82149 5.82096 6.56194 5.82096C6.3024 5.82096 6.04742 5.75165 5.82265 5.62L5.71175 5.56C5.37246 5.36145 4.96938 5.30758 4.59098 5.41023C4.21258 5.51288 3.8898 5.76365 3.69347 6.1075L3.53083 6.3925C3.33511 6.7367 3.28201 7.14562 3.3832 7.5295C3.48438 7.91337 3.73157 8.24084 4.07052 8.44L4.18141 8.515C4.40488 8.64588 4.5907 8.83382 4.72039 9.06012C4.85009 9.28643 4.91915 9.54323 4.92071 9.805V10.1875C4.92174 10.4518 4.85391 10.7117 4.72409 10.9409C4.59426 11.17 4.40705 11.3603 4.18141 11.4925L4.07052 11.56C3.73157 11.7592 3.48438 12.0866 3.3832 12.4705C3.28201 12.8544 3.33511 13.2633 3.53083 13.6075L3.69347 13.8925C3.8898 14.2363 4.21258 14.4871 4.59098 14.5898C4.96938 14.6924 5.37246 14.6386 5.71175 14.44L5.82265 14.38C6.04742 14.2483 6.3024 14.179 6.56194 14.179C6.82149 14.179 7.07647 14.2483 7.30124 14.38L7.61914 14.5675C7.84369 14.699 8.0302 14.8881 8.15996 15.1159C8.28972 15.3436 8.35817 15.602 8.35844 15.865V16C8.35844 16.3978 8.51422 16.7794 8.79151 17.0607C9.0688 17.342 9.44488 17.5 9.83703 17.5H10.1623C10.5545 17.5 10.9306 17.342 11.2078 17.0607C11.4851 16.7794 11.6409 16.3978 11.6409 16V15.865C11.6412 15.602 11.7096 15.3436 11.8394 15.1159C11.9691 14.8881 12.1557 14.699 12.3802 14.5675L12.6981 14.38C12.9229 14.2483 13.1779 14.179 13.4374 14.179C13.697 14.179 13.9519 14.2483 14.1767 14.38L14.2876 14.44C14.6269 14.6386 15.03 14.6924 15.4084 14.5898C15.7868 14.4871 16.1096 14.2363 16.3059 13.8925L16.4685 13.6C16.6642 13.2558 16.7173 12.8469 16.6162 12.463C16.515 12.0791 16.2678 11.7517 15.9288 11.5525L15.8179 11.4925C15.5923 11.3603 15.4051 11.17 15.2753 10.9409C15.1454 10.7117 15.0776 10.4518 15.0786 10.1875V9.8125C15.0776 9.54818 15.1454 9.28829 15.2753 9.05912C15.4051 8.82995 15.5923 8.63966 15.8179 8.5075L15.9288 8.44C16.2678 8.24084 16.515 7.91337 16.6162 7.5295C16.7173 7.14562 16.6642 6.7367 16.4685 6.3925L16.3059 6.1075C16.1096 5.76365 15.7868 5.51288 15.4084 5.41023C15.03 5.30758 14.6269 5.36145 14.2876 5.56L14.1767 5.62C13.9519 5.75165 13.697 5.82096 13.4374 5.82096C13.1779 5.82096 12.9229 5.75165 12.6981 5.62L12.3802 5.4325C12.1557 5.30098 11.9691 5.11186 11.8394 4.88413C11.7096 4.65639 11.6412 4.39804 11.6409 4.135V4C11.6409 3.60218 11.4851 3.22064 11.2078 2.93934C10.9306 2.65804 10.5545 2.5 10.1623 2.5Z"
                                        stroke="#191C1F" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path
                                        d="M9.99967 11.6666C10.9201 11.6666 11.6663 10.9204 11.6663 9.99992C11.6663 9.07944 10.9201 8.33325 9.99967 8.33325C9.0792 8.33325 8.33301 9.07944 8.33301 9.99992C8.33301 10.9204 9.0792 11.6666 9.99967 11.6666Z"
                                        stroke="#191C1F" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                </svg>
                            Settings
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

.breadcrumb-list {
    display: flex;
    align-items: center;
    text-transform: capitalize;
    font-size: 14px;
    color: var(--Grey-90);
    gap: 6px;
}

.breadcrumb-list li a {
    display: inline-flex;
}

.breadcrumb-list li span {
    color: var(--Grey-50);
}

.breadcrumb-list li:nth-last-child(1)::after {
    display: none;
}

.breadcrumb-list li::after {
    content: '/';
    padding-left: 6px;
}
</style>