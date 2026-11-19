<template>
  <div class="plan-list">
    <div v-for="item in PlanList" :key="item.detail" class="plan-item">
      <span class="plan-item-status" v-if="item.status">✅</span>
      <span class="plan-item-status" v-else>🚧</span>
      <span class="plan-item-detail">
        <span v-if="item.status">
          <del>{{ item.detail }}</del>
        </span>
        <span v-else>
          {{ item.detail }}
        </span>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import { ConfigData as siteConfig } from '@/data/config'

const ConfigData = inject('ConfigData', siteConfig)
const PlanList = ConfigData.plan.todoList
</script>

<style scoped>
/* 清单超出卡片剩余高度时，使用浏览器滚动条 */
.plan-list {
  height: 100%;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: var(--card-border-color) transparent;
}

.plan-item {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;

  & .plan-item-status {
    font-size: 1.2rem;
    font-weight: bold;
    margin-right: 0.5rem;
  }

  & .plan-item-detail {
    border-bottom: 2px dashed var(--text-color);
  }
}
</style>
