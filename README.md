# Open Systems 3 Exhibition

11ty-powered site for os3.

## Development

### Prerequisites
- Node.js 20+
- npm

### Setup

1. Install dependencies:
```bash
npm install
```

2. Run development server:
```bash
npm run dev
```

The site will be available at `http://localhost:8080`

### Build

Build the static site:
```bash
npm run build
```

The built site will be in the `_site` directory.

## Content Management

### Adding/Editing Artworks

Edit `src/_data/artworks.json` to manage artwork information. Each artwork supports different presentation types:

- **default**: Basic info display
- **video**: HTML5 video player
- **audio**: HTML5 audio player
- **iframe**: Embedded external content
- **image**: Image display
- **custom**: Custom template

See `ARTWORK_PRESENTATION.md` for detailed configuration options.

### Updating Links and Artwork URLs

**All artwork links are automatically generated from `artworks.json`** - you should never need to manually edit URLs in the JavaScript or HTML files.

When you add, remove, or update artworks in `src/_data/artworks.json`:

1. **Artwork slugs** determine the URLs:
   - Each artwork's `slug` field becomes its detail page URL
   - Example: `"slug": "ryan-clarke"` creates `/detail/ryan-clarke.html`
   - Use lowercase, hyphen-separated slugs (kebab-case)

2. **Links are auto-generated** on build:
   - The index page JavaScript (`src/js/index.js.njk`) is a template
   - Click handlers and URLs are generated from the artworks array
   - Artist names in the navigation are pulled from the data

3. **To update links**, simply:
   - Edit the `slug` field in `artworks.json`
   - Run `npm run build` or let the dev server rebuild
   - All links throughout the site will update automatically

**Example:**
```json
{
  "slug": "alice-yuan-zhang",
  "artist": "Alice Yuan Zhang",
  ...
}
```
This creates:
- Detail page: `/detail/alice-yuan-zhang.html`
- Automatic click handlers on the index page
- Artist name in the navigation

### Site Structure

- `src/` - Source files
  - `_includes/` - Nunjucks templates
    - `base.njk` - Base HTML template
    - `header.njk` - Header component
    - `detail.njk` - Artwork detail page template
    - `media/` - Media type templates
  - `_data/` - Data files
    - `artworks.json` - Artwork data
  - `css/` - Stylesheets
  - `js/` - JavaScript templates (auto-generate from data)
  - `detail/` - Detail pages (auto-generated)
  - `artwork_img/` - Artwork images
  - `basic_img/` - UI assets
  - `index.njk` - Homepage template

## Project Structure

```
yehwan-os3/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions workflow
├── src/
│   ├── _includes/              # Nunjucks templates
│   ├── _data/                  # Data files (artworks.json)
│   ├── css/                    # Stylesheets
│   ├── js/                     # JavaScript templates (.njk)
│   ├── detail/                 # Detail pages
│   ├── artwork_img/            # Artwork images
│   ├── basic_img/              # UI assets
│   └── index.njk               # Homepage
├── _site/                      # Built site (generated)
├── eleventy.config.js          # 11ty configuration
├── wrangler.toml               # Cloudflare Workers config
├── worker.js                   # Cloudflare Worker script
├── package.json                # Dependencies
└── README.md                   # This file
```

