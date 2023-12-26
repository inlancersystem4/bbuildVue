<script>
export default {
    props: {
        items: Array,
        activeOption: String
    },
    methods: {
        onClick(data) {
            this.$emit('setpClick', data)
        }
    },
}
</script>


<template>
    <div class="bg-white border border-solid border-Grey_20 rounded-regualr overflow-hidden w-100">
        <ul class="display-flex align-stretch w-full">
            <li class="setp-option" v-for="(item, index) in items" :key="index">
                <button class="option-details" :disabled="item.Status === 0"
                    :class="{ 'success': item.success === 1, 'active': activeOption === item.Setp_category }"
                    @click="onClick(item)">

                    <div class="counter">0{{ index + 1 }}</div>

                    <div class="success_icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M20.25 6.75L9.75 17.25L4.5 12" stroke="#FFFFFF" stroke-width="1.5"
                                stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </div>

                    <p class="option-name">{{ item.Setp_name }}</p>

                </button>
            </li>
        </ul>
    </div>
</template>

<style scoped>
.setp-option {
    flex: 1;
    border-left: 1px solid var(--Grey-20);
}

.setp-option:nth-child(1) {
    border-left: none;
}

.option-details {
    display: flex;
    padding: 18px 24px;
    align-items: center;
    gap: 18px;
    width: 100%;
    border: 0;
    outline: none;
    position: relative;
}

.option-details.active:after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 4px;
    z-index: 9;
    background-color: var(--Grey-20);
}

.option-details.active .option-name {
    font-weight: bold;
    color: var(--Grey-90);
}

.option-details.active .counter {
    border-color: var(--Grey-50);
}

.option-details .counter {
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--Grey-20);
    border-radius: 999px;
    font-size: 14px;
    color: var(--Grey-50);
}

.option-name {
    font-size: 16px;
    text-transform: capitalize;
    color: var(--Grey-70);
}

.option-details .success_icon {
    display: none;
}


.option-details.success .counter {
    display: none;
}

.option-details.success .success_icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    background-color: #10B981;
    border-radius: 999px;
}

.option-details:hover {
    background-color: var(--Grey-5);
}

.option-details:hover .counter {
    border-color: var(--Grey-90);
    color: var(--Grey-90);
}


.option-details:disabled::after {
    content: "";
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(1px);
}

.option-details:disabled:hover {
    background-color: var(--white);
}

.option-details:disabled .option-name {
    color: var(--Grey-50);
}

.option-details:disabled:hover .counter {
    border-color: var(--Grey-30);
}
</style>