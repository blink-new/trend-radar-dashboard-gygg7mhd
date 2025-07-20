export interface Trend {
  id: string;
  name: string;
  description: string;
  category: 'Technology' | 'Industry' | 'Humanity';
  readinessLevel: number; // 1-9 (Technology Readiness Level)
  businessReadiness: number; // 1-5 (Business Readiness Level)
  impact: 'Low' | 'Medium' | 'High' | 'Transformative';
  timeHorizon: '2025' | '2026' | '2027' | '2028' | '2029+';
  angle: number; // Position on radar (0-360 degrees)
  radius: number; // Distance from center (0-1)
  tags: string[];
  lastUpdated: string;
}

export interface RadarQuadrant {
  name: string;
  color: string;
  startAngle: number;
  endAngle: number;
}

export interface FilterState {
  categories: string[];
  readinessLevels: number[];
  impacts: string[];
  timeHorizons: string[];
  searchQuery: string;
}

export type DistributionMethod = 'technology' | 'business' | 'impact' | 'timeline';

export interface DistributionOption {
  value: DistributionMethod;
  label: string;
  description: string;
}