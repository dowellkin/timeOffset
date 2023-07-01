<script>
import timeCalculations from "@/modules/timeCalculations.js"
import CustomChip from "@/components/CustomChip.vue";

export default {
    setup() {
        const {
            calendar,
            loading,
            workingHours,
            bias,
            updateClockThrottled,
            tracked,
        } = timeCalculations();

        return {
            calendar,
            loading,
            workingHours,
            bias,
            updateClockThrottled,
            tracked
        }
    },
    components: {
        CustomChip
    }
}
</script>

<template>
    <div class="month-calculations">
        <template v-if="!loading">
            <div class="row">
                <div class="row__title">
                    Норма за месяц:
                </div>

                <CustomChip class="row__value">{{ workingHours }}h</CustomChip>
            </div>

            <div class="row">
                <div class="row__title">
                    Должно быть на конец дня:
                </div>

                <CustomChip class="row__value">{{ calendar.hourForNow }}h</CustomChip>
            </div>

            <div class="row">
                <div class="row__title">
                    Всего за месяц:
                </div>

                <CustomChip class="row__value">{{ tracked.toString() }}</CustomChip>
            </div>

            <div class="row">
                <div class="row__title">
                    Разница:
                </div>

                <CustomChip class="row__value" :type="bias.toNumber() < 0 ? 'red' : 'green'">
                    {{ bias.toNumber() > 0 ? "+" : "" }}{{ bias }}
                </CustomChip>
            </div>
        </template>
        <a-skeleton v-else :paragraph="{rows: 4}" :title="false" active></a-skeleton>
    </div>
</template>

<style lang="scss">
@use "@/assets/scss/variables.scss" as *;
@use "@/assets/scss/mixins.scss" as *;

.month-calculations {
    max-width: rem(320);

    .row__title {
        max-width: rem(140);
    }
}

</style>