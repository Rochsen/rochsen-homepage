<template>
  <a class="linkBtn hover" :href="url ? url : '#'" target="_blank" :style="{ background: color }">
    <Icon :icon="icon || ''" width="36" height="36" />
    <span>{{ text }}</span>
  </a>
</template>
<script setup lang="ts">
import { Icon } from '@iconify/vue'

const props = defineProps({
  icon: String,
  text: String,
  color: String,
  url: String,
})
</script>
<style lang="css" scoped>
.linkBtn {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  height: 40px;
  border-radius: 16px;
  padding: 0.5rem 0.7rem;
  margin: 0.5rem 0;
  cursor: pointer;
  user-select: none;
  white-space: nowrap;
  color: #fff;

  &::before,
  &:hover::before {
    content: none;
  }

  & span {
    margin-left: 0.5rem;
  }
}

@media (max-width: 768px) {
  .linkBtn {
    width: 100%;
    box-sizing: border-box;
    height: 34px;
    margin: 0;
    padding: 0.25rem 0.4rem;
    font-size: 0.85rem;

    & svg {
      width: 20px;
      height: 20px;
    }
  }
}
</style>
