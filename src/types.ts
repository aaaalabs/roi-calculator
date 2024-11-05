export type PartnershipTier = 'catalyst' | 'equity' | 'revolution';

export interface InputValues {
  memberCount: number;
  monthlyFee: number;
  churnRate: number;
  managementHours: number;
  hourlyRate: number;
  monthlyPlacements: number;
  placementFee: number;
}

export interface ROIResults {
  revenueImpact: number;
  timeSavings: number;
  recruitmentRevenue: number;
  netRoi: number;
  roiPercentage: number;
  paybackPeriod: number;
}