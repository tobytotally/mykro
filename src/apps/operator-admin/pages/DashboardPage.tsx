import { useState } from 'react';
import { useDocumentTitle } from '../../../shared/hooks/useDocumentTitle';

// Sample data for donation trends (last 7 days)
const donationTrendsData = [
  { date: 'Mon', amount: 1842.50 },
  { date: 'Tue', amount: 2156.75 },
  { date: 'Wed', amount: 1987.25 },
  { date: 'Thu', amount: 2543.00 },
  { date: 'Fri', amount: 3012.50 },
  { date: 'Sat', amount: 3856.25 },
  { date: 'Sun', amount: 3234.75 },
];

// Sample analytics data
const analyticsData = {
  totalRevenue: 124832.50,
  monthlyRevenue: 24832.00,
  weeklyRevenue: 18633.00,
  averageDonation: 12.45,
  conversionRate: 8.7,
  activeCharities: 23,
  totalDonors: 1987,
  repeatDonors: 456,
};

export function DashboardPage() {
  useDocumentTitle('Dashboard', 'Operator Admin');
  
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  
  const maxAmount = Math.max(...donationTrendsData.map(d => d.amount));

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="border border-gray-300 bg-white p-4">
          <p className="text-xs text-gray-600 uppercase tracking-wide">Total Revenue</p>
          <p className="text-2xl font-bold mt-1">£{analyticsData.totalRevenue.toLocaleString()}</p>
          <p className="text-xs text-gray-500 mt-1">All time</p>
        </div>
        
        <div className="border border-gray-300 bg-white p-4">
          <p className="text-xs text-gray-600 uppercase tracking-wide">Monthly Revenue</p>
          <p className="text-2xl font-bold mt-1">£{analyticsData.monthlyRevenue.toLocaleString()}</p>
          <p className="text-xs text-gray-500 mt-1">↑ 12.3% vs last month</p>
        </div>
        
        <div className="border border-gray-300 bg-white p-4">
          <p className="text-xs text-gray-600 uppercase tracking-wide">Conversion Rate</p>
          <p className="text-2xl font-bold mt-1">{analyticsData.conversionRate}%</p>
          <p className="text-xs text-gray-500 mt-1">Bet slip to donation</p>
        </div>
        
        <div className="border border-gray-300 bg-white p-4">
          <p className="text-xs text-gray-600 uppercase tracking-wide">Active Charities</p>
          <p className="text-2xl font-bold mt-1">{analyticsData.activeCharities}</p>
          <p className="text-xs text-gray-500 mt-1">Receiving donations</p>
        </div>
      </div>

      {/* Donation Trends Panel */}
      <div className="border border-gray-300 bg-white">
        <div className="bg-black text-white p-4 flex justify-between items-center">
          <h2 className="font-semibold">Donation Trends</h2>
          <div className="flex space-x-2">
            <button
              onClick={() => setSelectedPeriod('week')}
              className={`px-3 py-1 text-sm ${
                selectedPeriod === 'week' 
                  ? 'bg-black text-white' 
                  : 'bg-white text-gray-600 border border-gray-300'
              }`}
            >
              Week
            </button>
            <button
              onClick={() => setSelectedPeriod('month')}
              className={`px-3 py-1 text-sm ${
                selectedPeriod === 'month' 
                  ? 'bg-black text-white' 
                  : 'bg-white text-gray-600 border border-gray-300'
              }`}
            >
              Month
            </button>
          </div>
        </div>
        
        <div className="p-6">
          <div className="space-y-4">
            {donationTrendsData.map((day) => (
              <div key={day.date} className="flex items-center space-x-4">
                <span className="text-sm text-gray-600 w-12">{day.date}</span>
                <div className="flex-1 bg-gray-100 h-8 relative">
                  <div 
                    className="bg-black h-full"
                    style={{ width: `${(day.amount / maxAmount) * 100}%` }}
                  />
                </div>
                <span className="text-sm font-medium w-20 text-right">£{day.amount.toLocaleString()}</span>
              </div>
            ))}
          </div>
          
          <div className="mt-6 pt-4 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Weekly Total</span>
              <span className="text-lg font-bold">£{donationTrendsData.reduce((sum, d) => sum + d.amount, 0).toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Analytics Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="border border-gray-300 bg-white">
          <div className="bg-black text-white p-4">
            <h2 className="font-semibold">Donor Analytics</h2>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-sm text-gray-600">Total Donors</span>
              <span className="font-medium">{analyticsData.totalDonors.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-sm text-gray-600">Repeat Donors</span>
              <span className="font-medium">{analyticsData.repeatDonors}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-sm text-gray-600">Average Donation</span>
              <span className="font-medium">£{analyticsData.averageDonation}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-gray-600">Retention Rate</span>
              <span className="font-medium">{((analyticsData.repeatDonors / analyticsData.totalDonors) * 100).toFixed(1)}%</span>
            </div>
          </div>
        </div>

        <div className="border border-gray-300 bg-white">
          <div className="bg-black text-white p-4">
            <h2 className="font-semibold">Top Performing Charities</h2>
          </div>
          <div className="p-6 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">British Red Cross</span>
              <span className="text-sm font-medium">£4,832</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Cancer Research UK</span>
              <span className="text-sm font-medium">£3,945</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Save the Children</span>
              <span className="text-sm font-medium">£3,612</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Mind</span>
              <span className="text-sm font-medium">£2,987</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Shelter</span>
              <span className="text-sm font-medium">£2,456</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="border border-gray-300 bg-white">
        <div className="bg-black text-white p-4">
          <h2 className="font-semibold">Recent Donations</h2>
        </div>
        <div className="p-6">
          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">2 mins ago</span>
              <span>£15.00 to British Red Cross</span>
              <span className="text-gray-500">via Bet #4832</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">5 mins ago</span>
              <span>£8.50 to Cancer Research UK</span>
              <span className="text-gray-500">via Bet #4831</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">12 mins ago</span>
              <span>£22.00 to Save the Children</span>
              <span className="text-gray-500">via Bet #4830</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">18 mins ago</span>
              <span>£5.00 to Mind</span>
              <span className="text-gray-500">via Bet #4829</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">23 mins ago</span>
              <span>£12.50 to Shelter</span>
              <span className="text-gray-500">via Bet #4828</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}