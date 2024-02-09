<script>

import { useAuthStore, useAlertStore } from '../../stores'
import { fetchWrapper } from '../../helpers/fetch-wrapper'

//  import axios from 'axios';

import Layout from '../../components/Layout.vue';
import ContentSection from '../../subcomponents/ContentSection2.vue';
import Label from '../../subcomponents/common/Label.vue';
import Input from '../../subcomponents/common/Input.vue';
import ErrorMessage from '../../subcomponents/common/ErrorMessage.vue';
import TextArea from '../../subcomponents/common/TextArea.vue';


const baseUrl = `${import.meta.env.VITE_API_URL}`;

export default {
    components: { Layout, ContentSection, Label, Input, ErrorMessage, TextArea },
    data() {
        return {
            breadcrumbList: [
                {
                    name: 'Dashboard',
                    link: '/'
                },
                {
                    name: 'Customers',
                    link: '/customerlist'
                },
                {
                    name: 'Add Customer',
                }
            ],
            customerFirstName: "",
            customerLastName: "",
            customerEmail: "",
            customerNumber: "",
            profilePic: "",
            customerAddress: "",
            selectedImg: "",
            formSubmitted: false,
            isvalidEmail: true,
            customerMiddleName: "",
            customerDob: "",
            customerNote: "",
            customerReference: "",
            activeAcco: "0",
            showErrorOfImg: "",
            specialCharsRegex: '/[!@#$%^&*()?":{}|<>]/',
            isValidFirstName:'',
        }
    },
    computed: {
        btnDisabled() {
            const specialCharsRegex = /[!@#$%^&*()?":{}|<>]/;
            return !this.customerFirstName.trim() || !this.customerLastName.trim() || specialCharsRegex.test(this.customerLastName) || !this.customerNumber.trim() || this.customerNumber.trim().length !== 10 || !this.isvalidEmail || !this.customerAddress.trim() || specialCharsRegex.test(this.customerAddress);
        }
    },
    created() {
        const authStore = useAuthStore();
        const title = "Add Customer |  Billion Build"
        const description = "this is description for Add Customer"

        authStore.chnageTitle(title, description)
    },
    methods: {
        // validateEmail() {
        //     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        //     if (this.customerEmail.trim() === '' || emailRegex.test(this.customerEmail)) {
        //         this.isvalidEmail = true;
        //         return true;
        //     } else {
        //         this.isvalidEmail = false;
        //         return false;
        //     }
        // },
        validateFirstName(event) {
            const firstName = event.target.value;
            const specialCharsRegex = /[!@#$%^&*()?":{}|<>]/;
            this.isValidFirstName = !specialCharsRegex.test(firstName);
            this.customerFirstName = firstName;
        },
        validateLastName(event) {
            const lastName = event.target.value;
            const specialCharsRegex = /[!@#$%^&*()?":{}|<>]/;
            this.isValidLastName = !specialCharsRegex.test(lastName);
            this.customerLastName = lastName;
        },
        validateEmail(event) {
            const email = event.target.value;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            this.isvalidEmail = email === '' || emailRegex.test(email);
            this.customerEmail = email;
        },
        validatePhoneNumber(event) {
            const phoneNumber = event.target.value;
            this.isValidPhoneNumber = phoneNumber.length === 10 && /^\d+$/.test(phoneNumber);
            this.customerNumber = phoneNumber;
        },
        validateAddress(event) {
            const address = event.target.value;
            const specialCharsRegex = /[!@#$%^&*()?":{}|<>]/;
            this.isValidAddress = !specialCharsRegex.test(address);
            this.customerAddress = address;
        },
        selectedPic(event) {
            const selectedFile = event.target.files[0]

            if (selectedFile.type === "image/png" || selectedFile.type === "image/jpeg" || selectedFile.type === "image/gif" || selectedFile.type === "image/svg" || selectedFile.type === "image/jpg") {

                this.profilePic = selectedFile

                this.selectedImg = URL.createObjectURL(selectedFile)

                this.activeAcco = 1;

                this.showErrorOfImg = false

            }

            else {
                this.showErrorOfImg = true
            }

        },
        async addcustomer() {
            var customer_data = new FormData();
            customer_data.append("cus_first_name", this.customerFirstName);
            customer_data.append("cus_last_name", this.customerLastName);
            customer_data.append("cus_email", this.customerEmail);
            customer_data.append("cus_phone_no", this.customerNumber);
            customer_data.append("cus_profile", this.profilePic);
            customer_data.append("cus_address", this.customerAddress);
            customer_data.append("cus_middle_name", this.customerMiddleName);
            customer_data.append("cus_dob", this.customerDob);
            customer_data.append("cus_notes", this.customerNote);
            customer_data.append("cus_ref", this.customerReference);

            try {
                const data = await fetchWrapper.post(`${baseUrl}/add-or-edit-customer`, customer_data);

                if (data.success === 1) {
                    this.$router.push({ name: 'CustomerList' });
                }
                else {
                    const alertStore = useAlertStore()
                    alertStore.error(data.message)
                }

            } catch (error) {
                const alertStore = useAlertStore()
                alertStore.error(error)
            }
        },
        toggleAccordion(id) {
            if (this.activeAcco === id) {
                this.activeAcco = null;
            } else {
                this.activeAcco = id;
            }
        }
    }
}
</script>



<template>
    <Layout :breadcrumb="breadcrumbList">


        <!-- <ContentSection title="Add Customer" class="max-w-4xl mx-auto relative">

            <div class="absolute right-4 top-5">
                <div class=" w-10 h-10 rounded-full border relative border-solid border-Grey_20 p-0.5"
                    v-if="this.selectedImg">
                    <img :src="this.selectedImg" class="w-full h-full object-cover rounded-full" />
                </div>
            </div>

            <div class="custom-accordion">

                <div class="accordion-items" :class="{ 'active-accordion': this.activeAcco == 0 }">
                    <div class="accordion-header" @click="toggleAccordion(0)">
                        <div>
                            <h4 class="accordion-title">Customer Profile Picture</h4>
                            <p class="accordion-sub-title">add Customer Profile Picture only image</p>
                        </div>
                        <div class="accordion-icons">
                            <img src="../../assets/img/icons/plus-2.svg" class="img-not-selected plus_icon">
                            <img src="../../assets/img/icons/minus.svg" class="img-not-selected minus_icon">
                        </div>
                    </div>
                    <div class="accordion-body">

                   <div class="">
                            <img :src="this.selectedImg" class="pic" v-if="this.selectedImg">
                        </div>

                        <label for="FileDroper2" class="FileDroper">
                            <input type="file" @change="selectedPic">
                            <p class="color-Grey_50 text-base_regular">Drop your file here, or <span
                                    class="font-500 color_violet"> click to
                                    browse </span></p>
                            <p class="color-Grey_50 text-base_regular">support only ,JPEG ,PNG ,JPG</p>
                        </label>

                        <div class="mt-1">
                            <ErrorMessage msg="support only ,JPEG ,PNG ,JPG" v-if="this.showErrorOfImg" />
                        </div>

                    </div>
                </div>

                <div class="accordion-items" :class="{ 'active-accordion': this.activeAcco == 1 }">
                    <div class="accordion-header" @click="toggleAccordion(1)">
                        <div>
                            <h4 class="accordion-title">Customer Personal Information</h4>
                            <p class="accordion-sub-title">add customer personal information as a filed wayes</p>
                        </div>
                        <div class="accordion-icons">
                            <img src="../../assets/img/icons/plus-2.svg" class="img-not-selected plus_icon">
                            <img src="../../assets/img/icons/minus.svg" class="img-not-selected minus_icon">
                        </div>
                    </div>
                    <div class="accordion-body">


                        <div class="address-form">

                            <div class="space-y-8px">
                                <Label label="First Name" />
                                <Input placeholder="Enter customer First Name" id="First Name" :value="customerFirstName"
                                    @input="event => customerFirstName = event.target.value" />
                                <ErrorMessage msg="" v-if="!customerFirstName && formSubmitted" />
                            </div>

                            <div class="space-y-8px">
                                <Label label="Middle Name (optional)" />
                                <Input placeholder="Enter customer Middle Name" id="Middle Name (optional)"
                                    :value="customerMiddleName" @input="event => customerMiddleName = event.target.value" />
                            </div>

                            <div class="space-y-8px">
                                <Label label="Last Name" />
                                <Input placeholder="Enter customer Last Name" id="Last Name" :value="customerLastName"
                                    @input="event => customerLastName = event.target.value" />
                                <ErrorMessage msg="" v-if="!customerLastName && formSubmitted" />
                            </div>

                            <div class="space-y-8px">
                                <Label label="Email (optional)" />
                                <Input placeholder="Enter customer Email" id="Email (optional)" :value="customerEmail"
                                    @input="customerEmail = $event.target.value; isvalidEmail = validateEmail()"
                                    :class="{ 'input_error': !isvalidEmail }" />
                                <ErrorMessage msg="Invalid email" v-if="!isvalidEmail && customerEmail.trim() !== ''" />
                                <ErrorMessage msg="" v-if="!customerEmail && formSubmitted" />
                            </div>

                            <div class="space-y-8px">
                                <Label label="Phone No." />
                                <Input placeholder="Enter customer Number" id="Phone No." :value="customerNumber"
                                    @input="event => customerNumber = event.target.value" type="number"
                                    :class="{ 'input_error': customerNumber.length > 10 }" />
                                <ErrorMessage msg="" v-if="!customerNumber && formSubmitted" />
                                <ErrorMessage msg="Only 10 number valid" v-if="customerNumber.length > 10" />
                            </div>

                            <div class="space-y-8px">
                                <Label label="Date Of Birth (optional)" />
                                <Input id="Date Of Birth (optional)" :value="customerDob"
                                    @input="event => customerDob = event.target.value" type="date" />
                            </div>


                            <div class="space-y-8px col-span-2">
                                <Label label="Address" />
                                <TextArea id="Address" placeholder="Enter customer Address" :value="customerAddress"
                                    @input="event => customerAddress = event.target.value" type="text" />
                                <ErrorMessage msg="" v-if="!customerAddress && formSubmitted" />
                            </div>


                        </div>
                    </div>
                </div>

                <div class="accordion-items" :class="{ 'active-accordion': this.activeAcco == 2 }">
                    <div class="accordion-header" @click="toggleAccordion(2)">
                        <div>
                            <h4 class="accordion-title">Customer Details (Optional)</h4>
                            <p class="accordion-sub-title">add customer details but all filed are Optional </p>
                        </div>
                        <div class="accordion-icons">
                            <img src="../../assets/img/icons/plus-2.svg" class="img-not-selected plus_icon">
                            <img src="../../assets/img/icons/minus.svg" class="img-not-selected minus_icon">
                        </div>
                    </div>
                    <div class="accordion-body">
                        <div class="address-form">

                            <div class="space-y-8px">
                                <Label label="Reference (optional)" />
                                <Input id="Reference (optional)" placeholder="Enter customer Reference"
                                    :value="customerReference" @input="event => customerReference = event.target.value"
                                    type="text" />
                            </div>

                            <div class="space-y-8px col-span-2">
                                <Label label="Note (optional)" />
                                <TextArea placeholder="Enter customer Note" id="Note (optional)" :value="customerNote"
                                    @input="event => customerNote = event.target.value" />
                            </div>

                        </div>
                    </div>
                </div>

            </div>

            <div class="w-full flex  justify-end mt-2.5">
                <button type="submit" class="btn-regular margin-top_8px" :disabled="btnDisabled"
                    @click="addcustomer()">Save</button>
            </div>

        </ContentSection> -->

        <ContentSection title="Add Customer">
            <div class="row">

                <div class="col-8">

                    <div class="address-form">

                        <div class="space-y-8px">
                            <Label label="First Name" required />
                            <!-- <Input placeholder="Enter customer First Name" id="First Name" :value="customerFirstName"
                                @input="event => customerFirstName = event.target.value" /> -->
                            <Input placeholder="Enter customer First Name" id="First Name" :value="customerFirstName"
                            @input="validateFirstName($event)" />
                            <ErrorMessage msg="First name cannot contain special characters" v-if="!isValidFirstName" />
                        </div>

                        <div class="space-y-8px">
                            <Label label="Middle Name (optional)" />
                            <Input placeholder="Enter customer Middle Name" id="Middle Name (optional)"
                                :value="customerMiddleName" @input="event => customerMiddleName = event.target.value" />
                            <!-- <ErrorMessage msg="" /> -->
                        </div>

                        <div class="space-y-8px">
                            <Label label="Last Name" required />
                            <Input placeholder="Enter customer Last Name" id="Last Name" :value="customerLastName"
                                @input="event => customerLastName = event.target.value" />
                            <ErrorMessage msg="" v-if="!customerLastName && formSubmitted" />
                        </div>

                        <div class="space-y-8px">
                            <Label label="Email (optional)" />
                            <Input placeholder="Enter customer Email" id="Email (optional)" :value="customerEmail"
                                @input="customerEmail = $event.target.value; isvalidEmail = validateEmail()"
                                :class="{ 'input_error': !isvalidEmail }" />
                            <ErrorMessage msg="Invalid email" v-if="!isvalidEmail" />
                            <ErrorMessage msg="" v-if="!customerEmail && formSubmitted" />
                        </div>

                        <div class="space-y-8px">
                            <Label label="Phone No." required />
                            <Input placeholder="Enter customer Number" id="Phone No." :value="customerNumber"
                                @input="event => customerNumber = event.target.value" type="number"
                                :class="{ 'input_error': customerNumber.length > 10 }" />
                            <ErrorMessage msg="" v-if="!customerNumber && formSubmitted" />
                            <ErrorMessage msg="Only 10 number valid" v-if="customerNumber.length > 10" />
                        </div>

                        <div class="space-y-8px">
                            <Label label="Date Of Birth (optional)" />
                            <Input id="Date Of Birth (optional)" :value="customerDob"
                                @input="event => customerDob = event.target.value" type="date" />
                        </div>

                        <div class="space-y-8px">
                            <Label label="Reference (optional)" />
                            <Input id="Reference (optional)" placeholder="Enter customer Reference"
                                :value="customerReference" @input="event => customerReference = event.target.value"
                                type="text" />
                        </div>

                        <div class="space-y-8px col-span-2">
                            <Label label="Address" required />
                            <Input id="Address" placeholder="Enter customer Address" :value="customerAddress"
                                @input="event => customerAddress = event.target.value" type="text" />
                            <ErrorMessage msg="" v-if="!customerAddress && formSubmitted" />
                        </div>

                        <div class="space-y-8px col-span-2">
                            <Label label="Note (optional)" />
                            <TextArea placeholder="Enter customer Note" id="Note (optional)" :value="customerNote"
                                @input="event => customerNote = event.target.value" />
                        </div>


                        <button type="submit" class="btn-regular margin-top_8px" :disabled="btnDisabled"
                            @click="addcustomer()">Save</button>

                    </div>

                </div>


                <div class="col-2">

                    <div class="user_pic">

                        <img :src="this.selectedImg" class="pic" v-if="selectedImg">
                        <img src="../../assets/img/noimg.jpg" v-if="!selectedImg" class="pic" />

                        <label class="add_pic" for="customer-pic">
                            <input type="file" id="customer-pic" @change="selectedPic">
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