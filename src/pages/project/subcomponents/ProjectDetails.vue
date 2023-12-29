<script>
import { useAuthStore, useAlertStore } from '../../../stores'
import Input from '@/subcomponents/common/Input.vue';
import Label from '@/subcomponents/common/Label.vue';
import ErrorMessage from '@/subcomponents/common/ErrorMessage.vue';
import TextArea from '@/subcomponents/common/TextArea.vue';
import { fetchWrapper } from '@/helpers/fetch-wrapper';

const baseUrl = `${import.meta.env.VITE_API_URL}`;

export default {
    components: { Input, Label, ErrorMessage, TextArea },
    data() {
        return {
            formSubmitted: false,
            projectName: "",
            projectAddress: "",
            projectLevel: "",
            projectId: "",
        }
    },
    computed: {
        projectAddBtn() {
            return !this.projectName.trim() || !this.projectAddress.trim() || !this.projectLevel.trim()
        }
    },
    created() {
        this.projectId = this.$route.params.projectId;
        this.getProjectData();
    },
    beforeRouteUpdate(to, from, next) {
        this.projectId = to.params.projectId;
        this.getProjectData();
        next();
    },
    methods: {

        isStringValid(inputString) {
            const stringPattern = /^[A-Za-z\s]+$/;
            return stringPattern.test(inputString);
        },

        async addproject() {

            if (!this.isStringValid(this.projectName)) {
                this.$notify({
                    group: "error",
                    title: "Error",
                    text: "Please enter a valid project name (only letters and spaces)."
                }, 2000)
                return;
            }

            var project_data = new FormData();
            if (this.projectId === '0') {
                project_data.append("project_id", "");
            }
            else {
                project_data.append("project_id", this.projectId);
            }
            project_data.append("project_name", this.projectName);
            project_data.append("project_address", this.projectAddress);
            project_data.append("project_levels", this.projectLevel);

            try {
                const data = await fetchWrapper.post(`${baseUrl}/project-add`, project_data);


                if (data.success === 1) {

                    if (this.projectId === '0') {
                        this.$router.push({ path: `/project/${data.data.project}` });
                    }


                    this.$emit('getprojectAdd', this.projectLevel)
                    this.getProjectData();

                    this.projectName = ""
                    this.projectAddress = ""
                    this.projectLevel = ""


                }

            } catch (error) {
                const alertStore = useAlertStore()
                alertStore.error(error)
            }
        },
        async getProjectData() {

            if (this.projectId === '0' || this.projectId === 0) {
                console.log(this.projectId)
            }

            else {
                var project_data = new FormData();
                project_data.append("project_id", this.projectId);

                try {
                    const response = await fetchWrapper.post(`${baseUrl}/project-details`, project_data);

                    if (response.success === 1) {
                        this.projectName = response.data.project_name
                        this.projectAddress = response.data.project_address
                        this.projectLevel = String(response.data.project_no_of_level)
                        this.$emit('getProjectData', response.data)
                    }

                } catch (error) {
                    const alertStore = useAlertStore()
                    alertStore.error(error)
                }
            }
        }
    }
}
</script>


<template>
    <form class="address-form" @submit.prevent="addproject">
        <div class="space-y-8px">
            <Label label="project Name" />
            <Input placeholder="Enter Project Name" id="project Name" :value="projectName"
                @input="event => projectName = event.target.value" />
            <ErrorMessage msg="" v-if="!this.projectName.trim() && formSubmitted" />
        </div>

        <div class="space-y-8px col-span-2">
            <Label label="project Address" />
            <TextArea placeholder="Enter Project Address" id="project Address" :value="projectAddress"
                @input="event => projectAddress = event.target.value" />
            <ErrorMessage msg="" v-if="!this.projectAddress.trim() && formSubmitted" />
        </div>

        <div class="space-y-8px" v-if="this.projectAddress.trim() && this.projectName.trim()">
            <Label label="project Level" />
            <Input placeholder="Enter Project Level" id="project Level" :value="projectLevel"
                @input="event => projectLevel = event.target.value" type="number" />
            <ErrorMessage msg="" v-if="!projectLevel && formSubmitted" />
        </div>

        <div v-if="this.projectAddress.trim() && this.projectName.trim()"></div>

        <button type="submit" class="btn-regular" :disabled="projectAddBtn">Add Project</button>

    </form>
</template>