<script>

export default {
    computed: {
        ishomeCrudActive() {
            return this.$route.matched.some(route => route.path === '/');
        },
        isprojectCrudActive() {
            return this.$route.matched.some(route => route.path === '/project-list' || route.name === 'Project');
        },
        // isUserCrudActive() {
        //     return this.$route.matched.some(route => route.path === '/userlist' || route.path === '/add-user' || route.name === 'EditUser' || route.path === '/roles' || route.path === '/add-role' || route.name === 'EditRole');
        // },
        // isRoleCrudActive() {
        //     return this.$route.matched.some(route => route.path === '/roles' || route.path === '/add-role' || route.name === 'EditRole');
        // }
        iscustomerCrudActive() {
            return this.$route.matched.some(route => route.path === '/customerlist' || route.name === 'EditCustomer' || route.path === '/add-customer');
        },
        isInventoryCrudActive() {
            return this.$route.matched.some(route => route.name === 'InventeryList');
        },
        isReminderCrudActive() {
            return this.$route.matched.some(route => route.name === 'ReminderList' || route.name === 'AddReminder' || route.name === 'EditReminder');
        },
        isOperationCrudActive() {
            return this.$route.matched.some(route => route.name === 'OperationList');
        },
        isAmenitiesCrudActive() {
            return this.$route.matched.some(route => route.name === 'AmenitiesList');
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

                <router-link to="/">
                    <img src="/billionbuild.svg" class=" w-[150px] ">
                </router-link>

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

                    <li class="list-items">
                        <router-link to="/customerlist" class="list-link" :class="{ link_active: iscustomerCrudActive }">
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
                                <p class="link-title">Customer</p>
                            </div>
                        </router-link>
                    </li>

                    <!-- <li class="list-items">
                        <router-link to="/project-list" class="list-link" :class="{ link_active: isprojectCrudActive }">
                            <div class="link-items">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none">
                                    <path d="M2.25 9H21.75L12 3L2.25 9Z" stroke="#6B7280" stroke-width="1.5"
                                        stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M5.25 9V16.5" stroke="#6B7280" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path d="M9.75 9V16.5" stroke="#6B7280" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path d="M14.25 9V16.5" stroke="#6B7280" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path d="M18.75 9V16.5" stroke="#6B7280" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path d="M3 16.5H21" stroke="#6B7280" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path d="M1.5 19.5H22.5" stroke="#6B7280" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                </svg>
                                <p class="link-title">Project</p>
                            </div>
                        </router-link>
                    </li> -->

                    <li class="list-items">
                        <router-link to="/inventory-list" class="list-link" :class="{ link_active: isInventoryCrudActive }">
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
                                <p class="link-title">Inventory List</p>
                            </div>
                        </router-link>
                    </li>

                    <li class="list-items">
                        <router-link to="/reminder-list" class="list-link" :class="{ link_active: isReminderCrudActive }">
                            <div class="link-items">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none">
                                    <path
                                        d="M19.5 3.75H4.5C4.08579 3.75 3.75 4.08579 3.75 4.5V19.5C3.75 19.9142 4.08579 20.25 4.5 20.25H19.5C19.9142 20.25 20.25 19.9142 20.25 19.5V4.5C20.25 4.08579 19.9142 3.75 19.5 3.75Z"
                                        stroke="#6B7280" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path d="M16.5 2.25V5.25" stroke="#6B7280" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path d="M7.5 2.25V5.25" stroke="#6B7280" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path d="M3.75 8.25H20.25" stroke="#6B7280" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path
                                        d="M8.625 12H11.25L9.75 13.875C9.99686 13.8746 10.24 13.9351 10.4579 14.0512C10.6757 14.1672 10.8616 14.3353 10.999 14.5404C11.1363 14.7455 11.2209 14.9814 11.2453 15.2271C11.2696 15.4727 11.2329 15.7206 11.1385 15.9487C11.0441 16.1768 10.8949 16.378 10.704 16.5346C10.5132 16.6912 10.2866 16.7983 10.0445 16.8463C9.80236 16.8944 9.5521 16.8819 9.31593 16.81C9.07976 16.7382 8.86497 16.6091 8.69062 16.4344"
                                        stroke="#6B7280" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path d="M13.5 13.125L15 12V16.875" stroke="#6B7280" stroke-width="1.5"
                                        stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                                <p class="link-title">Follow Up List</p>
                            </div>
                        </router-link>
                    </li>

                    <!-- <li class="list-items">
                        <router-link to="/operation-list" class="list-link" :class="{ link_active: isOperationCrudActive }">
                            <div class="link-items">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none">
                                    <path
                                        d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
                                        stroke="#6B7280" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path
                                        d="M12 15.75C14.0711 15.75 15.75 14.0711 15.75 12C15.75 9.92893 14.0711 8.25 12 8.25C9.92893 8.25 8.25 9.92893 8.25 12C8.25 14.0711 9.92893 15.75 12 15.75Z"
                                        stroke="#6B7280" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path d="M9.34678 9.34531L5.63428 5.63281" stroke="#6B7280" stroke-width="1.5"
                                        stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M14.6533 9.34531L18.3658 5.63281" stroke="#6B7280" stroke-width="1.5"
                                        stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M14.6533 14.6523L18.3658 18.3648" stroke="#6B7280" stroke-width="1.5"
                                        stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M9.34678 14.6523L5.63428 18.3648" stroke="#6B7280" stroke-width="1.5"
                                        stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                                <p class="link-title">Operation List</p>
                            </div>
                        </router-link>
                    </li> -->


                    <!-- <li class="list-items">
                        <router-link to="/amenities-list" class="list-link" :class="{ link_active: isAmenitiesCrudActive }">
                            <div class="link-items">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none">
                                    <path d="M7.5 12.75H16.5" stroke="#6B7280" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path
                                        d="M4.5 9V6.75C4.5 5.95435 4.81607 5.19129 5.37868 4.62868C5.94129 4.06607 6.70435 3.75 7.5 3.75H16.5C17.2956 3.75 18.0587 4.06607 18.6213 4.62868C19.1839 5.19129 19.5 5.95435 19.5 6.75V9"
                                        stroke="#6B7280" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path
                                        d="M7.5 15.75V12C7.5 11.4067 7.32405 10.8266 6.99441 10.3333C6.66477 9.83994 6.19623 9.45543 5.64805 9.22836C5.09987 9.0013 4.49667 8.94189 3.91473 9.05765C3.33279 9.1734 2.79824 9.45912 2.37868 9.87868C1.95912 10.2982 1.6734 10.8328 1.55765 11.4147C1.44189 11.9967 1.5013 12.5999 1.72836 13.1481C1.95543 13.6962 2.33994 14.1648 2.83329 14.4944C3.32664 14.8241 3.90666 15 4.5 15V18.75C4.5 18.9489 4.57902 19.1397 4.71967 19.2803C4.86032 19.421 5.05109 19.5 5.25 19.5H18.75C18.9489 19.5 19.1397 19.421 19.2803 19.2803C19.421 19.1397 19.5 18.9489 19.5 18.75V15C20.0933 15 20.6734 14.8241 21.1667 14.4944C21.6601 14.1648 22.0446 13.6962 22.2716 13.1481C22.4987 12.5999 22.5581 11.9967 22.4424 11.4147C22.3266 10.8328 22.0409 10.2982 21.6213 9.87868C21.2018 9.45912 20.6672 9.1734 20.0853 9.05765C19.5033 8.94189 18.9001 9.0013 18.352 9.22836C17.8038 9.45543 17.3352 9.83994 17.0056 10.3333C16.6759 10.8266 16.5 11.4067 16.5 12V15.75"
                                        stroke="#6B7280" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                </svg>
                                <p class="link-title">Amenities List</p>
                            </div>
                        </router-link>
                    </li> -->

                </ul>

            </div>


        </div>


    </aside>


    <aside class="mini-main-sidebar" :class="{ 'mini-main-sidebar-deactive': mainSidebarActive === true }">

        <div class="sidebar-content">

            <div class="w-[25px]">
                <router-link to="/home">
                    <img src="/icon.svg">
                </router-link>
            </div>

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

                    <li class="list-items">
                        <router-link to="/customerlist" class="list-link" :class="{ link_active: iscustomerCrudActive }">
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
                    </li>

                    <!-- <li class="list-items">
                        <router-link to="/project-list" class="list-link" :class="{ link_active: isprojectCrudActive }">
                            <div class="link-items">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none">
                                    <path d="M2.25 9H21.75L12 3L2.25 9Z" stroke="#6B7280" stroke-width="1.5"
                                        stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M5.25 9V16.5" stroke="#6B7280" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path d="M9.75 9V16.5" stroke="#6B7280" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path d="M14.25 9V16.5" stroke="#6B7280" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path d="M18.75 9V16.5" stroke="#6B7280" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path d="M3 16.5H21" stroke="#6B7280" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path d="M1.5 19.5H22.5" stroke="#6B7280" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                </svg>
                            </div>
                        </router-link>
                    </li> -->

                    <li class="list-items">
                        <router-link to="/inventory-list" class="list-link" :class="{ link_active: isInventoryCrudActive }">
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
                    </li>

                    <li class="list-items">
                        <router-link to="/reminder-list" class="list-link" :class="{ link_active: isReminderCrudActive }">
                            <div class="link-items">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none">
                                    <path
                                        d="M19.5 3.75H4.5C4.08579 3.75 3.75 4.08579 3.75 4.5V19.5C3.75 19.9142 4.08579 20.25 4.5 20.25H19.5C19.9142 20.25 20.25 19.9142 20.25 19.5V4.5C20.25 4.08579 19.9142 3.75 19.5 3.75Z"
                                        stroke="#6B7280" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path d="M16.5 2.25V5.25" stroke="#6B7280" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path d="M7.5 2.25V5.25" stroke="#6B7280" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path d="M3.75 8.25H20.25" stroke="#6B7280" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path
                                        d="M8.625 12H11.25L9.75 13.875C9.99686 13.8746 10.24 13.9351 10.4579 14.0512C10.6757 14.1672 10.8616 14.3353 10.999 14.5404C11.1363 14.7455 11.2209 14.9814 11.2453 15.2271C11.2696 15.4727 11.2329 15.7206 11.1385 15.9487C11.0441 16.1768 10.8949 16.378 10.704 16.5346C10.5132 16.6912 10.2866 16.7983 10.0445 16.8463C9.80236 16.8944 9.5521 16.8819 9.31593 16.81C9.07976 16.7382 8.86497 16.6091 8.69062 16.4344"
                                        stroke="#6B7280" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path d="M13.5 13.125L15 12V16.875" stroke="#6B7280" stroke-width="1.5"
                                        stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </div>
                        </router-link>
                    </li>

                    <!-- <li class="list-items">
                        <router-link to="/operation-list" class="list-link" :class="{ link_active: isOperationCrudActive }">
                            <div class="link-items">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none">
                                    <path
                                        d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
                                        stroke="#6B7280" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path
                                        d="M12 15.75C14.0711 15.75 15.75 14.0711 15.75 12C15.75 9.92893 14.0711 8.25 12 8.25C9.92893 8.25 8.25 9.92893 8.25 12C8.25 14.0711 9.92893 15.75 12 15.75Z"
                                        stroke="#6B7280" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path d="M9.34678 9.34531L5.63428 5.63281" stroke="#6B7280" stroke-width="1.5"
                                        stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M14.6533 9.34531L18.3658 5.63281" stroke="#6B7280" stroke-width="1.5"
                                        stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M14.6533 14.6523L18.3658 18.3648" stroke="#6B7280" stroke-width="1.5"
                                        stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M9.34678 14.6523L5.63428 18.3648" stroke="#6B7280" stroke-width="1.5"
                                        stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </div>
                        </router-link>
                    </li> -->

                    <!-- <li class="list-items">
                        <router-link to="/amenities-list" class="list-link" :class="{ link_active: isAmenitiesCrudActive }">
                            <div class="link-items">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none">
                                    <path d="M7.5 12.75H16.5" stroke="#6B7280" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path
                                        d="M4.5 9V6.75C4.5 5.95435 4.81607 5.19129 5.37868 4.62868C5.94129 4.06607 6.70435 3.75 7.5 3.75H16.5C17.2956 3.75 18.0587 4.06607 18.6213 4.62868C19.1839 5.19129 19.5 5.95435 19.5 6.75V9"
                                        stroke="#6B7280" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path
                                        d="M7.5 15.75V12C7.5 11.4067 7.32405 10.8266 6.99441 10.3333C6.66477 9.83994 6.19623 9.45543 5.64805 9.22836C5.09987 9.0013 4.49667 8.94189 3.91473 9.05765C3.33279 9.1734 2.79824 9.45912 2.37868 9.87868C1.95912 10.2982 1.6734 10.8328 1.55765 11.4147C1.44189 11.9967 1.5013 12.5999 1.72836 13.1481C1.95543 13.6962 2.33994 14.1648 2.83329 14.4944C3.32664 14.8241 3.90666 15 4.5 15V18.75C4.5 18.9489 4.57902 19.1397 4.71967 19.2803C4.86032 19.421 5.05109 19.5 5.25 19.5H18.75C18.9489 19.5 19.1397 19.421 19.2803 19.2803C19.421 19.1397 19.5 18.9489 19.5 18.75V15C20.0933 15 20.6734 14.8241 21.1667 14.4944C21.6601 14.1648 22.0446 13.6962 22.2716 13.1481C22.4987 12.5999 22.5581 11.9967 22.4424 11.4147C22.3266 10.8328 22.0409 10.2982 21.6213 9.87868C21.2018 9.45912 20.6672 9.1734 20.0853 9.05765C19.5033 8.94189 18.9001 9.0013 18.352 9.22836C17.8038 9.45543 17.3352 9.83994 17.0056 10.3333C16.6759 10.8266 16.5 11.4067 16.5 12V15.75"
                                        stroke="#6B7280" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                </svg>
                            </div>
                        </router-link>
                    </li> -->

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