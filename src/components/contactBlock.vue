<template>
  <div></div>
</template>

<script setup>
import { inject } from 'vue';
import { ConfigData as siteConfig } from '@/data/config'

// 联系方式
const ConfigData = inject('ConfigData', siteConfig)
const contact = ConfigData.contact.linkBtn

</script>

<style lang="css" scoped>

</style>