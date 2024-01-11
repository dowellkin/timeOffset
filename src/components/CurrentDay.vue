<script setup>
import {ref} from 'vue';

const today = new Date();
const options = { year: 'numeric', month: 'long', day: 'numeric' };
const todateString = ref(today.toLocaleDateString('ru', options));
todateString.value = todateString.value.replace(' г.', '');
todateString.value = todateString.value.replace(/\s(\d{4})/, ', $1');

const props = defineProps({
    left: {
        type: Boolean,
        default: false
    }
})
</script>

<template>
    <div class="current-day__wrap" :class="{'current-day__wrap--left': left}">
        <div class="current-day__title">
            Сегодня
        </div>

        <div class="current-day__date">
            {{ todateString }}
        </div>
    </div>
</template>

<style lang="scss">
@use "@/assets/scss/variables.scss" as *;
@use "@/assets/scss/mixins.scss" as *;

.current-day {
    &__wrap {
        display: flex;
        flex-direction: column;
        align-items: center;

        &--left {
            align-items: start;
        }
    }

    &__title {
        font-size: rem(16);
        line-height: rem(20);
        letter-spacing: rem(-0.2);
        font-weight: 500;
    }

    &__date {
        font-size: rem(12);
        line-height: rem(16);
        font-weight: 500;
        color: var(--color-black-400);
        letter-spacing: rem(-0.2);
    }
}
</style>