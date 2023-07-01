<script>
import timeCalculations from "@/modules/timeCalculations.js"
import CustomChip from "@/components/CustomChip.vue";

export default {
    setup() {
        const {
            loading,
            updateClockThrottled,
            todayHours,
            todayBias,
        } = timeCalculations();

        return {
            loading,
            updateClockThrottled,
            todayHours,
            todayBias,
        }
    },
    components: {
        CustomChip
    }
}
</script>

<template>
    <div class="day-calculations">
        <template v-if="!loading">
            <div class="row">
                <div class="row__title">
                    Сегодня:
                </div>

                <CustomChip class="row__value">{{ todayHours }}</CustomChip>
            </div>

            <div class="row">
                <div class="row__title">
                    Разница:
                </div>

                <CustomChip class="row__value" :type="todayBias.toNumber() < 0 ? 'red' : 'green'">
                    {{ todayBias.toNumber() > 0 ? "+" : "" }}{{ todayBias }}
                </CustomChip>
            </div>

            <div class="row">
                <a-progress :percent="todayHours.toNumber() / Math.abs(todayBias.toNumber())" :show-info="false"/>
            </div>
        </template>
        <a-skeleton v-else :paragraph="{rows: 2}" :title="false" active></a-skeleton>
    </div>
</template>

<style lang="scss">
@use "@/assets/scss/variables.scss" as *;
@use "@/assets/scss/mixins.scss" as *;

.day-calculations {
    max-width: rem(320);
}

</style>