<!-- HEALTH:HIGH __page__home -->
<template>
  <div class="__page__home">
    <pre>{{ document.data }}</pre>
  </div>
</template>

<script>
const formatMeta = document => {
  const {
    meta_title,
    meta_description
  } = document.data;

  return {
    title: meta_title,
    meta: [
      { hid: "description", name: "description", content: meta_description }
    ]
  };
};

export default {
  async asyncData({ $prismic }) {
    const document = await $prismic.api.getByUID("page", "home");

    return { document };
  },
  head() {
    return formatMeta(this.document);
  }
};
</script>

<style scoped>
pre {
  white-space: break-spaces;
}
</style>
