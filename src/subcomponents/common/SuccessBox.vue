<script>
export default {
    props: {
        Message: String
    }
}
</script>


<template>
    <div class="alert-box">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M20.25 6.75L9.75 17.25L4.5 12" stroke="#4BB543" stroke-width="1.5" stroke-linecap="round"
                stroke-linejoin="round" />
        </svg>
        <p class="line-clamp-1 text-base_semibold" style="color: #4BB543;">{{ Message }}</p>
        <!-- <div class="hide-section" >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M18.75 5.25L5.25 18.75" stroke="#191C1F" stroke-width="1.5" stroke-linecap="round"
                    stroke-linejoin="round" />
                <path d="M18.75 18.75L5.25 5.25" stroke="#191C1F" stroke-width="1.5" stroke-linecap="round"
                    stroke-linejoin="round" />
            </svg>
        </div> -->
    </div>
</template>

<style scoped>
.alert-box {
    position: absolute;
    left: 1rem;
    bottom: 1rem;
    width: 100%;
    max-width: 380px;
    padding: 6px 16px;
    border: 1px solid var(--Grey-20);
    z-index: 100;
    background-color: var(--Grey-5);
    display: flex;
    align-items: center;
    gap: 12px;
    border-radius: 8px;
    overflow: hidden;
}

.alert-box svg {
    min-width: 24px;
    min-height: 24px;
    max-height: 24px;
    max-width: 24px;
}

.hide-section {
    position: absolute;
    right: -1200px;
    top: 0;
    padding: 6px 8px;
    height: 100%;
    background-color: var(--Grey-10);
    cursor: pointer;
    transition: 0.4s;
}

.hide-section svg {
    width: 16px;
    height: 16px;
}

.alert-box:hover .hide-section {
    right: 0;
}
</style>