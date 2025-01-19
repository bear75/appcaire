const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

async function generateFavicons() {
  const svgBuffer = fs.readFileSync(
    path.join(process.cwd(), "public", "heart-logo.svg"),
  );

  // Generate favicon sizes
  const sizes = [16, 32, 180, 192];

  for (const size of sizes) {
    const filename =
      size === 180 ? "apple-touch-icon.png" : `favicon-${size}x${size}.png`;
    await sharp(svgBuffer)
      .resize(size, size)
      .png()
      .toFile(path.join(process.cwd(), "public", filename));
    console.log(`Generated ${filename}`);
  }

  console.log("Favicons generated successfully!");
}

generateFavicons().catch(console.error);
