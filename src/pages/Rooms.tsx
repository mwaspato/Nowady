import React, { useState } from 'react';
import { 
  Plus, Search, Filter, Eye, Edit, Trash2, X, 
  BedDouble, Users, Wifi, Car, Coffee, Tv, 
  AirVent, Bath, Mountain, Waves, Star, MapPin,
  Calendar, Clock, CheckCircle, AlertCircle
} from 'lucide-react';
import { useData } from '../context/DataContext';

function Rooms() {
  const [filterProperty, setFilterProperty] = useState('all');
  const [filterAvailability, setFilterAvailability] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [newRoom, setNewRoom] = useState({
    propertyId: '',
    name: '',
    type: 'Standard',
    capacity: 2,
    price: 0,
    amenities: [] as string[],
    description: ''
  });

  const { rooms, properties, addRoom, updateRoom, deleteRoom } = useData();

  const availableAmenities = [
    { name: 'WiFi', icon: Wifi },
    { name: 'AC', icon: AirVent },
    { name: 'TV', icon: Tv },
    { name: 'Mini Bar', icon: Coffee },
    { name: 'Balcony', icon: Mountain },
    { name: 'Ocean View', icon: Waves },
    { name: 'Private Bath', icon: Bath },
    { name: 'Parking', icon: Car }
  ];

  const roomTypes = [
    'Standard', 'Deluxe', 'Suite', 'Presidential', 'Family', 
    'Executive', 'Penthouse', 'Villa', 'Chalet'
  ];

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'occupied':
        return 'bg-red-100 text-red-800';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getAvailabilityIcon = (availability: string) => {
    switch (availability) {
      case 'available':
        return <CheckCircle className="h-4 w-4" />;
      case 'occupied':
        return <Clock className="h-4 w-4" />;
      case 'maintenance':
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <BedDouble className="h-4 w-4" />;
    }
  };

  const filteredRooms = rooms.filter(room => {
    const matchesProperty = filterProperty === 'all' || room.propertyId === filterProperty;
    const matchesAvailability = filterAvailability === 'all' || room.availability === filterAvailability;
    const matchesSearch = room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         room.type.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesProperty && matchesAvailability && matchesSearch;
  });

  const handleAddRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (newRoom.propertyId && newRoom.name && newRoom.price > 0) {
      addRoom({
        ...newRoom,
        availability: 'available',
        image: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=400'
      });
      setNewRoom({
        propertyId: '',
        name: '',
        type: 'Standard',
        capacity: 2,
        price: 0,
        amenities: [],
        description: ''
      });
      setShowAddModal(false);
    }
  };

  const handleViewDetails = (roomId: string) => {
    setSelectedRoom(roomId);
    setShowDetailsModal(true);
  };

  const handleDeleteRoom = (roomId: string) => {
    if (window.confirm('Are you sure you want to delete this room?')) {
      deleteRoom(roomId);
    }
  };

  const handleStatusChange = (roomId: string, newStatus: string) => {
    updateRoom(roomId, { availability: newStatus as any });
  };

  const handleAmenityToggle = (amenity: string) => {
    setNewRoom(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const getSelectedRoomData = () => {
    return rooms.find(r => r.id === selectedRoom);
  };

  const getPropertyName = (propertyId: string) => {
    const property = properties.find(p => p.id === propertyId);
    return property ? property.name : 'Unknown Property';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Room Management</h1>
          <p className="text-gray-600">Manage rooms across all properties</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Add Room</span>
        </button>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search rooms..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <select
                value={filterProperty}
                onChange={(e) => setFilterProperty(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Properties</option>
                {properties.map(property => (
                  <option key={property.id} value={property.id}>{property.name}</option>
                ))}
              </select>
              
              <select
                value={filterAvailability}
                onChange={(e) => setFilterAvailability(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="available">Available</option>
                <option value="occupied">Occupied</option>
                <option value="maintenance">Maintenance</option>
              </select>
            </div>
          </div>
          
          <div className="text-sm text-gray-600">
            Showing {filteredRooms.length} of {rooms.length} rooms
          </div>
        </div>
      </div>

      {/* Room Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRooms.map((room) => (
          <div key={room.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="relative">
              <img
                src={room.image}
                alt={room.name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-4 right-4">
                <select
                  value={room.availability}
                  onChange={(e) => handleStatusChange(room.id, e.target.value)}
                  className={`text-xs font-medium rounded-full px-2.5 py-1 border-0 ${getAvailabilityColor(room.availability)}`}
                >
                  <option value="available">Available</option>
                  <option value="occupied">Occupied</option>
                  <option value="maintenance">Maintenance</option>
                </select>
              </div>
              <div className="absolute top-4 left-4">
                <span className="bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs font-medium">
                  {room.type}
                </span>
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-900">{room.name}</h3>
                <div className="flex items-center space-x-1">
                  {getAvailabilityIcon(room.availability)}
                </div>
              </div>

              <div className="flex items-center text-gray-600 mb-4">
                <MapPin className="h-4 w-4 mr-1" />
                <span className="text-sm">{getPropertyName(room.propertyId)}</span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1">
                    <Users className="h-4 w-4 text-gray-600" />
                    <span className="text-sm font-semibold text-gray-900">{room.capacity}</span>
                  </div>
                  <div className="text-xs text-gray-600">Guests</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-semibold text-blue-600">
                    KES {room.price.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-600">per night</div>
                </div>
              </div>

              {/* Amenities */}
              <div className="mb-4">
                <div className="flex flex-wrap gap-1">
                  {room.amenities.slice(0, 4).map((amenity, index) => {
                    const amenityData = availableAmenities.find(a => a.name === amenity);
                    const IconComponent = amenityData?.icon || Star;
                    return (
                      <div key={index} className="flex items-center space-x-1 bg-gray-100 px-2 py-1 rounded text-xs">
                        <IconComponent className="h-3 w-3 text-gray-600" />
                        <span className="text-gray-700">{amenity}</span>
                      </div>
                    );
                  })}
                  {room.amenities.length > 4 && (
                    <span className="bg-gray-100 px-2 py-1 rounded text-xs text-gray-600">
                      +{room.amenities.length - 4} more
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleViewDetails(room.id)}
                  className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-1"
                >
                  <Eye className="h-4 w-4" />
                  <span>View Details</span>
                </button>
                <button
                  onClick={() => handleDeleteRoom(room.id)}
                  className="px-3 py-2 border border-red-300 text-red-700 rounded-lg text-sm font-medium hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="text-2xl font-bold text-gray-900">{rooms.length}</div>
          <div className="text-sm text-gray-600">Total Rooms</div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="text-2xl font-bold text-green-600">
            {rooms.filter(r => r.availability === 'available').length}
          </div>
          <div className="text-sm text-gray-600">Available</div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="text-2xl font-bold text-red-600">
            {rooms.filter(r => r.availability === 'occupied').length}
          </div>
          <div className="text-sm text-gray-600">Occupied</div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="text-2xl font-bold text-yellow-600">
            {rooms.filter(r => r.availability === 'maintenance').length}
          </div>
          <div className="text-sm text-gray-600">Maintenance</div>
        </div>
      </div>

      {/* Add Room Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Add New Room</h3>
            </div>
            <form onSubmit={handleAddRoom} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Property</label>
                <select
                  value={newRoom.propertyId}
                  onChange={(e) => setNewRoom(prev => ({ ...prev, propertyId: e.target.value }))}
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Room Name</label>
                <input
                  type="text"
                  value={newRoom.name}
                  onChange={(e) => setNewRoom(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Deluxe Suite 101"
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Room Type</label>
                  <select
                    value={newRoom.type}
                    onChange={(e) => setNewRoom(prev => ({ ...prev, type: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {roomTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Capacity</label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={newRoom.capacity}
                    onChange={(e) => setNewRoom(prev => ({ ...prev, capacity: parseInt(e.target.value) || 2 }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price per Night (KES)</label>
                <input
                  type="number"
                  min="0"
                  value={newRoom.price}
                  onChange={(e) => setNewRoom(prev => ({ ...prev, price: parseInt(e.target.value) || 0 }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  rows={3}
                  value={newRoom.description}
                  onChange={(e) => setNewRoom(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Brief description of the room"
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Amenities</label>
                <div className="grid grid-cols-2 gap-2">
                  {availableAmenities.map((amenity) => (
                    <label key={amenity.name} className="flex items-center space-x-2">
                      <input 
                        type="checkbox" 
                        checked={newRoom.amenities.includes(amenity.name)}
                        onChange={() => handleAmenityToggle(amenity.name)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" 
                      />
                      <span className="text-sm text-gray-700">{amenity.name}</span>
                    </label>
                  ))}
                </div>
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
                  Create Room
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Room Details Modal */}
      {showDetailsModal && selectedRoom && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Room Details</h3>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            {(() => {
              const room = getSelectedRoomData();
              if (!room) return null;
              
              return (
                <div className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Room Image */}
                    <div className="space-y-4">
                      <div className="relative">
                        <img
                          src={room.image}
                          alt={room.name}
                          className="w-full h-64 object-cover rounded-lg"
                        />
                        <div className="absolute top-4 right-4">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getAvailabilityColor(room.availability)}`}>
                            {room.availability}
                          </span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-blue-50 p-4 rounded-lg text-center">
                          <div className="text-2xl font-bold text-blue-600">{room.capacity}</div>
                          <div className="text-sm text-gray-600">Max Guests</div>
                        </div>
                        <div className="bg-green-50 p-4 rounded-lg text-center">
                          <div className="text-2xl font-bold text-green-600">KES {room.price.toLocaleString()}</div>
                          <div className="text-sm text-gray-600">Per Night</div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Room Information */}
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">{room.name}</h2>
                        <div className="flex items-center text-gray-600 mb-4">
                          <MapPin className="h-4 w-4 mr-2" />
                          <span>{getPropertyName(room.propertyId)}</span>
                          <span className="mx-2">•</span>
                          <span className="bg-gray-100 px-2 py-1 rounded text-sm">{room.type}</span>
                        </div>
                        
                        {room.description && (
                          <p className="text-gray-700 leading-relaxed">{room.description}</p>
                        )}
                      </div>
                      
                      {/* Amenities */}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Amenities</h3>
                        <div className="grid grid-cols-2 gap-3">
                          {room.amenities.map((amenity, index) => {
                            const amenityData = availableAmenities.find(a => a.name === amenity);
                            const IconComponent = amenityData?.icon || Star;
                            return (
                              <div key={index} className="flex items-center space-x-2 text-gray-700">
                                <IconComponent className="h-4 w-4 text-blue-600" />
                                <span className="text-sm">{amenity}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      
                      {/* Quick Actions */}
                      <div className="pt-4 border-t border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Quick Actions</h3>
                        <div className="grid grid-cols-2 gap-3">
                          <button className="flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                            <Edit className="h-4 w-4" />
                            <span>Edit Room</span>
                          </button>
                          <button
                            onClick={() => handleDeleteRoom(room.id)}
                            className="flex items-center justify-center space-x-2 px-4 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                            <span>Delete</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
}

export default Rooms;