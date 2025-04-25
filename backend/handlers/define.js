const puppeteer = require("puppeteer");

// hunting

const fetchProductData = async (req, res) => {
  let browser;

  try {
    const { productName, platformName } = req.params;

    if (!productName) {
      return res.json({
        success: false,
        message: "Kindly provide product for search.",
      });
    }

    if (!platformName) {
      return res.json({
        success: false,
        message: "Kindly provide platform for search (amazon, daraz).",
      });
    }

    const formattedProduct = productName
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "+");
    const formattedPlatform = platformName.trim().toLowerCase();

    browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    // ================= Amazon =================
    if (formattedPlatform === "amazon") {
      const amazonURL = `https://www.amazon.com/s?k=${formattedProduct}`;
      await page.goto(amazonURL, { waitUntil: "networkidle2" });

      await page.waitForSelector(".s-main-slot");

      const products = await page.evaluate(() => {
        let productElements = Array.from(
          document.querySelectorAll(".s-main-slot .s-result-item")
        );
        return productElements.map((item) => {
          const name = item.querySelector("h2")?.innerText || null;
          const price =
            item.querySelector(".a-price .a-offscreen")?.innerText || null;
          const rating = item.querySelector(".a-icon-alt")?.innerText || null;
          const link = item.querySelector("h2 a")
            ? "https://www.amazon.com" +
              item.querySelector("h2 a").getAttribute("href")
            : null;

          let salesInfo = null;
          const salesSpan = item.querySelectorAll(
            "span.a-size-base.a-color-secondary"
          );
          salesSpan.forEach((span) => {
            if (span.innerText.includes("bought in past")) {
              salesInfo = span.innerText;
            }
          });

          return { name, price, rating, salesInfo, link };
        });
      });

      return res.json({ success: true, products });
    }

    // ================= Daraz =================
    if (formattedPlatform === "daraz") {
      const darazURL = `https://www.daraz.pk/catalog/?q=${encodeURIComponent(
        productName.trim()
      )}`;
      await page.goto(darazURL, { waitUntil: "networkidle2" });

      await page.waitForSelector("div[data-spm-anchor-id]");

      const products = await page.evaluate(() => {
        const productElements = document.querySelectorAll(
          'div[data-qa-locator="product-item"]'
        );
        return Array.from(productElements).map((el) => {
          const name = el.querySelector(".RfADt a")?.innerText || "N/A";
          const price = el.querySelector(".ooOxS")?.innerText || "N/A";
          const salesInfo =
            el.querySelector("._1cEkb span")?.innerText || "No sales info";
          const rating = el.querySelector(".qzqFw")?.innerText || "No rating";
          const location = el.querySelector(".oa6ri")?.innerText || "N/A";

          const linkElement = el.querySelector(".RfADt a");
          const relativeLink = linkElement?.getAttribute("href") || "";
          const link = relativeLink ? `https:${relativeLink}` : "N/A";

          return { name, price, salesInfo, rating, location, link };
        });
      });

      return res.json({ success: true, products });
    }

    // ================= OLX =================
    if (formattedPlatform === "olx") {
      const olxURL = `https://www.olx.com.pk/items/q-${encodeURIComponent(
        productName.trim()
      )}`;

      await page.goto(olxURL, { waitUntil: "domcontentloaded", timeout: 0 });

      // Wait for OLX product articles to load
      await page.waitForSelector("article._68441e28", { timeout: 30000 });

      const products = await page.evaluate(() => {
        const productElements = document.querySelectorAll("article._68441e28");

        return Array.from(productElements).map((el) => {
          const name = el.querySelector("h2._941ffa5e")?.innerText || "N/A";
          const price = el.querySelector("._1f2a2b47")?.innerText || "N/A";
          const location =
            el.querySelector("span._77000f35")?.innerText || "N/A";
          const relativeLink =
            el.querySelector('a[href*="iid-"]')?.getAttribute("href") || "";
          const link = relativeLink
            ? `https://www.olx.com.pk${relativeLink}`
            : "N/A";

          return { name, price, location, link };
        });
      });


      return res.json({ success: true, products });
    }

    return res.json({
      success: false,
      message:
        "Platform not supported. Please choose either 'amazon', 'olx' or 'daraz'.",
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};

module.exports = {
  fetchProductData,
};
