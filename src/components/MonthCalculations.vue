<script>
import timeCalculations from "@/modules/timeCalculations.js"

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
            tracked,
        }
    }
}
</script>

<template>
    <template v-if="!loading">
        <p>
            разница:
            <a-tag :color="bias.toNumber() < 0 ? 'red' : 'green'" @click="updateClockThrottled">
                {{ bias }}
            </a-tag>
        </p>
        
        <p>
            оттрекано: {{ tracked.toString() }}
        </p>
        <p>
            должно быть оттрекано к концу дня: {{ calendar.hourForNow }}h
        </p>
        <p>
            часов в месяце: {{ workingHours }}h
        </p>
    </template>
    <a-skeleton v-else :paragraph="{rows: 4}" :title="false" active></a-skeleton>
</template>