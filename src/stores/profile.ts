import { defineStore } from 'pinia';
import { fetchWrapper } from '@/helpers';
import router from '@/router';
import { useAlertStore } from '@/stores';
import { notify } from "notiwind"

const baseUrl = `${import.meta.env.VITE_API_URL}`;

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        user: JSON.parse(localStorage.getItem('user')),
        returnUrl: null
    }),
    actions: {
        async Updated() {

            var profile = new FormData();
            profile.append("user_first_name", this.profileFirstName)
            profile.append("user_last_name", this.profileLastName)
            profile.append("user_email", this.profileEmail)
            if (this.selectedImg) {
                profile.append("user_profile", this.profilePic)
            }
            profile.append("user_profile", "")
            profile.append("mobile_no", this.profileNo)
            profile.append("company_name", this.companyName)
            profile.append("company_address", this.companyAddress)
            profile.append("company_phone_no", this.companyPhoneNo)

            try {
                const data = await fetchWrapper.post(`${baseUrl}/update-profile`, profile);

            } catch (error) {
                const alertStore = useAlertStore()
                alertStore.error(error)
            }

        },
    }
});
