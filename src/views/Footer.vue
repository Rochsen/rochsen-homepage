<template>
  <div class="footer">
    <span class="footer-line">
      <span class="registration-img-container">
        <img class="registration-img" src="/registration.png" alt="" />
      </span>
      <span class="footer-line-text">
        <a :href="`${BeianUrl}`" rel="noreferrer" target="_blank">{{ Beian }}</a>
        <a :href="`${IcpUrl}`" rel="noopener" target="_blank">{{ Icp }}</a>
      </span>
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ConfigData } from '@/data/config'

// 页脚数据
const FooterData = ConfigData.footer

// 备案信息
const BeianUrl = computed(() => FooterData.beian_url)
const IcpUrl = computed(() => FooterData.icp_url)
const Beian = computed(() => FooterData.beian)
const Icp = computed(() => FooterData.icp)
</script>

<style scoped>
a {
  color: var(--text-color);

  &::before {
    background: none;
  }

  &:hover {
    color: var(--text-color);

    &::before {
      background: none;
      height: 2px;
    }
  }
}

.footer {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
  color: var(--text-color);
  font-size: 0.8rem;
  padding: 0.5rem 0;
}

.footer-line {
  display: inline-flex;
  align-items: flex-end;
  vertical-align: bottom;
  max-width: 100%;
  box-sizing: border-box;
  padding: 0 0.75rem;
  flex-wrap: wrap;
  justify-content: center;
}

.registration-img-container {
  display: inline-block;
  width: 16px;
  flex-shrink: 0;
  margin-right: 0.25rem;
  line-height: 0;
}

.registration-img {
  display: block;
  width: 100%;
  height: auto;
  border: 0;
}

.footer-line-text {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5px;
}

/* 窄屏备案与 ICP 改为上下排列，避免文字被挤断 */
@media (max-width: 768px) {
  .footer-line-text {
    grid-template-columns: 1fr;
    justify-items: center;
  }
}
</style>
