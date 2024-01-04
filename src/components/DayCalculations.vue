<script>
import timeCalculations from "@/modules/timeCalculations.js"
import CustomChip from "@/components/CustomChip.vue";
import { Hours } from "@/utils.js";
import { useEHourStore } from "@/stores/everhour.js";

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
            Hours,
            store: useEHourStore()
        }
    },
    components: {
        CustomChip
    },
    methods: {
        getChipColor(bias) {
            if(bias < -90) {
                return "red";
            }
            if(bias < 0) {
                return "yellow";
            } else {
                return "green";
            }
        }
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

                <CustomChip class="row__value" @click="updateClockThrottled">{{ todayHours }}</CustomChip>
            </div>

            <div class="row">
                <div class="row__title">
                    Разница:
                </div>

                <CustomChip class="row__value" :type="getChipColor(todayBias.toNumber())" @click="updateClockThrottled">
                    {{ todayBias.toNumber() > 0 ? "+" : "" }}{{ todayBias }}
                </CustomChip>
            </div>

            <div class="row">
                <a-progress
                    :percent="todayHours.toNumber() / Hours(8 * 60).toNumber() * 100"
                    :show-info="false"
                    :status="store.currentTimer > 0 ? 'active' : null"
                />
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