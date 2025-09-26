import { useState } from 'react';
import { Calculator, Heart, Target, Coins, BarChart3, Laptop, Building2 } from 'lucide-react';

const MykroDonationCalculator = () => {
  // State for input parameters
  const [bettorDonationPercent, setBettorDonationPercent] = useState(10);
  const [operatorContributionPercent, setOperatorContributionPercent] = useState(20);
  const [mykroMarketShare, setMykroMarketShare] = useState(5);
  const [mykroCommission, setMykroCommission] = useState(0);
  const [selectedOperator, setSelectedOperator] = useState('all');
  const [activeTab, setActiveTab] = useState('calculator');
  const [selectedOperatorAnalysis, setSelectedOperatorAnalysis] = useState('bet365');

  // UK Market Data - ONLINE ONLY (in billions)
  const totalMarketTurnover = 53.3;
  const onlineMarketTurnover = 40.0;
  const winRate = 0.47;
  const lossRate = 0.53;
  const averageMargin = 0.06;

  // UK Charitable Giving Context
  const nationalLotteryOnline = 850;
  const currentOnlineCharity = 5;
  const totalUKCharityGiving = 13900;

  // Operator data - ONLINE MARKET SHARES
  const operators = {
    all: { 
      name: 'UK Online Betting Total', 
      onlineShare: 1.0, 
      totalShare: 0.75,
      onlineTurnover: onlineMarketTurnover, 
      totalTurnover: totalMarketTurnover,
      charity: 5,
      onlineAccountShare: '100%'
    },
    bet365: { 
      name: 'Bet365', 
      onlineShare: 0.36, 
      totalShare: 0.28,
      onlineTurnover: onlineMarketTurnover * 0.36, 
      totalTurnover: totalMarketTurnover * 0.28,
      charity: 127,
      onlineAccountShare: '36%'
    },
    flutter: { 
      name: 'Flutter Entertainment (Sky Bet + Paddy Power)', 
      onlineShare: 0.44,
      totalShare: 0.25,
      onlineTurnover: onlineMarketTurnover * 0.44, 
      totalTurnover: totalMarketTurnover * 0.25,
      charity: 1.0,
      onlineAccountShare: '56%'
    },
    entain: { 
      name: 'Entain (Ladbrokes + Coral)', 
      onlineShare: 0.07,
      totalShare: 0.15,
      onlineTurnover: onlineMarketTurnover * 0.07, 
      totalTurnover: totalMarketTurnover * 0.15,
      charity: 0.8,
      onlineAccountShare: '28%'
    },
    skybet: { 
      name: 'Sky Bet (Flutter)', 
      onlineShare: 0.36, 
      totalShare: 0.18,
      onlineTurnover: onlineMarketTurnover * 0.36, 
      totalTurnover: totalMarketTurnover * 0.18,
      charity: 0.5,
      onlineAccountShare: '36%'
    },
    paddypower: { 
      name: 'Paddy Power (Flutter)', 
      onlineShare: 0.08, 
      totalShare: 0.07,
      onlineTurnover: onlineMarketTurnover * 0.08, 
      totalTurnover: totalMarketTurnover * 0.07,
      charity: 0.5,
      onlineAccountShare: '20%'
    },
    williamhill: { 
      name: 'William Hill (888)', 
      onlineShare: 0.06, 
      totalShare: 0.11,
      onlineTurnover: onlineMarketTurnover * 0.06, 
      totalTurnover: totalMarketTurnover * 0.11,
      charity: 0.5,
      onlineAccountShare: '18%'
    },
    ladbrokes: { 
      name: 'Ladbrokes (Entain)', 
      onlineShare: 0.04, 
      totalShare: 0.08,
      onlineTurnover: onlineMarketTurnover * 0.04, 
      totalTurnover: totalMarketTurnover * 0.08,
      charity: 0.4,
      onlineAccountShare: '15%'
    },
    coral: { 
      name: 'Coral (Entain)', 
      onlineShare: 0.03, 
      totalShare: 0.07,
      onlineTurnover: onlineMarketTurnover * 0.03, 
      totalTurnover: totalMarketTurnover * 0.07,
      charity: 0.4,
      onlineAccountShare: '13%'
    },
    betfred: { 
      name: 'Betfred', 
      onlineShare: 0.03, 
      totalShare: 0.16,
      onlineTurnover: onlineMarketTurnover * 0.03, 
      totalTurnover: totalMarketTurnover * 0.16,
      charity: 0.6,
      onlineAccountShare: '13%'
    },
    betway: { 
      name: 'Betway', 
      onlineShare: 0.04, 
      totalShare: 0.04,
      onlineTurnover: onlineMarketTurnover * 0.04, 
      totalTurnover: totalMarketTurnover * 0.04,
      charity: 0.1,
      onlineAccountShare: '12%'
    }
  };

  // Calculate donations - ONLINE ONLY
  const calculateDonations = (operatorKey: string = selectedOperator) => {
    const operator = operators[operatorKey as keyof typeof operators];
    const turnover = operator.onlineTurnover;
    
    // Winning bets calculations
    const totalReturned = turnover * (1 - averageMargin);
    const winningStakes = turnover * winRate;
    const netWinnings = totalReturned - winningStakes;
    const donationsFromWinners = netWinnings * (bettorDonationPercent / 100);
    
    // Losing bets calculations
    const totalLosingStakes = turnover * lossRate;
    const potentialWinningsOnLosingBets = totalLosingStakes;
    const pledgeAmount = potentialWinningsOnLosingBets * (bettorDonationPercent / 100);
    const operatorContributions = pledgeAmount * (operatorContributionPercent / 100);
    
    const totalDonationsPotential = donationsFromWinners + operatorContributions;
    const totalDonationsActual = totalDonationsPotential * (mykroMarketShare / 100);
    
    // Calculate net donations after Mykro commission
    const mykroRevenue = totalDonationsActual * (mykroCommission / 100);
    const netDonationsToCharity = totalDonationsActual * (1 - mykroCommission / 100);
    
    // Calculate market share of charitable giving
    const onlineGamblingCharityMarket = nationalLotteryOnline + currentOnlineCharity + (totalDonationsActual * 1000);
    const mykroCharityMarketShare = (netDonationsToCharity * 1000) / onlineGamblingCharityMarket * 100;
    const mykroUKCharityShare = (netDonationsToCharity * 1000) / totalUKCharityGiving * 100;
    
    return {
      turnover: turnover * 1000,
      totalTurnover: operator.totalTurnover * 1000,
      donationsFromWinners: donationsFromWinners * 1000 * (mykroMarketShare / 100),
      operatorContributions: operatorContributions * 1000 * (mykroMarketShare / 100),
      totalDonationsActual: totalDonationsActual * 1000,
      totalDonationsPotential: totalDonationsPotential * 1000,
      netDonationsToCharity: netDonationsToCharity * 1000,
      mykroRevenue: mykroRevenue * 1000,
      donationRate: (totalDonationsPotential / turnover) * 100,
      operatorCost: (operatorContributions / (turnover * averageMargin)) * 100,
      mykroCharityMarketShare,
      mykroUKCharityShare,
      efficiency: 100 - mykroCommission
    };
  };

  const results = calculateDonations();

  // Format currency
  const formatCurrency = (value: number) => {
    if (value >= 1000) {
      return `£${(value / 1000).toFixed(1)}bn`;
    }
    if (value < 1) {
      return `£${(value * 1000).toFixed(0)}k`;
    }
    return `£${value.toFixed(1)}m`;
  };

  // Format percentage
  const formatPercent = (value: number) => `${value.toFixed(2)}%`;

  return (
    <div className="max-w-7xl mx-auto p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
          <Calculator className="text-blue-600" />
          Mykro Foundation Impact Calculator
          <span className="text-sm bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 px-2 py-1 rounded-full flex items-center gap-1">
            <Laptop className="w-4 h-4" />
            Online Betting Only
          </span>
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Model charitable donation volumes for UK online sports betting</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setActiveTab('calculator')}
          className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
            activeTab === 'calculator' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          <Calculator className="inline w-4 h-4 mr-1" />
          Impact Calculator
        </button>
        <button
          onClick={() => setActiveTab('market')}
          className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
            activeTab === 'market' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          <BarChart3 className="inline w-4 h-4 mr-1" />
          Market Overview
        </button>
        <button
          onClick={() => setActiveTab('operator')}
          className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
            activeTab === 'operator' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          <Building2 className="inline w-4 h-4 mr-1" />
          Operator Analysis
        </button>
      </div>

      {activeTab === 'calculator' ? (
        <div className="flex gap-6">
          {/* Left Column - Controls */}
          <div className="w-96 space-y-4">
            {/* Operator Selection */}
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="text-sm font-semibold text-gray-800 dark:text-white mb-2">Select Online Operator</h3>
              <select
                value={selectedOperator}
                onChange={(e) => setSelectedOperator(e.target.value)}
                className="w-full p-2 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">{operators.all.name}</option>
                <optgroup label="Major Operator Groups">
                  <option value="bet365">{operators.bet365.name}</option>
                  <option value="flutter">{operators.flutter.name}</option>
                  <option value="entain">{operators.entain.name}</option>
                </optgroup>
                <optgroup label="Individual Brands">
                  <option value="skybet">{operators.skybet.name}</option>
                  <option value="paddypower">{operators.paddypower.name}</option>
                  <option value="ladbrokes">{operators.ladbrokes.name}</option>
                  <option value="coral">{operators.coral.name}</option>
                  <option value="williamhill">{operators.williamhill.name}</option>
                  <option value="betfred">{operators.betfred.name}</option>
                  <option value="betway">{operators.betway.name}</option>
                </optgroup>
              </select>
              <div className="bg-gray-100 dark:bg-gray-600 p-2 rounded mt-2">
                <p className="text-xs text-gray-700 dark:text-gray-300">
                  <strong>Online Volume:</strong> {formatCurrency(results.turnover)}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Processes {formatCurrency(results.turnover * mykroMarketShare / 100)} with {mykroMarketShare}% adoption
                </p>
              </div>
            </div>

            {/* Mykro Market Share */}
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-700">
              <h3 className="text-sm font-semibold text-gray-800 dark:text-white mb-2">
                <Target className="inline w-4 h-4 text-green-600 mr-1" />
                Mykro Adoption: <span className="text-green-600">{mykroMarketShare}%</span>
              </h3>
              <input
                type="range"
                min="1"
                max="10"
                value={mykroMarketShare}
                onChange={(e) => setMykroMarketShare(parseInt(e.target.value))}
                className="w-full h-2 bg-green-200 dark:bg-green-700 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                <span>1%</span>
                <span>10%</span>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">% of online bettors using Mykro</p>
              <div className="bg-green-50 dark:bg-green-900/30 p-2 rounded mt-2 border border-green-100 dark:border-green-800">
                <p className="text-xs text-gray-700 dark:text-gray-300">
                  <strong>Active Users:</strong> {((30.0 * mykroMarketShare) / 100).toFixed(1)}M of ~30M online bettors
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Processing £{(onlineMarketTurnover * mykroMarketShare / 100).toFixed(1)}bn in bets annually
                </p>
              </div>
            </div>

            {/* Mykro Commission */}
            <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg border border-orange-200 dark:border-orange-700">
              <h3 className="text-sm font-semibold text-gray-800 dark:text-white mb-2">
                <Coins className="inline w-4 h-4 text-orange-600 mr-1" />
                Mykro Commission: <span className="text-orange-600">{mykroCommission}%</span>
              </h3>
              <input
                type="range"
                min="0"
                max="10"
                step="0.5"
                value={mykroCommission}
                onChange={(e) => setMykroCommission(parseFloat(e.target.value))}
                className="w-full h-2 bg-orange-200 dark:bg-orange-700 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                <span>0%</span>
                <span>10%</span>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                {mykroCommission === 0 ? 
                  "100% pass-through (revenue from other sources)" : 
                  `${mykroCommission}% of donations for operations`}
              </p>
              <div className="bg-orange-50 dark:bg-orange-900/30 p-2 rounded mt-2 border border-orange-100 dark:border-orange-800">
                <p className="text-xs text-gray-700 dark:text-gray-300">
                  <strong>Example:</strong> £100 donated to charity
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {mykroCommission === 0 ? 
                    "Charity receives: £100 (100%)" : 
                    `Mykro: £${mykroCommission.toFixed(2)} | Charity: £${(100 - mykroCommission).toFixed(2)}`}
                </p>
              </div>
            </div>

            {/* Bettor Donation */}
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="text-sm font-semibold text-gray-800 dark:text-white mb-2">
                Bettor Donation: <span className="text-blue-600">{bettorDonationPercent}%</span>
              </h3>
              <input
                type="range"
                min="1"
                max="20"
                value={bettorDonationPercent}
                onChange={(e) => setBettorDonationPercent(parseInt(e.target.value))}
                className="w-full h-2 bg-blue-200 dark:bg-blue-700 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                <span>1%</span>
                <span>20%</span>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">% of winnings donated</p>
              <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded mt-2 border border-blue-100 dark:border-blue-800">
                <p className="text-xs text-gray-700 dark:text-gray-300">
                  <strong>Example:</strong> Win £20 → Donate £{(20 * bettorDonationPercent / 100).toFixed(2)}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  You keep: £{(20 * (100 - bettorDonationPercent) / 100).toFixed(2)}
                </p>
              </div>
            </div>

            {/* Operator Contribution */}
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="text-sm font-semibold text-gray-800 dark:text-white mb-2">
                Operator Contribution: <span className="text-purple-600">{operatorContributionPercent}%</span>
              </h3>
              <input
                type="range"
                min="5"
                max="50"
                step="5"
                value={operatorContributionPercent}
                onChange={(e) => setOperatorContributionPercent(parseInt(e.target.value))}
                className="w-full h-2 bg-purple-200 dark:bg-purple-700 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                <span>5%</span>
                <span>50%</span>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">% of pledge on losses</p>
              <div className="bg-purple-50 dark:bg-purple-900/20 p-2 rounded mt-2 border border-purple-100 dark:border-purple-800">
                <p className="text-xs text-gray-700 dark:text-gray-300">
                  <strong>Example:</strong> £10 bet loses (potential win was £20)
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Your pledge: £{(20 * bettorDonationPercent / 100).toFixed(2)} → Operator pays: £{(20 * bettorDonationPercent / 100 * operatorContributionPercent / 100).toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Results */}
          <div className="flex-1 space-y-4">
            {/* Total Donations */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6 rounded-lg">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                <Heart className="text-red-500" />
                Annual Impact Analysis (Online Only)
              </h2>
              
              {/* Donation Flow */}
              <div className="mb-4">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Donation Flow ({mykroMarketShare}% Online Market Share):</p>
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-white dark:bg-gray-800 p-3 rounded shadow border border-gray-200 dark:border-gray-600">
                    <p className="text-xs text-gray-600 dark:text-gray-400">Total Raised</p>
                    <p className="text-xl font-bold text-gray-800 dark:text-white">{formatCurrency(results.totalDonationsActual)}</p>
                  </div>
                  
                  {mykroCommission > 0 && (
                    <div className="bg-orange-100 dark:bg-orange-900/30 p-3 rounded shadow border border-orange-200 dark:border-orange-700">
                      <p className="text-xs text-gray-600 dark:text-gray-400">Mykro Revenue</p>
                      <p className="text-xl font-bold text-orange-600">{formatCurrency(results.mykroRevenue)}</p>
                    </div>
                  )}
                  
                  <div className={`${mykroCommission > 0 ? '' : 'col-span-2'} bg-green-100 dark:bg-green-900/30 p-3 rounded shadow border-2 border-green-500 dark:border-green-600`}>
                    <p className="text-xs text-gray-600 dark:text-gray-400">To Charities</p>
                    <p className="text-xl font-bold text-green-600">{formatCurrency(results.netDonationsToCharity)}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{results.efficiency}% efficiency</p>
                  </div>
                </div>
              </div>

              {/* Market Share Metrics */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white dark:bg-gray-800 p-3 rounded">
                  <p className="text-xs text-gray-600 dark:text-gray-400">Share of Online Gambling Charity</p>
                  <p className="text-lg font-semibold text-blue-600">{formatPercent(results.mykroCharityMarketShare)}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">vs online Lottery + Betting</p>
                </div>
                
                <div className="bg-white dark:bg-gray-800 p-3 rounded">
                  <p className="text-xs text-gray-600 dark:text-gray-400">Share of UK Total Charity</p>
                  <p className="text-lg font-semibold text-purple-600">{formatPercent(results.mykroUKCharityShare)}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">of £13.9bn UK giving</p>
                </div>
              </div>
            </div>

            {/* Market Adoption Visualization */}
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
              <h3 className="text-sm font-semibold text-gray-800 dark:text-white mb-3">Market Adoption Impact</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Active Mykro Users</p>
                  <p className="text-lg font-bold text-green-600">
                    {((30.0 * mykroMarketShare) / 100).toFixed(1)}M bettors
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">out of ~30M online</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Donations Processed</p>
                  <p className="text-lg font-bold text-green-600">
                    {formatCurrency(results.totalDonationsActual)}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">annual platform volume</p>
                </div>
              </div>
            </div>

            {/* Efficiency Comparison */}
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="text-sm font-semibold text-gray-800 dark:text-white mb-3">Charity Efficiency Comparison</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs w-28 text-gray-800 dark:text-gray-300">Mykro ({mykroCommission}% fee):</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-4">
                    <div className="bg-green-500 h-4 rounded-full" style={{ width: `${results.efficiency}%` }}></div>
                  </div>
                  <span className="text-xs font-medium w-12 text-gray-800 dark:text-gray-300">{results.efficiency}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs w-28 text-gray-800 dark:text-gray-300">National Lottery:</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-4">
                    <div className="bg-blue-500 h-4 rounded-full" style={{ width: '72%' }}></div>
                  </div>
                  <span className="text-xs font-medium w-12 text-gray-800 dark:text-gray-300">72%</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs w-28 text-gray-800 dark:text-gray-300">Typical Charity:</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-4">
                    <div className="bg-gray-500 h-4 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                  <span className="text-xs font-medium w-12 text-gray-800 dark:text-gray-300">65-85%</span>
                </div>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">% of donations reaching beneficiaries</p>
            </div>

            {/* Business Model Analysis */}
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-700">
              <h3 className="text-sm font-semibold text-gray-800 dark:text-white mb-2">Business Model Analysis</h3>
              {mykroCommission === 0 ? (
                <div className="text-xs space-y-1 text-gray-700 dark:text-gray-300">
                  <p className="font-medium text-gray-700 dark:text-gray-300">100% Pass-Through Model</p>
                  <p>• All donations reach charities</p>
                  <p>• Revenue from: operator fees, SaaS licensing, data insights</p>
                  <p>• Highest charity efficiency rating</p>
                </div>
              ) : (
                <div className="text-xs space-y-1 text-gray-700 dark:text-gray-300">
                  <p className="font-medium text-gray-700 dark:text-gray-300">Commission-Based Model ({mykroCommission}%)</p>
                  <p>• Annual platform revenue: {formatCurrency(results.mykroRevenue)}</p>
                  <p>• Per-transaction sustainability</p>
                  <p>• {results.efficiency}% reaches charities</p>
                  {mykroCommission > 5 && <p className="text-orange-600 dark:text-orange-400">⚠️ Higher than typical payment processing</p>}
                </div>
              )}
            </div>

            {/* Impact Statement */}
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <strong>Impact:</strong> With {mykroMarketShare}% adoption of online bettors, Mykro would channel {formatCurrency(results.netDonationsToCharity)} to charities annually
                {selectedOperator === 'all' ? ' from UK online betting' : ` from ${operators[selectedOperator as keyof typeof operators].name}'s online operations`}, 
                capturing <strong>{formatPercent(results.mykroCharityMarketShare)}</strong> of online gambling charitable giving. 
                This represents a <strong>{Math.round(results.netDonationsToCharity / currentOnlineCharity)}x increase</strong> over 
                current online betting charity contributions.
              </p>
            </div>
          </div>
        </div>
      ) : activeTab === 'market' ? (
        /* Market Overview Tab */
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
            <BarChart3 className="text-blue-600" />
            UK Gambling Market Overview
            <span className="text-sm bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 px-2 py-1 rounded-full">Online vs Total</span>
          </h2>

          {/* Market Overview */}
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Market Size Breakdown</h3>
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-white dark:bg-gray-800 p-3 rounded shadow border border-gray-200 dark:border-gray-600">
                <p className="text-xs text-gray-600 dark:text-gray-400">Total Betting Market</p>
                <p className="text-lg font-bold text-gray-800 dark:text-white">£53.3bn</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Online + Retail</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-3 rounded shadow border-2 border-blue-500 dark:border-blue-400">
                <p className="text-xs text-gray-600 dark:text-gray-400">Online Betting Only</p>
                <p className="text-lg font-bold text-blue-600 dark:text-blue-400">£40.0bn</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">~75% of total</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-3 rounded shadow border border-gray-200 dark:border-gray-600">
                <p className="text-xs text-gray-600 dark:text-gray-400">National Lottery Sales</p>
                <p className="text-lg font-bold text-gray-800 dark:text-white">£6.8bn</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">£3.4bn online</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-3 rounded shadow border border-gray-200 dark:border-gray-600">
                <p className="text-xs text-gray-600 dark:text-gray-400">Current Online Charity</p>
                <p className="text-lg font-bold text-gray-800 dark:text-white">£855m</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">£850m lottery + £5m betting</p>
              </div>
            </div>
          </div>

          {/* Online vs Total Market Split */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Market Distribution</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-800 dark:text-gray-300">Sports Betting - Online</span>
                  <span className="font-medium text-gray-800 dark:text-gray-300">£40.0bn (75%)</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-6">
                  <div className="bg-blue-600 dark:bg-blue-500 h-6 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-800 dark:text-gray-300">Sports Betting - Retail</span>
                  <span className="font-medium text-gray-800 dark:text-gray-300">£13.3bn (25%)</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-6">
                  <div className="bg-gray-600 dark:bg-gray-500 h-6 rounded-full" style={{ width: '25%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-800 dark:text-gray-300">National Lottery - Online</span>
                  <span className="font-medium text-gray-800 dark:text-gray-300">£3.4bn (50%)</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-6">
                  <div className="bg-green-600 dark:bg-green-500 h-6 rounded-full" style={{ width: '50%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-800 dark:text-gray-300">National Lottery - Retail</span>
                  <span className="font-medium text-gray-800 dark:text-gray-300">£3.4bn (50%)</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-6">
                  <div className="bg-green-400 dark:bg-green-400 h-6 rounded-full" style={{ width: '50%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Operator Breakdown Table */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-100 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300">Operator</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 dark:text-gray-300">Online Volume</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 dark:text-gray-300">Total Volume</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 dark:text-gray-300">Online Share</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 dark:text-gray-300">Account Share</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 dark:text-gray-300">Current Charity</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 dark:text-gray-300">Mykro Potential*</th>
                </tr>
              </thead>
              <tbody>
                {/* National Lottery Row */}
                <tr className="border-t border-gray-200 dark:border-gray-600 bg-blue-50 dark:bg-blue-900/20">
                  <td className="px-4 py-3 text-sm font-medium text-gray-800 dark:text-white">National Lottery</td>
                  <td className="px-4 py-3 text-sm text-right text-gray-800 dark:text-gray-300">£3.4bn</td>
                  <td className="px-4 py-3 text-sm text-right text-gray-800 dark:text-gray-300">£6.8bn</td>
                  <td className="px-4 py-3 text-sm text-right text-gray-800 dark:text-gray-300">50%</td>
                  <td className="px-4 py-3 text-sm text-right text-gray-800 dark:text-gray-300">-</td>
                  <td className="px-4 py-3 text-sm text-right font-medium text-green-600">£850m online</td>
                  <td className="px-4 py-3 text-sm text-right text-gray-400 dark:text-gray-500">N/A</td>
                </tr>
                
                {/* Separator */}
                <tr className="border-t-2 border-gray-300 dark:border-gray-500">
                  <td colSpan={7} className="px-4 py-2 text-xs font-semibold text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700">
                    Online Sports Betting Operators
                  </td>
                </tr>

                {/* Betting Operators */}
                {/* Bet365 */}
                {(() => {
                  const operator = operators.bet365;
                  const opResults = calculateDonations('bet365');
                  const onlinePercent = (operator.onlineTurnover / operator.totalTurnover) * 100;
                  return (
                    <tr className="border-t border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-4 py-3 text-sm font-medium text-gray-800 dark:text-white">{operator.name}</td>
                      <td className="px-4 py-3 text-sm text-right font-medium text-gray-800 dark:text-gray-300">{formatCurrency(operator.onlineTurnover * 1000)}</td>
                      <td className="px-4 py-3 text-sm text-right text-gray-500 dark:text-gray-400">{formatCurrency(operator.totalTurnover * 1000)}</td>
                      <td className="px-4 py-3 text-sm text-right text-gray-800 dark:text-gray-300">{formatPercent(onlinePercent)}</td>
                      <td className="px-4 py-3 text-sm text-right text-gray-800 dark:text-gray-300">{operator.onlineAccountShare}</td>
                      <td className="px-4 py-3 text-sm text-right text-gray-800 dark:text-gray-300">{formatCurrency(operator.charity)}</td>
                      <td className="px-4 py-3 text-sm text-right font-medium text-blue-600">
                        {formatCurrency(opResults.totalDonationsPotential)}
                      </td>
                    </tr>
                  );
                })()}
                
                {/* Flutter Combined Row */}
                {(() => {
                  const flutterOp = operators.flutter;
                  const flutterResults = calculateDonations('flutter');
                  const onlinePercent = (flutterOp.onlineTurnover / flutterOp.totalTurnover) * 100;
                  return (
                    <tr className="border-t border-gray-200 dark:border-gray-600 bg-blue-50 dark:bg-blue-900/20 font-medium">
                      <td className="px-4 py-3 text-sm font-medium text-gray-800 dark:text-white">{flutterOp.name}</td>
                      <td className="px-4 py-3 text-sm text-right font-medium text-gray-800 dark:text-gray-300">{formatCurrency(flutterOp.onlineTurnover * 1000)}</td>
                      <td className="px-4 py-3 text-sm text-right text-gray-500 dark:text-gray-400">{formatCurrency(flutterOp.totalTurnover * 1000)}</td>
                      <td className="px-4 py-3 text-sm text-right text-gray-800 dark:text-gray-300">{formatPercent(onlinePercent)}</td>
                      <td className="px-4 py-3 text-sm text-right text-gray-800 dark:text-gray-300">{flutterOp.onlineAccountShare}</td>
                      <td className="px-4 py-3 text-sm text-right text-gray-800 dark:text-gray-300">{formatCurrency(flutterOp.charity)}</td>
                      <td className="px-4 py-3 text-sm text-right font-medium text-blue-600">
                        {formatCurrency(flutterResults.totalDonationsPotential)}
                      </td>
                    </tr>
                  );
                })()}
                
                {/* Individual Flutter Brands */}
                {(['skybet', 'paddypower'] as const).map((key) => {
                  const operator = operators[key];
                  const opResults = calculateDonations(key);
                  const onlinePercent = (operator.onlineTurnover / operator.totalTurnover) * 100;
                  return (
                    <tr key={key} className="border-t border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400 pl-8">└─ {operator.name.replace(' (Flutter)', '')}</td>
                      <td className="px-4 py-3 text-sm text-right text-gray-600 dark:text-gray-400">{formatCurrency(operator.onlineTurnover * 1000)}</td>
                      <td className="px-4 py-3 text-sm text-right text-gray-400 dark:text-gray-500">{formatCurrency(operator.totalTurnover * 1000)}</td>
                      <td className="px-4 py-3 text-sm text-right text-gray-600 dark:text-gray-400">{formatPercent(onlinePercent)}</td>
                      <td className="px-4 py-3 text-sm text-right text-gray-600 dark:text-gray-400">{operator.onlineAccountShare}</td>
                      <td className="px-4 py-3 text-sm text-right text-gray-600 dark:text-gray-400">{formatCurrency(operator.charity)}</td>
                      <td className="px-4 py-3 text-sm text-right text-gray-600 dark:text-gray-400">
                        {formatCurrency(opResults.totalDonationsPotential)}
                      </td>
                    </tr>
                  );
                })}
                
                {/* Entain Combined Row */}
                {(() => {
                  const entainOp = operators.entain;
                  const entainResults = calculateDonations('entain');
                  const onlinePercent = (entainOp.onlineTurnover / entainOp.totalTurnover) * 100;
                  return (
                    <tr className="border-t border-gray-200 dark:border-gray-600 bg-green-50 dark:bg-green-900/20 font-medium">
                      <td className="px-4 py-3 text-sm font-medium text-gray-800 dark:text-white">{entainOp.name}</td>
                      <td className="px-4 py-3 text-sm text-right font-medium text-gray-800 dark:text-gray-300">{formatCurrency(entainOp.onlineTurnover * 1000)}</td>
                      <td className="px-4 py-3 text-sm text-right text-gray-500 dark:text-gray-400">{formatCurrency(entainOp.totalTurnover * 1000)}</td>
                      <td className="px-4 py-3 text-sm text-right text-gray-800 dark:text-gray-300">{formatPercent(onlinePercent)}</td>
                      <td className="px-4 py-3 text-sm text-right text-gray-800 dark:text-gray-300">{entainOp.onlineAccountShare}</td>
                      <td className="px-4 py-3 text-sm text-right text-gray-800 dark:text-gray-300">{formatCurrency(entainOp.charity)}</td>
                      <td className="px-4 py-3 text-sm text-right font-medium text-blue-600">
                        {formatCurrency(entainResults.totalDonationsPotential)}
                      </td>
                    </tr>
                  );
                })()}
                
                {/* Individual Entain Brands */}
                {(['ladbrokes', 'coral'] as const).map((key) => {
                  const operator = operators[key];
                  const opResults = calculateDonations(key);
                  const onlinePercent = (operator.onlineTurnover / operator.totalTurnover) * 100;
                  return (
                    <tr key={key} className="border-t border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400 pl-8">└─ {operator.name.replace(' (Entain)', '')}</td>
                      <td className="px-4 py-3 text-sm text-right text-gray-600 dark:text-gray-400">{formatCurrency(operator.onlineTurnover * 1000)}</td>
                      <td className="px-4 py-3 text-sm text-right text-gray-400 dark:text-gray-500">{formatCurrency(operator.totalTurnover * 1000)}</td>
                      <td className="px-4 py-3 text-sm text-right text-gray-600 dark:text-gray-400">{formatPercent(onlinePercent)}</td>
                      <td className="px-4 py-3 text-sm text-right text-gray-600 dark:text-gray-400">{operator.onlineAccountShare}</td>
                      <td className="px-4 py-3 text-sm text-right text-gray-600 dark:text-gray-400">{formatCurrency(operator.charity)}</td>
                      <td className="px-4 py-3 text-sm text-right text-gray-600 dark:text-gray-400">
                        {formatCurrency(opResults.totalDonationsPotential)}
                      </td>
                    </tr>
                  );
                })}
                
                {/* Other Individual Operators */}
                {Object.entries(operators).filter(([key]) => !['all', 'flutter', 'entain', 'skybet', 'paddypower', 'bet365', 'ladbrokes', 'coral'].includes(key)).map(([key, operator]) => {
                  const opResults = calculateDonations(key);
                  const onlinePercent = (operator.onlineTurnover / operator.totalTurnover) * 100;
                  return (
                    <tr key={key} className="border-t border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-4 py-3 text-sm font-medium text-gray-800 dark:text-white">{operator.name}</td>
                      <td className="px-4 py-3 text-sm text-right font-medium text-gray-800 dark:text-gray-300">{formatCurrency(operator.onlineTurnover * 1000)}</td>
                      <td className="px-4 py-3 text-sm text-right text-gray-500 dark:text-gray-400">{formatCurrency(operator.totalTurnover * 1000)}</td>
                      <td className="px-4 py-3 text-sm text-right text-gray-800 dark:text-gray-300">{formatPercent(onlinePercent)}</td>
                      <td className="px-4 py-3 text-sm text-right text-gray-800 dark:text-gray-300">{operator.onlineAccountShare}</td>
                      <td className="px-4 py-3 text-sm text-right text-gray-800 dark:text-gray-300">{formatCurrency(operator.charity)}</td>
                      <td className="px-4 py-3 text-sm text-right font-medium text-blue-600">
                        {formatCurrency(opResults.totalDonationsPotential)}
                      </td>
                    </tr>
                  );
                })}

                {/* Totals Row */}
                <tr className="border-t-2 border-gray-300 dark:border-gray-500 font-semibold bg-gray-100 dark:bg-gray-700">
                  <td className="px-4 py-3 text-sm text-gray-800 dark:text-white">Total Online Betting</td>
                  <td className="px-4 py-3 text-sm text-right text-gray-800 dark:text-gray-300">£40.0bn</td>
                  <td className="px-4 py-3 text-sm text-right text-gray-800 dark:text-gray-300">£53.3bn</td>
                  <td className="px-4 py-3 text-sm text-right text-gray-800 dark:text-gray-300">75%</td>
                  <td className="px-4 py-3 text-sm text-right text-gray-800 dark:text-gray-300">100%</td>
                  <td className="px-4 py-3 text-sm text-right text-gray-800 dark:text-gray-300">£5m</td>
                  <td className="px-4 py-3 text-sm text-right text-blue-600">
                    {formatCurrency(calculateDonations('all').totalDonationsPotential)}
                  </td>
                </tr>

                {/* Combined Total */}
                <tr className="border-t-2 border-gray-300 dark:border-gray-500 font-bold bg-gray-200 dark:bg-gray-600">
                  <td className="px-4 py-3 text-sm text-gray-800 dark:text-white">Online Gambling Total</td>
                  <td className="px-4 py-3 text-sm text-right text-gray-800 dark:text-gray-300">£43.4bn</td>
                  <td className="px-4 py-3 text-sm text-right text-gray-800 dark:text-gray-300">£60.1bn</td>
                  <td className="px-4 py-3 text-sm text-right text-gray-800 dark:text-gray-300">72%</td>
                  <td className="px-4 py-3 text-sm text-right">-</td>
                  <td className="px-4 py-3 text-sm text-right text-green-600">£855m</td>
                  <td className="px-4 py-3 text-sm text-right">-</td>
                </tr>
              </tbody>
            </table>
            
            <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700 border-t dark:border-gray-600">
              <p className="text-xs text-gray-600 dark:text-gray-400">
                * Mykro Potential shows annual donations at 100% adoption with current settings: 
                {bettorDonationPercent}% bettor donation, {operatorContributionPercent}% operator contribution. 
                Online vs Total Volume based on industry estimates - exact split varies by operator.
              </p>
            </div>
          </div>

          {/* Key Insights */}
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <h3 className="text-sm font-semibold text-gray-800 dark:text-white mb-2">Key Online Market Insights</h3>
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-700 dark:text-gray-300">
              <div>
                <p>• Online betting represents <strong>75%</strong> of total betting turnover (£40bn of £53.3bn)</p>
                <p>• Online-first operators (Bet365, Sky Bet) dominate with <strong>72%</strong> account share</p>
                <p>• Traditional bookies (Ladbrokes, Coral, Betfred) have strong retail but limited online</p>
              </div>
              <div>
                <p>• Current online betting charity: <strong>£5m</strong> (0.0125% of turnover)</p>
                <p>• Online lottery charity: <strong>£850m</strong> (25% of sales)</p>
                <p>• Mykro could increase online betting charity by <strong>{Math.round(calculateDonations('all').totalDonationsPotential / 5)}x</strong></p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Operator Analysis Tab */
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
            <Building2 className="text-blue-600" />
            Operator-Specific Analysis
          </h2>

          {/* Operator Selection */}
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <h3 className="text-sm font-semibold text-gray-800 dark:text-white mb-2">Select Operator for Detailed Analysis</h3>
            <select
              value={selectedOperatorAnalysis}
              onChange={(e) => setSelectedOperatorAnalysis(e.target.value)}
              className="w-full p-2 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
            >
              {Object.entries(operators).filter(([key]) => key !== 'all' && key !== 'flutter' && key !== 'entain').map(([key, operator]) => (
                <option key={key} value={key}>
                  {operator.name}
                </option>
              ))}
            </select>
          </div>

          {/* Operator Metrics */}
          {(() => {
            const operator = operators[selectedOperatorAnalysis as keyof typeof operators];
            const opResults = calculateDonations(selectedOperatorAnalysis);
            const onlinePercent = (operator.onlineTurnover / operator.totalTurnover) * 100;
            
            return (
              <>
                {/* Key Metrics */}
                <div className="grid grid-cols-4 gap-4">
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow border border-gray-200 dark:border-gray-600">
                    <p className="text-xs text-gray-600 dark:text-gray-400">Online Volume</p>
                    <p className="text-xl font-bold text-blue-600">{formatCurrency(operator.onlineTurnover * 1000)}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{formatPercent(onlinePercent)} of total</p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow border border-gray-200 dark:border-gray-600">
                    <p className="text-xs text-gray-600 dark:text-gray-400">Account Share</p>
                    <p className="text-xl font-bold text-purple-600">{operator.onlineAccountShare}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">of online bettors</p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow border border-gray-200 dark:border-gray-600">
                    <p className="text-xs text-gray-600 dark:text-gray-400">Current Charity</p>
                    <p className="text-xl font-bold text-gray-800 dark:text-white">{formatCurrency(operator.charity)}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{formatPercent((operator.charity / (operator.totalTurnover * 1000)) * 100)} of revenue</p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow border-2 border-green-500 dark:border-green-400">
                    <p className="text-xs text-gray-600 dark:text-gray-400">Mykro Potential</p>
                    <p className="text-xl font-bold text-green-600">{formatCurrency(opResults.totalDonationsPotential)}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">at 100% adoption</p>
                  </div>
                </div>

                {/* Donation Breakdown Chart */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Donation Potential by Market Share</h3>
                  <div className="space-y-3">
                    {[1, 3, 5, 7, 10].map(share => {
                      const tempResults = {
                        ...opResults,
                        totalDonationsActual: opResults.totalDonationsPotential * (share / 100),
                        netDonationsToCharity: opResults.totalDonationsPotential * (share / 100) * (1 - mykroCommission / 100)
                      };
                      
                      return (
                        <div key={share} className="flex items-center gap-4">
                          <span className="text-sm w-20 text-gray-800 dark:text-gray-300">{share}% adoption:</span>
                          <div className="flex-1 bg-gray-200 dark:bg-gray-600 rounded-full h-8 relative">
                            <div 
                              className="bg-gradient-to-r from-blue-500 to-green-500 dark:from-blue-400 dark:to-green-400 h-8 rounded-full flex items-center justify-end pr-3"
                              style={{ width: `${share * 10}%` }}
                            >
                              <span className="text-xs font-medium text-white dark:text-white">{formatCurrency(tempResults.netDonationsToCharity)}</span>
                            </div>
                          </div>
                          <span className="text-sm font-medium w-24 text-right text-gray-800 dark:text-gray-300">
                            {Math.round(tempResults.netDonationsToCharity / operator.charity)}x current
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Operator Impact Analysis */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6 rounded-lg">
                    <h3 className="text-sm font-semibold text-gray-800 dark:text-white mb-3">Revenue Impact</h3>
                    <div className="space-y-2 text-sm text-gray-800 dark:text-gray-300">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Online GGY (6% margin):</span>
                        <span className="font-medium text-gray-800 dark:text-white">{formatCurrency(operator.onlineTurnover * 1000 * 0.06)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Operator cost at 5% adoption:</span>
                        <span className="font-medium text-orange-600 dark:text-orange-400">{formatCurrency(opResults.totalDonationsPotential * 0.05 * (operatorContributionPercent / (bettorDonationPercent + operatorContributionPercent)))}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">% of GGY:</span>
                        <span className="font-medium text-gray-800 dark:text-white">{formatPercent(opResults.operatorCost * 0.05)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 p-6 rounded-lg">
                    <h3 className="text-sm font-semibold text-gray-800 dark:text-white mb-3">Charitable Impact</h3>
                    <div className="space-y-2 text-sm text-gray-800 dark:text-gray-300">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Current giving:</span>
                        <span className="font-medium text-gray-800 dark:text-white">{formatCurrency(operator.charity)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">With Mykro (5% adoption):</span>
                        <span className="font-medium text-green-600">{formatCurrency(opResults.totalDonationsPotential * 0.05)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Increase:</span>
                        <span className="font-medium text-green-600">+{formatCurrency(opResults.totalDonationsPotential * 0.05 - operator.charity)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Competitive Positioning */}
                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-700">
                  <h3 className="text-sm font-semibold text-gray-800 dark:text-white mb-2">Partnership Opportunity</h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {operator.name} could increase charitable giving by <strong>{Math.round((opResults.totalDonationsPotential * 0.05) / operator.charity)}x</strong> with 
                    just 5% customer adoption of Mykro. This would position them as the industry leader in responsible gambling and social impact, 
                    while costing only <strong>{formatPercent(opResults.operatorCost * 0.05)}</strong> of their gross gaming yield.
                  </p>
                </div>
              </>
            );
          })()}
        </div>
      )}
    </div>
  );
};

export default MykroDonationCalculator;