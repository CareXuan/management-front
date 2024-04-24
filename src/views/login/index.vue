<template>
  <div class="w-screen h-screen overflow-hidden flex items-center justify-center">
    <div class="w-[460px]">
      <div class="mb-[20px]">
        <label class="block text-gray-700 mb-[20px] font-bold">账号</label>
        <input
          placeholder="输入登录账号"
          autofocus="autofocus"
          v-model.trim="phone"
          class="w-full h-[60px] pl-[10px] bg-gray-200 border outline-none"
        />
      </div>

      <div class="mb-[20px]">
        <label class="block text-gray-700da rk:text-[#fff] mb-[20px] font-bold">密码</label>
        <input
          placeholder="输入密码"
          type="password"
          v-model.trim="password"
          class="w-full outline-none h-[60px] pl-[10px] bg-gray-200 border"
        />
      </div>

      <!--      <div class="mb-[20px]">-->
      <!--        <label class="block text-gray-700 mb-[20px] font-bold">验证码</label>-->
      <!--        <div class="w-full h-[60px] flex items-center">-->
      <!--          <input-->
      <!--            v-model.trim="code"-->
      <!--            placeholder="验证码"-->
      <!--            type="password"-->
      <!--            class="w-full h-full pl-[10px] bg-gray-200 border outline-none"-->
      <!--          />-->
      <!--          <img class="h-full w-[150px] ml-[10px] shadow-sm cursor-pointer" :src="captcha" alt="" @click="getcCaptcha" />-->
      <!--        </div>-->
      <!--      </div>-->

      <button class="w-full !mt-[30px] bg-[#212121] text-[#fff] p-[10px]" @click="handleLogin">
        {{ loading ? '登录中' : '登录' }}
      </button>
    </div>
  </div>
</template>
<script>
import api from '@/api'

export default {
  data: () => ({ loading: false, captcha: '', code: '', password: '', phone: '' }),
  mounted() {
    // this.getcCaptcha()
  },
  methods: {
    getcCaptcha() {
      api.system.captcha().then(rsp => {
        this.captcha = 'data:image/png;base64,' + rsp.img
        this.uuid = rsp.uuid
      })
    },
    async handleLogin() {
      const { code, password, phone } = this
      if (!phone) return this.$message.warning('请填写用户名')
      if (!password) return this.$message.warning('请填写密码')
      // if (!code) return this.$message.warning('请填写验证码')
      this.loading = true
      const rsp = await api.system.login({
        // code,
        password,
        phone,
        uuid: this.uuid
      })
      this.$updateStore({ name: 'token', value: rsp.token })
      this.$updateStore({ name: 'username', value: rsp.name })
      this.$updateStore({ name: 'userid', value: rsp.id })
      this.$router.push('/')
      this.$notify({ title: '提示', message: '登录成功' })
    }
  }
}
</script>
