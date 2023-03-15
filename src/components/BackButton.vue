<script setup>
import { ArrowLeftOutlined } from "@ant-design/icons-vue";
</script>

<template>
  <ArrowLeftOutlined @click="$router.go(-1)" class="arrow" />
</template>

<style lang="scss" scoped>
.arrow {
  position: absolute;
  left: -3rem;
  top: 1rem;
  color: #1890ff;
  margin-right: 1rem;
  font-size: 1.1rem;
  transition: color 0.2s ease;
  cursor: pointer;
  &:hover,
  &:focus {
    color: rgba($color: #1890ff, $alpha: 0.5);
  }
}
</style>
