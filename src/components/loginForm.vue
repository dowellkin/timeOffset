<template>
  <a-form
    :model="formState"
    @finish="handleFinish"
    @finishFailed="handleFinishFailed"
    class="login-form"
  >
    <div class="login-form__title-wrapper">
      <div class="login-form__title-icon">
        <user-outlined />
      </div>

      <div class="login-form__title">
        Вход
      </div>
    </div>

    <div class="login-form__subtitle-wrapper">
      <div class="login-form__subtitle">
        Выполните вход, используя API токен вашего профиля Everhour.
      </div>
    </div>

    <div class="login-form__inputs-wrapper">
      <div class="login-form__left-part">
        <a-form-item>
          <a-input v-model:value="formState.token" placeholder="Ваш токен">
          </a-input>
        </a-form-item>
  
        <p>
          Скопируйте свой API токен из вашего
          <a href="https://app.everhour.com/#/account/profile" target="__blank">профиля Everhour</a>.
        </p>
      </div>
  
      <a-form-item>
        <a-button
          type="primary"
          html-type="submit"
          :disabled="!buttonActive"
        >
          Войти
        </a-button>
      </a-form-item>
    </div>
  </a-form>
</template>

<script>
import { UserOutlined } from '@ant-design/icons-vue';
import { defineComponent, reactive, computed } from 'vue';
export default defineComponent({
  components: {
    UserOutlined,
  },
  emits: ['submit'],
  setup(props, {emit}) {
    const formState = reactive({
      token: '',
    });

    const handleFinish = () => {
      emit('submit', formState);
    };

    const handleFinishFailed = errors => {
      console.log(errors);
    };

    const buttonActive = computed(() => {
        return formState.token.match(/([\d\w]{4}-){2}([\d\w]{6}-){2}[\d\w]{8}/)
    });

    return {
      formState,
      buttonActive,
      handleFinish,
      handleFinishFailed,
    };
  },
});
</script>

<style lang="scss">
@use "@/assets/scss/variables.scss" as *;
@use "@/assets/scss/mixins.scss" as *;

.login-form {
  padding-top: rem(40); 
  padding-bottom: rem(40);

  &__title-wrapper {
    display: flex;
    font-size: rem(32);
    align-items: center;
  }

  &__title-icon {
    margin-right: rem(10);
    color: var(--color-primary-600);
  }
  
  &__title {
    font-weight: 700;
    letter-spacing: rem(-0.2);
  }

  &__subtitle-wrapper {
    margin-top: rem(12);
    margin-bottom: rem(50);
  }

  &__subtitle {
    font-size: rem(16);
    line-height: rem(26);
  }

  &__inputs-wrapper {
    display: flex;
    gap: rem(20);
  }

  &__left-part {
    input {
      min-width: rem(600);
    }
  }
}
</style>