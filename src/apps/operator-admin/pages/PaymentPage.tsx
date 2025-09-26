import { useState } from 'react';

// Sample invoice data
const invoiceData = {
  invoiceNumber: 'MF-INV-2024-001',
  date: '2024-01-15',
  dueDate: '2024-01-30',
  period: 'January 2024',
  status: 'pending',
  totalAmount: 32813.75,
  breakdown: {
    userDonations: 31234.50,
    operatorContribution: 1579.25,
    totalTransactions: 889,
    activeUsers: 234
  }
};

// Sample user donation reconciliation data
const userDonationData = [
  { userId: 'USR-001', username: 'john_doe', date: '2024-01-01', amount: 45.50, charitySelected: 'British Red Cross', status: 'verified' },
  { userId: 'USR-002', username: 'jane_smith', date: '2024-01-01', amount: 32.25, charitySelected: 'Cancer Research UK', status: 'verified' },
  { userId: 'USR-003', username: 'mike_wilson', date: '2024-01-02', amount: 67.00, charitySelected: 'Save the Children', status: 'verified' },
  { userId: 'USR-004', username: 'sarah_jones', date: '2024-01-02', amount: 23.75, charitySelected: 'Mind', status: 'verified' },
  { userId: 'USR-005', username: 'tom_brown', date: '2024-01-03', amount: 89.50, charitySelected: 'Shelter', status: 'verified' },
  { userId: 'USR-006', username: 'emma_davis', date: '2024-01-03', amount: 54.25, charitySelected: 'British Red Cross', status: 'pending' },
  { userId: 'USR-007', username: 'alex_martin', date: '2024-01-04', amount: 76.00, charitySelected: 'Cancer Research UK', status: 'verified' },
  { userId: 'USR-008', username: 'lisa_taylor', date: '2024-01-04', amount: 41.50, charitySelected: 'Save the Children', status: 'verified' },
];

// Summary by charity for display
const charityBreakdown = [
  { charity: 'British Red Cross', totalAmount: 8432.50, donationCount: 234, percentage: 26 },
  { charity: 'Cancer Research UK', totalAmount: 7234.75, donationCount: 189, percentage: 22 },
  { charity: 'Save the Children', totalAmount: 6543.00, donationCount: 167, percentage: 20 },
  { charity: 'Mind', totalAmount: 5234.25, donationCount: 143, percentage: 16 },
  { charity: 'Shelter', totalAmount: 3123.50, donationCount: 89, percentage: 10 },
  { charity: 'Others', totalAmount: 2245.75, donationCount: 67, percentage: 6 },
];

export function PaymentPage() {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'bank' | 'card' | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const [selectedTab, setSelectedTab] = useState<'invoice' | 'reconciliation'>('invoice');
  
  const totalReconciled = userDonationData
    .filter(d => d.status === 'verified')
    .reduce((sum, item) => sum + item.amount, 0);
  const pendingAmount = userDonationData
    .filter(d => d.status === 'pending')
    .reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Payment & Reconciliation</h1>
        <div className="flex gap-2">
          <button className="px-4 py-2 text-sm bg-white text-gray-600 border border-gray-300 hover:bg-gray-50">
            Export Report
          </button>
          <button className="px-4 py-2 text-sm bg-white text-gray-600 border border-gray-300 hover:bg-gray-50">
            Payment History
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-300">
        <div className="flex">
          <button
            onClick={() => setSelectedTab('invoice')}
            className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
              selectedTab === 'invoice'
                ? 'border-black text-black'
                : 'border-transparent text-gray-600 hover:text-black'
            }`}
          >
            Invoice
          </button>
          <button
            onClick={() => setSelectedTab('reconciliation')}
            className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
              selectedTab === 'reconciliation'
                ? 'border-black text-black'
                : 'border-transparent text-gray-600 hover:text-black'
            }`}
          >
            Reconciliation
          </button>
        </div>
      </div>

      {/* Current Invoice */}
      {selectedTab === 'invoice' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Invoice Section */}
          <div className="border border-gray-300 bg-white">
            <div className="bg-black text-white p-4">
              <h2 className="font-semibold">Invoice from Mykro Foundation</h2>
              <p className="text-sm text-gray-300 mt-1">Consolidated payment for all user donations</p>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-xs text-gray-600 uppercase">Invoice Number</p>
                  <p className="text-sm font-medium">{invoiceData.invoiceNumber}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 uppercase">Period</p>
                  <p className="text-sm font-medium">{invoiceData.period}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 uppercase">Due Date</p>
                  <p className="text-sm font-medium">{invoiceData.dueDate}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 uppercase">Status</p>
                  <span className="inline-block px-2 py-1 text-xs font-medium bg-white text-gray-600 border border-gray-400">
                    {invoiceData.status}
                  </span>
                </div>
              </div>

              {/* Invoice Summary */}
              <div className="border border-gray-300 mb-6">
                <div className="p-4 bg-gray-50">
                  <h4 className="font-medium text-sm mb-3">Invoice Breakdown</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">User Donations Total</span>
                      <span className="text-sm font-medium">£{invoiceData.breakdown.userDonations.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Operator Contribution</span>
                      <span className="text-sm font-medium">£{invoiceData.breakdown.operatorContribution.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span>Transactions: {invoiceData.breakdown.totalTransactions}</span>
                      <span>Active Users: {invoiceData.breakdown.activeUsers}</span>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-white border-t border-gray-300">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-medium">Total Amount Due</span>
                    <span className="text-xl font-bold">£{invoiceData.totalAmount.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <button className="w-full px-4 py-2 text-sm bg-white text-gray-600 border border-gray-300 hover:bg-gray-50">
                Download Invoice PDF
              </button>
            </div>
          </div>

          {/* Payment Methods Section */}
          <div className="border border-gray-300 bg-white">
            <div className="bg-black text-white p-4">
              <h3 className="font-semibold">Payment Methods</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {/* Bank Transfer */}
                <div 
                  className={`border-2 p-4 cursor-pointer transition-all ${
                    selectedPaymentMethod === 'bank' 
                      ? 'border-black bg-gray-50' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  onClick={() => setSelectedPaymentMethod('bank')}
                >
                  <h4 className="font-medium mb-2">Bank Transfer</h4>
                  <p className="text-sm text-gray-600 mb-3">Direct transfer to Mykro Foundation</p>
                  {selectedPaymentMethod === 'bank' && (
                    <div className="mt-4 p-3 bg-white border border-gray-300 text-sm">
                      <p className="font-medium mb-2">Mykro Foundation Bank Details:</p>
                      <div className="space-y-1 text-xs">
                        <p>Account Name: Mykro Foundation Ltd</p>
                        <p>Sort Code: 20-00-00</p>
                        <p>Account Number: 12345678</p>
                        <p>IBAN: GB29 NWBK 6016 1331 9268 19</p>
                        <p>Reference: {invoiceData.invoiceNumber}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Payment */}
                <div 
                  className={`border-2 p-4 cursor-pointer transition-all ${
                    selectedPaymentMethod === 'card' 
                      ? 'border-black bg-gray-50' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  onClick={() => setSelectedPaymentMethod('card')}
                >
                  <h4 className="font-medium mb-2">Card Payment</h4>
                  <p className="text-sm text-gray-600 mb-3">Secure payment via Stripe</p>
                  {selectedPaymentMethod === 'card' && (
                    <div className="mt-4 p-3 bg-white border border-gray-300">
                      <button className="w-full px-4 py-2 bg-gray-800 text-white text-sm hover:bg-gray-700">
                        Proceed to Secure Payment
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <button 
                onClick={() => setShowPaymentModal(true)}
                className="w-full mt-6 px-6 py-3 bg-black text-white text-sm hover:bg-gray-800"
                disabled={!selectedPaymentMethod}
              >
                Make Payment to Mykro Foundation
              </button>

              {/* Banking Integrations */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="text-sm font-medium mb-3">Banking Integrations</h4>
                <div className="grid grid-cols-2 gap-2">
                  <div className="border border-gray-300 p-2 text-center">
                    <p className="text-xs font-medium">Open Banking</p>
                    <p className="text-xs text-gray-600">Connected</p>
                  </div>
                  <div className="border border-gray-300 p-2 text-center">
                    <p className="text-xs font-medium">Plaid</p>
                    <p className="text-xs text-gray-600">Available</p>
                  </div>
                  <div className="border border-gray-300 p-2 text-center">
                    <p className="text-xs font-medium">Stripe</p>
                    <p className="text-xs text-gray-600">Connected</p>
                  </div>
                  <div className="border border-gray-300 p-2 text-center">
                    <p className="text-xs font-medium">Manual</p>
                    <p className="text-xs text-gray-600">Available</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reconciliation Tab */}
      {selectedTab === 'reconciliation' && (
        <div className="space-y-6">
          {/* Reconciliation Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border border-gray-300 bg-white p-4">
              <p className="text-xs text-gray-600 uppercase">Total Verified</p>
              <p className="text-2xl font-bold">£{totalReconciled.toFixed(2)}</p>
              <p className="text-xs text-gray-500 mt-1">Ready for invoicing</p>
            </div>
            <div className="border border-gray-300 bg-white p-4">
              <p className="text-xs text-gray-600 uppercase">Pending Verification</p>
              <p className="text-2xl font-bold text-amber-600">£{pendingAmount.toFixed(2)}</p>
              <p className="text-xs text-gray-500 mt-1">Awaiting confirmation</p>
            </div>
            <div className="border border-gray-300 bg-white p-4">
              <p className="text-xs text-gray-600 uppercase">Invoice vs Reconciled</p>
              <p className="text-2xl font-bold">{((totalReconciled / invoiceData.totalAmount) * 100).toFixed(1)}%</p>
              <div className="mt-2 bg-gray-100 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-black h-full transition-all duration-500"
                  style={{ width: `${(totalReconciled / invoiceData.totalAmount) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* User Donations Table */}
          <div className="border border-gray-300 bg-white">
            <div className="bg-black text-white p-4">
              <h3 className="font-semibold">User Donation Reconciliation</h3>
              <p className="text-sm text-gray-300 mt-1">Individual user donations for {invoiceData.period}</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-300 bg-gray-50">
                    <th className="text-left p-3 text-xs font-medium text-gray-600 uppercase">User ID</th>
                    <th className="text-left p-3 text-xs font-medium text-gray-600 uppercase">Username</th>
                    <th className="text-left p-3 text-xs font-medium text-gray-600 uppercase">Date</th>
                    <th className="text-left p-3 text-xs font-medium text-gray-600 uppercase">Amount</th>
                    <th className="text-left p-3 text-xs font-medium text-gray-600 uppercase">Charity Selected</th>
                    <th className="text-left p-3 text-xs font-medium text-gray-600 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {userDonationData.map((donation, index) => (
                    <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="p-3 text-sm font-mono">{donation.userId}</td>
                      <td className="p-3 text-sm">{donation.username}</td>
                      <td className="p-3 text-sm">{donation.date}</td>
                      <td className="p-3 text-sm font-medium">£{donation.amount.toFixed(2)}</td>
                      <td className="p-3 text-sm">{donation.charitySelected}</td>
                      <td className="p-3">
                        <span className={`inline-block px-2 py-1 text-xs font-medium ${
                          donation.status === 'verified' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-amber-100 text-amber-700'
                        }`}>
                          {donation.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-4 bg-gray-50 border-t border-gray-300">
              <div className="flex justify-between items-center">
                <div className="flex gap-4 text-sm">
                  <span>Total Donations: {userDonationData.length}</span>
                  <span className="text-green-600">Verified: {userDonationData.filter(d => d.status === 'verified').length}</span>
                  <span className="text-amber-600">Pending: {userDonationData.filter(d => d.status === 'pending').length}</span>
                </div>
                <button className="px-4 py-2 text-sm bg-white text-gray-600 border border-gray-300 hover:bg-gray-50">
                  Export CSV
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Charity Distribution Reference - Show on both tabs */}
      <div className="border border-gray-300 bg-white">
        <div className="bg-black text-white p-4">
          <h3 className="font-semibold">Charity Distribution Reference</h3>
          <p className="text-sm text-gray-300 mt-1">Mykro Foundation will distribute donations based on user selections</p>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {charityBreakdown.map((charity, index) => (
              <div key={index} className="text-center">
                <p className="text-xs font-medium text-gray-900">{charity.charity}</p>
                <p className="text-lg font-bold mt-1">£{charity.totalAmount.toLocaleString()}</p>
                <p className="text-xs text-gray-600">{charity.percentage}% • {charity.donationCount} donations</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white border border-gray-300 max-w-md w-full">
            <div className="bg-black text-white p-4 flex justify-between items-center">
              <h2 className="font-semibold">Confirm Payment</h2>
              <button
                onClick={() => setShowPaymentModal(false)}
                className="text-white hover:text-gray-300 text-xl"
              >
                ×
              </button>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Payee</p>
                  <p className="text-lg font-medium">Mykro Foundation Ltd</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Amount to Pay</p>
                  <p className="text-2xl font-bold">£{invoiceData.totalAmount.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Invoice Reference</p>
                  <p className="text-sm font-medium">{invoiceData.invoiceNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Payment Method</p>
                  <p className="text-sm font-medium capitalize">{selectedPaymentMethod || 'Not selected'}</p>
                </div>
                <div className="p-3 bg-gray-50 border border-gray-200 text-xs text-gray-600">
                  <p className="font-medium mb-1">Payment includes:</p>
                  <p>• User donations: £{invoiceData.breakdown.userDonations.toLocaleString()}</p>
                  <p>• Operator contribution: £{invoiceData.breakdown.operatorContribution.toLocaleString()}</p>
                </div>
              </div>
              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => setShowPaymentModal(false)}
                  className="flex-1 px-4 py-2 text-sm bg-white text-gray-600 border border-gray-300 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    console.log('Processing payment...');
                    setShowPaymentModal(false);
                  }}
                  className="flex-1 px-4 py-2 bg-black text-white text-sm hover:bg-gray-800"
                  disabled={!selectedPaymentMethod}
                >
                  Confirm Payment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}