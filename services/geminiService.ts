
import { GoogleGenAI, Type } from "@google/genai";
import { ESGDimension, AnalysisResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const analyzeESGReport = async (text: string): Promise<AnalysisResult> => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Analyze the following corporate ESG information/report and provide an evaluation.
    Evaluate across Environmental, Social, and Governance dimensions.
    
    You must provide:
    1. A concise, high-level Executive Summary (2-3 sentences) suitable for a quick briefing.
    2. A detailed analysis summary of the core ESG performance.
    3. Specific scores (0-100) for E, S, and G.
    4. A suggested overall rating (AAA to CCC).
    5. A list of risk warnings if applicable.

    Return the result in JSON format.
    
    Text: ${text}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          scores: {
            type: Type.OBJECT,
            properties: {
              environmental: { type: Type.NUMBER },
              social: { type: Type.NUMBER },
              governance: { type: Type.NUMBER }
            },
            required: ["environmental", "social", "governance"]
          },
          executiveSummary: { type: Type.STRING, description: "A high-level overview of the report's key findings." },
          summary: { type: Type.STRING, description: "Detailed summary of findings." },
          suggestedRating: { type: Type.STRING },
          riskWarnings: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          }
        },
        required: ["scores", "summary", "executiveSummary", "suggestedRating", "riskWarnings"]
      }
    }
  });

  try {
    return JSON.parse(response.text.trim()) as AnalysisResult;
  } catch (e) {
    console.error("Failed to parse ESG analysis", e);
    throw new Error("Analysis parsing failed");
  }
};

export const monitorNewsImpact = async (newsTitle: string, newsSummary: string): Promise<{ dimension: ESGDimension, impact: number }> => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Analyze the sentiment and ESG impact of this news item. 
    Return the primary affected dimension (ENVIRONMENT, SOCIAL, or GOVERNANCE) and an impact score from -20 to +20.
    
    News Title: ${newsTitle}
    Summary: ${newsSummary}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          dimension: { 
            type: Type.STRING,
            enum: ["ENVIRONMENT", "SOCIAL", "GOVERNANCE"]
          },
          impact: { type: Type.NUMBER }
        },
        required: ["dimension", "impact"]
      }
    }
  });

  const res = JSON.parse(response.text.trim());
  return {
    dimension: res.dimension as ESGDimension,
    impact: res.impact
  };
};
