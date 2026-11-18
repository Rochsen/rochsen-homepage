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
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 1rem;
    height: 50vh;
    width: 100%;
    margin-top: 2rem;
}

/* 左半边 */
.left-part {
    display: grid;
    grid-auto-flow: column;
    grid-template-rows: 1fr 1fr;
    gap: 1rem;
}

.sort-plan {
    background: #9ba840;
    height: 100%;
    width: 100%;
}

.time-block {
    background: #409ba8;
    height: 100%;
    width: 100%;
}

/* 右半边 */
.right-part {
    display: grid;
    grid-auto-flow: column;
    grid-template-rows: 3fr 1fr 1fr;
    gap: 1rem;
}

.simple-desc {
    background: #7640a8;
    height: 100%;
    width: 100%;
}

.typewriter-block {
    background: #a8405c;
    height: 100%;
    width: 100%;
}

.contact-block {
    background: #d5f80f;
    height: 100%;
    width: 100%;
}
</style>
