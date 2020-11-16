<!-- HEALTH:HIGH __page__home -->
<template>
  <div class="__page__home">
    <pre>{{ document.data }}</pre>
  </div>
</template>

<script>
export default {
  async asyncData({ $prismic }) {
    const document = await $prismic.api.getByUID("page", "home");

    return { document };
  }
};
</script>

<style scoped>
pre {
  white-space: break-spaces;
}
</style>
