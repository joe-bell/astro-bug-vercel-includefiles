import type { APIRoute } from "astro";
import path from "node:path";
import fs from "node:fs/promises";
import sharp from "sharp";

export const prerender = false;

const helloThere = await sharp(
  path.join(process.cwd(), "src", "assets", "images", "hello-there.jpg")
)
  .resize({ width: 48, height: 48, fit: "cover" })
  .normalise()
  .toBuffer({ resolveWithObject: true })
  .then(
    ({ data, info }) =>
      `data:image/${info.format};base64,${data.toString("base64")}`
  );

const interRegular = await fs
  .readFile(
    path.join(process.cwd(), "public", "assets", "fonts", "Inter-Regular.woff")
  )
  .catch((err) => {
    throw new Error(err);
  })
  .then(() => "interRegular exists!");

const interBold = await fs
  .readFile(
    path.join(process.cwd(), "public", "assets", "fonts", "Inter-Bold.woff")
  )
  .catch((err) => {
    throw new Error(err);
  })
  .then(() => "interBold exists!");

export const GET: APIRoute = async () =>
  new Response(
    JSON.stringify(
      {
        body: {
          helloThere,
          interRegular,
          interBold,
        },
      },
      null,
      2
    ),
    {
      headers: {
        "content-type": "text/plain",
      },
      status: 200,
    }
  );
