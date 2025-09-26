import { useState } from 'react';
import { Card } from '../../../shared/components/UI/Card';
import { Button } from '../../../shared/components/UI/Button';
import { mockDataService } from '../../../shared/utils/mockData';

export function DonationsPage() {
  const [transactions] = useState(mockDataService.generateTransactionData());
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('timestamp');

  const filteredTransactions = transactions
    .filter(t => filterStatus === 'all' || t.status === filterStatus)
    .sort((a, b) => {
      if (sortBy === 'timestamp') return b.timestamp.getTime() - a.timestamp.getTime();
      if (sortBy === 'amount') return b.donationAmount - a.donationAmount;
      return 0;
    });

  const totalDonations = transactions.reduce((sum, t) => sum + t.donationAmount, 0);
  const completedDonations = transactions.filter(t => t.status === 'completed').length;

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <h3 className="text-lg font-semibold mb-2">Total Donations</h3>
          <p className="text-3xl font-bold text-green-600">${totalDonations.toFixed(2)}</p>
        </Card>
        <Card>
          <h3 className="text-lg font-semibold mb-2">Completed</h3>
          <p className="text-3xl font-bold text-blue-600">{completedDonations}</p>
        </Card>
        <Card>
          <h3 className="text-lg font-semibold mb-2">Success Rate</h3>
          <p className="text-3xl font-bold text-purple-600">
            {((completedDonations / transactions.length) * 100).toFixed(1)}%
          </p>
        </Card>
      </div>

      {/* Filters and Controls */}
      <Card>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="flex space-x-4">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mykro-green"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
            </select>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mykro-green"
            >
              <option value="timestamp">Sort by Date</option>
              <option value="amount">Sort by Amount</option>
            </select>
          </div>
          
          <Button>Export Data</Button>
        </div>
      </Card>

      {/* Donations Table */}
      <Card>
        <h3 className="text-lg font-semibold mb-4">All Donations</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-600">Transaction ID</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">User</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Bet Amount</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Donation</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Percentage</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Charity</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Date</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-mono text-sm">{transaction.id}</td>
                  <td className="py-3 px-4">{transaction.userId}</td>
                  <td className="py-3 px-4">${transaction.betAmount.toFixed(2)}</td>
                  <td className="py-3 px-4 font-semibold text-green-600">
                    ${transaction.donationAmount.toFixed(2)}
                  </td>
                  <td className="py-3 px-4">{transaction.donationPercentage}%</td>
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
                    {transaction.timestamp.toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4">
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredTransactions.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No donations found matching your filters.
          </div>
        )}
      </Card>
    </div>
  );
}
