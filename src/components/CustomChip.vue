<script setup>
import { computed } from 'vue';

const props = defineProps({
    prepend: String,
    append: String,
    type: String,
})

const typeClass = computed(() => {
    if(props.type) {
        return `custom-chip--type-${props.type}`
    } else {
        return null
    }
})
</script>

<template>
<div class="custom-chip" :class="[typeClass]">
    <div class="custom-chip__prepend" v-if="prepend">{{ prepend }}</div>

    <div class="custom-chip__content">
        <slot></slot>
    </div>
    
    <div class="custom-chip__append" v-if="append">{{ append }}</div>
</div>
</template>

<style lang="scss">
@use "@/assets/scss/variables.scss" as *;
@use "@/assets/scss/mixins.scss" as *;

.custom-chip {
    display: inline-flex;
    padding: rem(8) rem(14);
    border-radius: rem(5);
    font-weight: 500;
    min-width: rem(120);
    background-color: var(--color-black-100);
    border: 1px solid var(--color-black-300);
    color: var(--color-black-400);

    &--type-green {
        background-color: var(--color-primary-100);
        border: 1px solid var(--color-primary-600);
        color: var(--color-primary-600);
    }

    &--type-red {
        background-color: var(--color-red-100);
        border: 1px solid var(--color-red-600);
        color: var(--color-red-600);
    }

    &--type-yellow {
        background-color: var(--color-yellow-100);
        border: 1px solid var(--color-yellow-900);
        color: var(--color-yellow-900);
    }

    &__prepend {
        margin-right: 0.4ch;
        color: var(--color-black-600)
    }

    &__append {
        margin-left: 0.4ch;
        color: var(--color-black-600)
    }
}
</style>