# 🚀 RetailRadar

**RetailRadar** is a smart e-commerce intelligence tool built with **React**, **Node.js**, **Express**, and **Python**. It helps sellers gain deep insights into market trends by scraping data from top marketplaces like **Daraz**, **Amazon**, and **OLX**, and leveraging **AI-powered product analysis** to boost sales.

> 🔍 Scrape. 📊 Analyze. 🤖 Optimize.

---

## ✨ Features

- 🛒 **Multi-Market Scraper** – Automatically fetches product data from **Daraz**, **Amazon**, and **OLX**
- 📈 **Sales & Market Analytics** – Understand product pricing, selling rate, top-performing items, and competitors
- 🤖 **AI Product Optimization** – Generate:
  - SEO-Friendly Product Names
  - Engaging Descriptions
  - Smart Tags
  - Competitive Price Suggestions
- 📦 **Tech Stack**:
  - Frontend: **React.js**
  - Backend: **Node.js + Express**
  - AI Layer: **Python + HuggingFace Transformers**

---

retail-radar/ │ ├── frontend/ # React.js frontend │ └── ...
│ ├── backend/ # Node.js backend │ └── generate_text.py (Python AI integration) │ ├── README.md # This file └── .gitignore # Root .gitignore


---

## 🚀 Usage

### 📥 1. Clone the Repository

```bash
git clone https://github.com/yourusername/retail-radar.git
cd retail-radar


📦 2. Install Dependencies

cd frontend
npm install

Node.js Backend

cd ../backend
npm install


Python AI Engine

pip install -r requirements.txt


```

🔑 3. Hugging Face AI Setup (For SEO Optimization Features)
If you want to use the AI model for SEO-friendly suggestions, you'll need a Hugging Face token:

Sign up: https://huggingface.co/join

Get your access token: https://huggingface.co/settings/tokens

Login via CLI:

```bash
huggingface-cli login
```

Alternatively, in Python:

```bash
from huggingface_hub import login
login(token="your_token_here")
```

🧠 4. Run the Application

Backend

```bash
cd backend
node index.js
```
Frontend

```bash
cd ../frontend
npm run dev
```

📌 Example Use Case
Search your competitor’s product on Daraz, Amazon, or OLX.

RetailRadar scrapes product info like price, ratings, and location.

AI analyzes that data to:

Suggest how your product should be priced.

Recommend a product name optimized for search.

Generate marketing-friendly tags and descriptions.

🤝 Contributing
PRs are welcome! If you have ideas to improve scraping accuracy, enhance UI, or integrate better AI models — feel free to fork & contribute!

