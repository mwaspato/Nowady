import React, { useState } from 'react';
import { 
  Globe, Eye, Settings, Palette, Image, 
  Type, Layout, Smartphone, Monitor, Tablet 
} from 'lucide-react';

function PropertyWebsite() {
  const [selectedProperty, setSelectedProperty] = useState('1');
  const [viewMode, setViewMode] = useState('desktop');

  const properties = [
    { id: '1', name: 'Sunset Resort', domain: 'sunset-resort.nomady.com' },
    { id: '2', name: 'City Hotel', domain: 'city-hotel.nomady.com' },
    { id: '3', name: 'Beach Villa', domain: 'beach-villa.nomady.com' }
  ];

  const selectedPropertyData = properties.find(p => p.id === selectedProperty);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Branded Website</h1>
          <p className="text-gray-600">Customize your property's direct booking website</p>
        </div>
        <div className="flex items-center space-x-3">
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
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Eye className="h-4 w-4" />
            <span>Preview</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Customization Panel */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <h3 className="font-semibold text-gray-900 mb-4">Website Settings</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Domain</label>
                <div className="flex items-center space-x-2">
                  <Globe className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-blue-600">{selectedPropertyData?.domain}</span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Primary Color</label>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-blue-600 rounded-full border border-gray-300"></div>
                  <input
                    type="color"
                    defaultValue="#2563EB"
                    className="w-8 h-8 rounded border-none cursor-pointer"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Logo</label>
                <div className="border border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <Image className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Upload logo</p>
                </div>
              </div>
            </div>
          </div>

          {/* Customization Options */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <h3 className="font-semibold text-gray-900 mb-4">Customize</h3>
            
            <div className="space-y-3">
              <button className="w-full flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <Palette className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium">Colors & Branding</span>
              </button>
              
              <button className="w-full flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <Type className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium">Typography</span>
              </button>
              
              <button className="w-full flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <Layout className="h-4 w-4 text-purple-600" />
                <span className="text-sm font-medium">Layout</span>
              </button>
              
              <button className="w-full flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <Image className="h-4 w-4 text-yellow-600" />
                <span className="text-sm font-medium">Images</span>
              </button>
              
              <button className="w-full flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <Settings className="h-4 w-4 text-gray-600" />
                <span className="text-sm font-medium">Settings</span>
              </button>
            </div>
          </div>
        </div>

        {/* Website Preview */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            {/* Preview Controls */}
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <h3 className="font-semibold text-gray-900">Website Preview</h3>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setViewMode('desktop')}
                    className={`p-2 rounded-lg ${viewMode === 'desktop' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
                  >
                    <Monitor className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('tablet')}
                    className={`p-2 rounded-lg ${viewMode === 'tablet' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
                  >
                    <Tablet className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('mobile')}
                    className={`p-2 rounded-lg ${viewMode === 'mobile' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
                  >
                    <Smartphone className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="text-sm text-gray-500">Live Preview</div>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              </div>
            </div>

            {/* Preview Content */}
            <div className="p-6">
              <div className={`mx-auto bg-gray-100 rounded-lg overflow-hidden transition-all duration-300 ${
                viewMode === 'desktop' ? 'max-w-full' : 
                viewMode === 'tablet' ? 'max-w-2xl' : 'max-w-sm'
              }`}>
                {/* Mock Website Content */}
                <div className="bg-white">
                  {/* Header */}
                  <div className="bg-blue-600 text-white p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                          <span className="text-blue-600 font-bold text-sm">SR</span>
                        </div>
                        <h1 className="text-xl font-bold">{selectedPropertyData?.name}</h1>
                      </div>
                      <nav className="hidden md:flex space-x-6">
                        <a href="#" className="hover:text-blue-200">Rooms</a>
                        <a href="#" className="hover:text-blue-200">Amenities</a>
                        <a href="#" className="hover:text-blue-200">Contact</a>
                      </nav>
                    </div>
                  </div>

                  {/* Hero Section */}
                  <div className="relative h-48 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                    <div className="text-center text-white">
                      <h2 className="text-2xl font-bold mb-2">Luxury Accommodation</h2>
                      <p className="text-blue-100">Experience the finest hospitality</p>
                    </div>
                  </div>

                  {/* Booking Widget */}
                  <div className="p-6 border-b border-gray-200">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-gray-900 mb-3">Book Your Stay</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <div>
                          <label className="block text-xs text-gray-600 mb-1">Check-in</label>
                          <input type="date" className="w-full text-sm border border-gray-300 rounded px-2 py-1" />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-600 mb-1">Check-out</label>
                          <input type="date" className="w-full text-sm border border-gray-300 rounded px-2 py-1" />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-600 mb-1">Guests</label>
                          <select className="w-full text-sm border border-gray-300 rounded px-2 py-1">
                            <option>2 Adults</option>
                          </select>
                        </div>
                        <div>
                          <button className="w-full bg-blue-600 text-white text-sm rounded px-2 py-1 mt-4 hover:bg-blue-700">
                            Search
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Rooms Section */}
                  <div className="p-6">
                    <h3 className="font-semibold text-gray-900 mb-4">Our Rooms</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="border border-gray-200 rounded-lg overflow-hidden">
                        <div className="h-32 bg-gray-300"></div>
                        <div className="p-4">
                          <h4 className="font-medium text-gray-900">Deluxe Suite</h4>
                          <p className="text-sm text-gray-600">Spacious suite with ocean view</p>
                          <div className="mt-2 flex items-center justify-between">
                            <span className="font-bold text-blue-600">KES 15,000/night</span>
                            <button className="text-sm bg-blue-600 text-white px-3 py-1 rounded">
                              Book Now
                            </button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="border border-gray-200 rounded-lg overflow-hidden">
                        <div className="h-32 bg-gray-300"></div>
                        <div className="p-4">
                          <h4 className="font-medium text-gray-900">Standard Room</h4>
                          <p className="text-sm text-gray-600">Comfortable room with all amenities</p>
                          <div className="mt-2 flex items-center justify-between">
                            <span className="font-bold text-blue-600">KES 8,000/night</span>
                            <button className="text-sm bg-blue-600 text-white px-3 py-1 rounded">
                              Book Now
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="bg-gray-800 text-white p-6">
                    <div className="text-center">
                      <h4 className="font-semibold mb-2">{selectedPropertyData?.name}</h4>
                      <p className="text-sm text-gray-400">Powered by Nomady</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PropertyWebsite;