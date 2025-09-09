import React, { useState } from 'react';
import { Plus, MapPin, Star, Users, Settings, Eye, Edit, Trash2, X, Save, Camera, Wifi, Car, Coffee, Dumbbell, Utensils, Waves } from 'lucide-react';
import { useData } from '../context/DataContext';

function Properties() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null);
  const [newProperty, setNewProperty] = useState({
    name: '',
    type: 'Hotel',
    location: '',
    description: '',
    amenities: [] as string[]
  });
  const [editingProperty, setEditingProperty] = useState({
    name: '',
    type: 'Hotel',
    location: '',
    description: '',
    amenities: [] as string[]
  });

  const { properties, addProperty, updateProperty, deleteProperty } = useData();

  const availableAmenities = [
    { name: 'WiFi', icon: Wifi },
    { name: 'Parking', icon: Car },
    { name: 'Restaurant', icon: Utensils },
    { name: 'Gym', icon: Dumbbell },
    { name: 'Pool', icon: Waves },
    { name: 'Spa', icon: Star },
    { name: 'Business Center', icon: Users },
    { name: 'Room Service', icon: Coffee }
  ];

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

  const handleViewDetails = (propertyId: string) => {
    setSelectedProperty(propertyId);
    setShowDetailsModal(true);
  };

  const handleOpenSettings = (propertyId: string) => {
    const property = properties.find(p => p.id === propertyId);
    if (property) {
      setSelectedProperty(propertyId);
      setEditingProperty({
        name: property.name,
        type: property.type,
        location: property.location,
        description: property.description || '',
        amenities: property.amenities || []
      });
      setShowSettingsModal(true);
    }
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedProperty) {
      updateProperty(selectedProperty, editingProperty);
      setShowSettingsModal(false);
      setSelectedProperty(null);
    }
  };

  const handleDeleteProperty = (propertyId: string) => {
    if (window.confirm('Are you sure you want to delete this property? This action cannot be undone.')) {
      deleteProperty(propertyId);
    }
  };

  const handleStatusToggle = (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    updateProperty(id, { status: newStatus as 'active' | 'inactive' });
  };

  const handleAmenityToggle = (amenity: string, isEditing: boolean = false) => {
    if (isEditing) {
      setEditingProperty(prev => ({
        ...prev,
        amenities: prev.amenities.includes(amenity)
          ? prev.amenities.filter(a => a !== amenity)
          : [...prev.amenities, amenity]
      }));
    } else {
      setNewProperty(prev => ({
        ...prev,
        amenities: prev.amenities.includes(amenity)
          ? prev.amenities.filter(a => a !== amenity)
          : [...prev.amenities, amenity]
      }));
    }
  };

  const getSelectedPropertyData = () => {
    return properties.find(p => p.id === selectedProperty);
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
                  onClick={() => handleViewDetails(property.id)}
                  <Eye className="h-4 w-4" />
                  <span>View Details</span>
                </button>
                <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                  onClick={() => handleOpenSettings(property.id)}
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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amenities
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {availableAmenities.map((amenity) => (
                    <label key={amenity.name} className="flex items-center space-x-2">
                      <input 
                        type="checkbox" 
                        checked={newProperty.amenities.includes(amenity.name)}
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
                  Create Property
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Property Details Modal */}
      {showDetailsModal && selectedProperty && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Property Details</h3>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            {(() => {
              const property = getSelectedPropertyData();
              if (!property) return null;
              
              return (
                <div className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Property Image */}
                    <div className="space-y-4">
                      <div className="relative">
                        <img
                          src={property.image}
                          alt={property.name}
                          className="w-full h-64 object-cover rounded-lg"
                        />
                        <div className="absolute top-4 right-4">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            property.status === 'active'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {property.status}
                          </span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4">
                        <div className="bg-blue-50 p-4 rounded-lg text-center">
                          <div className="text-2xl font-bold text-blue-600">{property.rooms}</div>
                          <div className="text-sm text-gray-600">Total Rooms</div>
                        </div>
                        <div className="bg-green-50 p-4 rounded-lg text-center">
                          <div className="text-2xl font-bold text-green-600">{property.occupancy}%</div>
                          <div className="text-sm text-gray-600">Occupancy</div>
                        </div>
                        <div className="bg-purple-50 p-4 rounded-lg text-center">
                          <div className="text-2xl font-bold text-purple-600">{property.revenue}</div>
                          <div className="text-sm text-gray-600">Monthly Revenue</div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Property Information */}
                    <div className="space-y-6">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <h2 className="text-2xl font-bold text-gray-900">{property.name}</h2>
                          <div className="flex items-center space-x-1">
                            <Star className="h-5 w-5 text-yellow-400 fill-current" />
                            <span className="text-lg font-semibold text-gray-700">{property.rating}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center text-gray-600 mb-4">
                          <MapPin className="h-4 w-4 mr-2" />
                          <span>{property.location}</span>
                          <span className="mx-2">•</span>
                          <span className="bg-gray-100 px-2 py-1 rounded text-sm">{property.type}</span>
                        </div>
                        
                        {property.description && (
                          <p className="text-gray-700 leading-relaxed">{property.description}</p>
                        )}
                      </div>
                      
                      {/* Amenities */}
                      {property.amenities && property.amenities.length > 0 && (
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-3">Amenities</h3>
                          <div className="grid grid-cols-2 gap-3">
                            {property.amenities.map((amenity, index) => {
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
                      )}
                      
                      {/* Quick Actions */}
                      <div className="pt-4 border-t border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Quick Actions</h3>
                        <div className="grid grid-cols-2 gap-3">
                          <button
                            onClick={() => handleOpenSettings(property.id)}
                            className="flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            <Edit className="h-4 w-4" />
                            <span>Edit Property</span>
                          </button>
                          <button
                            onClick={() => handleDeleteProperty(property.id)}
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

      {/* Property Settings Modal */}
      {showSettingsModal && selectedProperty && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Property Settings</h3>
              <button
                onClick={() => setShowSettingsModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <form onSubmit={handleSaveSettings} className="p-6 space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h4 className="text-md font-semibold text-gray-900 border-b border-gray-200 pb-2">
                  Basic Information
                </h4>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Property Name
                  </label>
                  <input
                    type="text"
                    value={editingProperty.name}
                    onChange={(e) => setEditingProperty(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Property Type
                    </label>
                    <select 
                      value={editingProperty.type}
                      onChange={(e) => setEditingProperty(prev => ({ ...prev, type: e.target.value }))}
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
                      value={editingProperty.location}
                      onChange={(e) => setEditingProperty(prev => ({ ...prev, location: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    rows={4}
                    value={editingProperty.description}
                    onChange={(e) => setEditingProperty(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Detailed description of the property"
                  ></textarea>
                </div>
              </div>
              
              {/* Amenities */}
              <div className="space-y-4">
                <h4 className="text-md font-semibold text-gray-900 border-b border-gray-200 pb-2">
                  Amenities & Features
                </h4>
                
                <div className="grid grid-cols-2 gap-3">
                  {availableAmenities.map((amenity) => (
                    <label key={amenity.name} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={editingProperty.amenities.includes(amenity.name)}
                        onChange={() => handleAmenityToggle(amenity.name, true)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" 
                      />
                      <amenity.icon className="h-4 w-4 text-gray-600" />
                      <span className="text-sm text-gray-700">{amenity.name}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Image Upload Section */}
              <div className="space-y-4">
                <h4 className="text-md font-semibold text-gray-900 border-b border-gray-200 pb-2">
                  Property Images
                </h4>
                
                <div className="border border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-sm text-gray-600 mb-2">Upload property images</p>
                  <button
                    type="button"
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    Choose Files
                  </button>
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-200 flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowSettingsModal(false)}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                >
                  <Save className="h-4 w-4" />
                  <span>Save Changes</span>
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
