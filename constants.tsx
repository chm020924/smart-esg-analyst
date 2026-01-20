
import { CompanyESGProfile, ESGDimension } from './types';

export const INDUSTRIES = [
  'Technology',
  'Energy',
  'Finance',
  'Healthcare',
  'Manufacturing',
  'Consumer Goods'
];

export const MOCK_COMPANIES: CompanyESGProfile[] = [
  {
    id: '1',
    name: 'EcoTech Solutions',
    ticker: 'ECTH',
    industry: 'Technology',
    scores: {
      [ESGDimension.ENVIRONMENT]: 88,
      [ESGDimension.SOCIAL]: 75,
      [ESGDimension.GOVERNANCE]: 82
    },
    overallRating: 'AA',
    carbonData: { intensity: 45, trend: -12 },
    newsFeed: [
      {
        id: 'n1',
        title: 'EcoTech launches new zero-waste hardware initiative',
        summary: 'A bold move towards circular economy in electronics manufacturing.',
        dimension: ESGDimension.ENVIRONMENT,
        impactScore: 5,
        source: 'Green Business Journal',
        date: '2024-03-15'
      }
    ]
  },
  {
    id: '3',
    name: 'Future FinServ',
    ticker: 'FIFS',
    industry: 'Finance',
    scores: {
      [ESGDimension.ENVIRONMENT]: 65,
      [ESGDimension.SOCIAL]: 88,
      [ESGDimension.GOVERNANCE]: 92
    },
    overallRating: 'AAA',
    carbonData: { intensity: 12, trend: -5 },
    newsFeed: []
  },
  {
    id: '4',
    name: 'Pure Water Systems',
    ticker: 'PWS',
    industry: 'Manufacturing',
    scores: {
      [ESGDimension.ENVIRONMENT]: 78,
      [ESGDimension.SOCIAL]: 70,
      [ESGDimension.GOVERNANCE]: 75
    },
    overallRating: 'A',
    carbonData: { intensity: 110, trend: -8 },
    newsFeed: []
  },
  {
    id: '5',
    name: 'BioHeal Lab',
    ticker: 'BHLB',
    industry: 'Healthcare',
    scores: {
      [ESGDimension.ENVIRONMENT]: 72,
      [ESGDimension.SOCIAL]: 85,
      [ESGDimension.GOVERNANCE]: 68
    },
    overallRating: 'A',
    carbonData: { intensity: 85, trend: -4 },
    newsFeed: []
  },
  {
    id: '6',
    name: 'Logistics Prime',
    ticker: 'LPRM',
    industry: 'Consumer Goods',
    scores: {
      [ESGDimension.ENVIRONMENT]: 58,
      [ESGDimension.SOCIAL]: 72,
      [ESGDimension.GOVERNANCE]: 65
    },
    overallRating: 'BBB',
    carbonData: { intensity: 220, trend: -3 },
    newsFeed: []
  },
  {
    id: '2',
    name: 'Global Petroleum Corp',
    ticker: 'GLPC',
    industry: 'Energy',
    scores: {
      [ESGDimension.ENVIRONMENT]: 32,
      [ESGDimension.SOCIAL]: 45,
      [ESGDimension.GOVERNANCE]: 68
    },
    overallRating: 'BB',
    carbonData: { intensity: 450, trend: 2 },
    newsFeed: [
      {
        id: 'n2',
        title: 'Fines imposed on Global Petroleum for offshore leakage',
        summary: 'Regulators have issued a $50M fine following a pipeline leak in the North Sea.',
        dimension: ESGDimension.ENVIRONMENT,
        impactScore: -15,
        source: 'Reuters',
        date: '2024-04-10'
      }
    ]
  }
];

export const RATING_COLORS: Record<string, string> = {
  'AAA': 'bg-emerald-600',
  'AA': 'bg-emerald-500',
  'A': 'bg-emerald-400',
  'BBB': 'bg-yellow-500',
  'BB': 'bg-orange-500',
  'B': 'bg-red-500',
  'CCC': 'bg-red-700'
};
