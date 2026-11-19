<template>
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
</template>

<script setup lang="ts">
import { inject } from 'vue'
import { ConfigData as siteConfig } from '@/data/config'

const ConfigData = inject('ConfigData', siteConfig)
const PlanList = ConfigData.plan.todoList
</script>

<style scoped>
.plan-item {
  display: flex;
  align-items: center;
  border-bottom: 2px dashed var(--card-border-color);
  margin-bottom: .5rem;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: var(--card-border-color) transparent;
  max-height: 20vh;

  & .plan-item-status {
    font-size: 1.2rem;
    font-weight: bold;
    margin-right: 0.5rem;
  }

  & .plan-item-detail {}
}
</style>
