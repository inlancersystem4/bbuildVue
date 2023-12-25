<script>

import { useAuthStore, useAlertStore } from '../../stores'
import { fetchWrapper } from '../../helpers/fetch-wrapper'

import axios from 'axios';

import Layout from '../../components/Layout.vue';
import ContentSection from '../../subcomponents/ContentSection2.vue';
import Label from '../../subcomponents/common/Label.vue';
import Input from '../../subcomponents/common/Input.vue';
import ErrorMessage from '../../subcomponents/common/ErrorMessage.vue';
import Select from '../../subcomponents/common/Select.vue';


const baseUrl = `${import.meta.env.VITE_API_URL}`;

export default {
    components: { Layout, ContentSection, Label, Input, ErrorMessage, Select },
    data() {
        return {
            userFirstName: "",
            userLastName: "",
            userEmail: "",
            userNumber: "",
            userPass: "",
            userCoPass: "",
            profilePic: "",
            selectedImg: "",
            formSubmitted: false,
            isvalidEmail: true,
            typePassword: true,
            typePassword2: true,
            passwordNotMatch: false,
            roleList: [],
            selectedRoleId: "",
            selectedRole: "",
        }
    },
    created() {
        this.featchRoleList();
    },
    computed: {
        btnDisabled() {
            return !this.userFirstName.trim() || !this.userLastName.trim() || !this.userEmail.trim() || !this.userNumber.trim() || this.userNumber.trim().length !== 10 || !this.isvalidEmail || this.passwordNotMatch || !this.selectedRoleId;
        }
    },
    methods: {
        validateEmail() {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(this.userEmail);
        },
        checkPasswords() {
            if (this.userPass && this.userCoPass && this.userPass === this.userCoPass) {

                this.passwordNotMatch = false

            } else {

                this.passwordNotMatch = true

            }
        },
        selectedPic(event) {
            const selectedFile = event.target.files[0]

            if (selectedFile.type === "image/png" || selectedFile.type === "image/jpeg" || selectedFile.type === "image/gif" || selectedFile.type === "image/svg" || selectedFile.type === "image/jpg") {

                this.profilePic = selectedFile

                this.selectedImg = URL.createObjectURL(selectedFile)

            }

        },
        onOptionSelected(data) {
            this.selectedRole = data.role_name
            this.selectedRoleId = data.role_id
        },
        async featchRoleList() {
            var role_data = new FormData();
            role_data.append("role_id", "");

            try {
                const response = await fetchWrapper.post(`${baseUrl}/role-list`, role_data);
                this.roleList = response.data;

            } catch (error) {
                console.log(error);
            }
        },
        async addUser() {
            var user_data = new FormData();
            user_data.append("user_first_name", this.userFirstName);
            user_data.append("user_last_name", this.userLastName);
            user_data.append("user_email", this.userEmail);
            user_data.append("mobile_no", this.userNumber);
            user_data.append("user_pass", this.userPass);
            user_data.append("conf_pass", this.userCoPass);
            user_data.append("user_profile", this.profilePic);
            user_data.append("role_id", this.selectedRoleId);

            try {
                const data = await fetchWrapper.post(`${baseUrl}/add-user`, user_data);

                if (data.success === 1) {
                    this.$router.push({ name: 'UserList' });
                }

            } catch (error) {
                console.log(error);
            }
        }
    }
}
</script>



<template>
    <Layout>


        <ContentSection title="Add User">

            <div class="row">

                <div class="col-8">

                    <div class="address-form">

                        <div class="space-y-8px">
                            <Label label="User First Name" />
                            <Input placeholder="Enter User First Name" id="User First Name" :value="userFirstName"
                                @input="event => userFirstName = event.target.value" />
                            <ErrorMessage msg="" v-if="!userFirstName && formSubmitted" />
                        </div>

                        <div class="space-y-8px">
                            <Label label="User Last Name" />
                            <Input placeholder="Enter User Last Name" id="User Last Name" :value="userLastName"
                                @input="event => userLastName = event.target.value" />
                            <ErrorMessage msg="" v-if="!userLastName && formSubmitted" />
                        </div>

                        <div class="space-y-8px">
                            <Label label="User Email" />
                            <Input placeholder="Enter User Email" id="User Email" :value="userEmail"
                                @input="userEmail = $event.target.value; isvalidEmail = validateEmail()"
                                :class="{ 'input_error': !isvalidEmail }" />
                            <ErrorMessage msg="Invalid email" v-if="!isvalidEmail" />
                            <ErrorMessage msg="" v-if="!userEmail && formSubmitted" />
                        </div>

                        <div class="space-y-8px">
                            <Label label="User Phone No." />
                            <Input placeholder="Enter User Number" id="User Phone No." :value="userNumber"
                                @input="event => userNumber = event.target.value" type="number"
                                :class="{ 'input_error': userNumber.length > 10 }" />
                            <ErrorMessage msg="" v-if="!userNumber && formSubmitted" />
                            <ErrorMessage msg="Only 10 number valid" v-if="userNumber.length > 10" />
                        </div>

                        <div class="space-y-8px">
                            <Label label="User Password" />
                            <div class="search-wrraper w-100 border-Grey_20" :class="{ 'input_error': passwordNotMatch }">
                                <input class="w-100" :type="typePassword ? 'password' : 'text'"
                                    placeholder="Enter User Password" id="User Password"
                                    @input="event => { userPass = event.target.value; checkPasswords(); }"
                                    v-model="userPass">
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
                            <Label label="Correct Password" />
                            <div class="search-wrraper w-100 border-Grey_20" :class="{ 'input_error': passwordNotMatch }">
                                <input class="w-100" :type="typePassword2 ? 'password' : 'text'"
                                    placeholder="Enter User Correct Password" id="Correct Password"
                                    @input="event => { userCoPass = event.target.value; checkPasswords(); }"
                                    v-model="userCoPass">
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

                        <div class="space-y-8px">
                            <Label label="Select  Role" />
                            <Select :options="roleList" @option-selected="onOptionSelected" />
                        </div>

                        <div class=""></div>

                        <button type="submit" class="btn-regular margin-top_8px" :disabled="btnDisabled"
                            @click="addUser()">Add User</button>

                    </div>

                </div>


                <div class="col-2">

                    <div class="user_pic">

                        <img :src="this.selectedImg" class="pic">

                        <label class="add_pic" for="user-pic">
                            <input type="file" id="user-pic" @change="selectedPic">
                            <img src="../../assets/img/icons/plus-3.svg">
                        </label>

                    </div>

                </div>

            </div>

        </ContentSection>


    </Layout>
</template>


<style scoped>
.row {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    width: 100%;
}

.col-8 {
    width: 75%;
}

.col-2 {
    width: 25%;
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


.user_pic {
    width: 160px;
    height: 160px;
    border: 1px dashed var(--Grey-50);
    border-radius: 999px;
    margin-left: auto;
    margin-right: 22px;
    position: relative;
}

.pic {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    border-radius: 999px;
    object-fit: cover;
}

.user_pic .add_pic {
    position: absolute;
    bottom: 0;
    right: 8px;
    width: 42px;
    height: 42px;
    background-color: var(--Grey);
    border: 1px dashed var(--Grey-50);
    z-index: 12;
    border-radius: 999px;
    display: flex;
    align-items: center;
    cursor: pointer;
    justify-content: center;
}

.user_pic .add_pic input[type=file] {
    opacity: 0;
    width: 100%;
    height: 100%;
    display: none;
}

@media (max-width:790px) {
    .row {
        flex-wrap: wrap-reverse;
        gap: 24px;
    }

    .col-8 {
        width: 100%;
    }

    .col-2 {
        width: 100%;
    }

    .user_pic {
        margin: auto;
    }
}
</style>