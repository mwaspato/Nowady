import React, { useState } from 'react';
import { CreditCard, Smartphone, DollarSign, TrendingUp, Download, Filter } from 'lucide-react';
import { useData } from '../context/DataContext';

function Payments() {
  const [filterPeriod, setFilterPeriod] = useState('this_month');
  const { transactions, updateTransaction } = useData();

  const paymentChannels = [
    { name: 'Card Payments', provider: 'DPO', percentage: 65, amount: 292500 },
    { name: 'M-Pesa', provider: 'Safaricom', percentage: 25, amount: 112500 },
    { name: 'Airtel Money', provider: 'Airtel', percentage: 10, amount: 45000 }
  ];


  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getMethodIcon = (method: string) => {
    switch (method) {
      case 'Card':
        return <CreditCard className="h-4 w-4" />;
      case 'M-Pesa':
      case 'Airtel Money':
        return <Smartphone className="h-4 w-4" />;
      default:
        return <DollarSign className="h-4 w-4" />;
    }
  };

  const totalRevenue = transactions
    .filter(t => t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0);

  const pendingAmount = transactions
    .filter(t => t.status === 'pending')
    .reduce((sum, t) => sum + t.amount, 0);

  const handleStatusChange = (transactionId: string, newStatus: string) => {
    updateTransaction(transactionId, { status: newStatus as any });
  };

  const handleRetryPayment = (transactionId: string) => {
    if (window.confirm('Retry this payment?')) {
      updateTransaction(transactionId, { status: 'pending' });
    }
  };
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Payment Management</h1>
          <p className="text-gray-600">Track and manage payment channels and transactions</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={filterPeriod}
            onChange={(e) => setFilterPeriod(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="this_week">This Week</option>
            <option value="this_month">This Month</option>
            <option value="last_month">Last Month</option>
            <option value="this_year">This Year</option>
          </select>
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Payment Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                KES {totalRevenue.toLocaleString()}
              </p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="flex items-center mt-2">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <p className="text-sm text-green-600">+12% from last month</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Payments</p>
              <p className="text-3xl font-bold text-yellow-600 mt-2">
                KES {pendingAmount.toLocaleString()}
              </p>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg">
              <CreditCard className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
          <div className="mt-2">
            <p className="text-sm text-gray-600">
              {transactions.filter(t => t.status === 'pending').length} transactions
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Success Rate</p>
              <p className="text-3xl font-bold text-green-600 mt-2">
                {transactions.length > 0 ? 
                  Math.round((transactions.filter(t => t.status === 'completed').length / transactions.length) * 100) : 0}%
              </p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <TrendingUp className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-2">
            <p className="text-sm text-gray-600">Payment success rate</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Transactions</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{transactions.length}</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <CreditCard className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-2">
            <p className="text-sm text-gray-600">This month</p>
          </div>
        </div>
      </div>

      {/* Payment Channels */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Payment Channels Performance</h3>
        </div>
        <div className="p-6">
          <div className="space-y-6">
            {paymentChannels.map((channel, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-3">
                    {channel.name.includes('Card') ? (
                      <CreditCard className="h-5 w-5 text-blue-600" />
                    ) : (
                      <Smartphone className="h-5 w-5 text-green-600" />
                    )}
                    <div>
                      <div className="font-medium text-gray-900">{channel.name}</div>
                      <div className="text-sm text-gray-500">{channel.provider}</div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-6">
                  <div className="text-right">
                    <div className="font-medium text-gray-900">
                      KES {channel.amount.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-500">{channel.percentage}% of total</div>
                  </div>
                  
                  <div className="w-32">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${channel.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center space-x-1">
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Transaction ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Guest & Property
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment Method
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{transaction.id}</div>
                      <div className="text-sm text-gray-500">{transaction.bookingId}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{transaction.guest}</div>
                      <div className="text-sm text-gray-500">{transaction.property}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {getMethodIcon(transaction.method)}
                      <div>
                        <div className="text-sm font-medium text-gray-900">{transaction.method}</div>
                        <div className="text-sm text-gray-500">{transaction.provider}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      KES {transaction.amount.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={transaction.status}
                      onChange={(e) => handleStatusChange(transaction.id, e.target.value)}
                      className={`text-xs font-medium rounded-full px-2.5 py-0.5 border-0 ${getStatusColor(transaction.status)}`}
                    >
                      <option value="pending">Pending</option>
                      <option value="completed">Completed</option>
                      <option value="failed">Failed</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {transaction.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {transaction.status === 'failed' && (
                      <button
                        onClick={() => handleRetryPayment(transaction.id)}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        Retry
                      </button>
                    )}
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

export default Payments;