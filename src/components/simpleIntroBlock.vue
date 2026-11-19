<template>
  <div class="Intro-container">
    <div class="say-hi-block">niaho</div>

    <div class="tech-stack-block">
      <!-- <h2>我的技术栈是</h2> -->
      <div v-for="item in TechStackList" :key="item.name" class="tech-stack-item">
        <Icon :icon="item.icon" width="40" height="40" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import { ConfigData as siteConfig } from '@/data/config'
import { Icon } from '@iconify/vue'

const ConfigData = inject('ConfigData', siteConfig)
const TechStackList = ConfigData.techTack.techStack
</script>

<style lang="css" scoped>
.Intro-container {
  display: grid;
  grid-template-rows: 2fr 1fr;
  gap: 10px;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
}

.say-hi-block {
  display: flex;
  align-items: center;
  justify-content: center;
}

.tech-stack-block {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: var(--background-color);
  border-radius: 10px;
  padding: 10px;

  & .tech-stack-item {
    background-color: var(--background-color);
    border-radius: 10px;
    padding: 10px;
  }
}
</style>
