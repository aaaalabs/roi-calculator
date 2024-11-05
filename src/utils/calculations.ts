import { PartnershipTier, InputValues, ROIResults } from '../types';

const TIER_CONFIG = {
  catalyst: {
    monthlyFee: 4997,
    churnReduction: 0.4, // 40% reduction
    timeReduction: 0.5, // 50% time savings
    placementCommission: 0.15, // 15%
  },
  equity: {
    monthlyFee: 3997,
    churnReduction: 0.35,
    timeReduction: 0.45,
    placementCommission: 0.2,
  },
  revolution: {
    monthlyFee: 2997,
    churnReduction: 0.3,
    timeReduction: 0.4,
    placementCommission: 0.25,
  },
};

export function calculateROI(inputs: InputValues, tier: PartnershipTier): ROIResults {
  const config = TIER_CONFIG[tier];
  
  // Calculate revenue impact from reduced churn
  const currentChurnLoss = 
    inputs.memberCount * 
    (inputs.churnRate / 100) * 
    inputs.monthlyFee * 
    12;
  const newChurnLoss = currentChurnLoss * (1 - config.churnReduction);
  const revenueImpact = currentChurnLoss - newChurnLoss;

  // Calculate time savings
  const currentManagementCost = 
    inputs.managementHours * 
    inputs.hourlyRate * 
    12;
  const timeSavings = currentManagementCost * config.timeReduction;

  // Calculate recruitment revenue
  const annualPlacements = inputs.monthlyPlacements * 12;
  const totalPlacementRevenue = annualPlacements * inputs.placementFee;
  const recruitmentRevenue = totalPlacementRevenue * (1 - config.placementCommission);

  // Calculate net ROI
  const annualCost = config.monthlyFee * 12;
  const totalBenefit = revenueImpact + timeSavings + recruitmentRevenue;
  const netRoi = totalBenefit - annualCost;
  const roiPercentage = Math.round((netRoi / annualCost) * 100);

  // Calculate payback period (in months)
  const monthlyBenefit = totalBenefit / 12;
  const paybackPeriod = Math.ceil(config.monthlyFee / (monthlyBenefit / 12));

  return {
    revenueImpact,
    timeSavings,
    recruitmentRevenue,
    netRoi,
    roiPercentage,
    paybackPeriod,
  };
}