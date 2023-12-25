<script>

export default {
    computed: {
        ishomeCrudActive() {
            return this.$route.matched.some(route => route.path === '/');
        },
        isUserCrudActive() {
            return this.$route.matched.some(route => route.path === '/userlist' || route.path === '/add-user' || route.name === 'EditUser' || route.path === '/roles' || route.path === '/add-role' || route.name === 'EditRole');
        },
        // isRoleCrudActive() {
        //     return this.$route.matched.some(route => route.path === '/roles' || route.path === '/add-role' || route.name === 'EditRole');
        // }
        isASettingCrudActive() {
            return this.$route.matched.some(route => route.path === '/settings');
        }
    },
    props: {
        responsiveSidebarActive: Boolean
    },
    data() {
        return {
            mainSidebarActive: true,
            miniSidebarActive: false,
        }
    },
    created() {
        const mainSidebarActive = localStorage.getItem('mainSidebarActive');
        const miniSidebarActive = localStorage.getItem('miniSidebarActive');

        if (mainSidebarActive !== null) {
            this.mainSidebarActive = JSON.parse(mainSidebarActive);
        }
        if (miniSidebarActive !== null) {
            this.miniSidebarActive = JSON.parse(miniSidebarActive);
        }
    },
    watch: {
        mainSidebarActive(newVal) {
            localStorage.setItem('mainSidebarActive', newVal);
        },
        miniSidebarActive(newVal) {
            localStorage.setItem('miniSidebarActive', newVal);
        }
    },
    methods: {
        toggleSidebar() {
            this.mainSidebarActive = !this.mainSidebarActive;
            this.miniSidebarActive = !this.miniSidebarActive;
        },
        CloseMenuMini() {
            this.mainSidebarActive = !this.mainSidebarActive;
            this.miniSidebarActive = !this.miniSidebarActive;
        },
        closeResponsiveMenu() {
            this.$emit('closeResponsiveMenu')
        }
    }
}

</script>

<template>
    <aside class="main-sidebar"
        :class="{ 'main-sidebar-deactive': miniSidebarActive === true, 'responsive-main-sidebar': responsiveSidebarActive === true }">

        <div class="sidebar-content">

            <div class="sidebar-avatar-header margin-bottom_24px">

                <div class="user-profile-avatar">
                    <img
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&amp;fit=crop&amp;q=80&amp;ixlib=rb-4.0.3&amp;ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&amp;w=1374">
                </div>

                <div class="user-profile-btn" id="Open_mini_sidebar"
                    @click="miniSidebarActive = true, mainSidebarActive = false">
                    <img src="../assets/img/icons/burger-menu.svg" class="img-not-selected">
                </div>

                <div class="user-profile-btn" id="Responsive_Close_sidebar" @click="closeResponsiveMenu">
                    <img src="../assets/img/icons/close-icon.svg" class="img-not-selected close-menu">
                </div>

            </div>


            <div class="sidebar-main-content">


                <ul class="main-pages-list">

                    <li class="list-items">
                        <router-link to="/" class="list-link" active-class="link_active">
                            <div class="link-items">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none">
                                    <path
                                        d="M14.25 19.499V14.999C14.25 14.8001 14.171 14.6093 14.0303 14.4686C13.8897 14.328 13.6989 14.249 13.5 14.249H10.5C10.3011 14.249 10.1103 14.328 9.96967 14.4686C9.82902 14.6093 9.75 14.8001 9.75 14.999V19.499C9.75 19.6979 9.67098 19.8887 9.53033 20.0293C9.38968 20.17 9.19891 20.249 9 20.249H4.5C4.30109 20.249 4.11032 20.17 3.96967 20.0293C3.82902 19.8887 3.75 19.6979 3.75 19.499V10.8271C3.75168 10.7233 3.77411 10.6209 3.81597 10.5259C3.85783 10.4309 3.91828 10.3453 3.99375 10.274L11.4937 3.45836C11.632 3.33187 11.8126 3.26172 12 3.26172C12.1874 3.26172 12.368 3.33187 12.5062 3.45836L20.0062 10.274C20.0817 10.3453 20.1422 10.4309 20.184 10.5259C20.2259 10.6209 20.2483 10.7233 20.25 10.8271V19.499C20.25 19.6979 20.171 19.8887 20.0303 20.0293C19.8897 20.17 19.6989 20.249 19.5 20.249H15C14.8011 20.249 14.6103 20.17 14.4697 20.0293C14.329 19.8887 14.25 19.6979 14.25 19.499Z"
                                        stroke="#6B7280" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                </svg>
                                <p class="link-title">Home</p>
                            </div>
                        </router-link>
                    </li>

                    <!-- <li class="list-items">
                        <router-link to="/userlist" class="list-link" :class="{ link_active: isUserCrudActive }">
                            <div class="link-items">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none">
                                    <path
                                        d="M8.25 15C10.9424 15 13.125 12.8174 13.125 10.125C13.125 7.43261 10.9424 5.25 8.25 5.25C5.55761 5.25 3.375 7.43261 3.375 10.125C3.375 12.8174 5.55761 15 8.25 15Z"
                                        stroke="#6B7280" stroke-width="1.5" stroke-miterlimit="10" />
                                    <path
                                        d="M14.5684 5.42813C14.9993 5.31124 15.4437 5.25136 15.8902 5.25C17.1832 5.25 18.4231 5.76361 19.3374 6.67785C20.2516 7.59209 20.7652 8.83207 20.7652 10.125C20.7652 11.4179 20.2516 12.6579 19.3374 13.5721C18.4231 14.4864 17.1832 15 15.8902 15"
                                        stroke="#6B7280" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path
                                        d="M1.5 18.5066C2.2612 17.4234 3.27191 16.5393 4.44676 15.9289C5.6216 15.3186 6.92608 15 8.25 15C9.57392 15 10.8784 15.3186 12.0532 15.9289C13.2281 16.5393 14.2388 17.4234 15 18.5066"
                                        stroke="#6B7280" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path
                                        d="M15.8906 15C17.2147 14.9992 18.5194 15.3174 19.6944 15.9277C20.8693 16.5381 21.8799 17.4225 22.6406 18.5063"
                                        stroke="#6B7280" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                </svg>
                                <p class="link-title">User</p>
                            </div>
                        </router-link>
                    </li> -->

                    <!-- <li class="list-items">
                        <router-link to="/roles" class="list-link" :class="{ link_active: isRoleCrudActive }">
                            <div class="link-items">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none">
                                    <path
                                        d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
                                        stroke="#6B7280" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path d="M12 12V3" stroke="#6B7280" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path d="M19.7907 7.5L4.20947 16.5" stroke="#6B7280" stroke-width="1.5"
                                        stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                                <p class="link-title">Roles & permissions</p>
                            </div>
                        </router-link>
                    </li> -->

                    <li class="list-items">
                        <router-link to="/settings" class="list-link" :class="{ link_active: isASettingCrudActive }">
                            <div class="link-items">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"
                                    fill="none">
                                    <path
                                        d="M10.1613 2.5H9.83605C9.4439 2.5 9.06782 2.65804 8.79053 2.93934C8.51324 3.22064 8.35746 3.60218 8.35746 4V4.135C8.35719 4.39804 8.28875 4.65639 8.15899 4.88413C8.02923 5.11186 7.84271 5.30098 7.61816 5.4325L7.30027 5.62C7.07549 5.75165 6.82052 5.82096 6.56097 5.82096C6.30142 5.82096 6.04645 5.75165 5.82167 5.62L5.71078 5.56C5.37149 5.36145 4.9684 5.30758 4.59001 5.41023C4.21161 5.51288 3.88882 5.76365 3.6925 6.1075L3.52985 6.3925C3.33413 6.7367 3.28104 7.14562 3.38222 7.5295C3.4834 7.91337 3.7306 8.24084 4.06954 8.44L4.18043 8.515C4.4039 8.64588 4.58972 8.83382 4.71942 9.06012C4.84911 9.28643 4.91817 9.54323 4.91973 9.805V10.1875C4.92076 10.4518 4.85293 10.7117 4.72311 10.9409C4.59328 11.17 4.40607 11.3603 4.18043 11.4925L4.06954 11.56C3.7306 11.7592 3.4834 12.0866 3.38222 12.4705C3.28104 12.8544 3.33413 13.2633 3.52985 13.6075L3.6925 13.8925C3.88882 14.2363 4.21161 14.4871 4.59001 14.5898C4.9684 14.6924 5.37149 14.6386 5.71078 14.44L5.82167 14.38C6.04645 14.2483 6.30142 14.179 6.56097 14.179C6.82052 14.179 7.07549 14.2483 7.30027 14.38L7.61816 14.5675C7.84271 14.699 8.02923 14.8881 8.15899 15.1159C8.28875 15.3436 8.35719 15.602 8.35746 15.865V16C8.35746 16.3978 8.51324 16.7794 8.79053 17.0607C9.06782 17.342 9.4439 17.5 9.83605 17.5H10.1613C10.5535 17.5 10.9296 17.342 11.2069 17.0607C11.4842 16.7794 11.6399 16.3978 11.6399 16V15.865C11.6402 15.602 11.7086 15.3436 11.8384 15.1159C11.9682 14.8881 12.1547 14.699 12.3792 14.5675L12.6971 14.38C12.9219 14.2483 13.1769 14.179 13.4364 14.179C13.696 14.179 13.9509 14.2483 14.1757 14.38L14.2866 14.44C14.6259 14.6386 15.029 14.6924 15.4074 14.5898C15.7858 14.4871 16.1086 14.2363 16.3049 13.8925L16.4675 13.6C16.6633 13.2558 16.7164 12.8469 16.6152 12.463C16.514 12.0791 16.2668 11.7517 15.9279 11.5525L15.817 11.4925C15.5913 11.3603 15.4041 11.17 15.2743 10.9409C15.1445 10.7117 15.0766 10.4518 15.0777 10.1875V9.8125C15.0766 9.54818 15.1445 9.28829 15.2743 9.05912C15.4041 8.82995 15.5913 8.63966 15.817 8.5075L15.9279 8.44C16.2668 8.24084 16.514 7.91337 16.6152 7.5295C16.7164 7.14562 16.6633 6.7367 16.4675 6.3925L16.3049 6.1075C16.1086 5.76365 15.7858 5.51288 15.4074 5.41023C15.029 5.30758 14.6259 5.36145 14.2866 5.56L14.1757 5.62C13.9509 5.75165 13.696 5.82096 13.4364 5.82096C13.1769 5.82096 12.9219 5.75165 12.6971 5.62L12.3792 5.4325C12.1547 5.30098 11.9682 5.11186 11.8384 4.88413C11.7086 4.65639 11.6402 4.39804 11.6399 4.135V4C11.6399 3.60218 11.4842 3.22064 11.2069 2.93934C10.9296 2.65804 10.5535 2.5 10.1613 2.5Z"
                                        stroke="#6B7280" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path
                                        d="M9.9987 11.6666C10.9192 11.6666 11.6654 10.9204 11.6654 9.99992C11.6654 9.07944 10.9192 8.33325 9.9987 8.33325C9.07822 8.33325 8.33203 9.07944 8.33203 9.99992C8.33203 10.9204 9.07822 11.6666 9.9987 11.6666Z"
                                        stroke="#6B7280" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                </svg>
                                <p class="link-title">Settings</p>
                            </div>
                        </router-link>
                    </li>

                </ul>

            </div>


        </div>


    </aside>


    <aside class="mini-main-sidebar" :class="{ 'mini-main-sidebar-deactive': mainSidebarActive === true }">

        <div class="sidebar-content">

            <div class="openmainSidebar" @click="toggleSidebar">
                <img src="../assets/img/icons/chevron-right.svg" />
            </div>

            <div class="sidebar-main-content">


                <ul class="main-pages-list">

                    <li class="list-items">
                        <router-link to="/" class="list-link" active-class="link_active">
                            <div class="link-items">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none">
                                    <path
                                        d="M14.25 19.499V14.999C14.25 14.8001 14.171 14.6093 14.0303 14.4686C13.8897 14.328 13.6989 14.249 13.5 14.249H10.5C10.3011 14.249 10.1103 14.328 9.96967 14.4686C9.82902 14.6093 9.75 14.8001 9.75 14.999V19.499C9.75 19.6979 9.67098 19.8887 9.53033 20.0293C9.38968 20.17 9.19891 20.249 9 20.249H4.5C4.30109 20.249 4.11032 20.17 3.96967 20.0293C3.82902 19.8887 3.75 19.6979 3.75 19.499V10.8271C3.75168 10.7233 3.77411 10.6209 3.81597 10.5259C3.85783 10.4309 3.91828 10.3453 3.99375 10.274L11.4937 3.45836C11.632 3.33187 11.8126 3.26172 12 3.26172C12.1874 3.26172 12.368 3.33187 12.5062 3.45836L20.0062 10.274C20.0817 10.3453 20.1422 10.4309 20.184 10.5259C20.2259 10.6209 20.2483 10.7233 20.25 10.8271V19.499C20.25 19.6979 20.171 19.8887 20.0303 20.0293C19.8897 20.17 19.6989 20.249 19.5 20.249H15C14.8011 20.249 14.6103 20.17 14.4697 20.0293C14.329 19.8887 14.25 19.6979 14.25 19.499Z"
                                        stroke="#6B7280" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                </svg>
                            </div>
                        </router-link>
                    </li>

                    <!-- <li class="list-items">
                        <router-link to="/userlist" class="list-link" :class="{ link_active: isUserCrudActive }">
                            <div class="link-items">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none">
                                    <path
                                        d="M8.25 15C10.9424 15 13.125 12.8174 13.125 10.125C13.125 7.43261 10.9424 5.25 8.25 5.25C5.55761 5.25 3.375 7.43261 3.375 10.125C3.375 12.8174 5.55761 15 8.25 15Z"
                                        stroke="#6B7280" stroke-width="1.5" stroke-miterlimit="10" />
                                    <path
                                        d="M14.5684 5.42813C14.9993 5.31124 15.4437 5.25136 15.8902 5.25C17.1832 5.25 18.4231 5.76361 19.3374 6.67785C20.2516 7.59209 20.7652 8.83207 20.7652 10.125C20.7652 11.4179 20.2516 12.6579 19.3374 13.5721C18.4231 14.4864 17.1832 15 15.8902 15"
                                        stroke="#6B7280" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path
                                        d="M1.5 18.5066C2.2612 17.4234 3.27191 16.5393 4.44676 15.9289C5.6216 15.3186 6.92608 15 8.25 15C9.57392 15 10.8784 15.3186 12.0532 15.9289C13.2281 16.5393 14.2388 17.4234 15 18.5066"
                                        stroke="#6B7280" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path
                                        d="M15.8906 15C17.2147 14.9992 18.5194 15.3174 19.6944 15.9277C20.8693 16.5381 21.8799 17.4225 22.6406 18.5063"
                                        stroke="#6B7280" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                </svg>
                            </div>
                        </router-link>
                    </li> -->


                    <!-- <li class="list-items">
                        <router-link to="/roles" class="list-link" :class="{ link_active: isRoleCrudActive }">
                            <div class="link-items">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none">
                                    <path
                                        d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
                                        stroke="#6B7280" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path d="M12 12V3" stroke="#6B7280" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path d="M19.7907 7.5L4.20947 16.5" stroke="#6B7280" stroke-width="1.5"
                                        stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </div>
                        </router-link>
                    </li> -->

                    <li class="list-items">
                        <router-link to="/settings" class="list-link" :class="{ link_active: isASettingCrudActive }">
                            <div class="link-items">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"
                                    fill="none">
                                    <path
                                        d="M10.1613 2.5H9.83605C9.4439 2.5 9.06782 2.65804 8.79053 2.93934C8.51324 3.22064 8.35746 3.60218 8.35746 4V4.135C8.35719 4.39804 8.28875 4.65639 8.15899 4.88413C8.02923 5.11186 7.84271 5.30098 7.61816 5.4325L7.30027 5.62C7.07549 5.75165 6.82052 5.82096 6.56097 5.82096C6.30142 5.82096 6.04645 5.75165 5.82167 5.62L5.71078 5.56C5.37149 5.36145 4.9684 5.30758 4.59001 5.41023C4.21161 5.51288 3.88882 5.76365 3.6925 6.1075L3.52985 6.3925C3.33413 6.7367 3.28104 7.14562 3.38222 7.5295C3.4834 7.91337 3.7306 8.24084 4.06954 8.44L4.18043 8.515C4.4039 8.64588 4.58972 8.83382 4.71942 9.06012C4.84911 9.28643 4.91817 9.54323 4.91973 9.805V10.1875C4.92076 10.4518 4.85293 10.7117 4.72311 10.9409C4.59328 11.17 4.40607 11.3603 4.18043 11.4925L4.06954 11.56C3.7306 11.7592 3.4834 12.0866 3.38222 12.4705C3.28104 12.8544 3.33413 13.2633 3.52985 13.6075L3.6925 13.8925C3.88882 14.2363 4.21161 14.4871 4.59001 14.5898C4.9684 14.6924 5.37149 14.6386 5.71078 14.44L5.82167 14.38C6.04645 14.2483 6.30142 14.179 6.56097 14.179C6.82052 14.179 7.07549 14.2483 7.30027 14.38L7.61816 14.5675C7.84271 14.699 8.02923 14.8881 8.15899 15.1159C8.28875 15.3436 8.35719 15.602 8.35746 15.865V16C8.35746 16.3978 8.51324 16.7794 8.79053 17.0607C9.06782 17.342 9.4439 17.5 9.83605 17.5H10.1613C10.5535 17.5 10.9296 17.342 11.2069 17.0607C11.4842 16.7794 11.6399 16.3978 11.6399 16V15.865C11.6402 15.602 11.7086 15.3436 11.8384 15.1159C11.9682 14.8881 12.1547 14.699 12.3792 14.5675L12.6971 14.38C12.9219 14.2483 13.1769 14.179 13.4364 14.179C13.696 14.179 13.9509 14.2483 14.1757 14.38L14.2866 14.44C14.6259 14.6386 15.029 14.6924 15.4074 14.5898C15.7858 14.4871 16.1086 14.2363 16.3049 13.8925L16.4675 13.6C16.6633 13.2558 16.7164 12.8469 16.6152 12.463C16.514 12.0791 16.2668 11.7517 15.9279 11.5525L15.817 11.4925C15.5913 11.3603 15.4041 11.17 15.2743 10.9409C15.1445 10.7117 15.0766 10.4518 15.0777 10.1875V9.8125C15.0766 9.54818 15.1445 9.28829 15.2743 9.05912C15.4041 8.82995 15.5913 8.63966 15.817 8.5075L15.9279 8.44C16.2668 8.24084 16.514 7.91337 16.6152 7.5295C16.7164 7.14562 16.6633 6.7367 16.4675 6.3925L16.3049 6.1075C16.1086 5.76365 15.7858 5.51288 15.4074 5.41023C15.029 5.30758 14.6259 5.36145 14.2866 5.56L14.1757 5.62C13.9509 5.75165 13.696 5.82096 13.4364 5.82096C13.1769 5.82096 12.9219 5.75165 12.6971 5.62L12.3792 5.4325C12.1547 5.30098 11.9682 5.11186 11.8384 4.88413C11.7086 4.65639 11.6402 4.39804 11.6399 4.135V4C11.6399 3.60218 11.4842 3.22064 11.2069 2.93934C10.9296 2.65804 10.5535 2.5 10.1613 2.5Z"
                                        stroke="#6B7280" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path
                                        d="M9.9987 11.6666C10.9192 11.6666 11.6654 10.9204 11.6654 9.99992C11.6654 9.07944 10.9192 8.33325 9.9987 8.33325C9.07822 8.33325 8.33203 9.07944 8.33203 9.99992C8.33203 10.9204 9.07822 11.6666 9.9987 11.6666Z"
                                        stroke="#6B7280" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                </svg>
                            </div>
                        </router-link>
                    </li>


                </ul>


            </div>


        </div>


    </aside>
</template>

<style scoped>
.openmainSidebar {
    position: absolute;
    border: 1px solid var(--Grey-20);
    width: 34px;
    height: 34px;
    right: -12px;
    top: 9px;
    z-index: 101;
    border-radius: 999px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding-left: 3px;
}
</style>