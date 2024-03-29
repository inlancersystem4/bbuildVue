import { defineStore } from 'pinia'
import { fetchWrapper } from '@/helpers'
import router from '@/router'
import { useAlertStore, useProfileStore } from '@/stores'

const baseUrl = `${import.meta.env.VITE_API_URL}`

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')),
    returnUrl: null
  }),
  actions: {
    async login(number, otp) {
      var form_data = new FormData()
      form_data.append('user_mobile', number)
      form_data.append('user_otp', otp)

      try {
        const user = await fetchWrapper.post(`${baseUrl}/login`, form_data)

        if (user.success === 1) {
          var new_user = {
            token: user.data.session_token
          }

          this.user = new_user

          const user_data = user.data.user_details

          const alertStore = useAlertStore()
          alertStore.success(user.message)

          localStorage.setItem('user', JSON.stringify(new_user))
          localStorage.setItem('user_details', JSON.stringify(user_data))

          const profileStore = useProfileStore()
          profileStore.updateProfilePicUrl(user_data.user_profile_pic)

          const projectId = 0

          if (user.data.project_complete === 0) {
            router.push({ name: 'Project', params: { projectId } })
          } else {
            router.push({ name: 'home' })
          }
        } else {
          const alertStore = useAlertStore()
          alertStore.error(user.message)
        }
      } catch (error) {
        const alertStore = useAlertStore()
        alertStore.error(error)
      }
    },
    async logout() {
      this.user = null
      useProfileStore().updateProfilePicUrl(null)
      localStorage.removeItem('user')
      localStorage.removeItem('user_details')
      router.push('Login')
    },
    chnageTitle(title, description) {
      document.title = title
      const metaTag = document.createElement('meta')
      metaTag.setAttribute('name', 'description')
      metaTag.setAttribute('content', description)
      const ifdescription = document.querySelector('meta[name="description"]')

      if (ifdescription) {
        ifdescription.parentNode.replaceChild(metaTag, ifdescription)
      } else {
        document.head.appendChild(metaTag)
      }
    },
    async mailcheck(email) {
      var form_data = new FormData()
      form_data.append('email', email)
      try {
        const e_data = await fetchWrapper.post(`${baseUrl}/checkuser`, form_data)
        // update pinia state
        this.email = e_data
        // store user details and jwt in local storage to keep user logged in between page refreshes
        localStorage.setItem('email', JSON.stringify(this.email))

        // redirect to previous url or default to home page
        router.push(this.returnUrl || '/account/password')
      } catch (error) {
        const alertStore = useAlertStore()
        alertStore.error(error)
      }
    }
  }
})
