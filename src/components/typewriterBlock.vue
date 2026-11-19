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
  flex-wrap: nowrap;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  min-width: 0;
  background-color: var(--background-color);
  border-radius: 10px;
  padding: 10px;

  /* 引号保持原尺寸，文字在中间换行，避免引号被挤到上一行变成黑点 */
  :deep(svg) {
    flex-shrink: 0;
  }

  :deep(.typewriter) {
    min-width: 0;
    max-width: calc(100% - 3rem);
  }
}
</style>
