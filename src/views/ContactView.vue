<script setup lang="ts">
import type { Contact } from "@/models/types";
import { useContactsStore } from "@/stores/contacts";
import { Descriptions, DescriptionsItem, Tag, Divider, Button } from "ant-design-vue";
import { onMounted, ref } from "vue";
import BackButton from "../components/BackButton.vue";
import { useRoute } from "vue-router";
import PreLoader from "../components/PreLoader.vue";

const contact = ref<Contact | null>(null);
const store = useContactsStore();
const route = useRoute();

onMounted(async () => {
  contact.value = await store.getContact(Number(route.params.id));
});
</script>

<template>
  <PreLoader v-if="!contact" />
  <div v-else style="position: relative">
    <BackButton />
    <Descriptions title="Contact Info">
      <DescriptionsItem label="UserName">{{ contact.name }}</DescriptionsItem>
      <DescriptionsItem label="Phone Number">{{ contact.phone }}</DescriptionsItem>
      <DescriptionsItem label="Email">{{ contact.email }}</DescriptionsItem>
    </Descriptions>
    <Tag v-for="tag in contact.tags" :key="tag">
      {{ tag }}
    </Tag>
    <Divider />
    <Button type="primary">Edit</Button>
    <Divider type="vertical" />
    <Button danger>Delete</Button>
  </div>
</template>

<style lang="scss" scoped></style>
