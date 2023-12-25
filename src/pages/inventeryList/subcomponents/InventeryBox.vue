<script>
import StatusBox from '../../../subcomponents/StatusBox.vue'

export default {
    props: {
        items: Array
    },
    components: { StatusBox },
    data() {
        return {

        }
    },
}
</script>

<template>
    <li class="w-full rounded-regualr border border-solid border-Grey_20 overflow-hidden" v-for="(item, index) in items"
        :key="index">

        <div class="bg-white padding-x_24px padding-y_16px  border-b border-solid border-Grey_20">

            <div class="w-full display-flex align-center justify-between">

                <p class="text-base_semibold color-Grey_90 display-flex align-center  list">
                    <span>{{ item.str_name }}</span>
                    <span v-for="(inventeryitem, inventeryitemindex) in item.inventery" :key="inventeryitemindex">{{
                        inventeryitem.str_name }}</span>
                </p>

            </div>

        </div>

        <div class="padding-x_24px padding-y_16px">

            <div>

                <div v-for="(inventeryitem, inventeryitemindex) in item.inventery" :key="inventeryitemindex"
                    class="w-full display-flex align-center display-flex-wrap gap-16px">

                    <div v-for="(inventeryiteminventery, inventeryitemindex) in inventeryitem.inventery"
                        :key="inventeryitemindex">

                        <div class="btn-regular display-flex align-center gap-8px bg-white">

                            <div class="ellipse-dot"
                                :class="{ 'bg-emerald': inventeryiteminventery.inv_status === 1, 'bg-rose': inventeryiteminventery.inv_status === 2, 'bg-orange': inventeryiteminventery.inv_status === 3, 'bg-blue': inventeryiteminventery.inv_status === 4, 'bg-Grey_40': inventeryiteminventery.inv_status === 5, 'bg-purple': inventeryiteminventery.inv_status === 6 }">
                            </div>

                            <p class="text-sm_medium color-Grey_60 text-uppercase">{{ inventeryiteminventery.inv_name }}</p>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    </li>
</template>

<style scoped>
li {
    list-style: none;
}

.list span {
    position: relative;
    margin-left: 20px;
}

.list span:nth-child(1) {
    margin-left: 0 !important;
}

.list span:nth-child(1)::after {
    display: none;
}

.list span:after {
    content: "";
    position: absolute;
    left: -12px;
    top: 50%;
    transform: translateY(-50%);
    width: 5px;
    height: 5px;
    border-radius: 999px;
    overflow: hidden;
    background-color: black;
}
</style>