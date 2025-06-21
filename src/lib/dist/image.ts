const pictures = import.meta.glob(
  [
    // site-wide images
    `/src/content/images/*.{avif,gif,heif,jpeg,jpg,png,tiff,webp}`,
    // content source images
    `/src/content/*/*.{avif,gif,heif,jpeg,jpg,png,tiff,webp}`,
    `/src/content/*/*/*.{avif,gif,heif,jpeg,jpg,png,tiff,webp}`,
    `/src/content/*/*/*/*.{avif,gif,heif,jpeg,jpg,png,tiff,webp}`,
  ],
  {
    eager: true,
    import: 'default',
    query: {
      enhanced: true,
      w: '2400;2000;1600;1200;800;400',
    },
  }
);

const picturePaths = Object.keys(pictures);

export function importImage(path: string): any {
  for (let i = 0; i < picturePaths.length; i++) {
    if (picturePaths[i].includes(path)) {
      return pictures[picturePaths[i]];
    }
  }
}
