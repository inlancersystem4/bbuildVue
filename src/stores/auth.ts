import { defineStore } from 'pinia';
import { fetchWrapper } from '@/helpers';
import router from '@/router';
import { useAlertStore } from '@/stores';
import { notify } from "notiwind"

const baseUrl = `${import.meta.env.VITE_API_URL}`;

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        // initialize state from local storage to enable user to stay logged in
        user: JSON.parse(localStorage.getItem('user')),
        returnUrl: null
    }),
    actions: {
        async login(number, otp) {
            var form_data = new FormData();
            form_data.append('user_mobile', number);
            form_data.append('user_otp', otp);
            try {
                const user = await fetchWrapper.post(`${baseUrl}/login`, form_data);

                var new_user = {
                    token: user.data.session_token
                }

                this.user = new_user;

                localStorage.setItem('user', JSON.stringify(new_user));

                // const alertStore = useAlertStore();
                // alertStore.success('Login successfully !!');

                if (user.success === 1) {
                    notify({
                        group: "foo",
                        title: "Success",
                        text: user.message
                    }, 2000)
                }
                else {
                    notify({
                        group: "error",
                        title: "Error",
                        text: user.message
                    }, 2000)
                }

                const projectId = 0

                if (user.data.project_complete === 0) {
                    router.push({ name: 'Project', params: { projectId } });
                }
                else {
                    router.push(this.returnUrl || { name: 'home' });
                }

            } catch (error) {
                const alertStore = useAlertStore();
                alertStore.error(error);
            }
        },
        async logout() {
            this.user = null;
            localStorage.removeItem('user');
            router.push('home');
        },
        async mailcheck(email) {
            var form_data = new FormData();
            form_data.append('email', email);
            try {
                const e_data = await fetchWrapper.post(`${baseUrl}/checkuser`, form_data);
                // update pinia state
                this.email = e_data;
                // store user details and jwt in local storage to keep user logged in between page refreshes
                localStorage.setItem('email', JSON.stringify(this.email));

                // redirect to previous url or default to home page
                router.push(this.returnUrl || '/account/password');
            } catch (error) {
                const alertStore = useAlertStore();
                alertStore.error(error);
            }
        },
    }
});
