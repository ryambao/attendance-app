<template>
  <form class="card" @submit.prevent="signUp(user)">
    <input type="text" placeholder="First Name" v-model="user.first_name" />
    <input type="text" placeholder="First Name" v-model="user.last_name" />
    <input type="email" placeholder="Email" v-model="user.email" required />
    <input type="password" placeholder="Password" v-model="user.password" required />
    <button type="submit">Sign Up</button>
    <nuxt-link to="#" @click.native="toggle">Login</nuxt-link>
  </form>
</template>
<script>
export default {
  props: {
    toggle: Function,
    signUp: Function,
  },
  data() {
    return {
      user: {
        first_name: null,
        last_name: null,
        email: null,
        password: null,
      },
    };
  },
}
</script>
