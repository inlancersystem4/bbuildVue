<script>
import { Field, Form } from "vee-validate";
import axios from 'axios';
import ErrorMessage from '../subcomponents/common/ErrorMessage.vue';

const baseUrl = `${import.meta.env.VITE_API_URL}`;

export default {
    components: {
        ErrorMessage,
        Field,
        Form,
    },
    data() {
        return {
            email: "",
            isvalidEmail: true,
            fromSubmited: true,
            errorMsg: "",
            errorMsgShow: false,
        }
    },
    computed: {
        loginBtn() {
            return !this.email.trim() || !this.isvalidEmail
        }
    },
    methods: {
        validateEmail() {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            this.isvalidEmail = emailRegex.test(this.email);
            return this.isvalidEmail;
        },
        async sendOTP() {
            try {
                const send_otp = new FormData();
                send_otp.append("email", this.email);

                const response = await axios.post(`${baseUrl}/forgot-pass`, send_otp);

                if (response.data.success === 0) {
                    this.errorMsgShow = true
                    this.errorMsg = response.data.message
                }
                else {
                    this.$router.push({ name: 'Login' });
                }

            } catch (error) {
                console.error(error);
            }
        }
    }
}
</script>

<template>
    <div class="auth-page auth-page_center">


        <div class="auth-container">


            <div class="auth-from-section">
                <Form @submit="sendOTP" class="from space-y-24px">


                    <div class="space-y-4px auth-title">

                        <h1 class="color-Grey_90 text-2xl_semibold">Forget Password</h1>
                        <h6 class="color-Grey_50 text-base_regular">Lorem ipsum dolor sit amet consectetur, adipisicing
                            elit.
                            Quis commodi, beatae dolorem
                            repellat reiciendis accusantium ut.</h6>

                    </div>


                    <div class="input-group">

                        <label for="email">Email</label>
                        <Field name="email" :rules="validateEmail" class="input-1" type="email" id="email"
                            placeholder="Enter Email id" v-model="email" />
                        <ErrorMessage msg="Invalid email" v-if="!isvalidEmail && fromSubmited && email" />
                        <ErrorMessage :msg="errorMsg" v-if="errorMsg" />
                    </div>

                    <div class="space-y-8px">

                        <button type="submit" class="btn-regular btn-w-full" :disabled="loginBtn">
                            Set Email
                        </button>

                        <!-- <div class="text-right">
                            <p class="color-Grey_50 text-base_regular">I Resive OTP <a href="#" class="color_violet">Resend
                                    OTP !</a>
                            </p>
                        </div> -->

                    </div>

                </Form>

            </div>


        </div>


    </div>
</template>

<style scoped>
.auth-page_center .auth-title {
    padding: 0;
}

.auth-page_center .auth-container {
    display: block;
}

.auth-page_center .auth-from-section {
    height: 100%;
    display: grid;
    align-items: center;
    justify-content: center;
}

.auth-page_center .auth-from-section .from {
    margin: 0 auto;
}

.auth-page_center .logo {
    height: auto;
    margin: 0 auto;
    width: 240px;
    display: block;
}


.auth-page_center .logo_mobile {
    display: none;
}
</style>