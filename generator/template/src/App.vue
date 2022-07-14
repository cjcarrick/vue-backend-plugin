<script setup lang="ts">
import { Suspense } from 'vue'
import TodoList from '@/components/TodoList.vue'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
  <Suspense>
    <!-- component with nested async dependencies -->
    <TodoList />

    <!-- loading state via #fallback slot -->
    <template #fallback> Loading... </template>
  </Suspense>
</template>

<!-- 
  At least an empty style block is required for the index.scss to be appended.
  It can't be scoped, because the index.scss inludes styles that are applied to the body element.
-->
<style lang="scss">
//
</style>

<style scoped lang="scss">
hr {
  opacity: 0.2;
}
</style>
