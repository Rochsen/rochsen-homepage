<template>
  <div class="time-item">
    <span>今日已过去：{{ todayHours }} / 24 小时</span>
    <div class="time-item-track">
      <div class="time-item-progress" :style="{ width: `${(todayHours / 24) * 100}%` }"></div>
    </div>
  </div>
  <div class="time-item">
    <span>本周已过去：{{ weekDays }} / 7 天</span>
    <div class="time-item-track">
      <div class="time-item-progress" :style="{ width: `${(weekDays / 7) * 100}%` }"></div>
    </div>
  </div>
  <div class="time-item">
    <span>本月已过去：{{ monthDays }} / {{ monthTotal }} 天</span>
    <div class="time-item-track">
      <div
        class="time-item-progress"
        :style="{ width: `${(monthDays / monthTotal) * 100}%` }"
      ></div>
    </div>
  </div>
  <div class="time-item">
    <span>今年已过去：{{ yearDays }} / {{ yearTotal }} 天</span>
    <div class="time-item-track">
      <div class="time-item-progress" :style="{ width: `${(yearDays / yearTotal) * 100}%` }"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 今日已过去的小时数
const todayHours = new Date().getHours()
// 本周已过去的天数
const weekDays = new Date().getDay()
// 本月已过去的天数
const monthDays = new Date().getDate()
// 今年已过去的天数（含今天），总天数按平年 365、闰年 366
const now = new Date()

// 本月总天数：下个月第 0 天就是本月最后一天
const monthTotal = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate()

const yearStart = new Date(now.getFullYear(), 0, 1)
const yearDays = Math.floor((now.getTime() - yearStart.getTime()) / (24 * 60 * 60 * 1000)) + 1
const yearTotal = new Date(now.getFullYear(), 1, 29).getMonth() === 1 ? 366 : 365
</script>

<style scoped>
.time-item {
  width: 100%;
  margin-bottom: 0.85rem;

  .time-item-track {
    width: 100%;
    height: 8px;
    margin-top: 0.35rem;
    border-radius: 999px;
    overflow: hidden;
    background: color-mix(in srgb, var(--text-color) 12%, transparent);
  }

  .time-item-progress {
    height: 100%;
    border-radius: inherit;
    background: var(--theme-color);
    transition: width 0.3s ease-in-out;
  }
}
</style>
