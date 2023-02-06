<template>
  <form class="card" @submit.prevent="signIn(user)">
    <input type="email" placeholder="Email" v-model="user.email" required />
    <input type="password" placeholder="First Name" v-model="user.password" required />
    <button>Login</button>
    <nuxt-link to="#" @click.native="toggle">Sign Up</nuxt-link>
  </form>
</template>
<script>
export default {
  props: {
    toggle: Function,
    signIn: Function,
  },
  data() {
    return {
      user: {
        email: null,
        password: null,
      },
    };
  },
}
</script>
