<!-- <template>
  <form class="card" @submit.prevent="signIn(user)">
    <input type="email" placeholder="Email" v-model="user.email" required />
    <input type="password" placeholder="First Name" v-model="user.password" required />
    <button>Login</button>
    <nuxt-link to="#" @click.native="toggle">Sign Up</nuxt-link>
  </form>
</template> -->
<template>
  <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
    <div class="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 shadow-lg">
      <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 class="text-xl font-bold leading-tight tracking-tight text-sky-500 md:text-2xl">
          Sign in to your account
        </h1>
        <form class="space-y-4 md:space-y-6" @submit.prevent="signIn(user)">
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
            <span
            class="text-left block text-xs text-red-500"
            v-if="errorMessage != 'Wrong password'"
            >{{ errorMessage }}</span>
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
            :class="errorMessage === 'Wrong password' ? 'border-red-300' : ''"
            v-model="user.password"
            required
            >
            <span
            class="text-left block text-xs text-red-500"
            v-show="errorMessage === 'Wrong password'"
            >{{ errorMessage }}</span>
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
            Don’t have an account yet?
            <nuxt-link to="#" @click.native="toggle" class="font-medium text-primary-600 hover:underline hover:text-sky-500 ">
              Sign up
            </nuxt-link>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  layout: 'LoginLayout',
  props: {
    toggle: Function,
    signIn: Function,
    errorMessage: String
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
