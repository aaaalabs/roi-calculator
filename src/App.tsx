import React, { useState, useEffect } from 'react';
import { Calculator, Users, Clock, DollarSign, Briefcase, Monitor } from 'lucide-react';
import TierCard from './components/TierCard';
import InputSection from './components/InputSection';
import ResultsSection from './components/ResultsSection';
import { calculateROI } from './utils/calculations';
import { PartnershipTier, InputValues } from './types';

function App() {
  const [selectedTier, setSelectedTier] = useState<PartnershipTier>('catalyst');
  const [isDesktop, setIsDesktop] = useState(false);
  const [inputs, setInputs] = useState<InputValues>({
    memberCount: 1000,
    monthlyFee: 50,
    churnRate: 5,
    managementHours: 40,
    hourlyRate: 50,
    monthlyPlacements: 10,
    placementFee: 5000,
  });

  useEffect(() => {
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    
    checkIsDesktop();
    window.addEventListener('resize', checkIsDesktop);
    
    return () => window.removeEventListener('resize', checkIsDesktop);
  }, []);

  const results = calculateROI(inputs, selectedTier);

  const MobilePrompt = () => (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-indigo-600 to-purple-600 text-white p-4 shadow-lg transform transition-transform duration-300 ease-in-out">
      <div className="flex items-center justify-between max-w-md mx-auto">
        <div className="flex items-center">
          <Monitor className="h-5 w-5 mr-3" />
          <p className="text-sm font-medium">Open on desktop for full experience</p>
        </div>
        <span className="text-xs bg-white/20 px-2 py-1 rounded-full">Pro tip</span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Calculator className="h-12 w-12 text-indigo-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            VoiceLoop ROI Calculator
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {isDesktop 
              ? "Discover the financial impact of our partnership tiers on your community's growth"
              : "Quick ROI estimation for your community"}
          </p>
        </div>

        {/* Mobile View */}
        <div className="lg:hidden">
          <div className="mb-8">
            <TierCard
              title="Community Catalyst"
              price="$4,997/mo"
              features={[
                'Full Platform Access',
                'Custom Growth Strategy',
                'Dedicated Success Team',
                'Enterprise Analytics'
              ]}
              isSelected={selectedTier === 'catalyst'}
              onClick={() => setSelectedTier('catalyst')}
              icon={<Briefcase className="h-6 w-6" />}
              tier="catalyst"
              isMobile={true}
            />
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Estimate</h3>
              <div className="space-y-4">
                <div>
                  <label className="flex items-center text-gray-700 mb-2">
                    <Users className="h-5 w-5 mr-2 text-indigo-600" />
                    Member Count
                  </label>
                  <input
                    type="number"
                    value={inputs.memberCount}
                    onChange={(e) => setInputs({...inputs, memberCount: parseFloat(e.target.value) || 0})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
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
                    onChange={(e) => setInputs({...inputs, monthlyFee: parseFloat(e.target.value) || 0})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Estimated Annual ROI</h3>
              <div className="text-3xl font-bold text-indigo-600">
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                  maximumFractionDigits: 0,
                }).format(results.netRoi)}
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Based on reduced churn and improved efficiency
              </p>
            </div>
          </div>
        </div>

        {/* Desktop View */}
        <div className="hidden lg:block">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <TierCard
              title="Revolution Partnership"
              price="$2,997/mo + 10% equity"
              features={[
                'Core AI Matching Engine',
                'Geographic Expansion Tools',
                'Basic Support Package',
                'Standard Analytics'
              ]}
              isSelected={selectedTier === 'revolution'}
              onClick={() => setSelectedTier('revolution')}
              icon={<Users className="h-6 w-6" />}
              tier="revolution"
            />
            <TierCard
              title="Equity Partnership"
              price="$3,997/mo + 2% equity"
              features={[
                'Advanced Host Management',
                'Content Automation Suite',
                'Priority Support Access',
                'Enhanced Analytics'
              ]}
              isSelected={selectedTier === 'equity'}
              onClick={() => setSelectedTier('equity')}
              icon={<Clock className="h-6 w-6" />}
              tier="equity"
            />
            <TierCard
              title="Community Catalyst"
              price="$4,997/mo"
              features={[
                'Full Platform Access',
                'Custom Growth Strategy',
                'Dedicated Success Team',
                'Enterprise Analytics'
              ]}
              isSelected={selectedTier === 'catalyst'}
              onClick={() => setSelectedTier('catalyst')}
              icon={<Briefcase className="h-6 w-6" />}
              tier="catalyst"
            />
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <InputSection inputs={inputs} setInputs={setInputs} />
            <ResultsSection results={results} selectedTier={selectedTier} inputs={inputs} />
          </div>
        </div>
      </div>
      
      {!isDesktop && <MobilePrompt />}
    </div>
  );
}

export default App;