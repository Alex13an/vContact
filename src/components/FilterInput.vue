<script setup lang="ts">
import { InputSearch, Dropdown, Menu, MenuItem, Checkbox, Tooltip } from "ant-design-vue";
import { DownOutlined } from "@ant-design/icons-vue";
import { ref } from "vue";
import { useFiltersStore } from "@/stores/filters";
import type { FilterTypes } from "@/models/types";
import { capitilizeFirstLetter } from "@/utils/capitalizeFirstLetter";

const filters: FilterTypes[] = ["name", "phone", "email", "tags"];
const currentFilter = ref<FilterTypes>("name");
const filterString = ref<string>("");

const store = useFiltersStore();

const onSearch = async () => {
  if (!filterString.value) {
    return;
  }
  if (!store.filters.some((filter) => filter.type === currentFilter.value && filter.value === filterString.value)) {
    store.addFilter({ type: currentFilter.value, value: filterString.value });
  }
  filterString.value = "";
};

const onToggleStrictMode = () => {
  store.setStrictMode(!store.isFilterStrict);
};
</script>

<template>
  <div style="display: flex; align-items: center; gap: 20px">
    <Dropdown>
      <a class="ant-dropdown-link" @click.prevent>
        Filter: {{ capitilizeFirstLetter(currentFilter) }}
        <DownOutlined />
      </a>
      <template #overlay>
        <Menu>
          <MenuItem v-for="filter in filters" :key="filter">
            <div @click="() => (currentFilter = filter)">{{ capitilizeFirstLetter(filter) }}</div>
          </MenuItem>
        </Menu>
      </template>
    </Dropdown>

    <InputSearch :placeholder="currentFilter" style="width: 200px" @search="onSearch" v-model:value="filterString" />

    <Tooltip placement="bottom">
      <template #title>
        <span>Strict Search</span>
      </template>
      <Checkbox v-model="store.isFilterStrict" @change="onToggleStrictMode" />
    </Tooltip>
  </div>
</template>

<style lang="scss" scoped></style>
