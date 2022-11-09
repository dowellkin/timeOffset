<template>
  <a-form
    layout="inline"
    :model="formState"
    @finish="handleFinish"
    @finishFailed="handleFinishFailed"
  >
    <a-form-item>
      <a-input v-model:value="formState.token" placeholder="Token" style="width: 270px">
        <template #prefix><UserOutlined style="color: rgba(0, 0, 0, 0.25)" /></template>
      </a-input>
    </a-form-item>

    <a-form-item>
      <a-button
        type="primary"
        html-type="submit"
        :disabled="!buttonActive"
      >
        Log in
      </a-button>
    </a-form-item>
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