<script setup>
    import CurrentDay from "@/components/CurrentDay.vue";
    import UserInfo from "@/components/UserInfo.vue";
</script>

<template>
    <div class="user-card__wrap">
        <current-day :left="true"></current-day>
        <user-info></user-info>
    </div>
</template>

<style lang="scss">
@import "@/assets/scss/variables.scss";
@import "@/assets/scss/mixins.scss";

.user-card {
    &__wrap {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: rem(20);

        @include breakpoint(md) {
            flex-direction: column;
            align-items: start;
        }
    }
}
</style>