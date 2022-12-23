<script>
import timeCalculations from "@/modules/timeCalculations.js"

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
    }
}
</script>

<template>
    <template v-if="!loading">
        <p>
            разница на сегодня
            <a-tag :color="todayBias.toNumber() < 0 ? 'red' : 'green'" @click="updateClockThrottled">
                {{ todayBias }}
            </a-tag>
        </p>

        <p>
            оттрекано за сегодня {{ todayHours }}
        </p>
    </template>
    <a-skeleton v-else :paragraph="{rows: 2}" :title="false"></a-skeleton>
</template>