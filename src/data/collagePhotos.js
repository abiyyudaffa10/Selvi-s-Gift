// Auto-loads EVERY image in src/assets/collage/ — just drop new photos in that
// folder and they appear in the Chapter 1 collage. No code edits needed.
// Vite resolves each to a final hashed URL at build time.
const modules = import.meta.glob('../assets/collage/*.{jpg,jpeg,png,JPG,JPEG,PNG}', {
  eager: true,
  query: '?url',
  import: 'default',
})

export const collagePhotos = Object.keys(modules)
  .sort()
  .map((path) => ({ src: modules[path] }))
