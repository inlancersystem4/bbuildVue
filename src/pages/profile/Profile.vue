<script>
import Layout from '../../components/Layout.vue';
import { fetchWrapper } from '../../helpers/fetch-wrapper'
import Label from '../../subcomponents/common/Label.vue';
import Input from '../../subcomponents/common/Input.vue';
import TextArea from '@/subcomponents/common/TextArea.vue';
import ContentSection2 from '@/subcomponents/ContentSection2.vue'
import ErrorMessage from '../../subcomponents/common/ErrorMessage.vue';
import { useAuthStore, useAlertStore, useProfileStore } from '../../stores'

const baseUrl = `${import.meta.env.VITE_API_URL}`;

export default {
    components: { Layout, Label, Input, ErrorMessage, ContentSection2, TextArea },
    data() {
        return {
            breadcrumbList: [
                {
                    name: 'Dashboard',
                    link: '/'
                },
                {
                    name: 'Profile',
                }
            ],
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
            isValidProfileFirstName: true,
            isValidProfileLastName: true,
        }
    },
    computed: {
        profileBtnDis() {
            const specialCharsRegex = /[!@#$%^&*()?":{}|<>]/;
            return !this.profileFirstName || !this.profileFirstName.trim() || specialCharsRegex.test(this.profileFirstName) ||
                !this.profileLastName || !this.profileLastName.trim() || specialCharsRegex.test(this.profileLastName) ||
                !this.profileEmail || !this.profileEmail.trim() ||
                !this.profileNo || this.profileNo.trim().length !== 10 ||
                !this.isvalidEmail ||
                !this.companyPhoneNo || isNaN(this.companyPhoneNo) || this.companyPhoneNo.trim().length !== 10 ||
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
        validateField(value) {
            const specialCharsRegex = /[!@#$%^&*()?":{}|<>]/;
            return value.trim() === '' || !specialCharsRegex.test(value);
        },
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
        // async profileDataUpdate() {

        //     const profileStore = useProfileStore();

        //     await profileStore.Updated(this.profileFirstName, this.profileLastName, this.profileEmail, this.profilePic, this.profileNo, this.companyName, this.companyAddress, this.companyPhoneNo);


        //     await this.getprofileData();
        //     this.formSubmitted = true;
        //     this.profilesaveLoader = true;

        //     // var profile = new FormData();
        //     // profile.append("user_first_name", this.profileFirstName)
        //     // profile.append("user_last_name", this.profileLastName)
        //     // profile.append("user_email", this.profileEmail)
        //     // if (this.selectedImg) {
        //     //     profile.append("user_profile", this.profilePic)
        //     // }
        //     // profile.append("user_profile", "")
        //     // profile.append("mobile_no", this.profileNo)
        //     // profile.append("company_name", this.companyName)
        //     // profile.append("company_address", this.companyAddress)
        //     // profile.append("company_phone_no", this.companyPhoneNo)

        //     // try {
        //     //     const data = await fetchWrapper.post(`${baseUrl}/update-profile`, profile);

        //     //     if (data.success === 1) {
        //     //         this.getprofileData();
        //     //         this.profilesaveLoader = false
        //     //         this.profilenotsaved = false
        //     //         this.profilesaved = true
        //     //         const alertStore = useAlertStore();
        //     //         alertStore.success(data.message);
        //     //     }
        //     //     else {
        //     //         const alertStore = useAlertStore();
        //     //         alertStore.error(data.message);
        //     //         this.profilesaveLoader = false
        //     //     }

        //     // } catch (error) {
        //     //     const alertStore = useAlertStore()
        //     //     alertStore.error(error)
        //     // }

        // },
        async profileDataUpdate() {
            const profileStore = useProfileStore();

            await profileStore.Updated(this.profileFirstName, this.profileLastName, this.profileEmail, this.profilePic, this.profileNo, this.companyName, this.companyAddress, this.companyPhoneNo);

            await this.getprofileData();

            if (this.profilePic) {
                profileStore.updateProfilePicUrl(this.profilePic);
            } else {
                profileStore.updateProfilePicUrl('');
            }
        }
    },
}
</script>

<template>
    <Layout :breadcrumb="breadcrumbList">

        <ContentSection2 title="profile">

            <form class="flex items-start w-full flex-wrap">
                <div class="row">
                    <div class="col-8">

                        <div class="address-form w-3/4">

                            <div class="space-y-8px">
                                <Label label="First Name" required />
                                <Input placeholder="Enter First Name" id="First Name" :value="profileFirstName"
                                    @input="profileFirstName = $event.target.value; isValidProfileFirstName = validateField(this.profileFirstName)" />
                                <ErrorMessage msg="" v-if="!profileFirstName && formSubmitted" />
                                <ErrorMessage msg="First name cannot contain special characters"
                                    v-if="!isValidProfileFirstName" />

                            </div>

                            <div class="space-y-8px">
                                <Label label="Last Name" required />
                                <Input placeholder="Enter Last Name" id="Last Name" :value="profileLastName"
                                    @input="profileLastName = $event.target.value; isValidProfileLastName = validateField(this.profileLastName)" />
                                <ErrorMessage msg="" v-if="!profileLastName && formSubmitted" />
                                <ErrorMessage msg="Last name cannot contain special characters"
                                    v-if="!isValidProfileLastName" />
                            </div>

                            <div class="space-y-8px">
                                <Label label="email" required />
                                <Input placeholder="Enter email" id="email" :value="profileEmail" type="email"
                                    @input="profileEmail = $event.target.value; isvalidEmail = validateEmail()"
                                    :class="{ 'input_error': !isvalidEmail }" />
                                <ErrorMessage msg="Invalid email" v-if="!isvalidEmail" />
                                <ErrorMessage msg="" v-if="!profileEmail && formSubmitted" />
                            </div>

                            <div class="space-y-8px">
                                <Label label="Phone no." required />
                                <Input placeholder="Enter Phone no." id="Phone no." :value="profileNo" type="number"
                                    @input="event => profileNo = event.target.value" disabled />
                                <ErrorMessage msg="" v-if="!profileNo && formSubmitted" />
                                <ErrorMessage msg="Only 10 number valid" v-if="profileNo.length > 10" />
                            </div>

                            <div class="space-y-8px">
                                <Label label="Company name" required />
                                <Input placeholder="Enter Company name" id="Company name" :value="companyName"
                                    @input="event => companyName = event.target.value" />
                                <ErrorMessage msg="" v-if="!companyName && formSubmitted" />
                            </div>

                            <div class="space-y-8px">
                                <Label label="Company phone no." required />
                                <Input placeholder="Enter Company phone no." id="Company phone no." :value="companyPhoneNo"
                                    @input="event => companyPhoneNo = event.target.value" type="text" />
                                <ErrorMessage msg="" v-if="!companyPhoneNo && formSubmitted" />
                                <ErrorMessage msg="Enter only number" v-if="companyPhoneNo && isNaN(companyPhoneNo)" />
                                <ErrorMessage msg="Only 10 numbers valid"
                                    v-if="companyPhoneNo && companyPhoneNo.length > 10" />
                            </div>


                            <div class="space-y-8px col-span-2">
                                <Label label="Company Address" required />
                                <TextArea placeholder="Enter Company Address" id="Company Address" :value="companyAddress"
                                    @input="event => companyAddress = event.target.value" type="number" />
                                <ErrorMessage msg="" v-if="!companyAddress && formSubmitted" />
                            </div>


                            <div class="w-full">

                                <button class="btn-regular" :class="{ 'is-loading': profilesaveLoader }" type="submit"
                                    @click="profileDataUpdate" :disabled="profileBtnDis">
                                    <span v-if="profilenotsaved">Save</span>
                                    <span v-if="profilesaved" class="flex items-center gap-1"> Saved <svg
                                            xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                                            fill="none">
                                            <path d="M20.25 6.75L9.75 17.25L4.5 12" class=" stroke-green-500"
                                                stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                    </span>
                                </button>

                            </div>
                        </div>
                    </div>
                    <div class="col-2">
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
                </div>

            </form>

        </ContentSection2>

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

.address-form {
    display: grid;
    width: 100%;
}

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

@media (max-width:768px) {
    .row {
        flex-wrap: wrap-reverse;
        gap: 24px;
    }

    .col-8 {
        width: 100%;
    }

    .col-2 {
        width: 100%;
        margin-left: auto;
        margin-top: -55px;
    }

    .address-form {
        display: grid;
        width: 100%;
    }

    .edit_profile_pic {
        min-width: 100px;
        min-height: 100px;
        max-width: 100px;
        max-height: 100px;
        border-radius: 999px;
        border: 1px dashed var(--Grey-20);
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
        width: 25px;
        height: 25px;
        border: 1px dashed var(--Grey-20);
        background-color: white;
        border-radius: 999px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }

    .upload_pic img {
        width: 15px;
        height: 15px;
    }
}


@media (max-width:440px) {
    .row {
        flex-wrap: wrap-reverse;
        gap: 24px;
    }

    .col-8 {
        width: 100%;
    }

    .col-2 {
        width: 100%;
        margin-left: auto;
        margin-top: -55px;
    }

    .address-form {
        display: block;
    }

    .edit_profile_pic {
        min-width: 80px;
        min-height: 80px;
        max-width: 80px;
        max-height: 80px;
        border-radius: 999px;
        border: 1px dashed var(--Grey-20);
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
        width: 25px;
        height: 25px;
        border: 1px dashed var(--Grey-20);
        background-color: white;
        border-radius: 999px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }

    .upload_pic img {
        width: 15px;
        height: 15px;
    }
    .space-y-8px {
        margin-bottom: 0.7rem;
    }

    .space-y-8px>Input {
        margin-top: 2px;
    }
}
</style>
