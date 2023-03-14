<script setup lang="ts">
import { RouterView, RouterLink } from "vue-router";
import { Layout, LayoutHeader, LayoutContent, LayoutFooter } from "ant-design-vue";
</script>

<template>
  <Layout class="layout">
    <LayoutHeader>
      <RouterLink class="title" to="/">vContact</RouterLink>
    </LayoutHeader>
    <LayoutContent style="padding: 0 50px">
      <div :style="{ background: '#fff', padding: '24px', minHeight: '280px' }">
        <RouterView />
      </div>
    </LayoutContent>
    <LayoutFooter style="position: absolute; left: 50%; transform: translateX(-50%); bottom: 10px">
      An Alexandr ©2023 AX Technology
    </LayoutFooter>
  </Layout>
</template>

<style scoped>
.title {
  color: white;
  font-size: 1.3rem;
}

.site-layout-content {
  min-height: 280px;
  padding: 24px;
  background: #fff;
}
#components-layout-demo-top .logo {
  float: left;
  width: 120px;
  height: 31px;
  margin: 16px 24px 16px 0;
  background: rgba(255, 255, 255, 0.3);
}
.ant-row-rtl #components-layout-demo-top .logo {
  float: right;
  margin: 16px 0 16px 24px;
}

[data-theme="dark"] .site-layout-content {
  background: #141414;
}
</style>
