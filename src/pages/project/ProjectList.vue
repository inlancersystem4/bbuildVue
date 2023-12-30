<script>
import { useAuthStore, useAlertStore } from '@/stores'
import { fetchWrapper } from '@/helpers/fetch-wrapper'
import Layout from '@/components/Layout.vue';
import DeleteModel from '@/subcomponents/common/DeleteModel.vue';
import ContentSection from '@/subcomponents/ContentSection.vue';
import Pagination from '@/subcomponents/common/Pagination.vue';
import SearchBox from '@/subcomponents/common/SearchBox.vue';
import ProjectListRow from '@/pages/project/subcomponents/ProjectListRow.vue'

const baseUrl = `${import.meta.env.VITE_API_URL}`;

export default {
    components: { Layout, DeleteModel, ContentSection, Pagination, ProjectListRow, SearchBox },
    data() {
        return {
            list: [],
            searchText: "",
            currentPage: 1,
            totalPages: 1,
            sort: "asc",
            deleteItemModal: false,
            itemId: "",
        }
    },
    created() {
        this.projectData();
    },
    methods: {

        addProjectFun() {
            const projectId = 0
            this.$router.push({ name: 'Project', params: { projectId } });
        },

        searchTextFun(event) {
            this.searchText = event.target.value.trim();
            this.projectData();
        },

        updatePage(Number) {
            this.currentPage = Number;
            this.projectData();
        },

        chnageSort() {
            this.sort = this.sort === 'desc' ? 'asc' : 'desc';
            this.projectData();
        },

        async projectData() {
            var project_data = new FormData();
            project_data.append("sort", this.sort);
            project_data.append("search", this.searchText);
            project_data.append("page_no", this.currentPage);

            try {
                const response = await fetchWrapper.post(`${baseUrl}/project-list`, project_data);

                this.list = response.data;
                this.totalPages = response.total_pages;

            } catch (error) {
                const alertStore = useAlertStore()
                alertStore.error(error)
            }

        },

        getItemId(id) {
            this.deleteItemModal = true
            this.itemId = id
        },

        editItem(id) {
            this.$router.push({ name: 'Project', params: { projectId: id } })
        },

        async deleteItem() {
            var delete_data = new FormData();

            delete_data.append("project_id", this.itemId);

            try {
                const data = await fetchWrapper.post(`${baseUrl}/project-remove`, delete_data);

                if (data.success === 1) {
                    this.projectData();
                    this.deleteItemModal = false
                }

            } catch (error) {
                const alertStore = useAlertStore()
                alertStore.error(error)
            }
        },

    }
}
</script>

<template>
    <Layout>

        <ContentSection>

            <template v-slot:table-header>

                <div class="w-100 margin-bottom_12px">
                    <h2 class="title">Project List</h2>
                </div>


                <div class="table-options">

                    <button class="btn-regular display-flex align-center gap-8px" @click="chnageSort()">
                        <img src="../../assets/img/icons/adjustments.svg">
                        <span v-if="sort === 'asc'">Newest</span>
                        <span v-if="sort === 'desc'">Oddest</span>
                    </button>


                </div>

                <div class="table-options">

                    <SearchBox placeholder="Search Account" :value="searchText" @input="searchTextFun" />

                    <button class="btn-regular display-flex align-center  gap-8px text-no-wrap" @click="addProjectFun()">
                        <img src="../../assets/img/icons/plus-3.svg">
                        Add New Project</button>

                </div>


            </template>

            <template v-slot:main-table>

                <div v-if="!list || list.length === 0" class="data-not-found border-b border-Grey_20 border-solid">
                    <img src="../../assets/img/no-data.png">
                </div>

                <table class="w-100 user-table" v-if="list">
                    <tbody>
                        <tr v-for="(items, index) in list" :key="index">
                            <td class="count">
                                <p class="text-sm_regular color-Grey_50">No.</p>
                            </td>
                            <td class="project_name">
                                <p class="text-sm_regular color-Grey_50">project name</p>
                            </td>
                            <td class="project_stuactur">
                                <p class="text-sm_regular color-Grey_50">Project Structure No.</p>
                            </td>
                            <td class="project_address">
                                <p class="text-sm_regular color-Grey_50">project address</p>
                            </td>
                            <td class="blank"></td>
                            <td class="dropdown">
                                <div class="icon-btn icon-btn_32px  custom-dropdown">
                                </div>
                            </td>
                        </tr>
                        <ProjectListRow :list="list" @delete_item="getItemId" @edit_item="editItem" />

                    </tbody>
                </table>

            </template>

            <template v-slot:table-footer>

                <Pagination :currentPage="currentPage" :totalPages="totalPages" @update-page="updatePage" />

            </template>

        </ContentSection>

    </Layout>

    <DeleteModel model_title="Delete Customer" model_subtitle="Are you sure you want to delete this Customer?"
        v-if="deleteItemModal" @close_model="deleteItemModal = false" @delete_item="deleteItem()" />
</template>


<style scoped>
tr {
    display: flex;
    gap: 24px;
    align-items: center;
}

.count {
    min-width: 3%;
    max-width: 3%;
    display: block;
}

.project_name {
    min-width: 25%;
    max-width: 25%;
    display: block;
}

.project_stuactur {
    min-width: 14%;
    max-width: 14%;
    display: block;
}

.project_address {
    min-width: 35%;
    max-width: 35%;
    display: block;
}

.blank {
    min-width: 10%;
    max-width: 10%;
    display: block;
}

.dropdown {
    min-width: 5%;
    max-width: 5%;
    display: flex;
    justify-content: end;
}

.custom-dropdown:hover .custom-dropdown-list {
    display: block;
}
</style>