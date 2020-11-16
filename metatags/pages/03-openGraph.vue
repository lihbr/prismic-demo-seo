<!-- HEALTH:HIGH __page__home -->
<template>
  <div class="__page__home">
    <pre>{{ document.data }}</pre>
  </div>
</template>

<script>
const SITE_URL = "https://example.com";

const formatMeta = (document, path = "") => {
  const {
    meta_title,
    meta_description,
    meta_image
  } = document.data;

  const openGraph = [
    {
      hid: "og:type",
      property: "og:type",
      content: "website"
    },
    {
      hid: "og:url",
      property: "og:url",
      content: `${SITE_URL}${path}`
    },
    {
      hid: "og:title",
      property: "og:title",
      content: meta_title
    },
    {
      hid: "og:description",
      property: "og:description",
      content: meta_description
    },
    {
      hid: "og:image",
      property: "og:image",
      content: meta_image.url
    }
  ];

  return {
    title: meta_title,
    meta: [
      { hid: "description", name: "description", content: meta_description },
      ...openGraph
    ]
  };
};

export default {
  async asyncData({ $prismic }) {
    const document = await $prismic.api.getByUID("page", "home");

    return { document };
  },
  head() {
    return formatMeta(this.document, this.$route.path);
  }
};
</script>

<style scoped>
pre {
  white-space: break-spaces;
}
</style>
