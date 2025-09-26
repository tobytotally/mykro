import { useState } from 'react';

export function ConfigurationPage() {
  const [config, setConfig] = useState({
    mykroEnabled: true,
    defaultPercentage: 10,
    minPercentage: 5,
    maxPercentage: 15,
    minDonation: 1,
    maxDonation: 100,
    autoEnable: false,
    showOnboarding: true,
    defaultCharities: ['charity-1', 'charity-2', 'charity-3'],
  });

  const handleSave = () => {
    console.log('Saving configuration:', config);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Mykro Configuration</h1>
        <button 
          onClick={handleSave}
          className="px-4 py-2 bg-black text-white text-sm hover:bg-gray-800"
        >
          Save Changes
        </button>
      </div>

      {/* Three column layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* General Settings */}
        <div className="border border-gray-300 bg-white">
          <div className="bg-black text-white p-3">
            <h3 className="font-semibold text-sm">General Settings</h3>
          </div>
          <div className="p-3 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h4 className="font-medium text-xs">Enable Mykro</h4>
                <p className="text-xs text-gray-600">Allow donations</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer ml-2">
                <input
                  type="checkbox"
                  checked={config.mykroEnabled}
                  onChange={(e) => setConfig(prev => ({ ...prev, mykroEnabled: e.target.checked }))}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-gray-200 peer-checked:bg-black rounded-full peer peer-checked:after:translate-x-4 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h4 className="font-medium text-xs">Auto-enable</h4>
                <p className="text-xs text-gray-600">New users</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer ml-2">
                <input
                  type="checkbox"
                  checked={config.autoEnable}
                  onChange={(e) => setConfig(prev => ({ ...prev, autoEnable: e.target.checked }))}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-gray-200 peer-checked:bg-black rounded-full peer peer-checked:after:translate-x-4 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h4 className="font-medium text-xs">Onboarding</h4>
                <p className="text-xs text-gray-600">Show intro</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer ml-2">
                <input
                  type="checkbox"
                  checked={config.showOnboarding}
                  onChange={(e) => setConfig(prev => ({ ...prev, showOnboarding: e.target.checked }))}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-gray-200 peer-checked:bg-black rounded-full peer peer-checked:after:translate-x-4 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Donation Limits */}
        <div className="border border-gray-300 bg-white">
          <div className="bg-black text-white p-3">
            <h3 className="font-semibold text-sm">Donation Limits</h3>
          </div>
          <div className="p-3 space-y-3">
            <div>
              <label className="block text-xs font-medium mb-1">Default %</label>
              <input
                type="number"
                value={config.defaultPercentage}
                onChange={(e) => setConfig(prev => ({ ...prev, defaultPercentage: Number(e.target.value) }))}
                className="w-full px-2 py-1 text-sm border border-gray-300 focus:outline-none focus:border-black"
                min="1"
                max="20"
              />
            </div>

            <div>
              <label className="block text-xs font-medium mb-1">Range (%)</label>
              <div className="flex space-x-1">
                <input
                  type="number"
                  placeholder="Min"
                  value={config.minPercentage}
                  onChange={(e) => setConfig(prev => ({ ...prev, minPercentage: Number(e.target.value) }))}
                  className="flex-1 px-2 py-1 text-sm border border-gray-300 focus:outline-none focus:border-black"
                  min="1"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={config.maxPercentage}
                  onChange={(e) => setConfig(prev => ({ ...prev, maxPercentage: Number(e.target.value) }))}
                  className="flex-1 px-2 py-1 text-sm border border-gray-300 focus:outline-none focus:border-black"
                  max="20"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-1">
              <div>
                <label className="block text-xs font-medium mb-1">Min £</label>
                <input
                  type="number"
                  value={config.minDonation}
                  onChange={(e) => setConfig(prev => ({ ...prev, minDonation: Number(e.target.value) }))}
                  className="w-full px-2 py-1 text-sm border border-gray-300 focus:outline-none focus:border-black"
                  min="0.50"
                  step="0.50"
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">Max £</label>
                <input
                  type="number"
                  value={config.maxDonation}
                  onChange={(e) => setConfig(prev => ({ ...prev, maxDonation: Number(e.target.value) }))}
                  className="w-full px-2 py-1 text-sm border border-gray-300 focus:outline-none focus:border-black"
                />
              </div>
            </div>
          </div>
        </div>

        {/* API Configuration */}
        <div className="border border-gray-300 bg-white">
          <div className="bg-black text-white p-3">
            <h3 className="font-semibold text-sm">API Configuration</h3>
          </div>
          <div className="p-3 space-y-3">
            <div>
              <label className="block text-xs font-medium mb-1">Webhook URL</label>
              <input
                type="url"
                placeholder="https://..."
                className="w-full px-2 py-1 text-sm border border-gray-300 focus:outline-none focus:border-black"
              />
            </div>

            <div>
              <label className="block text-xs font-medium mb-1">API Key</label>
              <div className="flex space-x-1">
                <input
                  type="password"
                  value="mykro_key_hidden"
                  readOnly
                  className="flex-1 px-2 py-1 text-sm border border-gray-300 bg-gray-50"
                />
                <button className="px-2 py-1 text-xs bg-white text-gray-600 border border-gray-300 hover:bg-gray-50">
                  Reset
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium mb-1">Environment</label>
              <select className="w-full px-2 py-1 text-sm border border-gray-300 focus:outline-none focus:border-black">
                <option>Production</option>
                <option>Staging</option>
                <option>Development</option>
              </select>
            </div>
          </div>
        </div>

        {/* Integration Status */}
        <div className="border border-gray-300 bg-white">
          <div className="bg-black text-white p-3">
            <h3 className="font-semibold text-sm">Integration Status</h3>
          </div>
          <div className="p-3 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs">Payment</span>
              <span className="text-xs font-medium bg-gray-100 px-2 py-0.5 border border-gray-300">Connected</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs">Charity API</span>
              <span className="text-xs font-medium bg-gray-100 px-2 py-0.5 border border-gray-300">Connected</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs">Analytics</span>
              <span className="text-xs font-medium bg-white px-2 py-0.5 border border-gray-400 text-gray-600">Offline</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs">Webhooks</span>
              <span className="text-xs font-medium bg-gray-100 px-2 py-0.5 border border-gray-300">Active</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs">Email</span>
              <span className="text-xs font-medium bg-gray-100 px-2 py-0.5 border border-gray-300">Active</span>
            </div>
          </div>
        </div>

        {/* Branding */}
        <div className="border border-gray-300 bg-white">
          <div className="bg-black text-white p-3">
            <h3 className="font-semibold text-sm">Branding</h3>
          </div>
          <div className="p-3 space-y-3">
            <div>
              <label className="block text-xs font-medium mb-1">Banner</label>
              <input
                type="text"
                defaultValue="Betting with Purpose"
                className="w-full px-2 py-1 text-sm border border-gray-300 focus:outline-none focus:border-black"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Button</label>
              <input
                type="text"
                defaultValue="Add Donation"
                className="w-full px-2 py-1 text-sm border border-gray-300 focus:outline-none focus:border-black"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Success</label>
              <input
                type="text"
                defaultValue="Thank you!"
                className="w-full px-2 py-1 text-sm border border-gray-300 focus:outline-none focus:border-black"
              />
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="border border-gray-300 bg-white">
          <div className="bg-black text-white p-3">
            <h3 className="font-semibold text-sm">Notifications</h3>
          </div>
          <div className="p-3 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs">Email Reports</span>
              <input type="checkbox" className="w-3.5 h-3.5" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs">SMS Alerts</span>
              <input type="checkbox" className="w-3.5 h-3.5" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs">Daily Summary</span>
              <input type="checkbox" className="w-3.5 h-3.5" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs">Weekly Report</span>
              <input type="checkbox" className="w-3.5 h-3.5" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs">Anomaly Alerts</span>
              <input type="checkbox" className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>

        {/* Security */}
        <div className="border border-gray-300 bg-white">
          <div className="bg-black text-white p-3">
            <h3 className="font-semibold text-sm">Security</h3>
          </div>
          <div className="p-3 space-y-3">
            <div>
              <label className="block text-xs font-medium mb-1">Session Timeout</label>
              <select className="w-full px-2 py-1 text-sm border border-gray-300 focus:outline-none focus:border-black">
                <option>30 minutes</option>
                <option>1 hour</option>
                <option>2 hours</option>
                <option>4 hours</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs">2FA Required</span>
              <input type="checkbox" className="w-3.5 h-3.5" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs">IP Whitelist</span>
              <input type="checkbox" className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>

        {/* Performance */}
        <div className="border border-gray-300 bg-white">
          <div className="bg-black text-white p-3">
            <h3 className="font-semibold text-sm">Performance</h3>
          </div>
          <div className="p-3 space-y-3">
            <div>
              <label className="block text-xs font-medium mb-1">Cache TTL</label>
              <select className="w-full px-2 py-1 text-sm border border-gray-300 focus:outline-none focus:border-black">
                <option>5 minutes</option>
                <option>15 minutes</option>
                <option>30 minutes</option>
                <option>1 hour</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs">CDN Enabled</span>
              <input type="checkbox" className="w-3.5 h-3.5" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs">Compression</span>
              <input type="checkbox" className="w-3.5 h-3.5" defaultChecked />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="border border-gray-300 bg-white">
          <div className="bg-black text-white p-3">
            <h3 className="font-semibold text-sm">Quick Actions</h3>
          </div>
          <div className="p-3 space-y-2">
            <button className="w-full px-2 py-1.5 text-xs bg-white text-gray-600 border border-gray-300 hover:bg-gray-50 text-left">
              Clear Cache
            </button>
            <button className="w-full px-2 py-1.5 text-xs bg-white text-gray-600 border border-gray-300 hover:bg-gray-50 text-left">
              Test Webhook
            </button>
            <button className="w-full px-2 py-1.5 text-xs bg-white text-gray-600 border border-gray-300 hover:bg-gray-50 text-left">
              Export Config
            </button>
            <button className="w-full px-2 py-1.5 text-xs bg-white text-gray-600 border border-gray-300 hover:bg-gray-50 text-left">
              View Logs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}