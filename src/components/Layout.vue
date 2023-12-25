<script>
import Sidebar from './Sidebar.vue';
import Header from './Header.vue';
import OverLaye from '../subcomponents/common/OverLaye.vue';

export default {
    components: {
        Sidebar,
        Header,
        OverLaye,
    },
    data() {
        return {
            miniSidebarActive: false,
            loading: false,
            responsiveSidebarActive: false,
            overLaye: false
        }
    },
    created() {
        this.$router.beforeEach((to, from, next) => {
            this.loading = true;
            next();
        });

        this.$router.afterEach(() => {
            this.loading = false;
        });

        // this.$notify({
        //     group: "foo",
        //     title: "Success",
        //     text: "welcome"
        // }, 2000)
    },
    methods: {
        checkUser() {
            const User = localStorage.getItem('user')

            if (!User) {
                this.$router.push({ name: 'Login' });
            }

        },
        responsiveMenu() {
            this.responsiveSidebarActive = true
            this.overLaye = true
        },
        closeResponsiveMenu() {
            this.responsiveSidebarActive = false
            this.overLaye = false
        },
        overLayeClick() {
            this.responsiveSidebarActive = false
            this.overLaye = false
        }
    },
}
</script>


<template>
    <div v-if="loading" class="loader">
        <img src="../assets/img/loader2.gif">
    </div>

    <main class="main-layout">
        <Sidebar :responsiveSidebarActive="responsiveSidebarActive" @closeResponsiveMenu="closeResponsiveMenu" />
        <section class="main-content">
            <Header @responsiveMenu="responsiveMenu" />
            <section class="main-content-body">
                <div class="content-section">
                    <slot></slot>
                </div>
            </section>
        </section>
    </main>

    <OverLaye v-if="overLaye" @click="overLayeClick" />
</template>

<style scoped>
.loader {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100dvh;
    background-color: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(14px);
    position: fixed;
    inset: 0;
    z-index: 999;
}
</style>
