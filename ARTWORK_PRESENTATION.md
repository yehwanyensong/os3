# Artwork Presentation Types

This document explains how to configure different presentation types for artworks in the exhibition.

## Data Structure

Each artwork in `src/_data/artworks.json` supports the following fields:

### Basic Fields
- `slug`: URL-friendly identifier (required)
- `artist`: Artist name (required)
- `title`: Artwork title (required)
- `year`: Year created (required)
- `medium`: Medium/format (required)
- `duration`: Duration (for time-based media)
- `description`: Artwork description (required)
- `hasEssay`: Boolean, whether essay exists (required)

### Presentation Fields
- `presentationType`: How the artwork should be displayed (required)
  - `"default"`: No media, just info display
  - `"video"`: Display as HTML5 video player
  - `"audio"`: Display as HTML5 audio player
  - `"iframe"`: Embed external content via iframe
  - `"image"`: Display as image
  - `"custom"`: Use a custom template
- `mediaUrl`: URL or path to the media file (required for video/audio/iframe/image)
- `customTemplate`: Path to custom Nunjucks template (required for "custom" type)

### Optional Media Configuration
- `autoplay`: Boolean, auto-play video/audio (default: false)
- `loop`: Boolean, loop video/audio (default: false)
- `iframeWidth`: Custom width for iframe
- `iframeHeight`: Custom height for iframe
- `allowSandbox`: Sandbox attribute value for iframe security

## Example Configurations

### Video Artwork
```json
{
  "slug": "example-video",
  "artist": "Artist Name",
  "title": "Video Artwork",
  "year": "2024",
  "medium": "Video",
  "duration": "10:30",
  "description": "Description here",
  "hasEssay": false,
  "presentationType": "video",
  "mediaUrl": "/videos/artwork.mp4",
  "autoplay": false,
  "loop": true
}
```

### Iframe (External Website)
```json
{
  "slug": "example-iframe",
  "artist": "Artist Name",
  "title": "Web-based Work",
  "year": "2024",
  "medium": "Website",
  "duration": "",
  "description": "Description here",
  "hasEssay": false,
  "presentationType": "iframe",
  "mediaUrl": "https://example.com/artwork",
  "iframeHeight": "800px"
}
```

### Audio Artwork
```json
{
  "slug": "example-audio",
  "artist": "Artist Name",
  "title": "Sound Work",
  "year": "2024",
  "medium": "Audio",
  "duration": "15:00",
  "description": "Description here",
  "hasEssay": false,
  "presentationType": "audio",
  "mediaUrl": "/audio/piece.mp3",
  "loop": false
}
```

### Image Artwork
```json
{
  "slug": "example-image",
  "artist": "Artist Name",
  "title": "Digital Image",
  "year": "2024",
  "medium": "Digital Print",
  "duration": "",
  "description": "Description here",
  "hasEssay": false,
  "presentationType": "image",
  "mediaUrl": "/images/artwork.jpg"
}
```

### Custom Template
```json
{
  "slug": "example-custom",
  "artist": "Artist Name",
  "title": "Interactive Work",
  "year": "2024",
  "medium": "Interactive",
  "duration": "",
  "description": "Description here",
  "hasEssay": false,
  "presentationType": "custom",
  "customTemplate": "custom/special-artwork.njk"
}
```

## Creating Custom Templates

For artworks with `presentationType: "custom"`, create a custom Nunjucks template in `src/_includes/`:

1. Create your template file (e.g., `src/_includes/custom/special-artwork.njk`)
2. Reference it in the artwork data: `"customTemplate": "custom/special-artwork.njk"`
3. The template will have access to all artwork data fields

Example custom template:
```njk
<div class="custom-artwork-container">
  <h2>{{ title }}</h2>
  <p>{{ artist }}</p>
  <!-- Your custom HTML/JavaScript here -->
  <script>
    // Custom interactive code
  </script>
</div>
```

## Media Files

Place media files in appropriate directories:
- Videos: `src/videos/`
- Audio: `src/audio/`
- Images: `src/images/` or `src/artwork_img/`

Update `eleventy.config.js` to copy these directories:
```js
eleventyConfig.addPassthroughCopy("src/videos");
eleventyConfig.addPassthroughCopy("src/audio");
eleventyConfig.addPassthroughCopy("src/images");
```
