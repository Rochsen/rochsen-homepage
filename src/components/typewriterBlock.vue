<template>
  <div class="typewriter-block">
    <Icon icon="carbon:quotes" width="14" height="14" />
    <span style="margin-right: 10px"></span>
    <Typewriter :text="typewriterText" />
    <span style="margin-left: 10px"></span>
    <Icon icon="ph:quotes-fill" width="14" height="14" />
  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import { ConfigData as siteConfig } from '@/data/config'
import Typewriter from '@/utils/components/Typewriter.vue'
import { Icon } from '@iconify/vue'

// 打字机文本数组
const ConfigData = inject('ConfigData', siteConfig)

const typewriterText = ConfigData.typewriter
</script>

<style lang="css" scoped>
.typewriter-block {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  min-width: 0;
  background-color: var(--background-color);
  border-radius: 10px;
  padding: 10px;

  :deep(.typewriter) {
    min-width: 0;
    max-width: 100%;
  }
}
</style>
