const Prismic = require("prismic-javascript");

const API_ENDPOINT = "https://prismic-demo-seo.cdn.prismic.io/api/v2";

const linkResolver = doc => {
  switch (doc.type) {
    case "page":
      return `/${doc.uid}`;

    case "post":
      return `/blog/${doc.uid}`;

    case "product":
      return `/product/${doc.uid}`;

    default:
      throw new Error(`Unknown doc.type: "${doc.type}"`);
  }
};

const run = async () => {
  // 1. Init the API
  const api = await Prismic.getApi(API_ENDPOINT);

  // 2. Get all documents for all langs
  const { results: docs } = await api.query();

  // 3. Pass them through our link resolver
  const urls = docs
    .sort((a, b) => a.type < b.type ? -1 : 1) // sort by type
    .map(linkResolver);

  // 4. Create the sitemap

  // 5. Write to filesystem

  // Logging
  console.log(urls);
};

run();
