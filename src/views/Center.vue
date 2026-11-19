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
                <div v-for="item in PlanList" :key="item.detail" class="plan-item">
                    <div class="plan-item-status" v-if="item.status">✅</div>
                    <div class="plan-item-status" v-else>🚧</div>
                    <span class="plan-item-detail">{{ item.detail }}</span>
                </div>
            </div>
        </div>

        <!-- 已经过去的时间：今日、本周、本月、今年 -->
        <div class="card">
            <div class="card-title-line">
                <span class="card-title">时光</span>
                <div class="title-icon"></div>
            </div>
            <div class="card-content">
                <div class="time-item">
                    <span>今日已过去：{{ todayHours }} / 24 小时</span>
                    <div class="time-item-progress" :style="{ width: `${todayHours / 24 * 100}%` }"></div>
                </div>
                <div class="time-item">
                    <span>本周已过去：{{ weekDays }} / 7 天</span>
                    <div class="time-item-progress" :style="{ width: `${weekDays / 7 * 100}%` }"></div>
                </div>
                <div class="time-item">
                    <span>本月已过去：{{ monthDays }} / {{ monthTotal }} 天</span>
                    <div class="time-item-progress" :style="{ width: `${(monthDays / monthTotal) * 100}%` }"></div>
                </div>
                <div class="time-item">
                    <span>今年已过去：{{ yearDays }} / {{ yearTotal }} 天</span>
                    <div class="time-item-progress" :style="{ width: `${(yearDays / yearTotal) * 100}%` }"></div>
                </div>
            </div>
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

<style>
/* 中部 */
.center {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 1rem;
    height: 50vh;
    width: 100%;
    margin-top: 2rem;
    color: var(--text-color);
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
    border-bottom: 1px solid var(--card-border-color);

    & .plan-item-status {
        font-size: 1.2rem;
        font-weight: bold;
        margin-right: .5rem;
    }
}

/* 时光块 */
.time-item {
    width: 100%;
    margin-bottom: 1rem;

    .time-item-progress {
        height: 10px;
        background: var(--card-border-color);
        transition: width 0.3s ease-in-out;
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
