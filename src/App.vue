<script setup lang="ts">
import { RouterView, RouterLink } from "vue-router";
import { Layout, LayoutHeader, LayoutContent, LayoutFooter } from "ant-design-vue";
</script>

<template>
  <Layout class="layout">
    <LayoutHeader>
      <RouterLink class="title" to="/">vContact</RouterLink>
    </LayoutHeader>
    <LayoutContent class="content">
      <div :style="{ background: '#fff', padding: '24px', minHeight: '280px' }">
        <RouterView />
      </div>
    </LayoutContent>
    <LayoutFooter style="text-align: center"> An Alexandr ©2023 AX Technology </LayoutFooter>
  </Layout>
</template>

<style scoped>
.title {
  color: white;
  font-size: 1.3rem;
}

.layout {
  min-height: 100vh;
}

.content {
  padding: 0 50px;
}

@media only screen and (max-width: 600px) {
  .content {
    padding: 0;
  }
}
</style>
