<template>
  <div class="main-page">
    <Header />
    <Center />
    <Footer />
  </div>
</template>

<script setup lang="ts">
// vue 相关
import { provide } from 'vue'

// 自建组件
import Header from './Header.vue'
import Center from './Center.vue'
import Footer from './Footer.vue'

// 自建数据
import { ConfigData } from '@/data/config.ts'

// 提供数据，作为全局数据
provide('ConfigData', ConfigData)
</script>

<style scoped>
@import url('../styles/config.css');
</style>
