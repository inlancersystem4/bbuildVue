<script>
import { fetchWrapper } from '../../../helpers/fetch-wrapper'
import StatusBox from '../../../subcomponents/StatusBox.vue'
import { useAuthStore, useAlertStore } from '../../../stores'

const baseUrl = `${import.meta.env.VITE_API_URL}`;


export default {
    components: { StatusBox },
    data() {
        return {
            statusList: []
        }
    },
    created() {
        this.statusData();
    },
    methods: {
        async statusData() {
            var customer_data = new FormData();

            try {
                const response = await fetchWrapper.post(`${baseUrl}/inventory-status`, customer_data);
                this.statusList = response.data;

            } catch (error) {
                const alertStore = useAlertStore()
                alertStore.error(error)
            }

        }
    },
}
</script>

<template>
    <li class="w-full rounded-regualr border border-solid border-Grey_20 overflow-hidden">

        <div class="bg-white padding-x_24px padding-y_16px  border-b border-solid border-Grey_20">

            <div class="w-full display-flex align-center justify-between">

                <p class="text-large_semibold text-capitalize color-Grey_90">Project Status</p>

            </div>

        </div>

        <div class="padding-x_16px padding-y_12px">

            <div class="w-full display-flex align-center display-flex-wrap gap-8px">

                <StatusBox :items="statusList" />

            </div>

        </div>

    </li>
</template>

<style scoped>
li {
    list-style: none;
}
</style>