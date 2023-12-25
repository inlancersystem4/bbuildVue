<script>
export default {
    methods: {
        goToHome() {
            this.$router.push({ name: 'home' });
        }
    }
}
</script>



<template>
    <div class="error-page">

        <img src="../assets/img/404.svg">

        <button class="btn" @click="goToHome">Go to Home</button>

    </div>
</template>








<style scoped>
.error-page {
    width: 100%;
    height: 100%;
    max-width: 100%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 0.4dvw;
    background-color: #fafafa;
}

img {
    max-width: 100dvw;
    height: 80dvh;
}

.btn {
    border: 1px solid transparent;
    padding: 0.8dvw 1.5dvw;
    font-size: 1.4dvw;
    border-radius: 0.4dvw;
    background-color: #61ccff;
    color: #3c2c5b;
    text-transform: capitalize;
    transition: background-color 0.4s;
}

.btn:hover {
    background-color: transparent;
    border: 1px solid #61ccff;
}
</style>