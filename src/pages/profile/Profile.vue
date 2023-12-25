<script>
import Layout from '../../components/Layout.vue';
import { useAuthStore, useAlertStore } from '../../stores'
import { fetchWrapper } from '../../helpers/fetch-wrapper'
import Label from '../../subcomponents/common/Label.vue';
import Input from '../../subcomponents/common/Input.vue';
import ErrorMessage from '../../subcomponents/common/ErrorMessage.vue';
import { useAuthStore, useAlertStore } from '../../stores'

const baseUrl = `${import.meta.env.VITE_API_URL}`;

export default {
    components: { Layout, Label, Input, ErrorMessage },
    data() {
        return {
            profileData: "",
            profileName: "",
            profileEmail: "",
            profileNo: "",
            formSubmitted: true,
            isvalidEmail: true,
            editProfile: false,
            profileDetails: true,
            chnagePassword: false,
            profilePic: "",
            selectedImg: "",
            profileOldPass: "",
            typePassword: true,
            typePassword2: true,
            typePassword3: true,
            passwordNotMatch: false,
            profilePass: "",
            profileCoPass: "",
            passwordError: "",
            passwordErrorShow: false
        }
    },
    computed: {
        profileBtnDis() {
            return !this.profileName.trim() || !this.profileEmail.trim() || this.profileNo.trim().length !== 10 || !this.isvalidEmail
        },
        passwordBtnDis() {
            return this.passwordNotMatch;
        }
    },
    created() {
        // this.getprofileData();
    },
    methods: {
        validateEmail() {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(this.profileEmail);
        },
        checkPasswords() {
            if (this.profilePass && this.profileCoPass && this.profilePass === this.profileCoPass) {

                this.passwordNotMatch = false

            } else {

                this.passwordNotMatch = true

            }
        },
        async getprofileData() {
            var profile = new FormData();

            try {
                const response = await fetchWrapper.post(`${baseUrl}/user-profile`, profile);

                this.profileData = response.data

                this.profileName = response.data.user_name
                this.profilepic = response.data.profile_pic
                this.profileEmail = response.data.user_email
                this.profileNo = response.data.user_phone_number

                localStorage.setItem('profilePic', response.data.profile_pic);

            } catch (error) {
                const alertStore = useAlertStore()
                alertStore.error(error)
            }
        },
        selectedPic(event) {
            const selectedFile = event.target.files[0]

            if (selectedFile.type === "image/png" || selectedFile.type === "image/jpeg" || selectedFile.type === "image/gif" || selectedFile.type === "image/svg" || selectedFile.type === "image/jpg") {

                this.profilePic = selectedFile

                this.selectedImg = URL.createObjectURL(selectedFile)

            }

        },
        async profileDataUpdate() {
            var profile = new FormData();
            profile.append("user_profile_pic", this.profilePic)
            profile.append("user_name", this.profileName)
            profile.append("user_email", this.profileEmail)
            profile.append("user_phone_number", this.profileNo)

            try {
                const data = await fetchWrapper.post(`${baseUrl}/profile`, profile);

                if (data.success === 1) {
                    this.editProfile = false;
                    this.profileDetails = true
                    this.getprofileData();
                }

            } catch (error) {
                const alertStore = useAlertStore()
                alertStore.error(error)
            }

        },
        async passwordUpdate() {
            var profile = new FormData();
            profile.append("old_password", this.profileOldPass)
            profile.append("new_password", this.profilePass)
            profile.append("confirm_password", this.profileCoPass)

            try {
                const data = await fetchWrapper.post(`${baseUrl}/change-password`, profile);

                if (data.success === 1) {
                    this.chnagePassword = false;
                    this.profileDetails = true
                    this.getprofileData();
                }
                if (data.success === 0) {
                    this.passwordErrorShow = true
                    this.passwordError = data.message
                }

            } catch (error) {
                const alertStore = useAlertStore()
                alertStore.error(error)
            }

        },
    },
}
</script>

<template>
    <Layout>

        <div class="profile-card" v-if="profileDetails">


            <div class="heading padding-x_12px">

                <h2 class=" text-capitalize  text-xl_semibold">My profile</h2>

                <div class="dropdown">
                    <div class="icon-btn icon-btn_32px  custom-dropdown">
                        <img src="../../assets/img/icons/dots-icon.svg">
                        <ul class="custom-dropdown-list leftside icon-dropdown">
                            <li class="dropdown-item"
                                @click="this.editProfile = !this.editProfile, this.profileDetails = !this.profileDetails">
                                <div class="dropdown-link">
                                    <img src="../../assets/img/icons/edit.svg">
                                    <p class="dropdown-link-title"> Edit Profile </p>
                                </div>
                            </li>
                            <li class="dropdown-item"
                                @click="this.chnagePassword = !this.chnagePassword, this.profileDetails = !this.profileDetails">
                                <div class="dropdown-link">
                                    <img src="../../assets/img/icons/password-show.svg">
                                    <p class="dropdown-link-title"> Chnage Password </p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>

            <div class=" display-flex align-start w-100  gap-32px padding-top_14px padding-x_12px Md_flex-column">

                <div class="profile_pic">
                    <img :src="profileData.profile_pic">
                </div>

                <ul class="flex-column display-flex gap-20px">

                    <li class="profile-details">

                        <p class="field">Name:-</p>
                        <p class="field_ans">{{ profileData.user_name }}</p>

                    </li>

                    <li class="profile-details">

                        <p class="field">email:-</p>
                        <p class="field_ans">{{ profileData.user_email }}</p>

                    </li>

                    <li class="profile-details">

                        <p class="field">phone number:-</p>
                        <p class="field_ans">{{ profileData.user_phone_number }}</p>

                    </li>

                </ul>

            </div>

        </div>


        <div class="profile-card p-0" v-if="editProfile">


            <div class="heading padding-18px">

                <h2 class=" text-capitalize text-xl_semibold">Edit profile</h2>

            </div>

            <div class="padding-18px space-y-32px">

                <div class="edit_profile_pic">

                    <img :src="this.selectedImg" v-if="this.selectedImg" />
                    <img :src="this.profilepic" v-if="!this.selectedImg" />

                    <div class="upload_pic">
                        <img src="../../assets/img/icons/plus.svg">
                        <input type="file" @change="selectedPic">
                    </div>

                </div>

                <div class="space-y-16px">

                    <div class="space-y-8px">
                        <Label label="Name" />
                        <Input placeholder="Enter Name" id="Name" :value="profileName"
                            @input="event => profileName = event.target.value" />
                        <ErrorMessage msg="" v-if="!profileName && formSubmitted" />
                    </div>

                    <div class="space-y-8px">
                        <Label label="email" />
                        <Input placeholder="Enter email" id="email" :value="profileEmail" type="email"
                            @input="profileEmail = $event.target.value; isvalidEmail = validateEmail()"
                            :class="{ 'input_error': !isvalidEmail }" />
                        <ErrorMessage msg="Invalid email" v-if="!isvalidEmail" />
                        <ErrorMessage msg="" v-if="!profileEmail && formSubmitted" />
                    </div>

                    <div class="space-y-8px">
                        <Label label="Phone no." />
                        <Input placeholder="Enter Phone no." id="Phone no." :value="profileNo" type="number"
                            @input="event => profileNo = event.target.value" />
                        <ErrorMessage msg="" v-if="!profileNo && formSubmitted" />
                        <ErrorMessage msg="Only 10 number valid" v-if="profileNo.length > 10" />
                    </div>

                </div>

            </div>

            <div class="padding-18px border-t border-solid border-Grey_20">

                <div class="w-100 display-flex align-center justify-end gap-12px">

                    <button class="btn-regular btn-danger"
                        @click="this.profileDetails = !this.profileDetails, this.editProfile = !this.editProfile">Cancel</button>
                    <button class="btn-regular" :disabled="profileBtnDis" @click="profileDataUpdate">Save</button>

                </div>

            </div>

        </div>

        <div class="profile-card p-0" v-if="chnagePassword">


            <div class="heading padding-18px">

                <h2 class=" text-capitalize text-xl_semibold">Chnage Password</h2>

            </div>

            <div class="padding-18px space-y-32px">


                <div class="space-y-16px">

                    <div class="space-y-8px">
                        <Label label="Old Password" />
                        <div class="search-wrraper w-100 border-Grey_20">
                            <input class="w-100" :type="typePassword3 ? 'password' : 'text'"
                                placeholder="Enter old Password" id="Old Password"
                                @input="event => profileOldPass = event.target.value" v-model="profileOldPass">
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

                    <button class="btn-regular btn-danger"
                        @click="this.chnagePassword = !this.chnagePassword, this.profileDetails = !this.profileDetails">Cancel</button>
                    <button class="btn-regular" :disabled="passwordBtnDis" @click="passwordUpdate">Save</button>

                </div>

            </div>

        </div>


    </Layout>
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

.profile_pic {
    width: 120px;
    height: 120px;
    border-radius: 999px;
    border: 1px solid var(--Grey-20);
    position: relative;
    overflow: hidden;
}

.profile_pic img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    inset: 0;
}

.profile-details {
    display: flex;
    align-items: center;
    padding-left: 24px;
}

.profile-details .field {
    font-size: 12px;
    text-transform: capitalize;
    color: var(--Grey-50);
    width: 110px;
}

.profile-details .field_ans {
    font-size: 14px;
    color: var(--Grey-90);
}


.custom-dropdown:hover .custom-dropdown-list {
    display: block;
}

.edit_profile_pic {
    width: 140px;
    height: 140px;
    border-radius: 999px;
    border: 1px dashed var(--Grey-20);
    margin-right: auto;
    margin-left: auto;
    position: relative;
}

.edit_profile_pic img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    border-radius: 999px;
}

.upload_pic {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 38px;
    height: 38px;
    border: 1px dashed var(--Grey-20);
    background-color: white;
    border-radius: 999px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    cursor: pointer;
}

.upload_pic img {
    width: 20px;
    height: 20px;
    margin: auto;
}

.upload_pic input {
    opacity: 0;
    position: absolute;
    inset: 0;
    cursor: pointer;
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

@media (max-width:768px) {
    .profile-details {
        padding-left: 0;
    }
}
</style>
