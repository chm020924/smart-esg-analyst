
export enum ESGDimension {
  ENVIRONMENT = 'Environmental',
  SOCIAL = 'Social',
  GOVERNANCE = 'Governance'
}

export interface ESGMetric {
  name: string;
  score: number;
  weight: number;
  description: string;
}

export interface NewsSentiment {
  id: string;
  title: string;
  summary: string;
  dimension: ESGDimension;
  impactScore: number; // Negative value for bad news
  source: string;
  date: string;
}

export interface CompanyESGProfile {
  id: string;
  name: string;
  ticker: string;
  industry: string;
  scores: {
    [ESGDimension.ENVIRONMENT]: number;
    [ESGDimension.SOCIAL]: number;
    [ESGDimension.GOVERNANCE]: number;
  };
  overallRating: string; // AAA, AA, A, BBB, etc.
  carbonData: {
    intensity: number; // tons CO2 per million revenue
    trend: number; // % change
  };
  newsFeed: NewsSentiment[];
}

export interface AnalysisResult {
  scores: {
    environmental: number;
    social: number;
    governance: number;
  };
  summary: string;
  executiveSummary: string;
  suggestedRating: string;
  riskWarnings: string[];
}
