import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Package, CheckCircle2 } from 'lucide-react';
import { PartnershipTier } from '../types';

interface Feature {
  name: string;
  value: string;
  description: string[];
}

const FEATURES: Feature[] = [
  {
    name: 'MatchMaker AI Engine',
    value: '$5,000/month value',
    description: [
      'Custom-trained AI on your community\'s unique DNA',
      '50+ data point analysis for perfect matches',
      'Automated warm introductions',
      'Human-guided connection protocol'
    ]
  },
  {
    name: 'GeoNet Pulse Map',
    value: '$3,000/month value',
    description: [
      'Real-time community visualization',
      'Automated local meetup suggestions',
      'Geographic expansion planning',
      'Connection density analytics'
    ]
  },
  {
    name: 'Elite Hosts Program',
    value: '$4,000/month value',
    description: [
      'Host recruitment & training system',
      'Proven host incentive structure',
      'Weekly host performance analytics',
      'Connection quality monitoring'
    ]
  },
  {
    name: 'Spotlight Launcher',
    value: '$2,500/month value',
    description: [
      'Automated member highlight system',
      'AI-powered content generation',
      'Cross-platform promotion',
      'Engagement tracking'
    ]
  },
  {
    name: 'Community Podcast Launchpad',
    value: '$2,000/month value',
    description: [
      'Full podcast launch strategy',
      'Content planning system',
      'Member story curation',
      'Distribution automation'
    ]
  },
  {
    name: 'Growth Analytics Dashboard',
    value: '$2,500/month value',
    description: [
      'Real-time retention metrics',
      'Connection strength scoring',
      'Engagement prediction',
      'ROI tracking'
    ]
  }
];

const TIER_FEATURES = {
  revolution: [0, 1],
  equity: [0, 1, 2, 3],
  catalyst: [0, 1, 2, 3, 4, 5]
};

const TIER_NAMES = {
  revolution: 'Revolution Partnership',
  equity: 'Equity Partnership',
  catalyst: 'Community Catalyst'
};

interface FeatureCardProps {
  feature: Feature;
  isExpanded: boolean;
  onToggle: () => void;
  includedInTiers: PartnershipTier[];
  selectedTier: PartnershipTier;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  feature, 
  isExpanded, 
  onToggle, 
  includedInTiers,
  selectedTier 
}) => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
    <div
      className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50"
      onClick={onToggle}
    >
      <div className="flex-1">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-gray-900">{feature.name}</h3>
          <p className="text-sm text-indigo-600 font-medium">{feature.value}</p>
        </div>
        <div className="flex gap-2">
          {includedInTiers.map((tier) => (
            <span
              key={tier}
              className={`text-xs px-2 py-1 rounded-full ${
                tier === selectedTier
                  ? 'bg-indigo-100 text-indigo-700 font-medium'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {TIER_NAMES[tier]}
            </span>
          ))}
        </div>
      </div>
      {isExpanded ? (
        <ChevronUp className="h-5 w-5 text-gray-400 ml-4 flex-shrink-0" />
      ) : (
        <ChevronDown className="h-5 w-5 text-gray-400 ml-4 flex-shrink-0" />
      )}
    </div>
    {isExpanded && (
      <div className="px-4 pb-4 bg-gray-50 border-t border-gray-100">
        <ul className="space-y-2 pt-3">
          {feature.description.map((item, index) => (
            <li key={index} className="text-sm text-gray-600 flex items-center">
              <CheckCircle2 className="h-4 w-4 text-indigo-500 mr-2 flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    )}
  </div>
);

interface FeaturesComparisonProps {
  selectedTier: PartnershipTier;
}

const FeaturesComparison: React.FC<FeaturesComparisonProps> = ({ selectedTier }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [expandedFeatures, setExpandedFeatures] = useState<number[]>([]);

  const toggleFeature = (index: number) => {
    setExpandedFeatures(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const getIncludedTiers = (featureIndex: number): PartnershipTier[] => {
    return Object.entries(TIER_FEATURES).reduce((tiers: PartnershipTier[], [tier, features]) => {
      if (features.includes(featureIndex)) {
        tiers.push(tier as PartnershipTier);
      }
      return tiers;
    }, []);
  };

  const availableFeatures = TIER_FEATURES[selectedTier];
  const totalValue = availableFeatures.reduce((sum, index) => 
    sum + parseInt(FEATURES[index].value.replace(/[^0-9]/g, '')), 0
  );

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div
        className="p-6 flex items-center justify-between cursor-pointer hover:bg-gray-50"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center">
          <Package className="h-6 w-6 text-indigo-600 mr-3" />
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Features & Value Stack</h2>
            <p className="text-gray-600 mt-1">
              ${totalValue.toLocaleString()}/month value with {availableFeatures.length} premium features
            </p>
          </div>
        </div>
        {isExpanded ? (
          <ChevronUp className="h-6 w-6 text-gray-400" />
        ) : (
          <ChevronDown className="h-6 w-6 text-gray-400" />
        )}
      </div>
      
      {isExpanded && (
        <div className="p-6 pt-2 border-t border-gray-100">
          <div className="space-y-4">
            {FEATURES.map((feature, index) => (
              <div 
                key={index} 
                className={availableFeatures.includes(index) ? 'opacity-100' : 'opacity-40'}
              >
                <FeatureCard
                  feature={feature}
                  isExpanded={expandedFeatures.includes(index)}
                  onToggle={() => toggleFeature(index)}
                  includedInTiers={getIncludedTiers(index)}
                  selectedTier={selectedTier}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FeaturesComparison;