import { useState } from 'react';

// Sample data for charts
const weeklyData = [
  { day: 'Mon', revenue: 3234.50, donations: 156 },
  { day: 'Tue', revenue: 2987.25, donations: 143 },
  { day: 'Wed', revenue: 3567.00, donations: 178 },
  { day: 'Thu', revenue: 4123.75, donations: 198 },
  { day: 'Fri', revenue: 5234.50, donations: 234 },
  { day: 'Sat', revenue: 6789.25, donations: 298 },
  { day: 'Sun', revenue: 5876.00, donations: 267 },
];

const charityBreakdown = [
  { name: 'British Red Cross', amount: 8432.50, percentage: 26 },
  { name: 'Cancer Research UK', amount: 7234.75, percentage: 22 },
  { name: 'Save the Children', amount: 6543.00, percentage: 20 },
  { name: 'Mind', amount: 5234.25, percentage: 16 },
  { name: 'Shelter', amount: 3123.50, percentage: 10 },
  { name: 'Others', amount: 2245.00, percentage: 6 },
];

export function AnalyticsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [selectedMetric, setSelectedMetric] = useState('revenue');

  const maxRevenue = Math.max(...weeklyData.map(d => d.revenue));
  const maxDonations = Math.max(...weeklyData.map(d => d.donations));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Analytics & Insights</h1>
        <select 
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
          className="px-3 py-1 border border-gray-300 text-sm focus:outline-none focus:border-black"
        >
          <option value="week">Last 7 Days</option>
          <option value="month">Last 30 Days</option>
          <option value="year">Last Year</option>
        </select>
      </div>
      
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="border border-gray-300 bg-white p-4">
          <p className="text-xs text-gray-600 uppercase tracking-wide">Conversion Rate</p>
          <p className="text-2xl font-bold mt-1">23.5%</p>
          <p className="text-xs text-gray-500 mt-1">↑ 2.1% vs last period</p>
        </div>
        
        <div className="border border-gray-300 bg-white p-4">
          <p className="text-xs text-gray-600 uppercase tracking-wide">Avg Donation</p>
          <p className="text-2xl font-bold mt-1">£14.70</p>
          <p className="text-xs text-gray-500 mt-1">↑ £1.20 vs last period</p>
        </div>
        
        <div className="border border-gray-300 bg-white p-4">
          <p className="text-xs text-gray-600 uppercase tracking-wide">Repeat Donors</p>
          <p className="text-2xl font-bold mt-1">67%</p>
          <p className="text-xs text-gray-500 mt-1">↑ 5% vs last period</p>
        </div>
        
        <div className="border border-gray-300 bg-white p-4">
          <p className="text-xs text-gray-600 uppercase tracking-wide">Monthly Growth</p>
          <p className="text-2xl font-bold mt-1">15.2%</p>
          <p className="text-xs text-gray-500 mt-1">↑ 3.1% vs last period</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="border border-gray-300 bg-white">
          <div className="bg-black text-white p-4 flex justify-between items-center">
            <h3 className="font-semibold">Revenue Trends</h3>
            <div className="flex space-x-2">
              <button
                onClick={() => setSelectedMetric('revenue')}
                className={`px-3 py-1 text-sm ${
                  selectedMetric === 'revenue' 
                    ? 'bg-black text-white' 
                    : 'bg-white text-gray-600 border border-gray-300'
                }`}
              >
                Revenue
              </button>
              <button
                onClick={() => setSelectedMetric('donations')}
                className={`px-3 py-1 text-sm ${
                  selectedMetric === 'donations' 
                    ? 'bg-black text-white' 
                    : 'bg-white text-gray-600 border border-gray-300'
                }`}
              >
                Count
              </button>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {weeklyData.map((day) => (
                <div key={day.day} className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600 w-10">{day.day}</span>
                  <div className="flex-1 bg-gray-100 h-8 relative">
                    <div 
                      className="bg-black h-full"
                      style={{ 
                        width: selectedMetric === 'revenue' 
                          ? `${(day.revenue / maxRevenue) * 100}%`
                          : `${(day.donations / maxDonations) * 100}%`
                      }}
                    />
                  </div>
                  <span className="text-sm font-medium w-20 text-right">
                    {selectedMetric === 'revenue' 
                      ? `£${day.revenue.toLocaleString()}`
                      : day.donations
                    }
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Charity Distribution */}
        <div className="border border-gray-300 bg-white">
          <div className="bg-black text-white p-4">
            <h3 className="font-semibold">Charity Distribution</h3>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              {charityBreakdown.map((charity) => (
                <div key={charity.name} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">{charity.name}</span>
                    <span className="text-sm font-medium">£{charity.amount.toLocaleString()}</span>
                  </div>
                  <div className="bg-gray-100 h-4 relative">
                    <div 
                      className="bg-gray-600 h-full"
                      style={{ width: `${charity.percentage}%` }}
                    />
                  </div>
                  <div className="text-xs text-gray-500 text-right">{charity.percentage}%</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* User Behavior */}
        <div className="border border-gray-300 bg-white">
          <div className="bg-black text-white p-4">
            <h3 className="font-semibold">User Behavior Patterns</h3>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-sm text-gray-600">Peak Donation Time</span>
              <span className="text-sm font-medium">7-9 PM</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-sm text-gray-600">Most Active Day</span>
              <span className="text-sm font-medium">Saturday</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-sm text-gray-600">Avg Session Duration</span>
              <span className="text-sm font-medium">12m 34s</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-gray-600">Mobile vs Desktop</span>
              <span className="text-sm font-medium">68% / 32%</span>
            </div>
          </div>
        </div>

        {/* Geographic Data */}
        <div className="border border-gray-300 bg-white">
          <div className="bg-black text-white p-4">
            <h3 className="font-semibold">Geographic Distribution</h3>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">London</span>
                <span className="text-sm font-medium">£12,456 (38%)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Manchester</span>
                <span className="text-sm font-medium">£6,234 (19%)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Birmingham</span>
                <span className="text-sm font-medium">£4,567 (14%)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Leeds</span>
                <span className="text-sm font-medium">£3,234 (10%)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Glasgow</span>
                <span className="text-sm font-medium">£2,876 (9%)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Other</span>
                <span className="text-sm font-medium">£3,446 (10%)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Insights */}
      <div className="border border-gray-300 bg-white">
        <div className="bg-black text-white p-4">
          <h3 className="font-semibold">Performance Insights</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border border-gray-300">
              <h4 className="font-medium text-sm mb-2">Top Performing Time</h4>
              <p className="text-xs text-gray-600">Weekend evenings show 35% higher donation rates</p>
            </div>
            
            <div className="p-4 border border-gray-300">
              <h4 className="font-medium text-sm mb-2">Popular Charity Category</h4>
              <p className="text-xs text-gray-600">Health charities receive 42% of all donations</p>
            </div>
            
            <div className="p-4 border border-gray-300">
              <h4 className="font-medium text-sm mb-2">User Behavior</h4>
              <p className="text-xs text-gray-600">Users with 5%+ donation rate have 2.3x retention</p>
            </div>
          </div>
        </div>
      </div>

      {/* Export Options */}
      <div className="border border-gray-300 bg-white p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Export Analytics Report</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 text-sm bg-white text-gray-600 border border-gray-300 hover:bg-gray-50">
              PDF Report
            </button>
            <button className="px-3 py-1 text-sm bg-white text-gray-600 border border-gray-300 hover:bg-gray-50">
              Excel Data
            </button>
            <button className="px-3 py-1 text-sm bg-white text-gray-600 border border-gray-300 hover:bg-gray-50">
              Schedule Email
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}