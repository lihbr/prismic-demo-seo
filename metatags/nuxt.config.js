export default {
  // Target (https://go.nuxtjs.dev/config-target)
  target: "static",

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: ["@nuxtjs/prismic"],

  prismic: {
    endpoint: "https://prismic-demo-seo.cdn.prismic.io/api/v2",
    linkResolver: doc => {
      const MASTER_LOCALE = "en-us";

      const prefix = doc.lang !== MASTER_LOCALE ? `/${doc.lang}` : "";

      switch (doc.type) {
        case "page":
          return `${prefix}/${doc.uid}`;

        case "post":
          return `${prefix}/blog/${doc.uid}`;

        case "product":
          return `${prefix}/product/${doc.uid}`;

        default:
          throw new Error(`Unknown doc.type: "${doc.type}"`);
      }
    }
  },

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [],

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {}
};
