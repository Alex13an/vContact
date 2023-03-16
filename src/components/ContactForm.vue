<script setup lang="ts">
import type { Contact } from "@/models/types";
import { Form, FormItem, Input, Button, InputSearch, Tag } from "ant-design-vue";
import { reactive, ref } from "vue";

const props = defineProps<{
  contact?: Contact;
}>();

const emit = defineEmits<{
  (e: "saveContact", data: Contact): void;
}>();

const formState = reactive({
  name: props.contact?.name || "",
  phone: props.contact?.phone || "",
  email: props.contact?.email || "",
});

const tags = ref<string[]>(props.contact?.tags || []);
const inputTag = ref<string>("");

const onCloseTag = (tag: string) => {
  tags.value = tags.value.filter((t) => t !== tag);
};

const addTag = () => {
  if (inputTag.value && !tags.value.some((t) => t === inputTag.value)) {
    tags.value.push(inputTag.value.toLowerCase());
  }
  inputTag.value = "";
};

const onFinish = () => {
  emit("saveContact", { ...formState, tags: tags.value });
};
</script>

<template>
  <div class="form">
    <Form :model="formState" name="basic" :label-col="{ span: 2 }" autocomplete="off" @finish="onFinish">
      <FormItem label="Name" name="name" :rules="[{ required: true, message: 'Please input name' }]">
        <Input v-model:value="formState.name" />
      </FormItem>

      <FormItem label="Phone" name="phone" :rules="[{ required: true, message: 'Please input phone number' }]">
        <Input v-model:value="formState.phone" />
      </FormItem>

      <FormItem label="Email" name="email" :rules="[{ required: true, message: 'Please input email' }]">
        <Input v-model:value="formState.email" />
      </FormItem>

      <FormItem label="Tags">
        <InputSearch placeholder="Add new tag" enter-button="Add" @search="addTag" v-model:value="inputTag" />
        <div style="gap: 0.4rem; display: flex; flex-wrap: wrap; margin: 1rem 0">
          <Tag v-for="tag in tags" :key="tag" closable @close.prevent="() => onCloseTag(tag)">
            {{ tag }}
          </Tag>
        </div>
      </FormItem>

      <FormItem :wrapper-col="{ offset: 8, span: 16 }">
        <Button type="primary" html-type="submit">Save</Button>
      </FormItem>
    </Form>
  </div>
</template>

<style lang="scss" scoped></style>
