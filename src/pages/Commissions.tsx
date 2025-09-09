import React from 'react';
import { TrendingUp, Users, Globe, DollarSign, Star, Eye } from 'lucide-react';
import { useData } from '../context/DataContext';

function Commissions() {
  const { partners, updatePartner } = useData();

  const recentCommissions = [
    {
      id: 'COM-001',
      partner: 'Travel Kenya Tours',
      booking: 'BK-045',
      guest: 'Sarah Johnson',
      amount: 75000,
      commission: 11250,
      rate: 15,
      date: '2025-01-18',
      status: 'paid'
    },
    {
      id: 'COM-002',
      partner: '@KenyaTravel_Influencer',
      booking: 'BK-046',
      guest: 'Mike Chen',
      amount: 45000,
      commission: 3600,
      rate: 8,
      date: '2025-01-17',
      status: 'pending'
    },
    {
      id: 'COM-003',
      partner: 'Safari Bookings Ltd',
      booking: 'BK-047',
      guest: 'Emma Davis',
      amount: 92000,
      commission: 11040,
      rate: 12,
      date: '2025-01-16',
      status: 'paid'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'paid':
        return 'bg-blue-100 text-blue-800';
      case 'inactive':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPartnerIcon = (type: string) => {
    switch (type) {
      case 'OTA':
        return <Globe className="h-5 w-5 text-blue-600" />;
      case 'Influencer':
        return <Users className="h-5 w-5 text-purple-600" />;
      case 'Travel Agency':
        return <TrendingUp className="h-5 w-5 text-green-600" />;
      default:
        return <DollarSign className="h-5 w-5 text-gray-600" />;
    }
  };

  const totalEarned = partners.reduce((sum, partner) => sum + partner.earned, 0);
  const totalRevenue = partners.reduce((sum, partner) => sum + partner.revenue, 0);
  const totalBookings = partners.reduce((sum, partner) => sum + partner.totalBookings, 0);

  const handleStatusToggle = (partnerId: string, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    updatePartner(partnerId, { status: newStatus as any });
  };

  const handleCommissionUpdate = (partnerId: string, newCommission: number) => {
    if (newCommission >= 0 && newCommission <= 50) {
      updatePartner(partnerId, { commission: newCommission });
    }
  };
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Sales Commission Management</h1>
          <p className="text-gray-600">Track partner performance and manage commission rates</p>
        </div>
      </div>

      {/* Commission Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Partners</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{partners.length}</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-2">
            <p className="text-sm text-green-600">
              {partners.filter(p => p.status === 'active').length} active
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Commission Earned</p>
              <p className="text-3xl font-bold text-green-600 mt-2">
                KES {totalEarned.toLocaleString()}
              </p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="mt-2">
            <p className="text-sm text-gray-600">This month</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Partner Revenue</p>
              <p className="text-3xl font-bold text-blue-600 mt-2">
                KES {totalRevenue.toLocaleString()}
              </p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-2">
            <p className="text-sm text-green-600">+18% vs last month</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Partner Bookings</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{totalBookings}</p>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg">
              <Globe className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
          <div className="mt-2">
            <p className="text-sm text-gray-600">Total this month</p>
          </div>
        </div>
      </div>

      {/* Partners Overview */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Partner Performance</h3>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              Add New Partner
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Partner
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Commission Rate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Bookings
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Revenue Generated
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Commission Earned
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {partners.map((partner) => (
                <tr key={partner.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      {getPartnerIcon(partner.type)}
                      <div>
                        <div className="text-sm font-medium text-gray-900">{partner.name}</div>
                        <div className="flex items-center space-x-1">
                          <Star className="h-3 w-3 text-yellow-400 fill-current" />
                          <span className="text-xs text-gray-500">{partner.rating}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">{partner.type}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="number"
                      min="0"
                      max="50"
                      value={partner.commission}
                      onChange={(e) => handleCommissionUpdate(partner.id, parseInt(e.target.value) || 0)}
                      className="w-16 text-sm font-medium text-blue-600 bg-transparent border-0 focus:ring-1 focus:ring-blue-500 rounded"
                    />
                    <span className="text-sm font-medium text-blue-600">%</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">{partner.totalBookings}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-gray-900">
                      KES {partner.revenue.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-green-600">
                      KES {partner.earned.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleStatusToggle(partner.id, partner.status)}
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium transition-colors ${getStatusColor(partner.status)} hover:opacity-80`}
                    >
                      {partner.status}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="text-blue-600 hover:text-blue-700">
                      <Eye className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Commission Transactions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Commission Transactions</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Commission ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Partner
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Booking & Guest
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Booking Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Commission
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentCommissions.map((commission) => (
                <tr key={commission.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-gray-900">{commission.id}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">{commission.partner}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm text-gray-900">{commission.booking}</div>
                      <div className="text-sm text-gray-500">{commission.guest}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">
                      KES {commission.amount.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-green-600">
                        KES {commission.commission.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-500">{commission.rate}% rate</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">{commission.date}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(commission.status)}`}>
                      {commission.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Commissions;