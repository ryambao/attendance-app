<template>
  <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
    <div class="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 shadow-lg">
      <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 class="text-xl font-bold leading-tight tracking-tight text-sky-500 md:text-2xl">
          Create your account
        </h1>
        <form class="space-y-4 md:space-y-6" @submit.prevent="signUp(user)">
          <div>
            <label for="name" class="text-left block mb-2 text-sm font-medium text-gray-500 ">
              First Name
            </label>
            <input type="text"
            class="
            bg-gray-50 text-gray-900 sm:text-sm rounded-lg block w-full
            p-2.5 border border-gray-300 focus:outline-none focus:ring-2
            focus:ring-sky-500 focus:border-transparent"
            placeholder="First Name"
            v-model="user.first_name"
            required

            >
          </div>
          <div>
            <label for="name" class="text-left block mb-2 text-sm font-medium text-gray-500 ">
              Last Name
            </label>
            <input type="text"
            class="
            bg-gray-50 text-gray-900 sm:text-sm rounded-lg block w-full
            p-2.5 border border-gray-300 focus:outline-none focus:ring-2
            focus:ring-sky-500 focus:border-transparent"
            placeholder="First Name"
            v-model="user.last_name"
            required
            >
          </div>
          <div>
            <label for="email" class="text-left block mb-2 text-sm font-medium text-gray-500 ">
              Your email
            </label>
            <input type="email"
            name="email"
            id="email"
            class="
            bg-gray-50 text-gray-900 sm:text-sm rounded-lg block w-full
            p-2.5 border border-gray-300 focus:outline-none focus:ring-2
            focus:ring-sky-500 focus:border-transparent"
            placeholder="name@company.com"
            v-model="user.email"
            required
            >
          </div>
          <div>
            <label for="password"
              class="text-left block mb-2 text-sm font-medium text-gray-500">
              Password
            </label>
            <input type="password"
            name="password"
            id="password"
            placeholder="••••••••"
            class="
            bg-gray-50 text-gray-900 sm:text-sm rounded-lg block w-full
            p-2.5 border border-gray-300 focus:outline-none focus:ring-2
            focus:ring-sky-500 focus:border-transparent"
            v-model="user.password"
            required
            >
          </div>
          <div class="flex items-center justify-between">
            <div class="flex items-start">
              <div class="flex items-center h-5">
                <input id="remember"
                aria-describedby="remember"
                type="checkbox"
                class="
                w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3
                focus:ring-primary-300 ">
              </div>
              <div class="ml-3 text-sm">
                <label for="remember" class="text-gray-500 ">
                  Remember me
                </label>
              </div>
            </div>
              <a href="#"
              class="
              text-sm font-medium text-primary-600 hover:underline text-gray-500">
              Forgot password?
              </a>
          </div>
          <button type="submit"
          class="
          w-full border border-gray-300 text-gray-500 bg-primary-600 hover:bg-sky-500 hover:text-white
          focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg
          text-sm px-5 py-2.5 text-center">
            Sign in
          </button>
          <p class="text-sm font-light text-gray-500 ">
            Already have an account yet?
            <nuxt-link to="#" @click.native="toggle" class="font-medium text-primary-600 hover:underline hover:text-sky-500 ">
              Sign in
            </nuxt-link>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<!-- <template>
  <form class="card" @submit.prevent="signUp(user)">
    <input type="text" placeholder="First Name" v-model="user.first_name" />
    <input type="text" placeholder="First Name" v-model="user.last_name" />
    <input type="email" placeholder="Email" v-model="user.email" required />
    <input type="password" placeholder="Password" v-model="user.password" required />
    <button type="submit">Sign Up</button>
    <nuxt-link to="#" @click.native="toggle">Login</nuxt-link>
  </form>
</template> -->
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
