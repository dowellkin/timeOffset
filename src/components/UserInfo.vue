<script setup>
import { useEHourStore } from "@/stores/everhour.js";
import { LogoutOutlined } from '@ant-design/icons-vue';
import { computed } from "vue"
import { useRouter } from 'vue-router'

const router = useRouter();
const EHstore = useEHourStore();

const loading = computed(() => {
    return EHstore.meLoading;
});

const logout = () => {
    EHstore.logout()
    EHstore.$reset()
    router.push({ name: 'login' })
}

</script>

<template>
    <div class="user-info__wrap">
        <div class="user-info__avatar">
            <a-avatar v-if="!loading" :src="EHstore?.self?.avatarUrlLarge" :size="48" />
            <a-skeleton-avatar v-else active :size="48" />
        </div>

        <div class="user-info__text">
            <template v-if="!loading">
                <div class="user-info__name">
                    {{ EHstore?.self?.name }}
                </div>

                <div class="user-info__position">
                    {{ EHstore?.self?.headline }}@{{ EHstore?.self?.team?.name }}
                </div>
            </template>

            <a-skeleton v-else active :title="false" :paragraph="{ rows: 2 }" style="min-width: 150px;" />
        </div>

        <div class="user-info__logout" @click="logout">
            <logout-outlined />
        </div>
    </div>
</template>

<style lang="scss">
@use "@/assets/scss/variables.scss" as *;
@use "@/assets/scss/mixins.scss" as *;

.user-info {
    &__wrap {
        display: flex;
        align-items: center;
    }

    &__avatar {
        margin-right: rem(12);
    }

    &__logout {
        margin-left: rem(16);
        font-size: rem(20);
        cursor: pointer;
        border-radius: 100px;
        transition: color .2s ease;

        &:hover {
            color: var(--color-red-500);
        }
    }

    &__name {
        font-size: rem(16);
        line-height: rem(20);
        letter-spacing: rem(-0.2);
        font-weight: 500;
    }

    &__position {
        font-size: rem(12);
        line-height: rem(16);
        font-weight: 500;
    }
}
</style>