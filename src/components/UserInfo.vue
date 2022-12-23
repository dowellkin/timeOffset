<script setup>
import { useEHourStore } from "@/stores/everhour.js";
import { computed } from "vue"
import { useRouter } from 'vue-router'

const router = useRouter();
const EHstore = useEHourStore();

const loading = computed(() => {
    return EHstore.isLoading;
});

const logout = () => {
    EHstore.logout()
    EHstore.$reset()
    router.push({ name: 'login' })
}

</script>

<template>
    <a-row :gutter="[16, 16]" type="flex" wrap>
        <a-col>
            <a-avatar v-if="!loading" :src="EHstore.self.avatarUrlLarge" :size="128" />
            <a-skeleton-avatar v-else active :size="128" />
        </a-col>
    
        <a-col flex="auto">
            <template v-if="!loading">
                <a-typography-title :level="2">
                    {{ EHstore.self.name }}
                </a-typography-title>
    
                <a-typography-text :level="5" type="secondary">
                    {{ EHstore.self.headline }}@{{ EHstore.self.team.name }}
                </a-typography-text>
            </template>
            <a-skeleton v-else active :paragraph="{ rows: 2 }" />
        </a-col>
    </a-row>
    <a-row justify="end">
        <a-col>
            <a-popconfirm
                title="Вы уверены, что хотите выйти?"
                ok-text="Да"
                cancel-text="Нет"
                @confirm="logout"
                placement="topRight"
            >
                <a-button danger>
                    Выйти
                </a-button>
            </a-popconfirm>
        </a-col>
    </a-row>
</template>