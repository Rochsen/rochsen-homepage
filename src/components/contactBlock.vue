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
  width: 100%;
  height: 100%;
  font-size: 1rem;
  color: #fff;
}
</style>
