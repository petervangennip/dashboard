import puppeteer from "puppeteer";
import path from "path";

export default defineEventHandler(async (event) => {
  const { url } = await readBody(event);

  if (!url) {
    return { success: false, message: "URL is required" };
  }

  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();

    await page.goto(url, { waitUntil: "networkidle0" });

    // Resolve the absolute path to axe-core
    const axeCorePath = path.join(process.cwd(), "node_modules/axe-core/axe.min.js");
    await page.addScriptTag({ path: axeCorePath });

    // Run the accessibility audit
    const results = await page.evaluate(async () => {
      return await axe.run();
    });

    await browser.close();

    return { success: true, results };
  } catch (error) {
    console.error("Accessibility check failed:", error);
    return { success: false, message: error.message };
  }
});
