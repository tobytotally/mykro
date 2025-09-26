import { useState } from 'react';
import { Card } from '../../../shared/components/UI/Card';
import { Button } from '../../../shared/components/UI/Button';

export function ConfigurationPage() {
  const [config, setConfig] = useState({
    mykroEnabled: true,
    defaultPercentage: 5,
    minPercentage: 1,
    maxPercentage: 10,
    minDonation: 1,
    maxDonation: 100,
    autoEnable: false,
    showOnboarding: true,
    defaultCharities: ['charity-1', 'charity-2', 'charity-3'],
  });

  const handleSave = () => {
    // In a real app, this would save to backend
    console.log('Saving configuration:', config);
    alert('Configuration saved successfully!');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Mykro Configuration</h1>
        <Button onClick={handleSave}>Save Changes</Button>
      </div>

      {/* General Settings */}
      <Card>
        <h3 className="text-lg font-semibold mb-4">General Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Enable Mykro</h4>
              <p className="text-sm text-gray-600">Allow users to add charitable donations to their bets</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={config.mykroEnabled}
                onChange={(e) => setConfig(prev => ({ ...prev, mykroEnabled: e.target.checked }))}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Auto-enable for new users</h4>
              <p className="text-sm text-gray-600">Automatically enable Mykro for first-time users</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={config.autoEnable}
                onChange={(e) => setConfig(prev => ({ ...prev, autoEnable: e.target.checked }))}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Show onboarding</h4>
              <p className="text-sm text-gray-600">Display onboarding modal for new Mykro users</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={config.showOnboarding}
                onChange={(e) => setConfig(prev => ({ ...prev, showOnboarding: e.target.checked }))}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
            </label>
          </div>
        </div>
      </Card>

      {/* Donation Settings */}
      <Card>
        <h3 className="text-lg font-semibold mb-4">Donation Limits</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Default Percentage
            </label>
            <input
              type="number"
              value={config.defaultPercentage}
              onChange={(e) => setConfig(prev => ({ ...prev, defaultPercentage: Number(e.target.value) }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mykro-green"
              min="1"
              max="10"
            />
            <p className="text-xs text-gray-600 mt-1">Default donation percentage for new users</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Percentage Range
            </label>
            <div className="flex space-x-2">
              <input
                type="number"
                placeholder="Min"
                value={config.minPercentage}
                onChange={(e) => setConfig(prev => ({ ...prev, minPercentage: Number(e.target.value) }))}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mykro-green"
                min="1"
              />
              <input
                type="number"
                placeholder="Max"
                value={config.maxPercentage}
                onChange={(e) => setConfig(prev => ({ ...prev, maxPercentage: Number(e.target.value) }))}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mykro-green"
                max="20"
              />
            </div>
            <p className="text-xs text-gray-600 mt-1">Min and max percentage users can select</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Minimum Donation ($)
            </label>
            <input
              type="number"
              value={config.minDonation}
              onChange={(e) => setConfig(prev => ({ ...prev, minDonation: Number(e.target.value) }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mykro-green"
              min="0.50"
              step="0.50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Maximum Donation ($)
            </label>
            <input
              type="number"
              value={config.maxDonation}
              onChange={(e) => setConfig(prev => ({ ...prev, maxDonation: Number(e.target.value) }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mykro-green"
            />
          </div>
        </div>
      </Card>

      {/* API Settings */}
      <Card>
        <h3 className="text-lg font-semibold mb-4">API Configuration</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Webhook URL
            </label>
            <input
              type="url"
              placeholder="https://your-server.com/webhooks/mykro"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mykro-green"
            />
            <p className="text-xs text-gray-600 mt-1">URL to receive donation completion notifications</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              API Key
            </label>
            <div className="flex space-x-2">
              <input
                type="password"
                value="mykro_api_key_hidden"
                readOnly
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
              />
              <Button variant="outline">Regenerate</Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Branding */}
      <Card>
        <h3 className="text-lg font-semibold mb-4">Branding & Messaging</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Banner Message
            </label>
            <input
              type="text"
              defaultValue="✨ Betting with Purpose - Every bet can make a difference with Mykro"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mykro-green"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Onboarding Title
            </label>
            <input
              type="text"
              defaultValue="Welcome to Mykro!"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mykro-green"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Color Scheme
            </label>
            <div className="flex space-x-2">
              <input
                type="color"
                value="#10B981"
                className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
              />
              <span className="flex items-center text-sm text-gray-600">Primary Color</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
