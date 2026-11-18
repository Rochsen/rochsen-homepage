<template>
  <div class="footer">
    <span class="footer-line">
      <span class="registration-img-container">
        <img class="registration-img" src="/registration.png" alt="" />
      </span>
      <span class="footer-line-text">
        <a href="{{ConfigData.footer.beian_url}}" rel="noreferrer" target="_blank">{{
          ConfigData.footer.beian
        }}</a>
        <a href="{{ConfigData.footer.icp_url}}" rel="noopener" target="_blank">{{
          ConfigData.footer.icp
        }}</a>
      </span>
    </span>
  </div>
</template>

<script setup lang="ts">
import { ConfigData } from '@/data/config'
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
</style>
