# 🌿 Smart ESG Assessment & Green Rating System

> **An Intelligent ESG Analysis Engine powered by Gemini AI.**  
> Transform scattered corporate data into actionable green investment insights through automated summarization, sentiment analysis, and multidimensional scoring.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Gemini AI](https://img.shields.io/badge/AI-Gemini%203%20Flash-blueviolet)](https://ai.google.dev/)
[![React](https://img.shields.io/badge/Frontend-React%2019-blue)](https://react.dev/)

---

## 📖 Project Background
Environmental, Social, and Governance (ESG) is the cornerstone of modern green finance. However, ESG data is often unstructured, scattered across annual reports, social responsibility statements, and news feeds. This project leverages **Google Gemini AI** to provide a unified platform for:
- **Non-standard Data Cleaning:** Extracting key indicators from long-form text.
- **Multidimensional Scoring:** Evaluating performance across E, S, and G pillars.
- **Dynamic Risk Monitoring:** Adjusting ratings in real-time based on negative public sentiment.

---

## ✨ Key Features

### 1. 📊 Market Intelligence Dashboard
A high-level cockpit for fund managers to view industry-wide trends.
- **ESG Benchmarking:** Radar charts comparing portfolio averages against S&P 500 benchmarks.
- **Top Performer Registry:** Visual ranking of the top 5 companies by overall ESG score.
- **Carbon Intensity Tracking:** Real-time visualization of carbon emission trends across sectors.

### 2. 🔍 Automated Company Analysis
Deep-dive into specific corporate reports using LLM intelligence.
- **Multi-source Ingestion:** Supports PDF/CSV/TXT upload or direct text pasting.
- **Intelligent Summarization:** Generates "Smart Summaries" (2-3 sentences) for executive decision-making.
- **Benchmarking Visuals:** Compare company scores directly against industry averages with dynamic delta indicators (+/- pts).

### 3. ⚖️ Sentiment & Risk Monitor
Automated "Negative Sentiment" penalty system.
- **News NLP Processing:** Analyzes news headlines/summaries to determine affected ESG dimensions.
- **Score Deduction:** Calculates impact scores (-20 to +20) to adjust corporate ratings instantly.
- **Active Alert Feed:** A timeline of sentiment-driven risk alerts.

---

## 📸 Visual Walkthrough

### Module 1: Market Dashboard
*The dashboard provides a macroscopic view of the green finance landscape.*
> **UI Highlight:** Custom horizontal bar charts for top performers and interactive radar charts for multidimensional comparison.

### Module 2: Analysis Workflow
1. **Upload:** Drag and drop a sustainability report.
2. **Process:** Gemini AI parses the text, extracts key KPIs, and identifies governance structures.
3. **Review:** Results appear in a structured layout showing Environmental (E), Social (S), and Governance (G) scores with visual progress bars relative to industry benchmarks.

### Module 3: Sentiment Risk Feed
*Input: "Global Energy Corp fined $50M for hazardous waste leakage."*
*Result: Automatic **-15 Impact Score** on the Environmental dimension.*

---

## 🛠️ Technical Stack
- **AI Engine:** Google Gemini-3 Flash Preview (LLM for text extraction and sentiment)
- **Frontend:** React 19 + Tailwind CSS (Responsive Design)
- **Charts:** Recharts (SVG-based interactive visualizations)
- **Icons:** Lucide React
- **Data:** Mock ESG Registry (extensible to live APIs)

---

## 🚀 Getting Started

### Prerequisites
- Node.js installed
- A [Google Gemini API Key](https://aistudio.google.com/)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/smart-esg-assessment-system.git
   ```
2. Set up your environment variable:
   ```bash
   export API_KEY='your_gemini_api_key_here'
   ```
3. Install dependencies and start the dev server:
   ```bash
   npm install
   npm run dev
   ```

---

## 🧭 User Guide

### How to analyze a company:
1. Navigate to the **"Company Analysis"** tab.
2. Select **"Upload File"** and drop a corporate annual report.
3. The system will automatically trigger the **Gemini Analysis Engine**.
4. View the **Executive Summary** and see how the company performs against the **Industry Benchmark** (indicated by the vertical grey marker on the score bars).

### How to monitor risk:
1. Navigate to the **"Risk Monitor"** tab.
2. Paste a recent news headline about a company (e.g., a data breach or labor strike).
3. Click **"Calculate ESG Deduction"**.
4. The AI will categorize the risk and suggest a score penalty.

---

## 🗺️ Roadmap
- [ ] **Live Web Search:** Integrate Google Search grounding for real-time news retrieval.
- [ ] **PDF Parsing Engine:** Enhanced extraction for complex tabular data in PDF reports.
- [ ] **Portfolio Modeling:** Allow users to build custom "Green Baskets" and track aggregate scores.
- [ ] **Export Reports:** Generate professional PDF rating certificates for companies.

---

## 📄 License
Distributed under the MIT License. See `LICENSE` for more information.

---
**Developed with ❤️ for a Greener Future.**