<script setup lang="ts">
import { TypographyTitle, Button } from "ant-design-vue";
import { PlusOutlined } from "@ant-design/icons-vue";
import { useRouter } from "vue-router";

const router = useRouter();
const onAddContact = () => {
  router.push("/contact/new");
};
</script>

<template>
  <div style="display: flex; align-items: center; gap: 10px">
    <TypographyTitle :level="3" style="margin: 0">Contacts</TypographyTitle>
    <Button @click="onAddContact" size="middle">
      <template #icon>
        <PlusOutlined />
      </template>
    </Button>
  </div>
</template>

<style lang="scss" scoped></style>
