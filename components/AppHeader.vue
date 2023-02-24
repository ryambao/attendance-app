<template>
  <div>
    <!-- <div class="flex items-center justify-end bg-teal-500 pr-6 pt-2">
      <Clock />
    </div> -->
    <nav class="flex items-center justify-between flex-wrap bg-white border-b border-sky-500 p-4">
      <div class="flex text-white mr-6">
        <div class="h-10 w-40 pt-2">
          <Logo />
        </div>
      </div>
      <div class="block lg:hidden">
        <button @click="showMenu()" class="flex items-center px-3 py-2 rounded text-da-color hover:text-da-color hover:border-white">
          <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <title>
              Menu
            </title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/>
          </svg>
        </button>
      </div>
      <div class="hidden w-full block flex-grow lg:flex lg:items-center lg:w-auto" id="menu">
        <div class="text-sm lg:flex-grow">
          <Menu>
            <menu-item
              v-for="item in navigations"
              :key="item.id"
              :item="item"
              :id="item.href"
              >
            </menu-item>
          </Menu>
        </div>
        <div>
          <nuxt-link
            to="/"
            class=
            "
            inline-block text-sm px-4 py-2 leading-none border rounded text-da-color
            border-da-color hover:border-transparent hover:text-white hover:bg-da-color
            mt-4 lg:mt-0"
            >
            Login
          </nuxt-link>
        </div>
      </div>
    </nav>
  </div>
</template>
<script>
export default {
  data() {
    return {
      navigations : [
        {
          id: 1,
          name: "My Logs",
          href: "my-logs",
        },
        {
          id: 2,
          name: "Announcements",
          href: "announcements",
        }
      ]
    }
  },
    methods: {
      showMenu(){
        const menu = document.getElementById('menu');
        menu.classList.toggle('hidden');
      }
    }

}
</script>
