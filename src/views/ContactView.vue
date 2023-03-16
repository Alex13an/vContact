<script setup lang="ts">
import type { Contact } from "@/models/types";
import { useContactsStore } from "@/stores/contacts";
import { Descriptions, DescriptionsItem, Tag, Divider, Button, TypographyTitle } from "ant-design-vue";
import { onMounted, ref } from "vue";
import BackButton from "../components/BackButton.vue";
import { useRoute, useRouter } from "vue-router";
import PreLoader from "../components/PreLoader.vue";
import ContactForm from "@/components/ContactForm.vue";

const router = useRouter();
const route = useRoute();
const contact = ref<Contact | null>(null);
const isEditing = ref<boolean>(false);
const store = useContactsStore();

onMounted(async () => {
  contact.value = await store.getContact(Number(route.params.id));
});

const onSaveContact = async (e: Contact) => {
  store.saveContact({ ...e, id: Number(route.params.id) });
  contact.value = {
    ...contact.value,
    ...e,
  };
  isEditing.value = false;
};

const onDeleteContact = () => {
  const sure = confirm("Are you sure?");

  if (!sure) {
    return;
  }

  store.deleteContact(Number(route.params.id));
  router.push("/");
};
</script>

<template>
  <PreLoader v-if="!contact" />
  <div v-else style="position: relative">
    <BackButton />
    <TypographyTitle :level="4">Contact info</TypographyTitle>
    <div v-if="!isEditing">
      <Descriptions>
        <DescriptionsItem label="UserName">{{ contact.name }}</DescriptionsItem>
        <DescriptionsItem label="Phone Number">{{ contact.phone }}</DescriptionsItem>
        <DescriptionsItem label="Email">{{ contact.email }}</DescriptionsItem>
      </Descriptions>
      <Tag v-for="tag in contact.tags" :key="tag">
        {{ tag }}
      </Tag>
      <Divider />
      <Button type="primary" @click="() => (isEditing = true)">Edit</Button>
      <Divider type="vertical" />
      <Button danger @click="onDeleteContact">Delete</Button>
    </div>
    <ContactForm v-else :contact="contact" @save-contact="onSaveContact" />
  </div>
</template>

<style lang="scss" scoped></style>
