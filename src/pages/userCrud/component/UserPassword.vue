<script>
import { useAuthStore, useAlertStore } from '../../../stores'
import { fetchWrapper } from '../../../helpers/fetch-wrapper'

import ErrorMessage from '../../../subcomponents/common/ErrorMessage.vue';


const baseUrl = `${import.meta.env.VITE_API_URL}`;


export default {
    components: { ErrorMessage },
    data() {
        return {
            typePassword: true,
            typePassword2: true,
            typePassword3: true,
            passwordNotMatch: false,
            profilePass: "",
            profileCoPass: "",
            passwordError: "",
            passwordErrorShow: false,
            userId: "",
        }
    },
    created() {
        this.userId = this.$route.params.id;
    },
    computed: {
        passwordBtnDis() {
            return this.passwordNotMatch;
        }
    },
    methods: {
        checkPasswords() {
            if (this.profilePass && this.profileCoPass && this.profilePass === this.profileCoPass) {

                this.passwordNotMatch = false

            } else {

                this.passwordNotMatch = true

            }
        },
        async passwordUpdate() {
            var profile = new FormData();
            profile.append("user_id", this.userId)
            profile.append("old_password", this.profileOldPass)
            profile.append("new_password", this.profilePass)
            profile.append("confirm_password", this.profileCoPass)

            try {
                const data = await fetchWrapper.post(`${baseUrl}/user-change-password`, profile);

                if (data.success === 1) {
                    this.$router.push({ name: 'UserList' })
                }
                if (data.success === 0) {
                    this.passwordErrorShow = true
                    this.passwordError = data.message
                }

            } catch (error) {
                console.log(error);
            }

        },
    }
}
</script>


<template>
    <div class="profile-card p-0">


        <div class="heading padding-18px">

            <h2 class=" text-capitalize text-xl_semibold">Chnage Password</h2>

        </div>

        <div class="padding-18px space-y-32px">


            <div class="space-y-16px">

                <div class="space-y-8px">
                    <Label label="Old Password" />
                    <div class="search-wrraper w-100 border-Grey_20">
                        <input class="w-100" :type="typePassword3 ? 'password' : 'text'" placeholder="Enter old Password"
                            id="Old Password" @input="event => profileOldPass = event.target.value"
                            v-model="profileOldPass">
                        <div class="icon togglePassword">
                            <span v-if="typePassword3" @click="typePassword3 = false">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none">
                                    <path
                                        d="M12 4.25C4.5 4.25 1.5 12 1.5 12C1.5 12 4.5 19.75 12 19.75C19.5 19.75 22.5 12 22.5 12C22.5 12 19.5 4.25 12 4.25Z"
                                        stroke="#191C1F" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path
                                        d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                                        stroke="#191C1F" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                </svg>
                            </span>
                            <span v-if="!typePassword3" @click="typePassword3 = true">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none">
                                    <path d="M4.5 3.75L19.5 20.25" stroke="#191C1F" stroke-width="1.5"
                                        stroke-linecap="round" stroke-linejoin="round" />
                                    <path
                                        d="M14.522 14.7766C13.8338 15.407 12.9334 15.7551 12.0001 15.7516C11.2432 15.7515 10.5041 15.5224 9.87984 15.0944C9.25561 14.6663 8.77551 14.0594 8.50265 13.3535C8.22979 12.6475 8.17695 11.8754 8.35107 11.1389C8.52519 10.4023 8.91812 9.73564 9.47821 9.22656"
                                        stroke="#191C1F" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path
                                        d="M6.9375 6.42969C3.1125 8.36094 1.5 11.9984 1.5 11.9984C1.5 11.9984 4.5 18.7484 12 18.7484C13.7574 18.7628 15.4929 18.3578 17.0625 17.5672"
                                        stroke="#191C1F" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path
                                        d="M19.5564 15.8531C21.6002 14.025 22.5002 12 22.5002 12C22.5002 12 19.5002 5.25002 12.0002 5.25002C11.35 5.24874 10.7008 5.30205 10.0596 5.4094"
                                        stroke="#191C1F" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path
                                        d="M12.7031 8.31641C13.5006 8.46751 14.2273 8.8739 14.7735 9.47426C15.3198 10.0746 15.6559 10.8364 15.7313 11.6445"
                                        stroke="#191C1F" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                </svg>
                            </span>
                        </div>
                    </div>
                    <ErrorMessage :msg="this.passwordError" v-if="this.passwordErrorShow" />
                </div>

                <div class="space-y-8px">
                    <Label label="New Password" />
                    <div class="search-wrraper w-100 border-Grey_20" :class="{ 'input_error': passwordNotMatch }">
                        <input class="w-100" :type="typePassword ? 'password' : 'text'" placeholder="Enter new Password"
                            id="New Password" @input="event => { profilePass = event.target.value; checkPasswords(); }"
                            v-model="profilePass">
                        <div class="icon togglePassword">
                            <span v-if="typePassword" @click="typePassword = false">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none">
                                    <path
                                        d="M12 4.25C4.5 4.25 1.5 12 1.5 12C1.5 12 4.5 19.75 12 19.75C19.5 19.75 22.5 12 22.5 12C22.5 12 19.5 4.25 12 4.25Z"
                                        stroke="#191C1F" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path
                                        d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                                        stroke="#191C1F" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                </svg>
                            </span>
                            <span v-if="!typePassword" @click="typePassword = true">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none">
                                    <path d="M4.5 3.75L19.5 20.25" stroke="#191C1F" stroke-width="1.5"
                                        stroke-linecap="round" stroke-linejoin="round" />
                                    <path
                                        d="M14.522 14.7766C13.8338 15.407 12.9334 15.7551 12.0001 15.7516C11.2432 15.7515 10.5041 15.5224 9.87984 15.0944C9.25561 14.6663 8.77551 14.0594 8.50265 13.3535C8.22979 12.6475 8.17695 11.8754 8.35107 11.1389C8.52519 10.4023 8.91812 9.73564 9.47821 9.22656"
                                        stroke="#191C1F" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path
                                        d="M6.9375 6.42969C3.1125 8.36094 1.5 11.9984 1.5 11.9984C1.5 11.9984 4.5 18.7484 12 18.7484C13.7574 18.7628 15.4929 18.3578 17.0625 17.5672"
                                        stroke="#191C1F" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path
                                        d="M19.5564 15.8531C21.6002 14.025 22.5002 12 22.5002 12C22.5002 12 19.5002 5.25002 12.0002 5.25002C11.35 5.24874 10.7008 5.30205 10.0596 5.4094"
                                        stroke="#191C1F" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path
                                        d="M12.7031 8.31641C13.5006 8.46751 14.2273 8.8739 14.7735 9.47426C15.3198 10.0746 15.6559 10.8364 15.7313 11.6445"
                                        stroke="#191C1F" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                </svg>
                            </span>
                        </div>
                    </div>
                    <ErrorMessage msg="Password is not match" v-if="this.passwordNotMatch" />
                </div>

                <div class="space-y-8px">
                    <Label label="Confirm Password" />
                    <div class="search-wrraper w-100 border-Grey_20" :class="{ 'input_error': passwordNotMatch }">
                        <input class="w-100" :type="typePassword2 ? 'password' : 'text'"
                            placeholder="Enter confirm Password" id="Confirm Password"
                            @input="event => { profileCoPass = event.target.value; checkPasswords(); }"
                            v-model="profileCoPass">
                        <div class="icon togglePassword">
                            <span v-if="typePassword2" @click="typePassword2 = false">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none">
                                    <path
                                        d="M12 4.25C4.5 4.25 1.5 12 1.5 12C1.5 12 4.5 19.75 12 19.75C19.5 19.75 22.5 12 22.5 12C22.5 12 19.5 4.25 12 4.25Z"
                                        stroke="#191C1F" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path
                                        d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                                        stroke="#191C1F" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                </svg>
                            </span>
                            <span v-if="!typePassword2" @click="typePassword2 = true">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none">
                                    <path d="M4.5 3.75L19.5 20.25" stroke="#191C1F" stroke-width="1.5"
                                        stroke-linecap="round" stroke-linejoin="round" />
                                    <path
                                        d="M14.522 14.7766C13.8338 15.407 12.9334 15.7551 12.0001 15.7516C11.2432 15.7515 10.5041 15.5224 9.87984 15.0944C9.25561 14.6663 8.77551 14.0594 8.50265 13.3535C8.22979 12.6475 8.17695 11.8754 8.35107 11.1389C8.52519 10.4023 8.91812 9.73564 9.47821 9.22656"
                                        stroke="#191C1F" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path
                                        d="M6.9375 6.42969C3.1125 8.36094 1.5 11.9984 1.5 11.9984C1.5 11.9984 4.5 18.7484 12 18.7484C13.7574 18.7628 15.4929 18.3578 17.0625 17.5672"
                                        stroke="#191C1F" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path
                                        d="M19.5564 15.8531C21.6002 14.025 22.5002 12 22.5002 12C22.5002 12 19.5002 5.25002 12.0002 5.25002C11.35 5.24874 10.7008 5.30205 10.0596 5.4094"
                                        stroke="#191C1F" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path
                                        d="M12.7031 8.31641C13.5006 8.46751 14.2273 8.8739 14.7735 9.47426C15.3198 10.0746 15.6559 10.8364 15.7313 11.6445"
                                        stroke="#191C1F" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                </svg>
                            </span>
                        </div>
                    </div>
                    <ErrorMessage msg="Password is not match" v-if="this.passwordNotMatch" />
                </div>

            </div>

        </div>

        <div class="padding-18px border-t border-solid border-Grey_20">

            <div class="w-100 display-flex align-center justify-end gap-12px">


                <button class="btn-regular" :disabled="passwordBtnDis" @click="passwordUpdate">Save</button>

            </div>

        </div>

    </div>
</template>


<style scoped>
.profile-card {
    background-color: white;
    border: 1px solid var(--Grey-20);
    padding: 18px;
    border-radius: 8px;
    max-width: 490px;
    width: 98%;
    margin-right: auto;
    margin-left: auto;
}

.btn-danger:hover {
    background-color: transparent;
    color: var(--Grey-90);
}

.heading {
    border-bottom: 1px solid var(--Grey-20);
    padding-bottom: 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
}

.search-wrraper input {
    font-size: 14px;
    line-height: 24px;
    color: var(--Grey-90);
    font-family: 'Quicksand', sans-serif;
}

.search-wrraper span {
    height: 100%;
    min-width: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}

.search-wrraper span svg {
    width: 20px;
    height: 20px;
}
</style>