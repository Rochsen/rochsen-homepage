<template>
  <div class="center">
    <div class="left-part">
      <div class="card card-scroll">
        <div class="card-title-line">
          <span class="card-title">今年计划 📒</span>
        </div>
        <div class="card-content">
          <PlanBlock />
        </div>
      </div>
      <div class="card">
        <div class="card-title-line">
          <span class="card-title">时光 ⌛</span>
        </div>
        <div class="card-content">
          <TimeBlock />
        </div>
      </div>
    </div>

    <div class="right-part">
      <!-- 简单自我介绍 -->
      <div class="card">
        <SimpleIntroBlock />
      </div>
      <!-- 打字机块 -->
      <div class="card">
        <TypewriterBlock />
      </div>
      <!-- 联系方式 -->
      <div class="card">
        <ContactBlock />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 左半部分
import PlanBlock from '@/components/planBlock.vue'
import TimeBlock from '@/components/timeBlock.vue'
// 右半部分
import SimpleIntroBlock from '@/components/simpleIntroBlock.vue'
import TypewriterBlock from '@/components/typewriterBlock.vue'
import ContactBlock from '@/components/contactBlock.vue'
</script>

<style>
/* 中部 */
.center {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 2fr);
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
  grid-template-rows: 0.8fr 1fr;
  gap: 1rem;
  height: 100%;
  min-width: 0;
  align-content: stretch;
}

/* 右半边 */
.right-part {
  display: grid;
  grid-auto-flow: column;
  grid-template-rows: 3fr 0.5fr 1.5fr;
  gap: 2rem;
  height: 100%;
  min-width: 0;
  align-content: stretch;
}

/* 卡片 */
.card {
  background: var(--card-background);
  border: 1px solid var(--card-border-color);
  border-radius: 1rem;
  width: 100%;
  height: 100%;
  min-width: 0;
  box-sizing: border-box;

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

/* 计划卡片固定高度，清单在内容区里滚动 */
.card-scroll {
  display: flex;
  flex-direction: column;
  min-height: 0;
  overflow: hidden;

  & .card-content {
    flex: 1;
    min-height: 0;
  }
}

/* 窄屏上下排列，左右两块仍保持同样高度 */
@media (max-width: 768px) {
  .center {
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: minmax(22rem, 50vh) minmax(22rem, 50vh);
    height: auto;
  }

  .left-part,
  .right-part {
    height: 100%;
  }

  /* 窄屏先看右半边，再看左半边 */
  .right-part {
    order: 1;
    gap: 1rem;
  }

  .left-part {
    order: 2;
  }
}
</style>
