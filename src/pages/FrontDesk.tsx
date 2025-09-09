import React, { useState } from 'react';
import { 
  UserPlus, UserCheck, UserX, Search, QrCode, 
  CreditCard, Clock, AlertCircle, CheckCircle 
} from 'lucide-react';
import { useData } from '../context/DataContext';

function FrontDesk() {
  const [activeTab, setActiveTab] = useState('checkin');
  const [searchTerm, setSearchTerm] = useState('');
  const [showWalkInModal, setShowWalkInModal] = useState(false);
  const [walkInGuest, setWalkInGuest] = useState({
    guest: '',
    email: '',
    phone: '',
    propertyId: '',
    roomId: '',
    nights: 1
  });

  const { bookings, properties, rooms, checkInGuest, checkOutGuest, addBooking } = useData();

  // Get today's date
  const today = new Date().toISOString().split('T')[0];
  
  // Filter bookings for today's arrivals
  const todayArrivals = bookings.filter(booking => 
    booking.checkIn === today && (booking.status === 'confirmed' || booking.status === 'pending')
  );
  
  // Filter bookings for today's departures
  const todayDepartures = bookings.filter(booking => 
    booking.checkOut === today && booking.status === 'checked-in'
  );

  // Mock walk-ins for demo
  const [walkIns, setWalkIns] = useState([
    {
      id: 'WI-001',
      guest: 'David Martinez',
      room: 'Available',
      requestedType: 'Standard Room',
      timestamp: '2025-01-19 10:30',
      status: 'waiting'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'checked-in':
      case 'checked-out':
        return 'bg-green-100 text-green-800';
      case 'pending':
      case 'confirmed':
      case 'waiting':
        return 'bg-yellow-100 text-yellow-800';
      case 'in-room':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleCheckIn = (bookingId: string) => {
    if (window.confirm('Confirm check-in for this guest?')) {
      checkInGuest(bookingId);
    }
  };

  const handleCheckOut = (bookingId: string) => {
    if (window.confirm('Confirm check-out for this guest?')) {
      checkOutGuest(bookingId);
    }
  };

  const handleWalkInBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (walkInGuest.guest && walkInGuest.propertyId && walkInGuest.roomId) {
      const property = properties.find(p => p.id === walkInGuest.propertyId);
      const room = rooms.find(r => r.id === walkInGuest.roomId);
      
      if (property && room) {
        const checkInDate = new Date();
        const checkOutDate = new Date();
        checkOutDate.setDate(checkOutDate.getDate() + walkInGuest.nights);
        
        addBooking({
          guest: walkInGuest.guest,
          email: walkInGuest.email,
          phone: walkInGuest.phone,
          property: property.name,
          propertyId: walkInGuest.propertyId,
          room: room.name,
          roomId: walkInGuest.roomId,
          checkIn: checkInDate.toISOString().split('T')[0],
          checkOut: checkOutDate.toISOString().split('T')[0],
          nights: walkInGuest.nights,
          amount: walkInGuest.nights * room.price,
          status: 'confirmed',
          channel: 'Front Desk',
          paymentStatus: 'pending'
        });
        
        setWalkInGuest({
          guest: '',
          email: '',
          phone: '',
          propertyId: '',
          roomId: '',
          nights: 1
        });
        setShowWalkInModal(false);
      }
    }
  };

  const availableRooms = rooms.filter(room => 
    room.propertyId === walkInGuest.propertyId && room.availability === 'available'
  );
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Front Desk Operations</h1>
          <p className="text-gray-600">Manage check-ins, check-outs, and walk-in bookings</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search bookings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors">
            <QrCode className="h-4 w-4" />
            <span>Scan QR</span>
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'checkin', name: 'Check-ins', icon: UserCheck },
            { id: 'checkout', name: 'Check-outs', icon: UserX },
            { id: 'walkins', name: 'Walk-ins', icon: UserPlus }
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

      {/* Check-ins Tab */}
      {activeTab === 'checkin' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Today's Arrivals</h2>
            <span className="text-sm text-gray-600">{todayArrivals.length} expected arrivals</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {todayArrivals.map((arrival) => (
              <div key={arrival.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <UserCheck className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{arrival.guest}</h3>
                      <p className="text-sm text-gray-500">{arrival.id}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(arrival.status)}`}>
                    {arrival.status}
                  </span>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Room:</span>
                    <span className="text-sm font-medium">{arrival.room}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Check-in:</span>
                    <span className="text-sm font-medium">{arrival.checkIn}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Nights:</span>
                    <span className="text-sm font-medium">{arrival.nights}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Amount:</span>
                    <span className="text-sm font-medium">KES {arrival.amount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Phone:</span>
                    <span className="text-sm font-medium">{arrival.phone || 'N/A'}</span>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  {(arrival.status === 'pending' || arrival.status === 'confirmed') ? (
                    <button
                      onClick={() => handleCheckIn(arrival.id)}
                      className="flex-1 bg-green-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors flex items-center justify-center space-x-1"
                    >
                      <CheckCircle className="h-4 w-4" />
                      <span>Check In</span>
                    </button>
                  ) : (
                    <div className="flex-1 bg-gray-100 text-gray-500 px-3 py-2 rounded-lg text-sm font-medium text-center">
                      Already Checked In
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {todayArrivals.length === 0 && (
              <div className="col-span-full text-center py-12 bg-white rounded-xl shadow-sm border border-gray-200">
                <UserCheck className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Arrivals Today</h3>
                <p className="text-gray-600">No guests are expected to check in today</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Check-outs Tab */}
      {activeTab === 'checkout' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Today's Departures</h2>
            <span className="text-sm text-gray-600">{todayDepartures.length} expected departures</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {todayDepartures.map((departure) => (
              <div key={departure.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                      <UserX className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{departure.guest}</h3>
                      <p className="text-sm text-gray-500">{departure.id}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor('checked-in')}`}>
                    checked-in
                  </span>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Room:</span>
                    <span className="text-sm font-medium">{departure.room}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Check-out:</span>
                    <span className="text-sm font-medium">{departure.checkOut}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Total Stay:</span>
                    <span className="text-sm font-medium">{departure.nights} nights</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Total:</span>
                    <span className="text-sm font-medium">KES {departure.amount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Phone:</span>
                    <span className="text-sm font-medium">{departure.phone || 'N/A'}</span>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleCheckOut(departure.id)}
                    className="flex-1 bg-red-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors flex items-center justify-center space-x-1"
                  >
                    <UserX className="h-4 w-4" />
                    <span>Check Out</span>
                  </button>
                </div>
              </div>
            ))}
            
            {todayDepartures.length === 0 && (
              <div className="col-span-full text-center py-12 bg-white rounded-xl shadow-sm border border-gray-200">
                <UserX className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Departures Today</h3>
                <p className="text-gray-600">No guests are expected to check out today</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Walk-ins Tab */}
      {activeTab === 'walkins' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Walk-in Customers</h2>
            <button 
              onClick={() => setShowWalkInModal(true)}
              className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-green-700 transition-colors"
            >
              <UserPlus className="h-4 w-4" />
              <span>New Walk-in</span>
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {walkIns.map((walkIn) => (
              <div key={walkIn.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <UserPlus className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{walkIn.guest}</h3>
                      <p className="text-sm text-gray-500">{walkIn.id}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(walkIn.status)}`}>
                    {walkIn.status}
                  </span>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Requested:</span>
                    <span className="text-sm font-medium">{walkIn.requestedType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Time:</span>
                    <span className="text-sm font-medium">{walkIn.timestamp.split(' ')[1]}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Status:</span>
                    <span className="text-sm font-medium capitalize">{walkIn.status}</span>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  {walkIn.status === 'waiting' ? (
                    <>
                      <button
                        onClick={() => setShowWalkInModal(true)}
                        className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                      >
                        Process
                      </button>
                      <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                        <CreditCard className="h-4 w-4" />
                      </button>
                    </>
                  ) : (
                    <div className="flex-1 bg-purple-100 text-purple-700 px-3 py-2 rounded-lg text-sm font-medium text-center">
                      Processing...
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          {walkIns.length === 0 && (
            <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-200">
              <UserPlus className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Walk-ins Today</h3>
              <p className="text-gray-600">Walk-in customers will appear here when they arrive</p>
            </div>
          )}
        </div>
      )}
    {/* Walk-in Booking Modal */}
    {showWalkInModal && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Walk-in Booking</h3>
          </div>
          <form onSubmit={handleWalkInBooking} className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Guest Name</label>
              <input
                type="text"
                value={walkInGuest.guest}
                onChange={(e) => setWalkInGuest(prev => ({ ...prev, guest: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={walkInGuest.email}
                onChange={(e) => setWalkInGuest(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
              <input
                type="tel"
                value={walkInGuest.phone}
                onChange={(e) => setWalkInGuest(prev => ({ ...prev, phone: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Property</label>
              <select
                value={walkInGuest.propertyId}
                onChange={(e) => setWalkInGuest(prev => ({ ...prev, propertyId: e.target.value, roomId: '' }))}
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
                value={walkInGuest.roomId}
                onChange={(e) => setWalkInGuest(prev => ({ ...prev, roomId: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
                disabled={!walkInGuest.propertyId}
              >
                <option value="">Select Room</option>
                {availableRooms.map(room => (
                  <option key={room.id} value={room.id}>{room.name} - KES {room.price}/night</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Number of Nights</label>
              <input
                type="number"
                min="1"
                value={walkInGuest.nights}
                onChange={(e) => setWalkInGuest(prev => ({ ...prev, nights: parseInt(e.target.value) || 1 }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            
            <div className="pt-4 border-t border-gray-200 flex items-center justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowWalkInModal(false)}
                className="px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
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

export default FrontDesk;