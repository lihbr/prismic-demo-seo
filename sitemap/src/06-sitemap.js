const path = require("path");
const fs = require("fs");
const Prismic = require("prismic-javascript");
const { SitemapStream, streamToPromise } = require('sitemap');

const API_ENDPOINT = "https://prismic-demo-seo.cdn.prismic.io/api/v2";
const MASTER_LOCALE = "en-us";
const SITE_URL = "https://example.com";

const linkResolver = doc => {
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
};

const run = async () => {
  // 1. Init the API
  const api = await Prismic.getApi(API_ENDPOINT);

  // 2. Get all documents for all langs
  const { results: docs } = await api.query("", { lang: "*" });

  // 3. Pass them through our link resolver
  const urls = docs
    .sort((a, b) => a.type < b.type ? -1 : 1) // sort by type
    .map(linkResolver);

  // 4. Create the sitemap
  const sitemapStream = new SitemapStream({ hostname: SITE_URL });

  urls.forEach(url => {
    sitemapStream.write({
      url,
      changefreq: "weekly",
      priority: 1
    });
  });

  sitemapStream.end();

  const sitemapData = await streamToPromise(sitemapStream);

  // 5. Write to filesystem
  if (!fs.existsSync(path.join(__dirname, "../dist"))) {
    fs.mkdirSync(path.join(__dirname, "../dist"), { recursive: true });
  }
  fs.writeFileSync(path.join(__dirname, "../dist/06-sitemap.xml"), sitemapData, "utf-8");

  // Logging
  console.log(sitemapData.toString());
};

run();
