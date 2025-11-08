export default function(eleventyConfig) {
  // Copy static assets
  eleventyConfig.addPassthroughCopy("src/artwork_img");
  eleventyConfig.addPassthroughCopy("src/basic_img");
  // CSS is now a template (index.css.njk), not passthrough
  // JS files are now templates, not passthrough
  eleventyConfig.addPassthroughCopy({ "src/css/artwork-detail.css": "css/artwork-detail.css" });

  // Copy media directories (add these as needed)
  eleventyConfig.addPassthroughCopy("src/videos");
  eleventyConfig.addPassthroughCopy("src/audio");
  eleventyConfig.addPassthroughCopy("src/images");

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data"
    },
    templateFormats: ["njk", "html", "md", "11tydata.js"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    // Path prefix for GitHub Pages deployment
    // Use /os3/ for production, / for local dev
    pathPrefix: process.env.PATH_PREFIX || "/"
  };
}
