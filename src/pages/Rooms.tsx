import React, { useState } from 'react';
import { Plus, BedDouble, Users, Wifi, Car, Coffee, Star } from 'lucide-react';
import { useData } from '../context/DataContext';

function Rooms() {
  const [selectedProperty, setSelectedProperty] = useState('1');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newRoom, setNewRoom] = useState({
    name: '',
    type: 'Standard',
    capacity: 2,
    price: 0,
    amenities: [] as string[],
    description: ''
  });

  const { properties, rooms, addRoom, updateRoom } = useData();

  const filteredRooms = rooms.filter(room => room.propertyId === selectedProperty);
  const availableAmenities = ['WiFi', 'AC', 'TV', 'Mini Bar', 'Kitchen', 'Balcony', 'Ocean View', 'Butler Service', 'Jacuzzi', 'Pool Access'];

  const getStatusColor = (status: string) => {
    switch (status) {
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

  const handleAddRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (newRoom.name && newRoom.price > 0) {
      addRoom({
        ...newRoom,
        propertyId: selectedProperty,
        availability: 'available',
        image: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=400'
      });
      setNewRoom({
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

  const handleStatusChange = (roomId: string, currentStatus: string) => {
    let newStatus: 'available' | 'occupied' | 'maintenance';
    if (currentStatus === 'available') {
      newStatus = 'maintenance';
    } else if (currentStatus === 'maintenance') {
      newStatus = 'available';
    } else {
      newStatus = 'available';
    }
    updateRoom(roomId, { availability: newStatus });
  };

  const handleAmenityToggle = (amenity: string) => {
    setNewRoom(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Room Management</h1>
          <p className="text-gray-600">Manage room inventory and pricing</p>
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={selectedProperty}
            onChange={(e) => setSelectedProperty(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {properties.map((property) => (
              <option key={property.id} value={property.id}>
                {property.name}
              </option>
            ))}
          </select>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Add Room</span>
          </button>
        </div>
      </div>

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
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(room.availability)}`}>
                  {room.availability}
                </span>
              </div>
              <div className="absolute bottom-4 left-4 bg-white bg-opacity-90 px-2 py-1 rounded-lg">
                <span className="text-lg font-bold text-gray-900">KES {room.price.toLocaleString()}</span>
                <span className="text-sm text-gray-600">/night</span>
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-900">{room.name}</h3>
                <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">{room.type}</span>
              </div>
              
              <div className="flex items-center space-x-4 mb-4 text-gray-600">
                <div className="flex items-center space-x-1">
                  <Users className="h-4 w-4" />
                  <span className="text-sm">{room.capacity} guests</span>
                </div>
                <div className="flex items-center space-x-1">
                  <BedDouble className="h-4 w-4" />
                  <span className="text-sm">Room {room.id}</span>
                </div>
              </div>
              
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Amenities</h4>
                <div className="flex flex-wrap gap-1">
                  {room.amenities.slice(0, 3).map((amenity, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">
                      {amenity}
                    </span>
                  ))}
                  {room.amenities.length > 3 && (
                    <span className="px-2 py-1 bg-gray-50 text-gray-600 text-xs rounded-full">
                      +{room.amenities.length - 3} more
                    </span>
                  )}
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                  Edit Room
                </button>
                <button 
                  onClick={() => handleStatusChange(room.id, room.availability)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    room.availability === 'available' 
                      ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200' 
                      : 'bg-green-100 text-green-700 hover:bg-green-200'
                  }`}
                >
                  {room.availability === 'available' ? 'Maintenance' : 'Available'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Add New Room</h3>
            </div>
            <form onSubmit={handleAddRoom} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Room Name
                </label>
                <input
                  type="text"
                  value={newRoom.name}
                  onChange={(e) => setNewRoom(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter room name"
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Room Type
                  </label>
                  <select 
                    value={newRoom.type}
                    onChange={(e) => setNewRoom(prev => ({ ...prev, type: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option>Standard</option>
                    <option>Deluxe</option>
                    <option>Suite</option>
                    <option>Presidential</option>
                    <option>Family</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Capacity
                  </label>
                  <select 
                    value={newRoom.capacity}
                    onChange={(e) => setNewRoom(prev => ({ ...prev, capacity: parseInt(e.target.value) }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>6</option>
                    <option>8</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Base Price (KES per night)
                </label>
                <input
                  type="number"
                  value={newRoom.price}
                  onChange={(e) => setNewRoom(prev => ({ ...prev, price: parseInt(e.target.value) || 0 }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter base price"
                  required
                  min="0"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amenities
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {availableAmenities.map((amenity) => (
                    <label key={amenity} className="flex items-center space-x-2">
                      <input 
                        type="checkbox" 
                        checked={newRoom.amenities.includes(amenity)}
                        onChange={() => handleAmenityToggle(amenity)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" 
                      />
                      <span className="text-sm text-gray-700">{amenity}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={newRoom.description}
                  onChange={(e) => setNewRoom(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Room description"
                ></textarea>
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
    </div>
  );
}

export default Rooms;