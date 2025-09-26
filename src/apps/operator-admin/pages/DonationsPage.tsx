import { useState } from 'react';

// Sample donations data
const donationsData = [
  { id: 'DON001', date: '2024-01-19 14:32', user: 'user_8432', betAmount: 50.00, donationAmount: 5.00, percentage: 10, charity: 'British Red Cross', status: 'completed' },
  { id: 'DON002', date: '2024-01-19 14:28', user: 'user_7621', betAmount: 25.00, donationAmount: 2.50, percentage: 10, charity: 'Cancer Research UK', status: 'completed' },
  { id: 'DON003', date: '2024-01-19 14:25', user: 'user_9845', betAmount: 100.00, donationAmount: 15.00, percentage: 15, charity: 'Save the Children', status: 'completed' },
  { id: 'DON004', date: '2024-01-19 14:21', user: 'user_3267', betAmount: 75.00, donationAmount: 7.50, percentage: 10, charity: 'Mind', status: 'pending' },
  { id: 'DON005', date: '2024-01-19 14:18', user: 'user_5432', betAmount: 30.00, donationAmount: 4.50, percentage: 15, charity: 'Shelter', status: 'completed' },
  { id: 'DON006', date: '2024-01-19 14:15', user: 'user_2198', betAmount: 200.00, donationAmount: 20.00, percentage: 10, charity: 'British Red Cross', status: 'completed' },
  { id: 'DON007', date: '2024-01-19 14:12', user: 'user_6754', betAmount: 45.00, donationAmount: 4.50, percentage: 10, charity: 'Oxfam', status: 'failed' },
  { id: 'DON008', date: '2024-01-19 14:08', user: 'user_8901', betAmount: 80.00, donationAmount: 12.00, percentage: 15, charity: 'UNICEF', status: 'completed' },
];

export function DonationsPage() {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDonations = donationsData.filter(donation => {
    const matchesFilter = filter === 'all' || donation.status === filter;
    const matchesSearch = donation.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         donation.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         donation.charity.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const totalDonations = filteredDonations.reduce((sum, d) => sum + d.donationAmount, 0);

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="border border-gray-300 bg-white p-4">
          <p className="text-xs text-gray-600 uppercase tracking-wide">Today's Total</p>
          <p className="text-2xl font-bold mt-1">£1,234.50</p>
        </div>
        <div className="border border-gray-300 bg-white p-4">
          <p className="text-xs text-gray-600 uppercase tracking-wide">Completed</p>
          <p className="text-2xl font-bold mt-1">156</p>
        </div>
        <div className="border border-gray-300 bg-white p-4">
          <p className="text-xs text-gray-600 uppercase tracking-wide">Pending</p>
          <p className="text-2xl font-bold mt-1">12</p>
        </div>
        <div className="border border-gray-300 bg-white p-4">
          <p className="text-xs text-gray-600 uppercase tracking-wide">Failed</p>
          <p className="text-2xl font-bold mt-1">3</p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="border border-gray-300 bg-white p-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 text-sm ${
                filter === 'all' 
                  ? 'bg-black text-white' 
                  : 'bg-white text-gray-600 border border-gray-300'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`px-3 py-1 text-sm ${
                filter === 'completed' 
                  ? 'bg-black text-white' 
                  : 'bg-white text-gray-600 border border-gray-300'
              }`}
            >
              Completed
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`px-3 py-1 text-sm ${
                filter === 'pending' 
                  ? 'bg-black text-white' 
                  : 'bg-white text-gray-600 border border-gray-300'
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => setFilter('failed')}
              className={`px-3 py-1 text-sm ${
                filter === 'failed' 
                  ? 'bg-black text-white' 
                  : 'bg-white text-gray-600 border border-gray-300'
              }`}
            >
              Failed
            </button>
          </div>
          
          <input
            type="text"
            placeholder="Search by ID, user, or charity..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 py-1 border border-gray-300 text-sm flex-1 md:max-w-xs"
          />
        </div>
      </div>

      {/* Donations Table */}
      <div className="border border-gray-300 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-300">
                <th className="text-left p-4 text-xs font-medium text-gray-600 uppercase tracking-wide">ID</th>
                <th className="text-left p-4 text-xs font-medium text-gray-600 uppercase tracking-wide">Date/Time</th>
                <th className="text-left p-4 text-xs font-medium text-gray-600 uppercase tracking-wide">User</th>
                <th className="text-left p-4 text-xs font-medium text-gray-600 uppercase tracking-wide">Bet Amount</th>
                <th className="text-left p-4 text-xs font-medium text-gray-600 uppercase tracking-wide">Donation</th>
                <th className="text-left p-4 text-xs font-medium text-gray-600 uppercase tracking-wide">Charity</th>
                <th className="text-left p-4 text-xs font-medium text-gray-600 uppercase tracking-wide">Status</th>
                <th className="text-left p-4 text-xs font-medium text-gray-600 uppercase tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDonations.map((donation) => (
                <tr key={donation.id} className="border-b border-gray-200">
                  <td className="p-4 text-sm font-medium">{donation.id}</td>
                  <td className="p-4 text-sm text-gray-600">{donation.date}</td>
                  <td className="p-4 text-sm">{donation.user}</td>
                  <td className="p-4 text-sm">£{donation.betAmount.toFixed(2)}</td>
                  <td className="p-4 text-sm font-medium">
                    £{donation.donationAmount.toFixed(2)} ({donation.percentage}%)
                  </td>
                  <td className="p-4 text-sm">{donation.charity}</td>
                  <td className="p-4">
                    <span className={`inline-block px-2 py-1 text-xs font-medium ${
                      donation.status === 'completed' 
                        ? 'bg-gray-100 text-gray-800 border border-gray-300' 
                        : donation.status === 'pending'
                        ? 'bg-white text-gray-600 border border-gray-400'
                        : 'bg-gray-50 text-gray-500 border border-gray-300 line-through'
                    }`}>
                      {donation.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <button className="text-sm text-gray-600 hover:text-black underline">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Table Footer */}
        <div className="border-t border-gray-300 p-4 flex justify-between items-center">
          <span className="text-sm text-gray-600">
            Showing {filteredDonations.length} of {donationsData.length} donations
          </span>
          <span className="text-sm font-medium">
            Total: £{totalDonations.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Export Options */}
      <div className="border border-gray-300 bg-white p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Export Data</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 text-sm bg-white text-gray-600 border border-gray-300 hover:bg-gray-50">
              CSV
            </button>
            <button className="px-3 py-1 text-sm bg-white text-gray-600 border border-gray-300 hover:bg-gray-50">
              PDF
            </button>
            <button className="px-3 py-1 text-sm bg-white text-gray-600 border border-gray-300 hover:bg-gray-50">
              Excel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}