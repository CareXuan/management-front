<template>
  <router-view v-if="!token || $route.path === '/login'" />
  <el-layout
    v-else
    id="app"
    ref="layout"
    class="w-screen h-screen"
    :load-menu="loadMenuData"
    :collapse="!expand"
    :active-menu="$route.path"
    :asideClassName="expand ? 'w-[280px] min-w-[280px]' : 'w-[60px]'"
    @logout="$signup"
    @menu-click="handleMenuClicked"
    :contentClassName="['flex flex-col', expand ? 'content-expand' : 'content-collapse']"
    @toggle="$updateStore({ name: 'expand', value: !expand })"
  >
    <template slot="icon" slot-scope="{ icon, path }">
      <Icon
        v-if="icon"
        :icon="icon"
        width="17"
        height="17"
        :class="path === $route.path ? 'text-[#ffd04b]' : 'text-[#fff]'"
      />
    </template>
    <Icon slot="logo" icon="majesticons:thumb-up" class="text-[#fff] text-[28px]" />
    <el-tooltip slot="avatar" effect="dark" :content="'当前登录: ' + username" placement="top-end">
      <Icon icon="carbon:user-avatar-filled-alt" class="text-[#127B27] !text-[20px]" />
    </el-tooltip>
    <Icon slot="toggle" :icon="!expand ? 'ep:expand' : 'ep:fold'" class="text-[#fff] !text-[20px]" />
    <div class="flex-grow overflow-y-auto">
      <router-tab ref="tab" class="h-full" />
    </div>
  </el-layout>
</template>

<script>
import api from '@/api'
import { Icon } from '@iconify/vue2'
import { addRoutes } from '@/router'
import storage from 'good-storage'
import ElLayout from '@iamgx/el-layout'
export default {
  name: 'App',
  components: { Icon, ElLayout },
  methods: {
    loadMenuData({ resolve }) {
      const token = storage.get('token')
      if (!token) return resolve([])
      api.system.menus().then(rsp => {
        setTimeout(() => addRoutes(rsp.data), 500)
        resolve(rsp.data)
      })
    },
    handleMenuClicked(menu) {
      if (menu.path === this.$route.path) return
      try {
        require(`@/views/${menu.component}`).default
        this.$router.push(menu.path)
      } catch (e) {
        this.$message.error('该页面不存在')
      }
    }
  }
}
</script>
