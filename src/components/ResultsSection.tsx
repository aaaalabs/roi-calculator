import React, { useState } from 'react';
import { TrendingUp, Clock, DollarSign, ArrowRight, AlertCircle, RotateCw } from 'lucide-react';
import { PartnershipTier, ROIResults } from '../types';

interface ResultsSectionProps {
  results: ROIResults;
  selectedTier: PartnershipTier;
  inputs: { [key: string]: number };
}

interface FlipCardProps {
  title: string;
  icon: React.ReactNode;
  value: string;
  description: string;
  calculation: React.ReactNode;
  gradientFrom: string;
  gradientTo: string;
  iconColor: string;
}

const FlipCard: React.FC<FlipCardProps> = ({
  title,
  icon,
  value,
  description,
  calculation,
  gradientFrom,
  gradientTo,
  iconColor
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="relative h-[200px] perspective-1000">
      <div
        className={`w-full h-full transition-transform duration-500 transform-style-preserve-3d cursor-pointer
          ${isFlipped ? 'rotate-y-180' : ''}`}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* Front */}
        <div className={`absolute w-full h-full backface-hidden
          bg-gradient-to-br ${gradientFrom} ${gradientTo} p-6 rounded-xl`}>
          <div className="flex items-center mb-4">
            <div className={`${iconColor} mr-2`}>{icon}</div>
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <RotateCw className="h-4 w-4 text-gray-500 ml-auto" />
          </div>
          <p className="text-3xl font-bold text-gray-900 mb-2">{value}</p>
          <p className="text-sm text-gray-600">{description}</p>
        </div>

        {/* Back */}
        <div className={`absolute w-full h-full backface-hidden rotate-y-180
          bg-white border-2 ${gradientTo.replace('to-', 'border-')} rounded-xl overflow-hidden`}>
          <div className="h-full flex flex-col">
            <div className="flex items-center p-4 border-b">
              <h3 className="text-lg font-semibold text-gray-900">Calculation Details</h3>
              <RotateCw className="h-4 w-4 text-gray-500 ml-auto" />
            </div>
            <div className="p-4 overflow-y-auto custom-scrollbar flex-1">
              <div className="text-sm text-gray-600 space-y-2">{calculation}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ResultsSection: React.FC<ResultsSectionProps> = ({ results, selectedTier, inputs }) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatPercent = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  const tierConfig = {
    catalyst: { churnReduction: 40, timeReduction: 50, commission: 15 },
    equity: { churnReduction: 35, timeReduction: 45, commission: 20 },
    revolution: { churnReduction: 30, timeReduction: 40, commission: 25 },
  }[selectedTier];

  const showDetailedROI = results.netRoi > 0 && results.paybackPeriod < 12;

  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">ROI Analysis</h2>

      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FlipCard
            title="Revenue Impact"
            icon={<TrendingUp className="h-6 w-6" />}
            value={formatCurrency(results.revenueImpact)}
            description="Additional annual revenue from reduced churn"
            gradientFrom="from-green-50"
            gradientTo="to-emerald-50"
            iconColor="text-green-600"
            calculation={
              <>
                <p className="font-medium">Current Annual Churn Loss:</p>
                <p>{inputs.memberCount} members × {formatPercent(inputs.churnRate)} churn × ${inputs.monthlyFee}/mo × 12 months = {formatCurrency(inputs.memberCount * (inputs.churnRate / 100) * inputs.monthlyFee * 12)}</p>
                
                <p className="font-medium mt-3">New Annual Churn Loss:</p>
                <p>Current loss × {formatPercent(100 - tierConfig.churnReduction)} (after {tierConfig.churnReduction}% reduction) = {formatCurrency(inputs.memberCount * (inputs.churnRate / 100) * inputs.monthlyFee * 12 * (1 - tierConfig.churnReduction / 100))}</p>
                
                <p className="font-medium text-green-600 mt-3">Annual Savings:</p>
                <p>{formatCurrency(results.revenueImpact)}</p>
              </>
            }
          />

          <FlipCard
            title="Time Savings"
            icon={<Clock className="h-6 w-6" />}
            value={formatCurrency(results.timeSavings)}
            description="Annual cost savings from improved efficiency"
            gradientFrom="from-blue-50"
            gradientTo="to-indigo-50"
            iconColor="text-blue-600"
            calculation={
              <>
                <p className="font-medium">Current Management Cost:</p>
                <p>{inputs.managementHours} hours/mo × ${inputs.hourlyRate}/hr × 12 months = {formatCurrency(inputs.managementHours * inputs.hourlyRate * 12)}</p>
                
                <p className="font-medium mt-3">Time Reduction:</p>
                <p>{tierConfig.timeReduction}% efficiency improvement</p>
                
                <p className="font-medium text-blue-600 mt-3">Annual Savings:</p>
                <p>{formatCurrency(results.timeSavings)} ({formatPercent(tierConfig.timeReduction)} of current cost)</p>
              </>
            }
          />
        </div>

        <FlipCard
          title="Recruitment Revenue"
          icon={<DollarSign className="h-6 w-6" />}
          value={formatCurrency(results.recruitmentRevenue)}
          description="Potential annual revenue from placements"
          gradientFrom="from-purple-50"
          gradientTo="to-pink-50"
          iconColor="text-purple-600"
          calculation={
            <>
              <p className="font-medium">Total Placement Value:</p>
              <p>{inputs.monthlyPlacements} placements/mo × 12 months × {formatCurrency(inputs.placementFee)}/placement = {formatCurrency(inputs.monthlyPlacements * 12 * inputs.placementFee)}</p>
              
              <p className="font-medium mt-3">Partnership Commission:</p>
              <p>{tierConfig.commission}% of total value = {formatCurrency(inputs.monthlyPlacements * 12 * inputs.placementFee * (tierConfig.commission / 100))}</p>
              
              <p className="font-medium text-purple-600 mt-3">Net Annual Revenue:</p>
              <p>{formatCurrency(results.recruitmentRevenue)} (after {tierConfig.commission}% commission)</p>
            </>
          }
        />

        <div className="border-t pt-6">
          <div 
            className={`transform transition-all duration-500 ease-in-out overflow-hidden
              ${showDetailedROI ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Net ROI</h3>
                <div className="flex items-center space-x-4">
                  <p className="text-4xl font-bold text-indigo-600">
                    {formatCurrency(results.netRoi)}
                  </p>
                  <ArrowRight className="h-6 w-6 text-gray-400" />
                  <p className="text-lg text-gray-600">{results.roiPercentage}% ROI</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Payback Period</h3>
                <p className="text-4xl font-bold text-indigo-600">{results.paybackPeriod} months</p>
              </div>
            </div>
          </div>

          {!showDetailedROI && (
            <div className="flex items-center justify-center p-6 bg-amber-50 rounded-xl">
              <AlertCircle className="h-5 w-5 text-amber-600 mr-2" />
              <p className="text-amber-700">
                {results.netRoi <= 0 
                  ? "Adjust your inputs to see potential positive returns on investment"
                  : "Consider adjusting your metrics to achieve a faster payback period"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultsSection;