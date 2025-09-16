import React, { useState } from 'react';
import { MapPin, Activity, Zap, X, Sun, Wind, Thermometer, Gauge, Plus } from 'lucide-react';

const Locations = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    type: 'Solar',
    capacity: '',
    status: 'Active',
    efficiency: '',
    coordinates: '',
    // Solar specific
    panels: '',
    productionRate: '',
    irradiance: '',
    temperature: '',
    // Wind specific
    windSpeed: '',
    windDirection: ''
  });

  const [locations, setLocations] = useState([
    {
      id: 1,
      name: 'Bhubaneswar Solar Farm',
      type: 'Solar',
      capacity: '450 MW',
      status: 'Active',
      efficiency: '94%',
      coordinates: '20.2961°N, 85.8245°E',
      // Solar specific details
      panels: '1,250,000',
      productionRate: '2.1 MWh/day',
      irradiance: '5.8 kWh/m²/day',
      temperature: '32°C'
    },
    {
      id: 2,
      name: 'Cuttack Wind Farm',
      type: 'Wind',
      capacity: '320 MW',
      status: 'Active',
      efficiency: '87%',
      coordinates: '20.4625°N, 85.8828°E',
      // Wind specific details
      productionRate: '1.8 MWh/day',
      windSpeed: '12.5 m/s',
      windDirection: 'Northeast'
    },
    {
      id: 3,
      name: 'Puri Coastal Wind',
      type: 'Wind',
      capacity: '280 MW',
      status: 'Maintenance',
      efficiency: '0%',
      coordinates: '19.8135°N, 85.8312°E',
      // Wind specific details
      productionRate: '0 MWh/day',
      windSpeed: '8.2 m/s',
      windDirection: 'Southeast'
    },
    {
      id: 4,
      name: 'Rourkela Solar Park',
      type: 'Solar',
      capacity: '380 MW',
      status: 'Active',
      efficiency: '91%',
      coordinates: '22.2604°N, 84.8536°E',
      // Solar specific details
      panels: '1,100,000',
      productionRate: '1.8 MWh/day',
      irradiance: '5.2 kWh/m²/day',
      temperature: '28°C'
    }
  ]);

  const handleViewDetails = (location) => {
    setSelectedLocation(location);
    setShowDetails(true);
  };

  const closeDetails = () => {
    setShowDetails(false);
    setSelectedLocation(null);
  };

  const handleAddLocation = () => {
    setShowAddForm(true);
  };

  const closeAddForm = () => {
    setShowAddForm(false);
    setFormData({
      name: '',
      type: 'Solar',
      capacity: '',
      status: 'Active',
      efficiency: '',
      coordinates: '',
      panels: '',
      productionRate: '',
      irradiance: '',
      temperature: '',
      windSpeed: '',
      windDirection: ''
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Generate a unique ID for the new location
    const newId = Math.max(...locations.map(loc => loc.id)) + 1;
    
    // Create the new location object
    const newLocation = {
      id: newId,
      name: formData.name,
      type: formData.type,
      capacity: `${formData.capacity} MW`,
      status: formData.status,
      efficiency: `${formData.efficiency}%`,
      coordinates: formData.coordinates,
      // Add type-specific details
      ...(formData.type === 'Solar' ? {
        panels: formData.panels,
        productionRate: `${formData.productionRate} MWh/day`,
        irradiance: `${formData.irradiance} kWh/m²/day`,
        temperature: `${formData.temperature}°C`
      } : {
        productionRate: `${formData.productionRate} MWh/day`,
        windSpeed: `${formData.windSpeed} m/s`,
        windDirection: formData.windDirection
      })
    };
    
    // Add the new location to the locations array
    setLocations(prevLocations => [...prevLocations, newLocation]);
    
    // Close the form and reset form data
    closeAddForm();
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-8 flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Energy Generation Locations</h2>
          <p className="text-gray-600">Monitor renewable energy facilities across Odisha</p>
        </div>
        <button
          onClick={handleAddLocation}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Location</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {locations.map((location) => (
          <div key={location.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  location.type === 'Solar' ? 'bg-amber-100' : 'bg-blue-100'
                }`}>
                  {location.type === 'Solar' ? (
                    <Zap className={`w-5 h-5 ${location.type === 'Solar' ? 'text-amber-600' : 'text-blue-600'}`} />
                  ) : (
                    <Activity className="w-5 h-5 text-blue-600" />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{location.name}</h3>
                  <p className="text-sm text-gray-500">{location.type} Farm</p>
                </div>
              </div>
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                location.status === 'Active' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {location.status}
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Capacity</span>
                <span className="text-sm font-medium text-gray-900">{location.capacity}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Efficiency</span>
                <span className={`text-sm font-medium ${
                  location.efficiency === '0%' ? 'text-red-600' : 'text-green-600'
                }`}>
                  {location.efficiency}
                </span>
              </div>
              <div className="flex items-start justify-between">
                <span className="text-sm text-gray-600">Location</span>
                <div className="flex items-center space-x-1">
                  <MapPin className="w-3 h-3 text-gray-400" />
                  <span className="text-xs text-gray-500">{location.coordinates}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100">
              <button 
                onClick={() => handleViewDetails(location)}
                className="w-full bg-blue-50 text-blue-700 py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Detailed View Modal */}
      {showDetails && selectedLocation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    selectedLocation.type === 'Solar' ? 'bg-amber-100' : 'bg-blue-100'
                  }`}>
                    {selectedLocation.type === 'Solar' ? (
                      <Sun className="w-6 h-6 text-amber-600" />
                    ) : (
                      <Wind className="w-6 h-6 text-blue-600" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{selectedLocation.name}</h3>
                    <p className="text-sm text-gray-500">{selectedLocation.type} Power Plant</p>
                  </div>
                </div>
                <button
                  onClick={closeDetails}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Status Badge */}
              <div className="mb-6">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  selectedLocation.status === 'Active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {selectedLocation.status}
                </span>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Common Details */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">General Information</h4>
                  
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Gauge className="w-4 h-4 text-gray-600" />
                      <span className="text-sm text-gray-600">Capacity</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">{selectedLocation.capacity}</span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Activity className="w-4 h-4 text-gray-600" />
                      <span className="text-sm text-gray-600">Efficiency</span>
                    </div>
                    <span className={`text-sm font-medium ${
                      selectedLocation.efficiency === '0%' ? 'text-red-600' : 'text-green-600'
                    }`}>
                      {selectedLocation.efficiency}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-gray-600" />
                      <span className="text-sm text-gray-600">Location</span>
                    </div>
                    <span className="text-xs text-gray-500">{selectedLocation.coordinates}</span>
                  </div>
                </div>

                {/* Type-specific Details */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">
                    {selectedLocation.type === 'Solar' ? 'Solar Details' : 'Wind Details'}
                  </h4>

                  {selectedLocation.type === 'Solar' ? (
                    <>
                      <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <Zap className="w-4 h-4 text-amber-600" />
                          <span className="text-sm text-gray-600">Panels</span>
                        </div>
                        <span className="text-sm font-medium text-gray-900">{selectedLocation.panels}</span>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <Activity className="w-4 h-4 text-amber-600" />
                          <span className="text-sm text-gray-600">Production Rate</span>
                        </div>
                        <span className="text-sm font-medium text-gray-900">{selectedLocation.productionRate}</span>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <Sun className="w-4 h-4 text-amber-600" />
                          <span className="text-sm text-gray-600">Irradiance</span>
                        </div>
                        <span className="text-sm font-medium text-gray-900">{selectedLocation.irradiance}</span>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <Thermometer className="w-4 h-4 text-amber-600" />
                          <span className="text-sm text-gray-600">Temperature</span>
                        </div>
                        <span className="text-sm font-medium text-gray-900">{selectedLocation.temperature}</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <Activity className="w-4 h-4 text-blue-600" />
                          <span className="text-sm text-gray-600">Production Rate</span>
                        </div>
                        <span className="text-sm font-medium text-gray-900">{selectedLocation.productionRate}</span>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <Wind className="w-4 h-4 text-blue-600" />
                          <span className="text-sm text-gray-600">Wind Speed</span>
                        </div>
                        <span className="text-sm font-medium text-gray-900">{selectedLocation.windSpeed}</span>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <Wind className="w-4 h-4 text-blue-600" />
                          <span className="text-sm text-gray-600">Wind Direction</span>
                        </div>
                        <span className="text-sm font-medium text-gray-900">{selectedLocation.windDirection}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Close Button */}
              <div className="mt-6 pt-4 border-t border-gray-200">
                <button
                  onClick={closeDetails}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Location Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                    <Plus className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Add New Location</h3>
                    <p className="text-sm text-gray-500">Add a new solar or wind power facility</p>
                  </div>
                </div>
                <button
                  onClick={closeAddForm}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Basic Information */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-gray-900">Basic Information</h4>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Location Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter location name"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Power Type</label>
                      <select
                        name="type"
                        value={formData.type}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="Solar">Solar Power</option>
                        <option value="Wind">Wind Power</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Capacity (MW)</label>
                      <input
                        type="text"
                        name="capacity"
                        value={formData.capacity}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="e.g., 450"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                      <select
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="Active">Active</option>
                        <option value="Maintenance">Maintenance</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Efficiency (%)</label>
                      <input
                        type="text"
                        name="efficiency"
                        value={formData.efficiency}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="e.g., 94"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Coordinates</label>
                      <input
                        type="text"
                        name="coordinates"
                        value={formData.coordinates}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="e.g., 20.2961°N, 85.8245°E"
                        required
                      />
                    </div>
                  </div>

                  {/* Type-specific Information */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-gray-900">
                      {formData.type === 'Solar' ? 'Solar Details' : 'Wind Details'}
                    </h4>

                    {formData.type === 'Solar' ? (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Number of Panels</label>
                          <input
                            type="text"
                            name="panels"
                            value={formData.panels}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="e.g., 1,250,000"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Production Rate (MWh/day)</label>
                          <input
                            type="text"
                            name="productionRate"
                            value={formData.productionRate}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="e.g., 2.1"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Irradiance (kWh/m²/day)</label>
                          <input
                            type="text"
                            name="irradiance"
                            value={formData.irradiance}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="e.g., 5.8"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Temperature (°C)</label>
                          <input
                            type="text"
                            name="temperature"
                            value={formData.temperature}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="e.g., 32"
                            required
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Production Rate (MWh/day)</label>
                          <input
                            type="text"
                            name="productionRate"
                            value={formData.productionRate}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="e.g., 1.8"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Wind Speed (m/s)</label>
                          <input
                            type="text"
                            name="windSpeed"
                            value={formData.windSpeed}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="e.g., 12.5"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Wind Direction</label>
                          <input
                            type="text"
                            name="windDirection"
                            value={formData.windDirection}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="e.g., Northeast"
                            required
                          />
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Form Buttons */}
                <div className="flex space-x-4 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={closeAddForm}
                    className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  >
                    Add Location
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Locations;


