<template>
  <main><MainCard /></main>
  <div class="reThemeBtn" @click="changeTheme">
    {{ theme == 'light' ? '🔆' : '🌙' }}
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import MainCard from './views/MainCard.vue'

/* 主题 */
let theme = ref(localStorage.getItem('theme') || 'light')
document.body.style.overflow = 'hidden'

/* 切换主题 */
const changeTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
  onTheme(theme.value)
  console.log(theme.value)
}

/* 设置主题 */
const onTheme = (theme: string) => {
  document.body.setAttribute('theme', theme)
  localStorage.setItem('theme', theme)
}

/* 挂载 */
onMounted(() => {
  document.body.setAttribute('theme', theme.value)
  setTimeout(() => {
    document.body.style.overflow = ''
  }, 300)
})
</script>

<style>
@import url('styles/App.css');
</style>
