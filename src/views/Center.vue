<template>
  <div class="center">
    <div class="left-part">
      <!-- 今年计划 -->
      <div class="card">
        <div class="card-title-line">
          <span class="card-title">今年计划</span>
          <div class="title-icon"></div>
        </div>
        <div class="card-content">
          <div v-for="item in PlanList" :key="item.item" class="plan-item">
            <div class="plan-item-status" v-if="item.status == '已完成'">✅</div>
            <div class="plan-item-status" v-if="item.status == '进行中'">🚧</div>
            <span class="plan-item-title">{{ item.item }}</span>
          </div>
        </div>
      </div>

      <!-- 已经过去的时间：今日、本周、本月、今年 -->
      <div class="card">
        <div class="card-title-line">
          <span class="card-title">时光</span>
          <div class="title-icon"></div>
        </div>
        <div class="card-content"></div>
      </div>
    </div>
    <div class="right-part">
      <!-- 简单自我介绍 -->
      <div class="card"></div>
      <!-- 打字机块 -->
      <div class="card"></div>
      <!-- 联系方式 -->
      <div class="card"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ConfigData } from '@/data/config'

// 今年计划列表
const PlanList = ConfigData.plan.todoList
</script>

<style>
/* 中部 */
.center {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 1rem;
  height: 50vh;
  width: 100%;
  margin-top: 2rem;
}

/* 左半边 */
.left-part {
  display: grid;
  grid-auto-flow: column;
  grid-template-rows: 1fr 1fr;
  gap: 1rem;
}

/* 右半边 */
.right-part {
  display: grid;
  grid-auto-flow: column;
  grid-template-rows: 3fr 1fr 1.5fr;
  gap: 1rem;
}

/* 卡片 */
.card {
  background: var(--card-background);
  border: 1px solid var(--card-border-color);
  border-radius: 1rem;
  width: 100%;
  height: 100%;

  & .card-title-line {
    padding: 1rem;
    /* border-bottom: 1px solid var(--card-border-color); */

    & .card-title {
      font-size: 1.2rem;
      font-weight: bold;
      text-align: left;
    }

    & .title-icon {
      width: 100%;
      height: 100%;
      background: var(--card-border-color);
    }
  }

  & .card-content {
    padding: 0 1rem;
  }
}

/* 计划块 */
.plan-item {
  display: flex;
  align-items: center;

  & .plan-item-status {
    font-size: 1.2rem;
    font-weight: bold;
    margin-right: .5rem;
  }
}

/* 响应式尺寸 */
/* 窄屏改为上下排列，高度仍随视口变化 */
@media (max-width: 768px) {
  .center {
    grid-template-columns: 1fr;
    height: auto;
  }

  .left-part {
    height: 36vh;
    min-height: 12rem;
  }

  .right-part {
    height: 42vh;
    min-height: 14rem;
  }
}
</style>
