// Webpack/CRA-safe asset resolver.
// Looks up files inside src/assets at build time and returns a served URL.
const ctx = require.context("../assets", true, /\.(png|jpe?g|gif|svg|webp)$/i);

export const resolveAsset = (relativePath) => {
  // ensure leading "./" for require.context
  const key = "./" + relativePath.replace(/^\.?\//, "");
  try {
    return ctx(key); // -> "/static/media/....jpg"
  } catch (e) {
    // Optional fallback if you ever move assets to /public/assets
    return `/assets/${relativePath.replace(/^\.?\//, "")}`;
  }
};
