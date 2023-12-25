<script  >
import { Field, Form } from "vee-validate";
import axios from 'axios';
import { useAuthStore } from "../stores";

import OverLaye from '../subcomponents/common/OverLaye.vue';
import ErrorMessage from '../subcomponents/common/ErrorMessage.vue';



const baseUrl = `${import.meta.env.VITE_API_URL}`;

export default {
    components: {
        OverLaye,
        Field,
        Form,
        ErrorMessage,
        useAuthStore,
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
            otp: ""
        }
    },
    created() {
        // this.checkUser()
    },
    computed: {
        loginBtn() {
            return this.number.trim().length !== 10
        },
        otpBtn() {
            return this.otp.trim().length !== 5
        }
    },
    methods: {
        async onSubmit() {

            this.fromSubmited = true

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

            var login_data = new FormData();
            login_data.append("user_mobile", this.number);

            try {

                const loginUser = await axios.post(`${baseUrl}/get-otp`, login_data);

                if (loginUser.data.success === 1) {
                    console.log(loginUser.data)

                    this.sendotp = true
                    this.getotp = false

                    this.fromSubmited = false
                }

                else {
                    this.errorMesgShow = true
                    this.errorMsg = loginUser.data.message
                }


            } catch (error) {
                console.log(error);
            }

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

                        <h1 class="color-Grey_90 text-2xl_semibold">Sign In</h1>
                        <h6 class="color-Grey_50 text-base_regular">Lorem ipsum dolor sit amet consectetur, adipisicing
                            elit.
                            Quis commodi, beatae dolorem
                            repellat reiciendis accusantium ut.</h6>

                    </div>

                    <div class="input-group">
                        <label for="">Phone No.</label>
                        <input name="number" class="input-1" type="number" placeholder="Enter Phone No"
                            @input="event => number = event.target.value" :value="number" />
                        <ErrorMessage msg="Plz Enter Valid number"
                            v-if="this.number.trim().length !== 10 && this.number.trim()" />
                        <ErrorMessage msg="number Is reqired" v-if="!this.number && fromSubmited" />
                        <ErrorMessage :msg="errorMsg" v-if="errorMesgShow" />
                    </div>



                    <div class="space-y-8px">

                        <button type="submit" class="btn-regular btn-w-full" :disabled="loginBtn">Send otp</button>

                    </div>

                </Form>


                <Form @submit="onSubmit" class="from space-y-24px" v-if="sendotp">

                    <!-- <img src="../assets/img/logo.png" class="logo"> -->

                    <div class="space-y-4px auth-title">

                        <h1 class="color-Grey_90 text-2xl_semibold">Sign In</h1>
                        <h6 class="color-Grey_50 text-base_regular">Lorem ipsum dolor sit amet consectetur, adipisicing
                            elit.
                            Quis commodi, beatae dolorem
                            repellat reiciendis accusantium ut.</h6>

                    </div>

                    <div class="input-group">
                        <label for="">Enter otp.</label>
                        <input name="otp" class="input-1" type="number" placeholder="Enter otp"
                            @input="event => otp = event.target.value" :value="otp" />
                        <ErrorMessage msg="Plz Enter Valid number" v-if="this.otp.trim().length !== 5 && this.otp.trim()" />
                        <ErrorMessage msg="otp Is reqired" v-if="!this.otp && fromSubmited" />
                        <ErrorMessage :msg="errorMsg" v-if="errorMesgShow" />
                    </div>



                    <div class="space-y-8px">

                        <button type="submit" class="btn-regular btn-w-full" :disabled="otpBtn">Login</button>

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