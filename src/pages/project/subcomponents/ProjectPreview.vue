<script>
import { fetchWrapper } from '@/helpers/fetch-wrapper';
import ProjectPreviewBox from './ProjectPreviewBox.vue';
import { useAuthStore, useAlertStore } from '../../../stores'


const baseUrl = `${import.meta.env.VITE_API_URL}`;

export default {
    components: { ProjectPreviewBox },
    data() {
        return {
            projectId: "",
            projectPreviewList: []
        }
    },
    created() {
        this.projectId = this.$route.params.projectId;
        this.getProjectDataPreview();
    },
    methods: {
        async getProjectDataPreview() {

            var project_data = new FormData();
            project_data.append("project_id", this.projectId)
            project_data.append("status_id", "");

            try {
                const response = await fetchWrapper.post(`${baseUrl}/get-inv-list`, project_data);

                if (response.success === 1) {
                    this.projectPreviewList = response.data
                    this.$emit('structurePreviewSucees')
                }

            } catch (error) {
                const alertStore = useAlertStore()
                alertStore.error(error)
            }
        },
    },
}
</script>

<template>
    <ProjectPreviewBox :items="projectPreviewList" />
</template>