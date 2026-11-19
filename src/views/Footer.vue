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
import { computed, inject } from 'vue'

import { ConfigData as siteConfig } from '@/data/config'

const ConfigData = inject('ConfigData', siteConfig)

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

/* 窄屏备案与 ICP 上下排列，徽标只跟在公网安备那一行 */
@media (max-width: 768px) {
  .footer-line {
    display: inline-grid;
    grid-template-columns: auto auto;
    column-gap: 0.25rem;
    row-gap: 0.15rem;
    align-items: center;
    justify-content: center;
  }

  .registration-img-container {
    grid-row: 1;
    grid-column: 1;
    margin-right: 0;
  }

  .footer-line-text {
    display: contents;
  }

  .footer-line-text a:first-child {
    grid-row: 1;
    grid-column: 2;
  }

  .footer-line-text a:last-child {
    grid-row: 2;
    grid-column: 1 / -1;
    justify-self: center;
  }
}
</style>
