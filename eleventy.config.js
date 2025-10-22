export default function(eleventyConfig) {
  // Copy static assets
  eleventyConfig.addPassthroughCopy("src/artwork_img");
  eleventyConfig.addPassthroughCopy("src/basic_img");
  eleventyConfig.addPassthroughCopy({ "src/css": "css" });
  // JS files are now templates, not passthrough
  eleventyConfig.addPassthroughCopy({ "src/detail/style.css": "detail/style.css" });

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
    dataTemplateEngine: "njk"
  };
}
