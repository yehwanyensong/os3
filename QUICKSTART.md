# Quick Start Guide

Get your exhibition site up and running in 5 minutes!

## 1. Install Dependencies

```bash
npm install
```

## 2. Start Development Server

```bash
npm run dev
```

Visit http://localhost:8080 to see your site!

## 3. Update Your Content

### Edit Artwork Information

Open `src/_data/artworks.json` and update the artwork details:

```json
{
  "slug": "RyanKuo",
  "artist": "Ryan Kuo",
  "title": "File",
  "year": "2016",
  "medium": "Website",
  "duration": "",
  "description": "Your description here...",
  "hasEssay": false,
  "presentationType": "default",
  "mediaUrl": "",
  "customTemplate": ""
}
```

### Add Media (Videos, Audio, Images)

1. Place your media files in the appropriate directory:
   - Videos: `src/videos/`
   - Audio: `src/audio/`
   - Images: `src/images/`

2. Update the artwork entry:
   ```json
   {
     "presentationType": "video",
     "mediaUrl": "/videos/my-artwork.mp4",
     "autoplay": false,
     "loop": true
   }
   ```

## 4. Build for Production

```bash
npm run build
```

The built site will be in `_site/` directory.

## 5. Deploy to Cloudflare Workers

### First Time Setup

1. Get your Cloudflare Account ID and API Token (see `DEPLOYMENT.md`)

2. Add to GitHub Secrets:
   - `CLOUDFLARE_API_TOKEN`
   - `CLOUDFLARE_ACCOUNT_ID`

### Deploy

Push to your main branch:
```bash
git add .
git commit -m "Deploy to Cloudflare"
git push
```

GitHub Actions will automatically build and deploy!

### Manual Deploy

```bash
npm run deploy
```

## Common Tasks

### Add a New Artwork

1. Add entry to `src/_data/artworks.json`
2. Add media file if needed
3. Save and the page will auto-generate!

### Change Site Title

Edit `src/index.njk`:
```html
<div class="title">Your Exhibition Name</div>
```

### Update Styles

- Homepage: Edit `src/css/index.css`
- Detail pages: Edit `src/detail/style.css`

### Add a Custom Artwork Template

1. Create template in `src/_includes/custom/my-template.njk`
2. Set artwork to use it:
   ```json
   {
     "presentationType": "custom",
     "customTemplate": "custom/my-template.njk"
   }
   ```

## NPM Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run clean` - Clean build directory
- `npm run deploy` - Build and deploy to Cloudflare
- `npm run preview` - Preview with Cloudflare local dev

## Need Help?

- Full docs: `README.md`
- Artwork setup: `ARTWORK_PRESENTATION.md`
- Deployment guide: `DEPLOYMENT.md`
- Migration details: `MIGRATION_SUMMARY.md`

## Presentation Type Examples

### Video
```json
{
  "presentationType": "video",
  "mediaUrl": "/videos/artwork.mp4",
  "autoplay": false,
  "loop": true
}
```

### Audio
```json
{
  "presentationType": "audio",
  "mediaUrl": "/audio/soundpiece.mp3"
}
```

### Iframe (External Site)
```json
{
  "presentationType": "iframe",
  "mediaUrl": "https://example.com/artwork",
  "iframeHeight": "800px"
}
```

### Image
```json
{
  "presentationType": "image",
  "mediaUrl": "/images/artwork.jpg"
}
```

That's it! You're ready to go! 🚀
