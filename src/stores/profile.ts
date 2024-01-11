import { defineStore } from 'pinia';
import { fetchWrapper } from '@/helpers';
import router from '@/router';
import { useAlertStore } from '@/stores';
import { notify } from "notiwind"

const baseUrl = `${import.meta.env.VITE_API_URL}`;

export const useProfileStore = defineStore({
    id: 'profile',
    state: () => ({
        profile: JSON.parse(localStorage.getItem('user_details')),
        returnUrl: null
    }),
    actions: {
        async Updated(profileFirstName, profileLastName, profileEmail, profilePic, profileNo, companyName, companyAddress, companyPhoneNo) {
            var profile = new FormData();
            profile.append("user_first_name", profileFirstName)
            profile.append("user_last_name", profileLastName)
            profile.append("user_email", profileEmail)
            if (profilePic) {
                profile.append("user_profile", profilePic)
            }
            profile.append("user_profile", "")
            profile.append("mobile_no", profileNo)
            profile.append("company_name", companyName)
            profile.append("company_address", companyAddress)
            profile.append("company_phone_no", companyPhoneNo)

            try {
                const data = await fetchWrapper.post(`${baseUrl}/update-profile`, profile);


                if (data.success === 1) {
                    const alertStore = useAlertStore();
                    alertStore.success(data.message);
                }
                else {
                    const alertStore = useAlertStore();
                    alertStore.error(data.message);
                }


            } catch (error) {
                const alertStore = useAlertStore()
                alertStore.error(error)
            }

        },
    }
});
