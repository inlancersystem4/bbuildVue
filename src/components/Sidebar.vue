<script>

export default {
    computed: {
        ishomeCrudActive() {
            return this.$route.matched.some(route => route.path === '/');
        },
        isprojectCrudActive() {
            return this.$route.matched.some(route => route.name === 'Project');
        },
        iscustomerCrudActive() {
            return this.$route.matched.some(route => route.name === 'CustomerList');
        },
        // isUserCrudActive() {
        //     return this.$route.matched.some(route => route.path === '/userlist' || route.path === '/add-user' || route.name === 'EditUser' || route.path === '/roles' || route.path === '/add-role' || route.name === 'EditRole');
        // },
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

                <div class="w-[150px]">
                    <router-link to="/"> 
                        <img src="../../billionbuild.svg">
                    </router-link>
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
                        <router-link to="/inventory-list" class="list-link" active-class="link_active">
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
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                  <path d="M2.5 16.1319C2.5 13.7414 3.84325 11.8032 5.5 11.8032H8.5C10.1567 11.8032 11.5 13.7414 11.5 16.1319" stroke="#6B7280" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                  <path d="M8.85616 4.63701C9.88129 5.66214 9.88129 7.32419 8.85616 8.34932C7.83103 9.37445 6.16898 9.37445 5.14385 8.34932C4.11872 7.32419 4.11872 5.66214 5.14385 4.63701C6.16898 3.61188 7.83103 3.61188 8.85616 4.63701" stroke="#6B7280" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                  <path d="M13 11.1074H15.25C16.4927 11.1074 17.5 12.4779 17.5 14.1689" stroke="#6B7280" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                  <path d="M15.4508 5.16734C16.1831 5.89957 16.1831 7.08675 15.4508 7.81899C14.7186 8.55122 13.5314 8.55122 12.7992 7.81899C12.0669 7.08675 12.0669 5.89957 12.7992 5.16734C13.5314 4.43511 14.7186 4.43511 15.4508 5.16734" stroke="#6B7280" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                <p class="link-title">Customers</p>
                            </div>
                        </router-link>
                    </li>

                    <li class="list-items">
                        <router-link to="/project/0" class="list-link" :class="{ link_active: isprojectCrudActive }">
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
                                <p class="link-title">Projects</p>
                            </div>
                        </router-link>
                    </li>
 

                   
                </ul>

            </div>


        </div>


    </aside>


    <aside class="mini-main-sidebar" :class="{ 'mini-main-sidebar-deactive': mainSidebarActive === true }">

        <div class="sidebar-content">
            <div class="w-[25px]">
                <router-link to="/"> 
                    <img src="../../icon.svg">
                </router-link>
            </div>

            <div class="openmainSidebar" @click="toggleSidebar">
                <img src="../assets/img/icons/chevron-right.svg" />
            </div>

            <div class="sidebar-main-content">


                <ul class="main-pages-list">

                    <li class="list-items">
                        <router-link to="/inventory-list" class="list-link" active-class="link_active">
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
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                  <path d="M2.5 16.1319C2.5 13.7414 3.84325 11.8032 5.5 11.8032H8.5C10.1567 11.8032 11.5 13.7414 11.5 16.1319" stroke="#6B7280" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                  <path d="M8.85616 4.63701C9.88129 5.66214 9.88129 7.32419 8.85616 8.34932C7.83103 9.37445 6.16898 9.37445 5.14385 8.34932C4.11872 7.32419 4.11872 5.66214 5.14385 4.63701C6.16898 3.61188 7.83103 3.61188 8.85616 4.63701" stroke="#6B7280" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                  <path d="M13 11.1074H15.25C16.4927 11.1074 17.5 12.4779 17.5 14.1689" stroke="#6B7280" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                  <path d="M15.4508 5.16734C16.1831 5.89957 16.1831 7.08675 15.4508 7.81899C14.7186 8.55122 13.5314 8.55122 12.7992 7.81899C12.0669 7.08675 12.0669 5.89957 12.7992 5.16734C13.5314 4.43511 14.7186 4.43511 15.4508 5.16734" stroke="#6B7280" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </div>
                        </router-link>
                    </li>

                    <li class="list-items">
                        <router-link to="/project/0" class="list-link" :class="{ link_active: isprojectCrudActive }">
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