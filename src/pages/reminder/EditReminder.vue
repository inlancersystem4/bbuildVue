<script>
import { ref } from 'vue';
import { useAuthStore, useAlertStore } from '../../stores'
import { fetchWrapper } from '../../helpers/fetch-wrapper'
import { format } from 'date-fns';

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
            remDate: "",
            attributes: []
        }
    },
    created() {
        const authStore = useAuthStore();
        const title = "Reminder |  Billion Build"
        const description = "this is description for Reminder"

        authStore.chnageTitle(title, description)
        this.customerId = this.$route.params.reminderId;
        this.reminderData();
    },
    computed: {
        formattedDate() {
            const date = new Date(this.remDate);

            const year = date.getFullYear();
            const month = `0${date.getMonth() + 1}`.slice(-2);
            const day = `0${date.getDate()}`.slice(-2);
            const hours = `0${date.getHours()}`.slice(-2);
            const minutes = `0${date.getMinutes()}`.slice(-2);
            const seconds = `0${date.getSeconds()}`.slice(-2);

            return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        },
        btnDisabled() {
            return !this.remDate || !this.remNote.trim();
        }
    },
    methods: {
        highlightSelectedDate() {
            this.attributes = [];

            this.attributes.push({
                content: 'black',
                highlight: true,
                dot: true,
                bar: true,
                popover: {
                    title: 'Selected Date',
                    body: 'This is the selected date',
                },
                dates: new Date(this.remDate),
                order: 0
            });
        },
        async reminderData() {
            var user_data = new FormData();
            user_data.append("rem_id", this.customerId);
            user_data.append("sort", this.sort);
            user_data.append("page_no", this.currentPage);

            try {
                const response = await fetchWrapper.post(`${baseUrl}/reminder-list`, user_data);
                this.totalPages = response.total_pages;

                if (response.success === 1) {
                    this.remNote = response.data.rem_notes;
                    this.remDate = response.data.rem_date
                    this.attributes = {
                        content: 'black',
                        highlight: true,
                        dot: true,
                        bar: true,
                        popover: {
                            title: 'Selected Date',
                            label: this.remNote,
                        },
                        dates: new Date(this.remDate),
                        order: 0
                    }
                }

            } catch (error) {
                const alertStore = useAlertStore()
                alertStore.error(error)
            }

        },
        async addReminder() {
            var customer_data = new FormData();
            customer_data.append("rem_id", this.customerId);
            customer_data.append("rem_self", "");
            customer_data.append("cus_id", this.customerId);
            customer_data.append("rem_notes", this.remNote);
            const formattedDateTime = this.formattedDate;
            customer_data.append("rem_date", formattedDateTime);

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


        <ContentSection title="Edit Reminder">



            <div class="grid  grid-cols-3 gap-20">


                <div class="space-y-8px col-span-1">
                    <Label label="Select Date" />
                    <VDatePicker v-model="remDate" color="sky-blue" :attributes='attributes' mode="dateTime"
                        @change="highlightSelectedDate" expanded />
                    <ErrorMessage msg="" v-if="!remDate && formSubmitted" />
                </div>

                <div class="space-y-8px col-span-2">
                    <Label label="Note (optional)" />
                    <TextArea placeholder="Enter Reminder Note" id="Note (optional)" :value="remNote"
                        @input="event => remNote = event.target.value" />
                </div>

            </div>

            <button type="submit" class="btn-regular margin-top_8px" :disabled="btnDisabled" @click="addReminder()">Add
                Reminder</button>


        </ContentSection>


    </Layout>
</template>


