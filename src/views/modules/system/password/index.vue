<template>
  <BasicContainer>
    <ElForm ref="formRef" :model="password" label-width="80px" class="px-48" :rules="rules">
      <ElFormItem label="旧密码" prop="oldPassword">
        <ElInput v-model="password.oldPassword" type="password" show-password></ElInput>
      </ElFormItem>
      <ElFormItem label="新密码" prop="newPassword">
        <PasswordMeter v-model="password.newPassword"></PasswordMeter>
      </ElFormItem>
      <ElFormItem label="确认密码" prop="confirmPass">
        <ElInput v-model="password.confirmPass" type="password" show-password></ElInput>
      </ElFormItem>
      <div class="flex justify-center mb-5">
        <ElButton type="primary" class="mr-2" @click="confirmPassword">确认</ElButton>
        <ElButton @click="resetPassword">重置</ElButton>
      </div>
      <div class="flex justify-center">修改成功后会自动退出当前登录</div>
    </ElForm>
  </BasicContainer>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, unref } from 'vue'
import PasswordMeter from '@/components/password/PasswordMeter.vue'
import { ElForm, ElFormItem, ElInput, FormInstance, FormRules } from 'element-plus'
import { useRouter } from 'vue-router'

export const rules: FormRules = {
  oldPassword: [{ required: true, message: 'Please input Activity name', trigger: 'blur' }],
  newPassword: [{ required: true, message: 'Please input Activity name', trigger: 'blur' }],
  confirmPass: [{ required: true, message: 'Please input Activity name', trigger: 'blur' }]
}

export default defineComponent({
  name: 'ModifyPassowrd',
  components: { PasswordMeter, ElForm, ElFormItem, ElInput },
  setup() {
    const formRef = ref<FormInstance>()

    const password = reactive({
      oldPassword: '',
      newPassword: '',
      confirmPass: ''
    })

    const { replace } = useRouter()

    async function confirmPassword() {
      const form = unref(formRef)
      if (!form) return
      const validateResult = await form.validate(() => ({}))
      if (!validateResult) {
        return
      }
      replace('/login')
    }

    function resetPassword() {
      const form = unref(formRef)
      if (!form) return
      form.resetFields()
    }
    return { formRef, password, rules, resetPassword, confirmPassword }
  }
})
</script>
