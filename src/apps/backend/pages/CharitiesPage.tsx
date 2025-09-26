import { useState, useEffect } from 'react';
import { Card } from '../../../shared/components/UI/Card';
import { Button } from '../../../shared/components/UI/Button';
import { mockDataService } from '../../../shared/utils/mockData';
import { useCharityStore } from '../../../stores/charityStore';
import { Charity } from '../../../shared/types';

export function CharitiesPage() {
  const { charities, setCharities } = useCharityStore();
  const [selectedCharity, setSelectedCharity] = useState<Charity | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (charities.length === 0) {
      setCharities(mockDataService.getCharities());
    }
  }, [charities.length, setCharities]);

  const handleEdit = (charity: Charity) => {
    setSelectedCharity(charity);
    setIsEditing(true);
  };

  const handleSave = () => {
    // In a real app, this would save to backend
    console.log('Saving charity:', selectedCharity);
    setIsEditing(false);
    setSelectedCharity(null);
    alert('Charity updated successfully!');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Partner Charities</h1>
        <Button onClick={() => setIsEditing(true)}>Add New Charity</Button>
      </div>

      {/* Charities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {charities.map((charity) => (
          <Card key={charity.id} className="hover:shadow-md transition-shadow">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-3xl">{charity.logo}</span>
                  <div>
                    <h3 className="font-semibold">{charity.name}</h3>
                    <p className="text-sm text-gray-600">{charity.category}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-1">
                    <span className="text-yellow-500">★</span>
                    <span className="text-sm">{charity.rating}</span>
                  </div>
                </div>
              </div>

              <p className="text-sm text-gray-700 line-clamp-2">{charity.description}</p>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Total Raised:</span>
                  <span className="font-semibold text-green-600">
                    ${charity.totalRaised.toLocaleString()}
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-1 text-xs">
                  {charity.impactMetrics.slice(0, 2).map((metric, index) => (
                    <div key={index} className="flex justify-between">
                      <span className="text-gray-600">{metric.metric}:</span>
                      <span>{metric.value.toLocaleString()} {metric.unit}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex space-x-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => handleEdit(charity)}
                >
                  Edit
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  View Details
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">
                  {selectedCharity ? 'Edit Charity' : 'Add New Charity'}
                </h2>
                <Button
                  variant="ghost"
                  onClick={() => {
                    setIsEditing(false);
                    setSelectedCharity(null);
                  }}
                >
                  ✕
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Charity Name
                  </label>
                  <input
                    type="text"
                    defaultValue={selectedCharity?.name || ''}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mykro-green"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mykro-green">
                    <option value="Health">Health</option>
                    <option value="Education">Education</option>
                    <option value="Environment">Environment</option>
                    <option value="Children">Children</option>
                    <option value="Hunger">Hunger</option>
                    <option value="Housing">Housing</option>
                    <option value="Water">Water</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    defaultValue={selectedCharity?.description || ''}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mykro-green"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Logo/Emoji
                  </label>
                  <input
                    type="text"
                    defaultValue={selectedCharity?.logo || ''}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mykro-green"
                    placeholder="🏥"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rating (1-5)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    step="0.1"
                    defaultValue={selectedCharity?.rating || 4.5}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mykro-green"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Impact Metrics
                  </label>
                  <div className="space-y-2">
                    {[0, 1, 2].map((index) => (
                      <div key={index} className="grid grid-cols-3 gap-2">
                        <input
                          type="text"
                          placeholder="Metric name"
                          defaultValue={selectedCharity?.impactMetrics[index]?.metric || ''}
                          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mykro-green"
                        />
                        <input
                          type="number"
                          placeholder="Value"
                          defaultValue={selectedCharity?.impactMetrics[index]?.value || ''}
                          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mykro-green"
                        />
                        <input
                          type="text"
                          placeholder="Unit"
                          defaultValue={selectedCharity?.impactMetrics[index]?.unit || ''}
                          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mykro-green"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex space-x-3 justify-end">
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsEditing(false);
                    setSelectedCharity(null);
                  }}
                >
                  Cancel
                </Button>
                <Button onClick={handleSave}>
                  {selectedCharity ? 'Update' : 'Add'} Charity
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
