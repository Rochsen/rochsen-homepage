<template>
  <div class="typewriter-block">
    <Typewriter :text="typewriterText" />
  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue';
import { ConfigData as siteConfig } from '@/data/config'

// 打字机文本数组
const ConfigData = inject('ConfigData', siteConfig)
const typewriterText = ConfigData.typewriter

</script>

<style lang="css" scoped>
.typewriter-block {
  width: 100%;
  height: 100%;
  background-color: var(--background-color);
  border-radius: 10px;
  padding: 10px;
}
</style>