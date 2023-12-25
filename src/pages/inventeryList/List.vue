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
            selectProject: false,
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


            if (!this.currentproject) {
                this.selectProject = true
            }

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

        <div class="display-flex align-center justify-end w-100 margin-bottom_12px gap-8px" v-if="this.currentproject">

            <button class="btn-regular bg-white" @click="this.selectProject = !this.selectProject">Add New
                Project</button>

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

        <div class="dropdown" v-if="selectProject">

            <Select :options="projectarray" @option-selected="onOptionSelected" />

            <button class="btn-regular bg-white btn-w-full" @click="this.selectProject = !this.selectProject"
                v-if="this.projectId">Add
                New
                Project</button>

        </div>

    </Layout>
</template>

<style scoped>
.dropdown {
    position: fixed;
    width: 100%;
    height: 100%;
    inset: 0;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    z-index: 99;
    background-color: #1118274a;
    backdrop-filter: blur(5px);
    gap: 12px;
}

.dropdown .select {
    max-width: 420px;
    background-color: white;
}

.dropdown .btn-w-full {
    max-width: 420px;
}
</style>