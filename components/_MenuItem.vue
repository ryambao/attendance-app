<template>
  <div>
      <div v-if="item.type">
      <a :href="item.href">{{ item.name }}</a>
      </div>
      <div v-else class="flex flex-row justify between">
      <nuxt-link :to="item.href" class="text-da-color">
          {{ item.name }}
      </nuxt-link>
      </div>
  </div>
</template>
<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => {},
    },
  },
};
</script>
