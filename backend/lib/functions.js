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

  const prompt = `
  You are an expert in e-commerce SEO and digital product strategy.

  I am planning to launch a laptop in the Pakistani market. I’ve collected product data of similar laptops already being sold. Based on the overall trends and this market data, give me ONE complete suggestion.

  DO NOT return a list of the products I gave or repeat any part of this prompt.

  Instead, act like a product strategist and advisor, and give your expert recommendation in the following format:

  "- Based on the analysis of similar market products, here is my recommendation for your new product:

  - SEO-friendly Name:
  - Short Description:
  - Tags:
  - Recommended Price Range:"

  Here is the market data:

  ${productDescriptions}
  `;

  return prompt;
};

const generateAnalyse = async (products, HUGGINGFACE_API_KEY) => {
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
      const textResponse = await apiResponse.json();

      return {
        error: `Hugging Face API key | ${textResponse?.error}`,
      };
    }

    const data = await apiResponse.json();

    return { data, success: true };
  } catch (err) {
    console.error("Hugging Face error:", err.message);
    return { error: err.message };
  }
};

module.exports = {
  analysisProductPrompt,
  generateAnalyse,
};
