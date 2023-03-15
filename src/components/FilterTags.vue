<script setup lang="ts">
import { Tag } from "ant-design-vue";
import { useFiltersStore } from "@/stores/filters";
import type { Filter } from "@/models/types";
import { capitilizeFirstLetter } from "@/utils/capitalizeFirstLetter";

const store = useFiltersStore();

const onCloseTag = (tag: Filter) => {
  store.removeFilter(tag);
};
</script>

<template>
  <div style="gap: 0.4rem; display: flex; flex-wrap: wrap; margin: 1rem 0">
    <Tag
      v-for="filter in store.filters"
      :key="filter.value + filter.type"
      closable
      @close.prevent="() => onCloseTag(filter)"
    >
      {{ (filter.type !== "tags" ? capitilizeFirstLetter(filter.type) + ": " : "") + filter.value }}
    </Tag>
  </div>
</template>

<style lang="scss" scoped></style>
