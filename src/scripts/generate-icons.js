const sharp = require("sharp");
const path = require("path");

const sizes = [32, 48, 96, 180, 196];
const inputFile = path.join(
  process.cwd(),
  "public",
  "images",
  "logo-inverted.png"
);

async function generateIcons() {
  try {
    // Get the metadata of the original image
    const metadata = await sharp(inputFile).metadata();
    const aspectRatio = metadata.width / metadata.height;

    for (const size of sizes) {
      // Calculate height to maintain aspect ratio
      const height = Math.round(size / aspectRatio);

      await sharp(inputFile)
        .resize(size, size, {
          fit: "contain",
          background: { r: 0, g: 0, b: 0, alpha: 0 },
        })
        .toFile(
          path.join(process.cwd(), "public", "images", `favicon-${size}.png`)
        );

      console.log(`Generated ${size}x${size} icon`);
    }
  } catch (error) {
    console.error("Error generating icons:", error);
  }
}

generateIcons();
