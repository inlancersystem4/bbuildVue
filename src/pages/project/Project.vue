<script>
import Layout from '../../components/Layout.vue';
import Setps from './subcomponents/Setps.vue';
import ProjectDetails from './subcomponents/ProjectDetails.vue';
import ContentSection2 from '../../subcomponents/ContentSection2.vue';
import ProjectStructure from './subcomponents/ProjectStructure.vue';
import ProjectPreview from './subcomponents/ProjectPreview.vue';
import SettingPage from '@/subcomponents/SettingPage.vue';


export default {
    components: { Layout, Setps, ContentSection2, ProjectDetails, ProjectStructure, SettingPage, ProjectPreview },
    data() {
        return {
            setps: [
                {
                    id: 1,
                    "Setp_name": "Project Details",
                    "Setp_category": "Project_Details",
                    "Status": 1,
                    "success": 0
                },
                {
                    id: 2,
                    "Setp_name": "Project Structure",
                    "Setp_category": "Project_Structure",
                    "Status": 0,
                    "success": 0
                },
                {
                    id: 3,
                    "Setp_name": "Preview",
                    "Setp_category": "Project_Preview",
                    "Status": 0,
                    "success": 0
                }
            ],
            activeSetp: "Project_Details",
            projectId: "",
            selectProject: false,
            structureParentLevel: "",
            projectLimit: "",
            projects: "",
            projectsitems: "",
        }
    },
    mounted() {
        window.addEventListener('keydown', this.handleKeyDown);
    },
    created() {
        this.projectId = this.$route.params.projectId;
    },
    computed: {
        addProjectbtn() {
            return this.projectLimit === this.projects || this.projectLimit === this.projectsitems;
        }
    },
    methods: {
        handleKeyDown(event) {
            if (event.keyCode === 27) {
                this.selectProject = false;
            }
        },

        projectData(data) {

            this.structureParentLevel = data.level


            this.projectLimit = data.project_no_of_level

            if (data.is_complete === 1) {

                const step1 = this.setps.find(step => step.id === 1);
                const step2 = this.setps.find(step => step.id === 2);

                if (step1) {
                    step1.success = 1;
                }
                if (step2) {
                    step2.Status = 1;
                }


            }

        },

        structureCompelte(data) {

            this.projectsitems = data.data.structure.length

            if (data.data.is_complete === 1) {

                const step1 = this.setps.find(step => step.id === 2);
                const step2 = this.setps.find(step => step.id === 3);

                if (step1) {
                    step1.success = 1;
                }
                if (step2) {
                    step2.Status = 1;
                }

            }
        },

        projectAdd(data) {
            const step1 = this.setps.find(step => step.id === 1);
            const step2 = this.setps.find(step => step.id === 2);

            if (step1) {
                step1.success = 1;
            }
            if (step2) {
                step2.Status = 1;
            }

            this.activeSetp = "Project_Structure"
        },

        getSetpData(data) {
            this.activeSetp = data.Setp_category
            this.projects = ""
        },

        structureItems(data) {
            this.selectProject = false
            this.projects = data
        }
    },
}
</script>


<template>
    <Layout>

        <div class="space-y-16px">

            <Setps :items="setps" @setpClick="getSetpData" :activeOption="this.activeSetp" />

            <ContentSection2 title="project details" v-if="activeSetp === 'Project_Details'">

                <ProjectDetails @getProjectData="projectData" @getprojectAdd="projectAdd" />

            </ContentSection2>

            <SettingPage v-if="activeSetp === 'Project_Structure'">


                <div class="details-content sticky">

                    <h6 class="color-Grey_90 text-xl_semibold">Add Project Structure</h6>
                    <p class="color-Grey_50 text-base_regular margin-top_4px">Manage the Project Structure that you
                        will
                        operate within.</p>
                    <button class="btn-regular btn-w-full margin-top_16px" :disabled="addProjectbtn"
                        @click="this.selectProject = !this.selectProject">Add Project Structure</button>

                </div>

                <div class="main-content">

                    <ProjectStructure :dropDownOpen="selectProject" :structureParentLevel="structureParentLevel"
                        @dropdownClose="structureItems" @structureCompelte="structureCompelte" />

                </div>

            </SettingPage>

            <SettingPage title="Preview" v-if="activeSetp === 'Project_Preview'">

                <div class="details-content sticky">

                    <h6 class="color-Grey_90 text-xl_semibold">Edit Project Structure</h6>
                    <p class="color-Grey_50 text-base_regular margin-top_4px">Manage the Project Structure that you
                        will
                        operate within.</p>
                    <button class="btn-regular btn-w-full margin-top_16px">Edit Project Structure</button>

                </div>

                <div class="main-content">

                    <ProjectPreview />

                </div>

            </SettingPage>

        </div>

    </Layout>
</template>

<style scoped>
.main-content>*+* {
    margin-top: 0 !important;
}

.sticky {
    position: sticky;
    top: 0;
}
</style>