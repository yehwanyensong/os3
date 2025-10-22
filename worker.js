/**
 * Cloudflare Worker to serve the static 11ty site
 */

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    let path = url.pathname;

    // Handle root path
    if (path === '/') {
      path = '/index.html';
    }

    // Handle URLs without file extensions - try adding .html
    if (!path.includes('.') && !path.endsWith('/')) {
      path = `${path}.html`;
    }

    // Handle directory paths
    if (path.endsWith('/')) {
      path = `${path}index.html`;
    }

    try {
      // Try to get the asset from the _site directory
      const asset = await env.ASSETS.fetch(new URL(path, request.url));

      if (asset.status === 404) {
        // Try without .html extension if not found
        const fallbackAsset = await env.ASSETS.fetch(new URL(url.pathname, request.url));
        if (fallbackAsset.status !== 404) {
          return fallbackAsset;
        }

        // Return 404 page if it exists, otherwise a simple 404
        const notFoundAsset = await env.ASSETS.fetch(new URL('/404.html', request.url));
        if (notFoundAsset.status !== 404) {
          return new Response(notFoundAsset.body, {
            status: 404,
            headers: notFoundAsset.headers,
          });
        }

        return new Response('Not Found', { status: 404 });
      }

      return asset;
    } catch (error) {
      return new Response(`Error: ${error.message}`, { status: 500 });
    }
  },
};
