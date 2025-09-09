import React, { useState } from 'react';
import { Calendar, Search, Filter, Download, Eye, Edit, X, Plus } from 'lucide-react';
import { useData } from '../context/DataContext';

function Bookings() {
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newBooking, setNewBooking] = useState({
    guest: '',
    email: '',
    phone: '',
    propertyId: '',
    roomId: '',
    checkIn: '',
    checkOut: '',
    channel: 'Direct Website'
  });

  const { bookings, properties, rooms, addBooking, updateBooking, cancelBooking } = useData();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'checked-in':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'refunded':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesStatus = filterStatus === 'all' || booking.status === filterStatus;
    const matchesSearch = booking.guest.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleAddBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (newBooking.guest && newBooking.email && newBooking.propertyId && newBooking.roomId && newBooking.checkIn && newBooking.checkOut) {
      const property = properties.find(p => p.id === newBooking.propertyId);
      const room = rooms.find(r => r.id === newBooking.roomId);
      
      if (property && room) {
        const checkInDate = new Date(newBooking.checkIn);
        const checkOutDate = new Date(newBooking.checkOut);
        const nights = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24));
        const amount = nights * room.price;

        addBooking({
          guest: newBooking.guest,
          email: newBooking.email,
          phone: newBooking.phone,
          property: property.name,
          propertyId: newBooking.propertyId,
          room: room.name,
          roomId: newBooking.roomId,
          checkIn: newBooking.checkIn,
          checkOut: newBooking.checkOut,
          nights,
          amount,
          status: 'pending',
          channel: newBooking.channel,
          paymentStatus: 'pending'
        });

        setNewBooking({
          guest: '',
          email: '',
          phone: '',
          propertyId: '',
          roomId: '',
          checkIn: '',
          checkOut: '',
          channel: 'Direct Website'
        });
        setShowAddModal(false);
      }
    }
  };

  const handleStatusChange = (bookingId: string, newStatus: string) => {
    updateBooking(bookingId, { status: newStatus as any });
  };

  const handleCancelBooking = (bookingId: string) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      cancelBooking(bookingId);
    }
  };

  const availableRooms = rooms.filter(room => 
    room.propertyId === newBooking.propertyId && room.availability === 'available'
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Bookings & Reservations</h1>
          <p className="text-gray-600">Manage all property bookings and reservations</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>
          <button 
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>New Booking</span>
          </button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search bookings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="confirmed">Confirmed</option>
                <option value="pending">Pending</option>
                <option value="cancelled">Cancelled</option>
                <option value="checked-in">Checked In</option>
              </select>
            </div>
          </div>
          
          <div className="text-sm text-gray-600">
            Showing {filteredBookings.length} of {bookings.length} bookings
          </div>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Booking ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Guest
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Property & Room
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dates
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Channel
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredBookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{booking.id}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{booking.guest}</div>
                      <div className="text-sm text-gray-500">{booking.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{booking.property}</div>
                      <div className="text-sm text-gray-500">{booking.room}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm text-gray-900">{booking.checkIn} - {booking.checkOut}</div>
                      <div className="text-sm text-gray-500">{booking.nights} nights</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      KES {booking.amount.toLocaleString()}
                    </div>
                    <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPaymentStatusColor(booking.paymentStatus)}`}>
                      {booking.paymentStatus}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={booking.status}
                      onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                      className={`text-xs font-medium rounded-full px-2.5 py-0.5 border-0 ${getStatusColor(booking.status)}`}
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="checked-in">Checked In</option>
                      <option value="checked-out">Checked Out</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {booking.channel}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button className="text-blue-600 hover:text-blue-700">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-700">
                        <Edit className="h-4 w-4" />
                      </button>
                      {(booking.status === 'pending' || booking.status === 'confirmed') && (
                        <button 
                          onClick={() => handleCancelBooking(booking.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="text-2xl font-bold text-gray-900">{bookings.length}</div>
          <div className="text-sm text-gray-600">Total Bookings</div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="text-2xl font-bold text-green-600">
            {bookings.filter(b => b.status === 'confirmed').length}
          </div>
          <div className="text-sm text-gray-600">Confirmed</div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="text-2xl font-bold text-yellow-600">
            {bookings.filter(b => b.status === 'pending').length}
          </div>
          <div className="text-sm text-gray-600">Pending</div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="text-2xl font-bold text-gray-900">
            KES {bookings.reduce((sum, b) => b.status !== 'cancelled' ? sum + b.amount : sum, 0).toLocaleString()}
          </div>
          <div className="text-sm text-gray-600">Total Revenue</div>
        </div>
      </div>

      {/* Add Booking Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">New Booking</h3>
            </div>
            <form onSubmit={handleAddBooking} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Guest Name</label>
                <input
                  type="text"
                  value={newBooking.guest}
                  onChange={(e) => setNewBooking(prev => ({ ...prev, guest: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={newBooking.email}
                  onChange={(e) => setNewBooking(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input
                  type="tel"
                  value={newBooking.phone}
                  onChange={(e) => setNewBooking(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Property</label>
                <select
                  value={newBooking.propertyId}
                  onChange={(e) => setNewBooking(prev => ({ ...prev, propertyId: e.target.value, roomId: '' }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select Property</option>
                  {properties.map(property => (
                    <option key={property.id} value={property.id}>{property.name}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Room</label>
                <select
                  value={newBooking.roomId}
                  onChange={(e) => setNewBooking(prev => ({ ...prev, roomId: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  disabled={!newBooking.propertyId}
                >
                  <option value="">Select Room</option>
                  {availableRooms.map(room => (
                    <option key={room.id} value={room.id}>{room.name} - KES {room.price}/night</option>
                  ))}
                </select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Check-in</label>
                  <input
                    type="date"
                    value={newBooking.checkIn}
                    onChange={(e) => setNewBooking(prev => ({ ...prev, checkIn: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Check-out</label>
                  <input
                    type="date"
                    value={newBooking.checkOut}
                    onChange={(e) => setNewBooking(prev => ({ ...prev, checkOut: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Booking Channel</label>
                <select
                  value={newBooking.channel}
                  onChange={(e) => setNewBooking(prev => ({ ...prev, channel: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option>Direct Website</option>
                  <option>Front Desk</option>
                  <option>Phone</option>
                  <option>Walk-in</option>
                </select>
              </div>
              
              <div className="pt-4 border-t border-gray-200 flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Create Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Bookings;