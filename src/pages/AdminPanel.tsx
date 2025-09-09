import React, { useState } from 'react';
import { 
  Shield, Building2, CreditCard, Globe, Users, 
  TrendingUp, Settings, Eye, Check, X, AlertTriangle 
} from 'lucide-react';

function AdminPanel() {
  const [activeTab, setActiveTab] = useState('overview');

  const platformStats = {
    totalProperties: 156,
    totalOTAs: 23,
    totalInfluencers: 45,
    monthlyRevenue: 2450000,
    totalBookings: 1247,
    activeUsers: 89
  };

  const pendingApprovals = [
    {
      id: '1',
      type: 'property',
      name: 'Coastal Paradise Resort',
      applicant: 'Jane Smith',
      location: 'Malindi, Kenya',
      submitted: '2025-01-18',
      status: 'pending'
    },
    {
      id: '2',
      type: 'ota',
      name: 'Safari Adventures Kenya',
      applicant: 'John Doe',
      location: 'Nairobi, Kenya',
      submitted: '2025-01-17',
      status: 'pending'
    },
    {
      id: '3',
      type: 'influencer',
      name: '@KenyaExplorer_',
      applicant: 'Sarah Wilson',
      followers: '45.2K',
      submitted: '2025-01-16',
      status: 'pending'
    }
  ];

  const recentTransactions = [
    { id: 'TXN-101', property: 'Sunset Resort', amount: 45000, commission: 4500, date: '2025-01-19' },
    { id: 'TXN-102', property: 'City Hotel', amount: 32000, commission: 3200, date: '2025-01-19' },
    { id: 'TXN-103', property: 'Beach Villa', amount: 78000, commission: 7800, date: '2025-01-18' }
  ];

  const paymentProviders = [
    { name: 'DPO Group', status: 'active', transactions: 1205, volume: 1850000 },
    { name: 'Safaricom M-Pesa', status: 'active', transactions: 890, volume: 945000 },
    { name: 'Airtel Money', status: 'active', transactions: 245, volume: 180000 }
  ];

  const handleApproval = (id: string, action: 'approve' | 'reject') => {
    console.log(`${action} application:`, id);
    // Implement approval/rejection logic
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'property':
        return <Building2 className="h-4 w-4 text-blue-600" />;
      case 'ota':
        return <Globe className="h-4 w-4 text-green-600" />;
      case 'influencer':
        return <Users className="h-4 w-4 text-purple-600" />;
      default:
        return <Shield className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Platform Administration</h1>
          <p className="text-gray-600">Manage the entire Nomady ecosystem</p>
        </div>
        <div className="flex items-center space-x-2">
          <Shield className="h-5 w-5 text-blue-600" />
          <span className="text-sm font-medium text-gray-700">Admin Access</span>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'overview', name: 'Overview', icon: TrendingUp },
            { id: 'approvals', name: 'Approvals', icon: Check },
            { id: 'properties', name: 'Properties', icon: Building2 },
            { id: 'payments', name: 'Payments', icon: CreditCard },
            { id: 'partners', name: 'Partners', icon: Users }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <tab.icon className="h-4 w-4" />
              <span>{tab.name}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Platform Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Properties</p>
                  <p className="text-2xl font-bold text-gray-900">{platformStats.totalProperties}</p>
                </div>
                <Building2 className="h-8 w-8 text-blue-600" />
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">OTAs</p>
                  <p className="text-2xl font-bold text-gray-900">{platformStats.totalOTAs}</p>
                </div>
                <Globe className="h-8 w-8 text-green-600" />
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Influencers</p>
                  <p className="text-2xl font-bold text-gray-900">{platformStats.totalInfluencers}</p>
                </div>
                <Users className="h-8 w-8 text-purple-600" />
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Revenue</p>
                  <p className="text-lg font-bold text-gray-900">
                    KES {(platformStats.monthlyRevenue / 1000000).toFixed(1)}M
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-yellow-600" />
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Bookings</p>
                  <p className="text-2xl font-bold text-gray-900">{platformStats.totalBookings}</p>
                </div>
                <CreditCard className="h-8 w-8 text-red-600" />
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Users</p>
                  <p className="text-2xl font-bold text-gray-900">{platformStats.activeUsers}</p>
                </div>
                <Shield className="h-8 w-8 text-indigo-600" />
              </div>
            </div>
          </div>

          {/* Recent Platform Transactions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Recent Platform Transactions</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Transaction</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Property</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Commission</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {recentTransactions.map((transaction) => (
                    <tr key={transaction.id}>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{transaction.id}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{transaction.property}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">KES {transaction.amount.toLocaleString()}</td>
                      <td className="px-6 py-4 text-sm font-medium text-green-600">KES {transaction.commission.toLocaleString()}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{transaction.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Approvals Tab */}
      {activeTab === 'approvals' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Pending Approvals</h2>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <AlertTriangle className="h-4 w-4 text-yellow-500" />
              <span>{pendingApprovals.length} items need approval</span>
            </div>
          </div>

          <div className="space-y-4">
            {pendingApprovals.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      {getTypeIcon(item.type)}
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full capitalize">
                        {item.type}
                      </span>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-600">By {item.applicant}</p>
                      <div className="text-xs text-gray-500 mt-1">
                        {item.location && <span>{item.location} • </span>}
                        {item.followers && <span>{item.followers} followers • </span>}
                        Submitted {item.submitted}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => handleApproval(item.id, 'reject')}
                      className="px-4 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 transition-colors flex items-center space-x-1"
                    >
                      <X className="h-4 w-4" />
                      <span>Reject</span>
                    </button>
                    <button
                      onClick={() => handleApproval(item.id, 'approve')}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-1"
                    >
                      <Check className="h-4 w-4" />
                      <span>Approve</span>
                    </button>
                    <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                      <Eye className="h-4 w-4 text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Payments Tab */}
      {activeTab === 'payments' && (
        <div className="space-y-6">
          <h2 className="text-lg font-semibold text-gray-900">Payment Providers</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {paymentProviders.map((provider, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">{provider.name}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    provider.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {provider.status}
                  </span>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Transactions:</span>
                    <span className="text-sm font-medium">{provider.transactions.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Volume:</span>
                    <span className="text-sm font-medium">KES {(provider.volume / 1000000).toFixed(1)}M</span>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <button className="w-full px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                    <Settings className="h-4 w-4 inline mr-2" />
                    Configure
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Other tabs would be implemented similarly */}
      {(activeTab === 'properties' || activeTab === 'partners') && (
        <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-200">
          <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {activeTab === 'properties' ? 'Property Management' : 'Partner Management'}
          </h3>
          <p className="text-gray-600">This section is under development</p>
        </div>
      )}
    </div>
  );
}

export default AdminPanel;