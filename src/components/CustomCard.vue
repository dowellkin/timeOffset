<script setup>
import { onMounted } from "vue"

const handledProps = defineProps({
    title: {
        type: [String, Number],
    }
})
</script>

<template>
    <div class="custom-card">
        <div class="custom-card__title">
            {{ handledProps.title }}
        </div>

        <a-card class="custom-card__item" :bind="$attrs">
            <slot></slot>
        </a-card>
    </div>
</template>

<style lang="scss">
@use "@/assets/scss/variables.scss" as *;
@use "@/assets/scss/mixins.scss" as *;

.custom-card {
    height: 100%;
    display: flex;
    flex-direction: column;

    &__title {
        font-size: rem(14);
        line-height: rem(22);
        font-weight: 500;
        color: var(--color-black-400);
        letter-spacing: rem(1);
        margin-bottom: rem(10);
        text-transform: uppercase;
    }

    &__item {
        flex-grow: 1;
    }
}
</style>