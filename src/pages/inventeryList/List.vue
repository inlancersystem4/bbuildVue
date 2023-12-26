<script>
import { fetchWrapper } from '../../helpers/fetch-wrapper'
import Layout from '../../components/Layout.vue'
import Select from '../../subcomponents/common/Select.vue'
import InventeryBox from './subcomponents/InventeryBox.vue'
import InventeryBoxStatus from './subcomponents/InventeryBoxStatus.vue'
import { useAuthStore, useAlertStore } from '../../stores'


const baseUrl = `${import.meta.env.VITE_API_URL}`;

export default {
    components: { Layout, InventeryBox, InventeryBoxStatus, Select },
    data() {
        return {
            projectarray: [],
            projectId: "",
            currentproject: "",
            currentprojectName: "",
            structureList: [],
        }
    },
    created() {
        this.projectData();
        this.project();
    },
    methods: {
        async projectData() {
            var project_data = new FormData();
            project_data.append("project_id", "");

            try {
                const response = await fetchWrapper.post(`${baseUrl}/project-list`, project_data);

                this.projectarray = response.data;

            } catch (error) {
                const alertStore = useAlertStore()
                alertStore.error(error)
            }

        },
        onOptionSelected(option) {
            this.projectId = option.project_id
            localStorage.setItem('currentprojectId', option.project_id);
            localStorage.setItem('currentprojectName', option.project_name);
            this.project();
        },
        async project() {

            this.currentproject = localStorage.getItem('currentprojectId');
            this.currentprojectName = localStorage.getItem('currentprojectName');


            var project_data = new FormData();
            project_data.append("project_id", this.currentproject);

            try {
                const response = await fetchWrapper.post(`${baseUrl}/structure-preview`, project_data);

                this.structureList = response.data

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

        <div class="display-flex align-center justify-end w-100 margin-bottom_12px gap-8px">


            <div class="dropdown">

                <Select :options="projectarray" @option-selected="onOptionSelected" />

            </div>

            <span class="btn-regular bg-white">{{ currentprojectName }}</span>

        </div>

        <div class="display-flex align-start gap-12px w-100">

            <div>

                <InventeryBoxStatus />

            </div>

            <div class="w-100">



                <ul class="space-y-8px" v-if="this.currentproject">

                    <InventeryBox :items="structureList" />

                </ul>

            </div>

        </div>



    </Layout>
</template>

<style scoped>
.dropdown {
    background-color: white;
    min-width: 240px;
}

.dropdown .select {
    padding: 6px 12px !important;
}

.dropdown .select .display-flex .cursor-pointer p {
    font-size: 12px !important;
}
</style>