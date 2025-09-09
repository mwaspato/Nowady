import React, { useState } from 'react';
import { Plus, MapPin, Star, Users, Settings, Eye } from 'lucide-react';
import { useData } from '../context/DataContext';

function Properties() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProperty, setNewProperty] = useState({
    name: '',
    type: 'Hotel',
    location: '',
    description: '',
    amenities: [] as string[]
  });

  const { properties, addProperty, updateProperty, deleteProperty } = useData();

  const handleAddProperty = (e: React.FormEvent) => {
    e.preventDefault();
    if (newProperty.name && newProperty.location) {
      addProperty({
        ...newProperty,
        rating: 0,
        rooms: 0,
        occupancy: 0,
        revenue: 'KES 0',
        image: 'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=400',
        status: 'active'
      });
      setNewProperty({
        name: '',
        type: 'Hotel',
        location: '',
        description: '',
        amenities: []
      });
      setShowAddModal(false);
    }
  };

  const handleStatusToggle = (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    updateProperty(id, { status: newStatus as 'active' | 'inactive' });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Properties</h1>
          <p className="text-gray-600">Manage your property portfolio</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Add Property</span>
        </button>
      </div>

      {/* Property Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <div key={property.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="relative">
              <img
                src={property.image}
                alt={property.name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-4 right-4">
                <span
                  onClick={() => handleStatusToggle(property.id, property.status)}
                  className={`cursor-pointer px-2 py-1 rounded-full text-xs font-medium ${
                    property.status === 'active'
                      ? 'bg-green-100 text-green-800 hover:bg-green-200'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  {property.status}
                </span>
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-900">{property.name}</h3>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-600">{property.rating}</span>
                </div>
              </div>

              <div className="flex items-center text-gray-600 mb-4">
                <MapPin className="h-4 w-4 mr-1" />
                <span className="text-sm">{property.location}</span>
                <span className="mx-2">•</span>
                <span className="text-sm">{property.type}</span>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-sm font-semibold text-gray-900">{property.rooms}</div>
                  <div className="text-xs text-gray-600">Rooms</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-semibold text-gray-900">{property.occupancy}%</div>
                  <div className="text-xs text-gray-600">Occupancy</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-semibold text-gray-900">{property.revenue}</div>
                  <div className="text-xs text-gray-600">Monthly</div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-1">
                  <Eye className="h-4 w-4" />
                  <span>View Details</span>
                </button>
                <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                  <Settings className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Property Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Add New Property</h3>
            </div>
            <form onSubmit={handleAddProperty} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Property Name
                </label>
                <input
                  type="text"
                  value={newProperty.name}
                  onChange={(e) => setNewProperty(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter property name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Property Type
                </label>
                <select 
                  value={newProperty.type}
                  onChange={(e) => setNewProperty(prev => ({ ...prev, type: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option>Hotel</option>
                  <option>Vacation Rental</option>
                  <option>Serviced Apartment</option>
                  <option>Chalet</option>
                  <option>B&B</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  value={newProperty.location}
                  onChange={(e) => setNewProperty(prev => ({ ...prev, location: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="City, Country"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={newProperty.description}
                  onChange={(e) => setNewProperty(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Brief description of the property"
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
                  Create Property
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Properties;
