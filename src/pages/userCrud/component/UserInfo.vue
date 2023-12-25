<script>

import { useAuthStore, useAlertStore } from '../../../stores'
import { fetchWrapper } from '../../../helpers/fetch-wrapper'

import axios from 'axios';

import Layout from '../../../components/Layout.vue';
import ContentSection from '../../../subcomponents/ContentSection2.vue';
import Label from '../../../subcomponents/common/Label.vue';
import Input from '../../../subcomponents/common/Input.vue';
import Select from '../../../subcomponents/common/Select.vue';
import ErrorMessage from '../../../subcomponents/common/ErrorMessage.vue';

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
            userId: "",
            formSubmitted: false,
            isvalidEmail: true,
            typePassword: true,
            typePassword2: true,
            passwordNotMatch: false,
            roleList: [],
            selectedRole: "",
            selectedRoleId: "",
        }
    },
    created() {
        this.userId = this.$route.params.id;
        this.UserData();
        this.featchRoleList();
    },
    computed: {
        btnDisabled() {
            return !this.userFirstName.trim() || !this.userLastName.trim() || !this.userEmail.trim() || !this.userNumber.trim() || this.userNumber.trim().length !== 10 || !this.isvalidEmail;
        }
    },
    methods: {
        validateEmail() {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(this.userEmail);
        },
        selectedPic(event) {
            const selectedFile = event.target.files[0]

            if (selectedFile.type === "image/png" || selectedFile.type === "image/jpeg" || selectedFile.type === "image/gif" || selectedFile.type === "image/svg" || selectedFile.type === "image/jpg") {

                this.profilePic = selectedFile

                this.selectedImg = URL.createObjectURL(selectedFile)

            }

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
        async UserData() {
            var user_data = new FormData();
            user_data.append("user_id", this.userId);

            try {
                const response = await fetchWrapper.post(`${baseUrl}/edit-user`, user_data);

                this.userFirstName = response.data.data.user_first_name
                this.userLastName = response.data.data.user_last_name
                this.userNumber = response.data.data.user_mobile_number
                this.userEmail = response.data.data.user_email
                this.profilePic = response.data.data.user_profile_pic
                this.selectedRole = response.data.data.user_role


            } catch (error) {
                console.log(error);
            }
        },
        onOptionSelected(data) {
            this.selectedRole = data.role_name
            this.selectedRoleId = data.role_id
        },
        async EditUser() {
            var user_data = new FormData();
            user_data.append("user_id", this.userId);
            user_data.append("user_first_name", this.userFirstName);
            user_data.append("user_last_name", this.userLastName);
            user_data.append("user_email", this.userEmail);
            user_data.append("user_phone_number", this.userNumber);
            user_data.append("user_profile_pic", this.profilePic);
            user_data.append("user_role", this.selectedRoleId);

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
    <ContentSection title="Edit User">

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
                        <Label label="Select  Role" />
                        <Select :options="roleList" :responseData="selectedRole" @option-selected="onOptionSelected" />
                    </div>

                    <div></div>

                    <button type="submit" class="btn-regular margin-top_8px" :disabled="btnDisabled"
                        @click="EditUser()">Edit User</button>

                </div>

            </div>


            <div class="col-2">

                <div class="user_pic">

                    <img :src="this.selectedImg" class="pic" v-if="this.selectedImg">
                    <img :src="this.profilePic" class="pic" v-if="!this.selectedImg">

                    <label class="add_pic" for="user-pic">
                        <input type="file" id="user-pic" @change="selectedPic">
                        <img src="../../../assets/img/icons/plus-3.svg">
                    </label>

                </div>

            </div>

        </div>

    </ContentSection>
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