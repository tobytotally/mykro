import { Card } from '../../../shared/components/UI/Card';

export function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Analytics & Insights</h1>
      
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <h3 className="text-sm font-medium text-gray-600 mb-2">Conversion Rate</h3>
          <div className="flex items-baseline">
            <p className="text-2xl font-bold text-green-600">23.5%</p>
            <span className="ml-2 text-sm text-green-500">↑ 2.1%</span>
          </div>
        </Card>
        
        <Card>
          <h3 className="text-sm font-medium text-gray-600 mb-2">Avg Donation</h3>
          <div className="flex items-baseline">
            <p className="text-2xl font-bold text-blue-600">$14.70</p>
            <span className="ml-2 text-sm text-blue-500">↑ $1.20</span>
          </div>
        </Card>
        
        <Card>
          <h3 className="text-sm font-medium text-gray-600 mb-2">Repeat Donors</h3>
          <div className="flex items-baseline">
            <p className="text-2xl font-bold text-purple-600">67%</p>
            <span className="ml-2 text-sm text-purple-500">↑ 5%</span>
          </div>
        </Card>
        
        <Card>
          <h3 className="text-sm font-medium text-gray-600 mb-2">Monthly Growth</h3>
          <div className="flex items-baseline">
            <p className="text-2xl font-bold text-orange-600">15.2%</p>
            <span className="ml-2 text-sm text-orange-500">↑ 3.1%</span>
          </div>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-lg font-semibold mb-4">Donation Trends (Last 30 Days)</h3>
          <div className="h-64 bg-gray-50 rounded flex items-center justify-center">
            <p className="text-gray-500">Donation trends chart would be here</p>
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold mb-4">User Engagement</h3>
          <div className="h-64 bg-gray-50 rounded flex items-center justify-center">
            <p className="text-gray-500">User engagement chart would be here</p>
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold mb-4">Charity Distribution</h3>
          <div className="h-64 bg-gray-50 rounded flex items-center justify-center">
            <p className="text-gray-500">Charity distribution pie chart would be here</p>
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold mb-4">Geographic Data</h3>
          <div className="h-64 bg-gray-50 rounded flex items-center justify-center">
            <p className="text-gray-500">Geographic heatmap would be here</p>
          </div>
        </Card>
      </div>

      {/* Insights Table */}
      <Card>
        <h3 className="text-lg font-semibold mb-4">Performance Insights</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-medium text-green-800 mb-2">Top Performing Time</h4>
              <p className="text-sm text-green-700">Weekend evenings show 35% higher donation rates</p>
            </div>
            
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-800 mb-2">Popular Charity Category</h4>
              <p className="text-sm text-blue-700">Health charities receive 42% of all donations</p>
            </div>
            
            <div className="p-4 bg-purple-50 rounded-lg">
              <h4 className="font-medium text-purple-800 mb-2">User Behavior</h4>
              <p className="text-sm text-purple-700">Users with 5%+ donation rate have 2.3x retention</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
