import { useEffect, useState } from 'react';
import { Card } from '../../../shared/components/UI/Card';
import { mockDataService } from '../../../shared/utils/mockData';
import { 
  CurrencyDollarIcon, 
  UsersIcon, 
  ArrowTrendingUpIcon, 
  SparklesIcon 
} from '@heroicons/react/24/outline';

export function DashboardPage() {
  const [metrics, setMetrics] = useState(mockDataService.generateOperatorMetrics());
  const [transactions, setTransactions] = useState(mockDataService.generateTransactionData().slice(0, 10));

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        totalDonations: prev.totalDonations + Math.floor(Math.random() * 50),
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 5),
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <CurrencyDollarIcon className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Total Donations</p>
              <p className="text-2xl font-bold text-gray-900">${metrics.totalDonations.toLocaleString()}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <UsersIcon className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Active Users</p>
              <p className="text-2xl font-bold text-gray-900">{metrics.activeUsers.toLocaleString()}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <ArrowTrendingUpIcon className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Conversion Rate</p>
              <p className="text-2xl font-bold text-gray-900">{metrics.conversionRate}%</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <SparklesIcon className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Impact Score</p>
              <p className="text-2xl font-bold text-gray-900">{metrics.impactScore}/100</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Charts and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-lg font-semibold mb-4">Donation Trends</h3>
          <div className="h-64 bg-gray-50 rounded flex items-center justify-center">
            <p className="text-gray-500">Chart would go here (Recharts integration)</p>
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold mb-4">Top Performing Charities</h3>
          <div className="space-y-3">
            {mockDataService.getCharities().slice(0, 5).map((charity) => (
              <div key={charity.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <div className="flex items-center">
                  <span className="text-2xl mr-3">{charity.logo}</span>
                  <div>
                    <p className="font-medium">{charity.name}</p>
                    <p className="text-sm text-gray-600">{charity.category}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">${Math.floor(Math.random() * 10000).toLocaleString()}</p>
                  <p className="text-sm text-gray-600">donated</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <h3 className="text-lg font-semibold mb-4">Recent Donations</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-600">User</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Bet Amount</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Donation</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Charity</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Time</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="border-b border-gray-100">
                  <td className="py-3 px-4">{transaction.userId}</td>
                  <td className="py-3 px-4">${transaction.betAmount}</td>
                  <td className="py-3 px-4 text-green-600 font-medium">
                    ${transaction.donationAmount} ({transaction.donationPercentage}%)
                  </td>
                  <td className="py-3 px-4">{transaction.charity}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      transaction.status === 'completed' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {transaction.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">
                    {transaction.timestamp.toLocaleTimeString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
