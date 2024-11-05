import React from 'react';
import { Users, DollarSign, TrendingDown, Clock, Briefcase } from 'lucide-react';
import { InputValues } from '../types';

interface InputSectionProps {
  inputs: InputValues;
  setInputs: (inputs: InputValues) => void;
}

const InputSection: React.FC<InputSectionProps> = ({ inputs, setInputs }) => {
  const handleInputChange = (key: keyof InputValues, value: string) => {
    setInputs({
      ...inputs,
      [key]: parseFloat(value) || 0,
    });
  };

  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Community Metrics</h2>
      
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="flex items-center text-gray-700 mb-2">
              <Users className="h-5 w-5 mr-2 text-indigo-600" />
              Member Count
            </label>
            <input
              type="number"
              value={inputs.memberCount}
              onChange={(e) => handleInputChange('memberCount', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter member count"
            />
          </div>
          
          <div>
            <label className="flex items-center text-gray-700 mb-2">
              <DollarSign className="h-5 w-5 mr-2 text-indigo-600" />
              Monthly Fee
            </label>
            <input
              type="number"
              value={inputs.monthlyFee}
              onChange={(e) => handleInputChange('monthlyFee', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter monthly fee"
            />
          </div>
        </div>

        <div>
          <label className="flex items-center text-gray-700 mb-2">
            <TrendingDown className="h-5 w-5 mr-2 text-indigo-600" />
            Current Churn Rate (%)
          </label>
          <input
            type="number"
            value={inputs.churnRate}
            onChange={(e) => handleInputChange('churnRate', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter churn rate"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="flex items-center text-gray-700 mb-2">
              <Clock className="h-5 w-5 mr-2 text-indigo-600" />
              Monthly Management Hours
            </label>
            <input
              type="number"
              value={inputs.managementHours}
              onChange={(e) => handleInputChange('managementHours', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter management hours"
            />
          </div>
          
          <div>
            <label className="flex items-center text-gray-700 mb-2">
              <DollarSign className="h-5 w-5 mr-2 text-indigo-600" />
              Hourly Rate
            </label>
            <input
              type="number"
              value={inputs.hourlyRate}
              onChange={(e) => handleInputChange('hourlyRate', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter hourly rate"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="flex items-center text-gray-700 mb-2">
              <Briefcase className="h-5 w-5 mr-2 text-indigo-600" />
              Monthly Placements
            </label>
            <input
              type="number"
              value={inputs.monthlyPlacements}
              onChange={(e) => handleInputChange('monthlyPlacements', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter monthly placements"
            />
          </div>
          
          <div>
            <label className="flex items-center text-gray-700 mb-2">
              <DollarSign className="h-5 w-5 mr-2 text-indigo-600" />
              Average Placement Fee
            </label>
            <input
              type="number"
              value={inputs.placementFee}
              onChange={(e) => handleInputChange('placementFee', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter placement fee"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputSection;