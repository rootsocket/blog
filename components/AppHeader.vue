<template>
  <nav
    class="fixed top-0 z-40 w-full border-b dark:border-gray-800 bg-white dark:bg-gray-900"
    :class="{ 'shadow border-transparent': scrolled }"
    @click="scrollToTop"
  >
    <div class="container mx-auto flex-1 px-4 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="lg:w-1/5 flex items-center pr-4" @click.stop="noop">
          <a
            href="https://rootsocket.com"
            class="flex-shrink-0 flex-1 font-bold text-xl flex flex-row items-center"
            :aria-label="`${settings.title} Logo`"
          >
            <img
              src="logo.png"
              class="h-6 max-w-full rounded-full"
              :alt="settings.title"
            />

            <span class="text-2xl ml-2">{{ settings.title }}</span>
          </a>
        </div>
        <div
          v-if="settings.layout !== 'single'"
          class="flex-1 flex justify-start w-4/6"
        >
          <AppSearchAlgolia
            v-if="settings.algolia"
            :options="settings.algolia"
            :settings="settings"
          />
          <AppSearch v-else class="hidden lg:block" />
        </div>
        <div
          class="lg:w-1/5 flex items-center pl-4 lg:pl-8"
          :class="{
            'justify-between': lastRelease && settings.layout !== 'single',
            'justify-end': !lastRelease || settings.layout === 'single',
          }"
        >
          <a
            href="https://rootsocket.com"
            class="font-semibold leading-none text-gray-700 dark:text-gray-300 hover:text-primary-500 dark-hover:text-primary-500 text-base mr-4"
            exact-active-class="text-primary-500"
            :class="{
              'hidden lg:block': settings.layout !== 'single',
            }"
            >{{ $t('home') }}</a
          >
          <a
            href="https://rootsocket.com/blog"
            class="font-semibold leading-none text-gray-700 dark:text-gray-300 hover:text-primary-500 dark-hover:text-primary-500 text-base mr-4"
            exact-active-class="text-primary-500"
            :class="{
              'hidden lg:block': settings.layout !== 'single',
            }"
            >{{ $t('docs') }}</a
          >
          <div class="flex items-center">
            <button
              v-if="settings.layout !== 'single'"
              class="lg:hidden p-2 rounded-md text-gray-700 dark:text-gray-300 focus:outline-none -mr-2"
              aria-label="Menu"
              @click.stop="menu = !menu"
            >
              <IconX v-if="menu" class="w-5 h-5" />
              <IconMenu v-else class="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      scrolled: 0,
    };
  },
  computed: {
    ...mapGetters(["settings", "githubUrls", "lastRelease"]),
    menu: {
      get() {
        return this.$store.state.menu.open;
      },
      set(val) {
        this.$store.commit("menu/toggle", val);
      },
    },
  },
  beforeMount() {
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      this.scrolled = window.scrollY > 0;
    },
    scrollToTop() {
      if (window.innerWidth >= 1280) {
        return;
      }
      window.scrollTo(0, 0);
    },
    noop() {},
  },
};
</script>

<i18n>
{
  "es": {
    "docs": "Docs",
    "home": "Inicio"
  },
  "en": {
    "docs": "Docs",
    "home": "Home"
  }
}
</i18n>
