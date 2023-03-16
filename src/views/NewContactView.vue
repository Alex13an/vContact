<script setup lang="ts">
import type { Contact } from "@/models/types";
import { useContactsStore } from "@/stores/contacts";
import { TypographyTitle } from "ant-design-vue";
import BackButton from "../components/BackButton.vue";
import ContactForm from "@/components/ContactForm.vue";
import { useRouter } from "vue-router";

const store = useContactsStore();
const router = useRouter();

const onSaveContact = async (e: Contact) => {
  store.addContact(e);
  router.push("/");
};
</script>

<template>
  <div style="position: relative">
    <BackButton />
    <TypographyTitle :level="4">New Contact</TypographyTitle>
    <ContactForm @save-contact="onSaveContact" />
  </div>
</template>

<style lang="scss" scoped></style>
