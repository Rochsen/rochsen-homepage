<template>
  <div>
    <!-- -->
  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue';
import { ConfigData as siteConfig } from '@/data/config'

const ConfigData = inject('ConfigData', siteConfig)

</script>

<style lang="css" scoped>

</style>