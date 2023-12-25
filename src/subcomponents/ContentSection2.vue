<script>
export default {
    props: {
        title: String
    }
}
</script>


<template>
    <div class="bg-white rounded-regualr border border-solid border-Grey_20 padding-y_24px padding-x_32px">


        <div class="display-block w-100 margin-bottom_18px">
            <h2 class="text-xl_semibold color-Grey_90 text-capitalize">{{ title }}</h2>
        </div>

        <slot></slot>

    </div>
</template>