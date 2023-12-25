<script>
export default {

}
</script>


<template>
    <div class="overlay">
        <!-- <img src="../assets/img/loader.gif" class="w-96 h-auto"> -->
    </div>
</template>

<style scoped>
.overlay {
    width: 100%;
    height: 100%;
    position: fixed;
    inset: 0;
    overflow: hidden;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(4px);
    background-color: rgba(225, 225, 225, 0.3);
}

.overlay img {
    width: 332px;
    height: auto;
}
</style>