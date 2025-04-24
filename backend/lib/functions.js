const analysisProductPrompt = (products) => {
  const productDescriptions = products
    .map((product, index) => {
      return `Product ${index + 1}:
- Name: ${product.name}
- Price: Rs. ${product.price}
- Sales: ${product.salesInfo} sold
- Rating: ${product.rating}
- Location: ${product.location}`;
    })
    .join("\n\n");

  const prompt = `You are an expert in e-commerce SEO and digital product strategy.

    I am planning to launch a new laptop product in the Pakistani market. Based on the following data of similar products being sold, please analyze the market and provide **SEO-friendly suggestions** for my own product. The suggestions should include:

    - SEO-friendly Name
    - Short Description
    - Tags
    - Recommended Price Range

    The data provided below includes product names, prices, ratings, sales, and locations of similar products. Based on this market information, provide the most suitable suggestions to optimize my product's chances for increased sales.

    Here is the market data:

    ${productDescriptions}

    Please provide the following:
    1. SEO-friendly name for my product.
    2. A short description of my product that is SEO-friendly.
    3. Suggested tags.
    4. A price range for my product based on market trends and the provided data.

    Only provide the SEO suggestions. Do not repeat any of the input data.`;

  return prompt;
};

const generateAnalyse = () => async (req, res) => {
  const products = req?.body?.products;

  const model = "mistralai/Mixtral-8x7B-Instruct-v0.1";

  const prompt = analysisProductPrompt(products);

  const inputText = {
    inputs: prompt,
  };

  try {
    const apiResponse = await fetch(
      `https://api-inference.huggingface.co/models/${model}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${HUGGINGFACE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputText),
      }
    );

    if (!apiResponse.ok) {
      const textResponse = await apiResponse.text();
      throw new Error(
        `Hugging Face request failed with status ${apiResponse.status}: ${textResponse}`
      );
    }

    const data = await apiResponse.json();

    res.json({ data, success: true });
  } catch (err) {
    console.error("Hugging Face error:", err.message);
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  analysisProductPrompt,
  generateAnalyse
};
