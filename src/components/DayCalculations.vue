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
            оттрекано за сегодня {{ todayHours }}
        </p>
        
        <p>
            осталось на сегодня
            <a-tag :color="todayBias.toNumber() < 0 ? 'red' : 'green'" @click="updateClockThrottled">
                {{ todayBias }}
            </a-tag>
        </p>
    </template>
</template>