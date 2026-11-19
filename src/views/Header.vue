<template>
  <div class="header">
    <img class="avatar-img" src="/avatar.webp" alt="avatar" />
    <div class="say-hello">
      <h1>
        Hi, I'm <span class="name" :data-text="ConfigData.name">{{ ConfigData.name }}</span>
      </h1>
      <div class="tag-line">
        <div class="tag">{{ ConfigData.tag.gender === '男' ? '♂' : '♀' }}</div>
        <div class="tag">{{ ConfigData.tag.age }}</div>
        <div class="tag">{{ ConfigData.tag.location }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import { ConfigData as siteConfig } from '@/data/config'

const ConfigData = inject('ConfigData', siteConfig)
</script>

<style>
.header {
  display: flex;
  align-items: center;
  color: var(--text-color);
}

.say-hello {
  min-width: 0;

  h1 {
    font-size: clamp(1.35rem, 5vw, 2rem);
  }

  .name {
    position: relative;
    display: inline-block;
    color: rgba(0, 0, 0, 0.1);

    &::before {
      content: attr(data-text);
      position: absolute;
      top: 0;
      left: 0;
      color: var(--theme-color);
      width: 0;
      white-space: nowrap;
      filter: drop-shadow(0 0 5px var(--theme-color));
      overflow: hidden;
      animation: showName 3s ease-in-out infinite;
      border-right: 4px solid var(--theme-color);
      z-index: 10;
    }
  }
}

/* 头像样式 */
.avatar-img {
  width: clamp(4.5rem, 22vw, 9rem);
  height: clamp(4.5rem, 22vw, 9rem);
  flex-shrink: 0;
  border-radius: 50%;
  margin-right: 1rem;
  position: relative;
}

/* tag 所处块样式 */
.tag-line {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

/* tag 样式 */
.tag {
  background: var(--card-background);
  border-radius: 16px;
  border: 1px solid var(--card-border-color);
  padding: 0.5rem 0.5rem;
  margin-right: 0.5rem;
}

@keyframes showName {
  0% {
    width: 0;
  }

  50% {
    width: 105%;
  }

  100% {
    width: 0;
  }
}
</style>
