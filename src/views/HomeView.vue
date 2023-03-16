<script setup lang="ts">
import { Table, Tag } from "ant-design-vue";
import { useContactsStore } from "@/stores/contacts";
import FilterInput from "@/components/FilterInput.vue";
import FilterTags from "@/components/FilterTags.vue";
import HomeTitle from "@/components/HomeTitle.vue";
import { onMounted } from "vue";

const columns = [
  // Antd table colums
  {
    name: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Phone Number",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Tags",
    key: "tags",
    dataIndex: "tags",
  },
];

const store = useContactsStore();

onMounted(() => {
  store.getContacts();
});
</script>

<template>
  <div>
    <div style="display: flex; align-items: center; justify-content: space-between">
      <HomeTitle />
      <FilterInput />
    </div>
    <FilterTags />

    <Table :columns="columns" :data-source="store.contacts">
      <template #headerCell="{ column }">
        <template v-if="column.key === 'name'">
          <span> Name </span>
        </template>
      </template>

      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'name'">
          <RouterLink :to="`/contact/${record.id}`">
            {{ record.name }}
          </RouterLink>
        </template>

        <template v-else-if="column.key === 'tags'">
          <span>
            <Tag v-for="tag in record.tags" :key="tag">
              {{ tag.toUpperCase() }}
            </Tag>
          </span>
        </template>
      </template>
    </Table>
  </div>
</template>
<style lang="scss" scoped></style>
