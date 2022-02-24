import theme from "@nuxt/content-theme-docs";

export default theme({
  docs: {
    primaryColor: "#0073e6",
  },
  router: {
    base: '/blog',
  },
  head: {
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },
});
