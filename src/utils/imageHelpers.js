export const getBestImage = (images) => {
    if (!images || images.length === 0) return null;
    return images.reduce((best, img) => (img.width > best.width ? img : best));
};