<template>
  <div class="contact-block">
    <LinkBtn
      v-for="(item, index) in contact"
      :key="index"
      :icon="item.icon"
      :text="item.text"
      :color="item.color"
      :url="item.url"
    />
  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import LinkBtn from '@/utils/components/LinkBtn.vue'
import { ConfigData as siteConfig } from '@/data/config'

// 联系方式
const ConfigData = inject('ConfigData', siteConfig)
const contact = ConfigData.contact.linkBtn
</script>

<style lang="css" scoped>
.contact-block {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  min-width: 0;
  padding: 0.25rem;
  font-size: 1rem;
  color: #fff;
}

/* 小屏固定每行两个，避免单独剩一个按钮 */
@media (max-width: 768px) {
  .contact-block {
    display: grid;
    grid-template-columns: 1fr 1fr;
    justify-items: stretch;
    align-content: center;
    gap: 0.6rem 0.75rem;
  }
}
</style>
