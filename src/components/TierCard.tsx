import React, { useState } from 'react';
import { Check, ChevronDown, ChevronUp, CheckCircle2 } from 'lucide-react';
import { PartnershipTier } from '../types';

interface TierCardProps {
  title: string;
  price: string;
  features: string[];
  isSelected: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  tier: PartnershipTier;
  isMobile?: boolean;
}

const FEATURES = [
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

const TierCard: React.FC<TierCardProps> = ({
  title,
  price,
  features,
  isSelected,
  onClick,
  icon,
  tier,
  isMobile = false
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const availableFeatures = TIER_FEATURES[tier];
  const totalValue = availableFeatures.reduce((sum, index) => 
    sum + parseInt(FEATURES[index].value.replace(/[^0-9]/g, '')), 0
  );

  const cardClasses = isMobile
    ? 'bg-white rounded-xl shadow-lg'
    : `relative rounded-2xl shadow-lg transition-all duration-300
       ${isSelected ? 'bg-gradient-to-br from-indigo-600 to-purple-700 text-white' : 'bg-white'}`;

  return (
    <div className={cardClasses}>
      <div
        className="p-6 sm:p-8 cursor-pointer"
        onClick={onClick}
      >
        <div className="flex items-center justify-between mb-4">
          <div className={`p-2 rounded-lg ${
            isMobile ? 'bg-indigo-50' : isSelected ? 'bg-white/20' : 'bg-indigo-50'
          }`}>
            {icon}
          </div>
          {isSelected && !isMobile && (
            <span className="text-sm font-semibold bg-white/20 px-3 py-1 rounded-full">
              Selected
            </span>
          )}
        </div>

        <h3 className={`text-xl sm:text-2xl font-bold mb-2 ${
          isMobile ? 'text-gray-900' : isSelected ? 'text-white' : 'text-gray-900'
        }`}>
          {title}
        </h3>
        <p className={`text-lg font-semibold mb-4 ${
          isMobile ? 'text-gray-600' : isSelected ? 'text-white/90' : 'text-gray-600'
        }`}>
          {price}
        </p>

        {!isMobile && (
          <p className={`text-sm mb-6 ${isSelected ? 'text-white/80' : 'text-gray-500'}`}>
            ${totalValue.toLocaleString()}/month value
          </p>
        )}

        {(!isMobile || isSelected) && (
          <ul className="space-y-4 mb-6">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center">
                <Check className={`h-5 w-5 mr-3 ${
                  isMobile ? 'text-indigo-600' : isSelected ? 'text-white' : 'text-indigo-600'
                }`} />
                <span className={
                  isMobile ? 'text-gray-600' : isSelected ? 'text-white/90' : 'text-gray-600'
                }>{feature}</span>
              </li>
            ))}
          </ul>
        )}

        {!isMobile && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
            className={`w-full px-4 py-2 rounded-lg border flex items-center justify-center gap-2
              ${isSelected 
                ? 'border-white/30 hover:bg-white/10' 
                : 'border-gray-200 hover:bg-gray-50'}`}
          >
            <span className={isSelected ? 'text-white/90' : 'text-gray-600'}>
              {isExpanded ? 'Show Less' : 'View Full Features'}
            </span>
            {isExpanded 
              ? <ChevronUp className={`h-4 w-4 ${isSelected ? 'text-white/90' : 'text-gray-600'}`} />
              : <ChevronDown className={`h-4 w-4 ${isSelected ? 'text-white/90' : 'text-gray-600'}`} />
            }
          </button>
        )}
      </div>

      {isExpanded && !isMobile && (
        <div className={`p-6 border-t ${
          isSelected ? 'border-white/10 bg-white/5' : 'border-gray-100 bg-gray-50'
        }`}>
          <div className="space-y-4">
            {FEATURES.map((feature, index) => (
              availableFeatures.includes(index) && (
                <div key={index} className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-gray-900">{feature.name}</h4>
                    <span className="text-sm text-indigo-600 font-medium">{feature.value}</span>
                  </div>
                  <ul className="space-y-2">
                    {feature.description.map((item, i) => (
                      <li key={i} className="text-sm text-gray-600 flex items-center">
                        <CheckCircle2 className="h-4 w-4 text-indigo-500 mr-2 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TierCard;