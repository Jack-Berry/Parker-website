// Vite asset resolver using import.meta.glob
// Eagerly imports all image files from src/assets at build time
const modules = import.meta.glob('../assets/**/*.{png,jpg,jpeg,gif,svg,webp}', {
  eager: true,
  import: 'default'
});

export const resolveAsset = (relativePath) => {
  // Normalize the path
  const normalizedPath = relativePath.replace(/^\.?\//, "");

  // Try different path formats to find a match
  const possiblePaths = [
    `../assets/${normalizedPath}`,
    `../assets/./${normalizedPath}`,
  ];

  // Check for exact match
  for (const path of possiblePaths) {
    if (modules[path]) {
      return modules[path];
    }
  }

  // Try fuzzy matching - find any module path that ends with the relative path
  for (const [path, url] of Object.entries(modules)) {
    if (path.endsWith(normalizedPath) || path.includes(normalizedPath)) {
      return url;
    }
  }

  // Fallback: assume asset is in /public/assets
  return `/assets/${normalizedPath}`;
};
