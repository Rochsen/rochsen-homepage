<template>
  <div class="Intro-container">
    <p>你好鸭，很高兴认识你👋</p>
    <p>
      我叫
      <b>{{ ConfigData.name }}</b>
      （ {{ ConfigData.mbti }}：{{ ConfigData.mbti_cn }} ）
    </p>
    <p>
      是一名
      <span v-for="(char, index) in ConfigData.character" :key="index">
        <b>{{ char }}</b>
        <span v-if="index < ConfigData.character.length - 1">、</span>
      </span>
    </p>
    <h3>我的一些技术栈 👇</h3>
    <div class="tech-stack-items">
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
/* 介绍容器：各段在卡片内垂直均匀分布 */
.Intro-container {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  box-sizing: border-box;
  width: 100%;
  height: 100%;

  p,
  h3 {
    margin: 0;
  }

  p {
    padding-left: 1rem;
    line-height: 1.7;
  }

  /* 技术栈介绍标题 */
  h3 {
    font-size: 1.2rem;
    font-weight: bold;
    text-align: left;
    padding-left: 1rem;
    line-height: 1.7;
  }

  /* 技术栈块容器 */
  .tech-stack-items {
    display: flex;
    align-items: center;
    justify-content: safe center;
    flex-wrap: nowrap;
    margin: 0;
    min-width: 0;
    overflow-x: auto;
    scrollbar-width: thin;
    scrollbar-color: var(--card-border-color) transparent;

    /* 单项技术栈 */
    & .tech-stack-item {
      background-color: var(--techItem-background-color);
      border-radius: 10px;
      border: 1px solid var(--card-border-color);
      margin: 0 3.2px;
      width: 52px;
      height: 52px;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}

/* 小屏拉开介绍行距，避免几段文字挤在一起 */
@media (max-width: 768px) {
  .Intro-container {
    justify-content: space-evenly;
    padding: 0.75rem 0.25rem;
    gap: 0.65rem;

    p,
    h3 {
      padding-left: 0.85rem;
      padding-right: 0.85rem;
    }
  }
}
</style>
