<script setup>
import { Descriptions, DescriptionsItem, Tag, Divider, Button } from "ant-design-vue";
import RouterBackButton from "../components/RouterBackButton.vue";
</script>

<template>
  <div style="position: relative">
    <RouterBackButton />
    <Descriptions title="Contact Info">
      <DescriptionsItem label="UserName">Nodirbek Abdusattorov</DescriptionsItem>
      <DescriptionsItem label="Phone Number">+998 (90) 322-22-28</DescriptionsItem>
      <DescriptionsItem label="Email">iLoveCookies@gmail.com</DescriptionsItem>
    </Descriptions>
    <Tag>Dawg</Tag>
    <Divider />
    <Button type="primary">Edit</Button>
    <Divider type="vertical" />
    <Button danger>Delete</Button>
  </div>
</template>

<style lang="scss" scoped></style>
