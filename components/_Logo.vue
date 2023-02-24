<template>
  <div>
    <nuxt-link to="/">
      <img :src=this.src />
    </nuxt-link>
  </div>
</template>
<script>
export default {
  data() {
    return {
      src: "https://www.dreamarchers.com.ph/wp-content/uploads/2020/05/dream-archers-logo.svg"
    };
  },
};
</script>

