<template>
  <div class="header">
    <img class="avatar-img" src="/avatar.webp" alt="avatar" />
    <div class="say-hello">
      <h1>
        Hi, I'm <span>{{ ConfigData.name }}</span>
      </h1>
      <div class="tag-line">
        <div class="tag">{{ ConfigData.tag.gender }}</div>
        <div class="tag">{{ ConfigData.tag.age }}</div>
        <div class="tag">{{ ConfigData.tag.location }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ConfigData } from '@/data/config'
</script>

<style>
.header {
  display: flex;
  align-items: center;
}

/* 头像样式 */
.avatar-img {
  width: 9rem;
  height: 9rem;
  border-radius: 50%;
  margin-right: 1rem;
  position: relative;
}

/* tag 所处块样式 */
.tag-line {
  display: flex;
  flex-direction: row;
}

/* tag 样式 */
.tag {
  background: var(--card-background);
  border-radius: 16px;
  border: 1px solid var(--card-border-color);
  padding: 0.5rem 0.5rem;
  margin-right: 0.5rem;
}
</style>
