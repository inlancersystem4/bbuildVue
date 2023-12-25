<script>
import { fetchWrapper } from '@/helpers/fetch-wrapper';
import DropDown from './DropDown.vue';
import Label from '@/subcomponents/common/Label.vue'
import Input from '@/subcomponents/common/Input.vue'
import ProjectStructureBox from './ProjectStructureBox.vue'

const baseUrl = `${import.meta.env.VITE_API_URL}`;

export default {
    components: { DropDown, Input, Label, ProjectStructureBox },
    props: {
        dropDownOpen: Boolean,
        structureParentLevel: [Number, String]
    },
    data() {
        return {
            projectId: "",
            projectStructureList: [],
            items: [],
            structureLevels: "",
        }
    },
    created() {
        this.projectId = this.$route.params.projectId;
        this.getProjectDataStructure();
        this.structureDetails();
    },
    methods: {
        async getProjectDataStructure() {

            var project_data = new FormData();

            try {
                const response = await fetchWrapper.post(`${baseUrl}/structure-suggessions`, project_data);

                if (response.success === 1) {
                    this.projectStructureList = response.data
                }

            } catch (error) {
                console.log(error);
            }
        },
        selectedStructure(data) {
            this.items.push(
                {
                    "structure_name": data,
                    "structure_parent": this.structureParentLevel,
                    "structure_levels": "",
                    "project_id": this.projectId,
                    "structure_number": "",
                }
            )
            this.$emit('dropdownClose', this.items.length)
        },
        deleteItem(index) {
            this.items.splice(index, 1)
            this.$emit('dropdownClose', this.items.length)
        },
        itemsClear() {
            this.items = []
            this.$emit('dropdownClose', this.items.length)
        },
        enterStructureLevel(index, e) {
            this.items[index]['structure_levels'] = e.target.value
        },
        handleCheck(index, value) {
            this.items[index]['structure_number'] = value
        },
        async structureDetails() {
            var project_data = new FormData();
            project_data.append("project_id", this.projectId)

            try {
                const response = await fetchWrapper.post(`${baseUrl}/structure-details`, project_data);

                this.items = response.data.structure

                if (response.success === 1) {
                    this.$emit('structureCompelte', response)
                }

            } catch (error) {
                console.log(error);
            }

        },
        async structureSave() {
            var projectStructure = JSON.stringify(this.items)

            var project_data = new FormData();
            project_data.append("struct_id", "")
            project_data.append("struct_json", projectStructure)

            try {
                const data = await fetchWrapper.post(`${baseUrl}/structure-add`, project_data);

            } catch (error) {
                console.log(error);
            }

        }
    },
}
</script>

<template>
    <DropDown :items="projectStructureList" v-if="dropDownOpen" @option-selected="selectedStructure" />

    <div class="space-y-8px">

        <ProjectStructureBox :items="items" @deleteItem="deleteItem" @enterStructureLevel="enterStructureLevel"
            @handleCheck="handleCheck" />

        <div v-if="this.items.length > 0"
            class="padding-x_32px  Sm_padding-x_28px Mobile_padding-x_24px  Sm_padding-y_18px Mobile_padding-y_16px padding-y_24px w-full border border-solid border-Grey_20 rounded-regualr bg-white">
            <div class="w-full display-flex align-center justify-end gap-12px">

                <button class="btn-regular" @click="itemsClear">Cancel</button>
                <button class="btn-regular bg-purple color-white" :disabled="structureSaveBtn" @click="structureSave">Save
                    Structure</button>

            </div>
        </div>

    </div>
</template>
