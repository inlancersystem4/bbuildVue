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
            remNote: "",
            customerId: "",
            remDate: ","
        }
    },
    created() {
        const authStore = useAuthStore();
        const title = "Reminder |  Billion Build"
        const description = "this is description for Reminder"

        authStore.chnageTitle(title, description)
        this.customerId = this.$route.params.reminderId;
    },
    methods: {
        async addReminder() {
            var customer_data = new FormData();
            customer_data.append("rem_id", "");
            customer_data.append("rem_self", "");
            customer_data.append("cus_id", this.customerId);
            customer_data.append("rem_notes", this.remNote);
            customer_data.append("rem_date", this.remDate);

            try {
                const data = await fetchWrapper.post(`${baseUrl}/add-reminder`, customer_data);

                if (data.success === 1) {
                    this.$router.push({ name: 'ReminderList' });
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


        <ContentSection title="Add Reminder">

            <div class="row">

                <div class="col-8">

                    <div class="address-form">

                        <div class="space-y-8px">
                            <Label label="First Name" />
                            <Input placeholder="Enter customer First Name" id="First Name" :value="remDate"
                                @input="event => remDate = event.target.value" type="date" />
                            <ErrorMessage msg="" v-if="!remDate && formSubmitted" />
                        </div>

                        <div class="space-y-8px col-span-2">
                            <Label label="Note (optional)" />
                            <TextArea placeholder="Enter Reminder Note" id="Note (optional)" :value="remNote"
                                @input="event => remNote = event.target.value" />
                        </div>

                        <button type="submit" class="btn-regular margin-top_8px" :disabled="btnDisabled"
                            @click="addReminder()">Add Reminder</button>

                    </div>

                </div>

            </div>

        </ContentSection>


    </Layout>
</template>


