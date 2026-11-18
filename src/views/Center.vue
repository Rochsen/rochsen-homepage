<template>
  <div class="center">
    <div class="left-part">
      <div class="sort-plan"></div>
      <div class="time-block"></div>
    </div>
    <div class="right-part">
      <div class="simple-desc"></div>
      <div class="typewriter-block"></div>
      <div class="contact-block"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ConfigData } from '@/data/config'
</script>

<style>
.center {
  background: var(--card-background);
  border: 1px solid var(--card-border-color);
  margin: 1rem auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}
</style>
