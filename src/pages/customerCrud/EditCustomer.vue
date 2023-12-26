<script>
import { fetchWrapper } from '../../helpers/fetch-wrapper'
import { useAuthStore, useAlertStore } from '../../stores'


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
            customerFirstName: "",
            customerLastName: "",
            customerEmail: "",
            customerNumber: "",
            profilePic: "",
            customerAddress: "",
            selectedImg: "",
            customerId: "",
            formSubmitted: false,
            isvalidEmail: true,
            customerMiddleName: "",
            customerDob: "",
            customerNote: "",
            customerReference: "",
        }
    },
    created() {
        this.customerId = this.$route.params.id;
        this.customerData();
    },
    computed: {
        btnDisabled() {
            return !this.customerFirstName.trim() || !this.customerLastName.trim() || this.customerNumber.trim().length !== 10 || !this.isvalidEmail || !this.customerAddress.trim();
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
        async customerData() {
            var customer_data = new FormData();
            customer_data.append("cus_id", this.customerId);

            try {
                const response = await fetchWrapper.post(`${baseUrl}/customer-list`, customer_data);

                this.customerFirstName = response.data.cus_first_name
                this.customerLastName = response.data.cus_last_name
                this.customerEmail = response.data.cus_email
                this.customerNumber = response.data.cus_phone_no
                this.customerAddress = response.data.cus_address
                this.customerMiddleName = response.data.cus_middle_name
                this.customerDob = response.data.cus_dob
                this.customerNote = response.data.cus_notes
                this.customerReference = response.data.cus_ref

            } catch (error) {
                const alertStore = useAlertStore()
                alertStore.error(error)
            }
        },
        onOptionSelected(data) {
            this.selectedRole = data.role_name
            this.selectedRoleId = data.role_id
        },
        async addcustomer() {
            var customer_data = new FormData();
            customer_data.append("cus_id", this.customerId);
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

            } catch (error) {
                const alertStore = useAlertStore()
                alertStore.error(error)
            }
        }
    }
}
</script>


<template>
    <Layout>
        <ContentSection title="Edit Customer">

            <div class="row">

                <div class="col-8">

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
                            <ErrorMessage msg="Invalid email" v-if="!isvalidEmail" />
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

                        <div class="space-y-8px">
                            <Label label="Reference (optional)" />
                            <Input id="Reference (optional)" placeholder="Enter customer Reference"
                                :value="customerReference" @input="event => customerReference = event.target.value"
                                type="text" />
                        </div>

                        <div class="space-y-8px col-span-2">
                            <Label label="Address" />
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
                            @click="addcustomer()">Save Changes</button>

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