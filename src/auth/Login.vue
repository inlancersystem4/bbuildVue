<script  >
import { Field, Form } from "vee-validate";
import axios from 'axios';
import { useAuthStore, useAlertStore } from "../stores";

import OverLaye from '../subcomponents/common/OverLaye.vue';
import ErrorMessage from '../subcomponents/common/ErrorMessage.vue';



const baseUrl = `${import.meta.env.VITE_API_URL}`;

export default {
    components: {
        OverLaye,
        Field,
        Form,
        ErrorMessage,
    },
    data() {
        return {
            number: "",
            overlay: false,
            fromSubmited: false,
            errorMesgShow: false,
            errorMsg: "",
            getotp: true,
            sendotp: false,
            otp: "",
            verifyOTPloader: false,
            resendOTP: true,
            remainingTime: 30,
        }
    },
    created() {
        // this.checkUser()
        const authStore = useAuthStore();
        const title = "Sign In |  Billion Build"
        const description = "this is description for Sign In"

        authStore.chnageTitle(title, description)
    },
    computed: {
        loginBtn() {
            return this.number.trim().length !== 10 || isNaN(this.number)
        },
        otpBtn() {
            return this.otp.trim().length !== 5 || isNaN(this.otp)
        },
        maskedNumber() {
            if (this.number.length < 8) return this.number;
            const visibleDigits = 4;
            const maskedLength = this.number.length - (visibleDigits * 2);
            const maskedPart = '*'.repeat(maskedLength);
            const visiblePartStart = this.number.substring(0, visibleDigits);
            const visiblePartEnd = this.number.substring(this.number.length - visibleDigits);
            return `${visiblePartStart}${maskedPart}${visiblePartEnd}`;
        },
    },
    methods: {
        async onSubmit() {

            this.fromSubmited = true
            this.verifyOTPloader = true
            this.errorMesgShow = false

            const authStore = useAuthStore();
            const user_number = this.number;
            const user_otp = this.otp;

            await authStore.login(user_number, user_otp);
        },

        checkUser() {

            const User = localStorage.getItem('userToken')

            if (User) {
                this.$router.push({ name: 'home' });
            }

        },

        async login() {

            this.fromSubmited = true
            this.errorMesgShow = false

            var login_data = new FormData();
            login_data.append("user_mobile", this.number);
            this.resendOTP = true;

            try {

                const loginUser = await axios.post(`${baseUrl}/get-otp`, login_data);

                if (loginUser.data.success === 1) {

                    this.sendotp = true
                    this.getotp = false

                    this.fromSubmited = false
                    this.otp = String(loginUser.data.data)

                    const alertStore = useAlertStore()
                    alertStore.success(loginUser.data.message)

                    this.remainingTime = 30;
                    setTimeout(() => {
                        this.resendOTP = false;
                    }, 30000);
                    this.updateTimer();

                }

                else {

                    this.errorMesgShow = true
                    this.errorMsg = loginUser.data.message
                    this.sendotp = false
                    this.getotp = true
                    this.number = "",

                        useAlertStore().error(loginUser.data.message)
                }


            } catch (error) {
                const alertStore = useAlertStore()
                alertStore.error(error)
            }

        },

        updateTimer() {
            const interval = setInterval(() => {
                this.remainingTime--;
                if (this.remainingTime <= 0) {
                    clearInterval(interval);
                }
            }, 1000);
        },
    },
}

</script>

<template>
    <div class="auth-page auth-page_center">


        <div class="auth-container">

            <div class="auth-from-section">


                <Form @submit="login" class="from space-y-24px" v-if="getotp">

                    <!-- <img src="../assets/img/logo.png" class="logo"> -->

                    <div class="space-y-4px auth-title">

                        <h1 class="color-Grey_90 text-2xl_semibold">Enter your Phone!</h1>
                        <h6 class="color-Grey_50 text-base_regular">
                            Enter your phone no to verify it.
                        </h6>

                    </div>

                    <div class="input-group">
                        <label for="">Phone No.</label>
                        <input name="number" class="input-1" type="text" placeholder="Enter Phone No"
                            @input="event => number = event.target.value" :value="number" />
                        <ErrorMessage msg="Enter only number" v-if="number && isNaN(number)" />
                        <ErrorMessage msg="Plz Enter Valid number"
                            v-if="this.number.trim().length > 10 && this.number.trim()" />
                        <ErrorMessage :msg="this.errorMsg" v-if="this.errorMesgShow" />
                    </div>


                    <div class="space-y-8px">

                        <button type="submit" class="btn-regular btn-w-full" :disabled="loginBtn">Continue</button>

                    </div>

                </Form>


                <Form @submit="onSubmit" class="from space-y-24px" v-if="sendotp">

                    <!-- <img src="../assets/img/logo.png" class="logo"> -->

                    <div class="space-y-4px auth-title">

                        <h1 class="color-Grey_90 text-2xl_semibold">OTP Verification</h1>
                        <h6 class="color-Grey_50 text-base_regular">Enter OTP code sent to {{ maskedNumber }} </h6>

                    </div>

                    <div class="input-group">
                        <!-- <label for="">Enter otp.</label> -->
                        <input name="otp" class="input-1" type="text" placeholder="Enter otp"
                            @input="event => otp = event.target.value" :value="otp" />
                        <ErrorMessage msg="Enter only number" v-if="otp && isNaN(otp)" />
                        <!-- <ErrorMessage msg="Plz Enter Valid number" v-if="this.otp.trim().length !== 5 && this.otp.trim()" /> -->
                        <ErrorMessage msg="otp Is reqired" v-if="!this.otp && fromSubmited" />
                        <ErrorMessage :msg="errorMsg" v-if="errorMesgShow" />
                    </div>


                    <div class="space-y-8px">

                        <button type="submit" class="btn-regular btn-w-full" :class="{ 'is-loading': verifyOTPloader }"
                            :disabled="otpBtn">Verify
                            &
                            Proceed</button>

                        <div class="text-right mt-4">
                            <p class="color-Grey_50 text-base_regular">Didn't receive OTP ?
                                <button @click="login" type="button" class="color_violet resentBtn"
                                    :disabled="resendOTP">Resend OTP !
                                </button>
                                <span v-if="remainingTime > 0">in {{ remainingTime }}</span>
                            </p>
                        </div>

                    </div>

                </Form>


            </div>


        </div>


    </div>

    <OverLaye v-if="overlay" />
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

.resentBtn:disabled {
    color: var(--Grey-50) !important;
    font-weight: bold;
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

@media (max-width: 440px) {
    .auth-page_center{
        padding: auto;
    }
    .auth-page_center .auth-title {
        font-size: 12px !important;
    }

    .auth-page_center .auth-container {
        display: block;
    }

    .auth-page_center .auth-from-section {
        height: 100%;
        display: flex;
        align-items: center;
        max-width: none;
        justify-content: center;
    }

    .auth-page_center .auth-from-section .from {
        margin: 0 auto;
        position: absolute;
        min-width: fit-content;
    }
}
</style>