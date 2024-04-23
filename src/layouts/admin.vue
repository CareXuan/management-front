<template>
  <el-layout
    class="w-screen h-screen"
    :load-menu="loadMenuData"
    :collapse="!expand"
    :active-menu="$route.path"
    :contentClassName="(expand ? 'content-expand' : 'content-collapse') + ' flex flex-col'"
    :asideClassName="(expand ? 'w-[280px] min-w-[280px]' : 'w-[60px]') + ' transition-all bg-[#1F2124]'"
    @logout="$signup"
    @toggle="$updateStore({ name: 'expand', value: !expand })"
    @menu-click="p => p.path !== $route.path && $router.push(p.path)"
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
    <Icon slot="avatar" icon="carbon:user-avatar-filled-alt" class="text-[#127B27] !text-[20px]" />
    <Icon slot="toggle" :icon="!expand ? 'ep:expand' : 'ep:fold'" class="text-[#fff] !text-[20px]" />
    <div class="flex-grow overflow-y-auto">
      <router-tab ref="tab" class="h-full" />
    </div>
  </el-layout>
</template>

<script>
import { menus } from '@/router'
import { Icon } from '@iconify/vue2'
import { addRoutes } from '@/router'
import storage from 'good-storage'
import ElLayout from '@iamgx/el-layout'
import api from '@/api'
export default {
  components: { Icon, ElLayout },
  methods: {
    loadMenuData({ resolve }) {
      const token = storage.get('token')
      if (!token) return resolve([])
      api.system.menus().then(rsp => {
        setTimeout(() => addRoutes(rsp.data), 500)
        resolve(rsp.data)
      })
    }
  }
}
</script>
