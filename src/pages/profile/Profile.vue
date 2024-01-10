<script>
import Layout from '../../components/Layout.vue';
import { fetchWrapper } from '../../helpers/fetch-wrapper'
import Label from '../../subcomponents/common/Label.vue';
import Input from '../../subcomponents/common/Input.vue';
import TextArea from '@/subcomponents/common/TextArea.vue';
import ContentSection2 from '@/subcomponents/ContentSection2.vue'
import ErrorMessage from '../../subcomponents/common/ErrorMessage.vue';
import { useAuthStore, useAlertStore } from '../../stores'

const baseUrl = `${import.meta.env.VITE_API_URL}`;

export default {
    components: { Layout, Label, Input, ErrorMessage, ContentSection2, TextArea },
    data() {
        return {
            profileFirstName: "",
            profileLastName: "",
            profileEmail: "",
            profileNo: "",
            formSubmitted: false,
            isvalidEmail: true,
            editProfile: false,
            profileDetails: true,
            profilePic: "",
            selectedImg: "",
            companyName: "",
            companyPhoneNo: "",
            companyAddress: "",
            profilesaveLoader: false,
            profilenotsaved: true,
            profilesaved: false,
        }
    },
    computed: {
        profileBtnDis() {
            const specialCharsRegex = /[!@#$%^&*()?":{}|<>]/;
            return !this.profileFirstName || !this.profileFirstName.trim() ||
                !this.profileLastName || !this.profileLastName.trim() ||
                !this.profileEmail || !this.profileEmail.trim() ||
                !this.profileNo || this.profileNo.trim().length !== 10 ||
                !this.isvalidEmail ||
                !this.companyPhoneNo || this.companyPhoneNo.trim().length !== 10 ||
                !this.companyName || !this.companyName.trim() ||
                !this.companyAddress || !this.companyAddress.trim() || specialCharsRegex.test(this.operationNote)
        },
    },
    created() {
        this.getprofileData();
        const authStore = useAuthStore();
        const title = "Profile |  Billion Build"
        const description = "this is description for Profile"

        authStore.chnageTitle(title, description)
    },
    methods: {
        validateEmail() {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(this.profileEmail);
        },
        async getprofileData() {
            var profile = new FormData();

            try {
                const response = await fetchWrapper.post(`${baseUrl}/user-profile`, profile);

                this.profileFirstName = response.data.user_first_name
                this.profileLastName = response.data.user_last_name
                this.profileEmail = response.data.user_email
                this.profileNo = response.data.user_mobile_number
                this.profilePic = response.data.user_profile_pic
                this.companyName = response.data.company_name
                this.companyAddress = response.data.company_address
                this.companyPhoneNo = response.data.company_phone_no

                localStorage.setItem('user_details', JSON.stringify(response.data));

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

            // const authStore = useAuthStore();

            // await authStore.Updated(this.profileFirstName, this.profileLastName, this.profileEmail, this.profilePic, this.profileNo, this.companyName, this.companyAddress, this.companyPhoneNo);

            this.formSubmitted = true
            this.profilesaveLoader = true

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

                if (data.success === 1) {
                    this.getprofileData();
                    this.profilesaveLoader = false
                    this.profilenotsaved = false
                    this.profilesaved = true
                    const alertStore = useAlertStore();
                    alertStore.success(data.message);
                }
                else {
                    const alertStore = useAlertStore();
                    alertStore.error(data.message);
                    this.profilesaveLoader = false
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

        <ContentSection2 title="profile">

            <from class="flex items-start w-full flex-wrap">

                <div class="address-form w-3/4">

                    <div class="space-y-8px">
                        <Label label="First Name" />
                        <Input placeholder="Enter First Name" id="First Name" :value="profileFirstName"
                            @input="event => profileFirstName = event.target.value" />
                        <ErrorMessage msg="" v-if="!profileFirstName && formSubmitted" />
                    </div>

                    <div class="space-y-8px">
                        <Label label="Last Name" />
                        <Input placeholder="Enter Last Name" id="Last Name" :value="profileLastName"
                            @input="event => profileLastName = event.target.value" />
                        <ErrorMessage msg="" v-if="!profileLastName && formSubmitted" />
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
                            @input="event => profileNo = event.target.value" disabled />
                        <ErrorMessage msg="" v-if="!profileNo && formSubmitted" />
                        <ErrorMessage msg="Only 10 number valid" v-if="profileNo.length > 10" />
                    </div>

                    <div class="space-y-8px">
                        <Label label="Company name" />
                        <Input placeholder="Enter Company name" id="Company name" :value="companyName"
                            @input="event => companyName = event.target.value" />
                        <ErrorMessage msg="" v-if="!companyName && formSubmitted" />
                    </div>

                    <div class="space-y-8px">
                        <Label label="Company phone no." />
                        <Input placeholder="Enter Company phone no." id="Company phone no." :value="companyPhoneNo"
                            @input="event => companyPhoneNo = event.target.value" type="number" />
                        <ErrorMessage msg="" v-if="!companyPhoneNo && formSubmitted" />
                        <ErrorMessage msg="Only 10 numbers valid" v-if="companyPhoneNo && companyPhoneNo.length > 10" />
                    </div>


                    <div class="space-y-8px col-span-2">
                        <Label label="Company Address" />
                        <TextArea placeholder="Enter Company Address" id="Company Address" :value="companyAddress"
                            @input="event => companyAddress = event.target.value" type="number" />
                        <ErrorMessage msg="" v-if="!companyAddress && formSubmitted" />
                    </div>

                </div>

                <div class="w-1/4">
                    <div class="edit_profile_pic">
                        <img :src="this.selectedImg" v-if="this.selectedImg" />
                        <img :src="this.profilePic" v-if="this.profilePic" />
                        <img src="../../assets/img/noimg.jpg" v-if="!this.selectedImg && !this.profilePic" />

                        <div class="upload_pic">
                            <img src="../../assets/img/icons/plus.svg" />
                            <input type="file" @change="selectedPic" />
                        </div>

                    </div>
                </div>

                <div class="w-full mt-4">

                    <button class="btn-regular" :class="{ 'is-loading': profilesaveLoader }" type="submit"
                        @click="profileDataUpdate" :disabled="profileBtnDis">
                        <span v-if="profilenotsaved"> Save Profile </span>
                        <span v-if="profilesaved" class="flex items-center gap-1"> Saved <svg
                                xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
                                <path d="M20.25 6.75L9.75 17.25L4.5 12" class=" stroke-green-500" stroke-width="1.5"
                                    stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </span>
                    </button>

                </div>

            </from>

        </ContentSection2>

    </Layout>
</template>

<style scoped>
.edit_profile_pic {
    min-width: 140px;
    min-height: 140px;
    max-width: 140px;
    max-height: 140px;
    border-radius: 999px;
    border: 1px dashed var(--Grey-20);
    margin-left: auto;
    position: relative;
    margin-right: 12px;
}

.edit_profile_pic img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    border-radius: 999px;
    object-fit: cover;
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
</style>
