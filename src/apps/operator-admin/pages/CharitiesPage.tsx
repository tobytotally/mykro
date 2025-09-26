import { useState } from 'react';

// Sample charities data
const charitiesData = [
  {
    id: '1',
    name: 'British Red Cross',
    category: 'Emergency Response',
    description: 'Helping people in crisis, whoever and wherever they are.',
    totalRaised: 48329.50,
    monthlyDonations: 8432.75,
    status: 'active',
    rating: 4.8,
  },
  {
    id: '2',
    name: 'Cancer Research UK',
    category: 'Health',
    description: 'Together we will beat cancer.',
    totalRaised: 39452.00,
    monthlyDonations: 7234.50,
    status: 'active',
    rating: 4.9,
  },
  {
    id: '3',
    name: 'Save the Children',
    category: 'Children',
    description: 'We save children\'s lives and fight for their rights.',
    totalRaised: 36127.25,
    monthlyDonations: 6543.00,
    status: 'active',
    rating: 4.7,
  },
  {
    id: '4',
    name: 'Mind',
    category: 'Mental Health',
    description: 'We provide advice and support to empower anyone experiencing a mental health problem.',
    totalRaised: 29876.00,
    monthlyDonations: 5234.25,
    status: 'active',
    rating: 4.6,
  },
  {
    id: '5',
    name: 'Shelter',
    category: 'Housing',
    description: 'We exist to defend the right to a safe home.',
    totalRaised: 24562.50,
    monthlyDonations: 4123.75,
    status: 'pending',
    rating: 4.5,
  },
];

export function CharitiesPage() {
  const [selectedCharity, setSelectedCharity] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCharities = charitiesData.filter(charity =>
    charity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    charity.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (charity: any) => {
    setSelectedCharity(charity);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setSelectedCharity(null);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Partner Charities</h1>
        <button 
          onClick={handleAddNew}
          className="px-4 py-2 bg-black text-white text-sm hover:bg-gray-800"
        >
          Add New Charity
        </button>
      </div>

      {/* Search and Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-1">
          <input
            type="text"
            placeholder="Search charities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 text-sm focus:outline-none focus:border-black"
          />
        </div>
        <div className="border border-gray-300 bg-white p-4">
          <p className="text-xs text-gray-600 uppercase tracking-wide">Active Charities</p>
          <p className="text-2xl font-bold mt-1">23</p>
        </div>
        <div className="border border-gray-300 bg-white p-4">
          <p className="text-xs text-gray-600 uppercase tracking-wide">Total Raised</p>
          <p className="text-2xl font-bold mt-1">£178,247</p>
        </div>
        <div className="border border-gray-300 bg-white p-4">
          <p className="text-xs text-gray-600 uppercase tracking-wide">This Month</p>
          <p className="text-2xl font-bold mt-1">£31,568</p>
        </div>
      </div>

      {/* Charities Table */}
      <div className="border border-gray-300 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-300">
                <th className="text-left p-4 text-xs font-medium text-gray-600 uppercase tracking-wide">Charity</th>
                <th className="text-left p-4 text-xs font-medium text-gray-600 uppercase tracking-wide">Category</th>
                <th className="text-left p-4 text-xs font-medium text-gray-600 uppercase tracking-wide">Total Raised</th>
                <th className="text-left p-4 text-xs font-medium text-gray-600 uppercase tracking-wide">Monthly</th>
                <th className="text-left p-4 text-xs font-medium text-gray-600 uppercase tracking-wide">Rating</th>
                <th className="text-left p-4 text-xs font-medium text-gray-600 uppercase tracking-wide">Status</th>
                <th className="text-left p-4 text-xs font-medium text-gray-600 uppercase tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCharities.map((charity) => (
                <tr key={charity.id} className="border-b border-gray-200">
                  <td className="p-4">
                    <div>
                      <p className="text-sm font-medium">{charity.name}</p>
                      <p className="text-xs text-gray-600 mt-1">{charity.description}</p>
                    </div>
                  </td>
                  <td className="p-4 text-sm">{charity.category}</td>
                  <td className="p-4 text-sm font-medium">£{charity.totalRaised.toLocaleString()}</td>
                  <td className="p-4 text-sm">£{charity.monthlyDonations.toLocaleString()}</td>
                  <td className="p-4 text-sm">{charity.rating}/5</td>
                  <td className="p-4">
                    <span className={`inline-block px-2 py-1 text-xs font-medium ${
                      charity.status === 'active' 
                        ? 'bg-gray-100 text-gray-800 border border-gray-300' 
                        : 'bg-white text-gray-600 border border-gray-400'
                    }`}>
                      {charity.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleEdit(charity)}
                        className="text-sm text-gray-600 hover:text-black underline"
                      >
                        Edit
                      </button>
                      <button className="text-sm text-gray-600 hover:text-black underline">
                        View
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white border border-gray-300 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-black text-white p-4 flex justify-between items-center">
              <h2 className="font-semibold">
                {selectedCharity ? 'Edit Charity' : 'Add New Charity'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-white hover:text-gray-300 text-xl"
              >
                ×
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Charity Name
                  </label>
                  <input
                    type="text"
                    defaultValue={selectedCharity?.name || ''}
                    className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Category
                  </label>
                  <select 
                    defaultValue={selectedCharity?.category || ''}
                    className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-black"
                  >
                    <option value="">Select category</option>
                    <option value="Health">Health</option>
                    <option value="Education">Education</option>
                    <option value="Environment">Environment</option>
                    <option value="Children">Children</option>
                    <option value="Emergency Response">Emergency Response</option>
                    <option value="Mental Health">Mental Health</option>
                    <option value="Housing">Housing</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    defaultValue={selectedCharity?.description || ''}
                    className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Registration Number
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., 220949"
                    className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Website
                  </label>
                  <input
                    type="url"
                    placeholder="https://..."
                    className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Contact Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Status
                  </label>
                  <select 
                    defaultValue={selectedCharity?.status || 'pending'}
                    className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-black"
                  >
                    <option value="active">Active</option>
                    <option value="pending">Pending</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 flex justify-end space-x-3">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm bg-white text-gray-600 border border-gray-300 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    console.log('Save charity');
                    setIsModalOpen(false);
                  }}
                  className="px-4 py-2 bg-black text-white text-sm hover:bg-gray-800"
                >
                  {selectedCharity ? 'Update' : 'Add'} Charity
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}