<script>
export default {
    props: {
        btn: String,
    }
}
</script>


<template>
    <button
        class="w-fit border border-Theme-color px-3 py-1.5 font-semibold text-base rounded bg-Theme-color text-Theme-color2 hover:bg-transparent transition-all disabled:bg-Theme-color disabled:opacity-40 disabled:cursor-no-drop">
        {{ btn }}
    </button>
</template>