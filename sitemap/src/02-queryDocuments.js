const Prismic = require("prismic-javascript");

const API_ENDPOINT = "https://prismic-demo-seo.cdn.prismic.io/api/v2";

const run = async () => {
  // 1. Init the API
  const api = await Prismic.getApi(API_ENDPOINT);

  // 2. Get all documents for all langs
  const { results: docs } = await api.query();

  // 3. Pass them through our link resolver

  // 4. Create the sitemap

  // 5. Write to filesystem

  // Logging
  console.log(docs);
};

run();
