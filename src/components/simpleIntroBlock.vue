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
    <div class="tech-stack-items" @scroll="hideTip">
      <div
        v-for="item in TechStackList"
        :key="item.name"
        class="tech-stack-item"
        :aria-label="item.name"
        @mouseenter="showTip($event, item.name)"
        @mouseleave="hideTip"
      >
        <Icon :icon="item.icon" width="40" height="40" />
      </div>
    </div>
  </div>
  <Teleport to="body">
    <div v-show="tip.visible" class="tech-tip" :style="{ left: `${tip.x}px`, top: `${tip.y}px` }">
      {{ tip.text }}
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { inject, reactive } from 'vue'
import { ConfigData as siteConfig } from '@/data/config'
import { Icon } from '@iconify/vue'

const ConfigData = inject('ConfigData', siteConfig)
const TechStackList = ConfigData.techTack.techStack

// 图标悬停提示，固定定位以免被横向滚动容器裁切
const tip = reactive({
  visible: false,
  text: '',
  x: 0,
  y: 0,
})

function showTip(event: MouseEvent, name: string) {
  const target = event.currentTarget as HTMLElement
  const rect = target.getBoundingClientRect()
  tip.text = name
  tip.x = rect.left + rect.width / 2
  tip.y = rect.top
  tip.visible = true
}

function hideTip() {
  tip.visible = false
}
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

/* 技术栈名称提示 */
.tech-tip {
  position: fixed;
  z-index: 30;
  padding: 0.15rem 0.5rem;
  border-radius: 8px;
  font-size: 0.8rem;
  line-height: 1.4;
  white-space: nowrap;
  color: var(--background);
  background: var(--text-color);
  pointer-events: none;
  transform: translate(-50%, calc(-100% - 8px));
  transition: none;
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
