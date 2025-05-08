import React, { useState, useEffect } from 'react';  
import { X, Building, Home, Users, Edit, Trash } from 'lucide-react';

const RoomModal = ({ onClose, room = null, onSave, onDelete }) => {  
  const isEditMode = !!room;  
  const [formData, setFormData] = useState({  
    number: '',  
    type: 'Standard',  
    property: '',  
    floor: '1',  
    capacity: '2',  
    rate: '',  
    status: 'available',  
    amenities: [],  
    notes: ''  
  });  
  
  // Properties list  
  const properties = [  
    { id: '1', name: 'Al Noor Tower' },  
    { id: '2', name: 'Zamzam View' },  
    { id: '3', name: 'Al Safa Heights' }  
  ];  
  
  // Room types  
  const roomTypes = ['Standard', 'Deluxe', 'Suite'];  
  
  // Amenities options  
  const amenitiesOptions = [  
    'Air Conditioning', 'Free WiFi', 'TV', 'Private Bathroom',  
    'Mini Fridge', 'Safe', 'Prayer Mat', 'Qibla Direction'  
  ];  
  
  // Initialize form if room data is provided (edit mode)  
  useEffect(() => {  
    if (room) {  
      setFormData({  
        number: room.number || '',  
        type: room.type || 'Standard',  
        property: room.property || '',  
        floor: room.floor?.toString() || '1',  
        capacity: room.capacity?.toString() || '2',  
        rate: room.rate?.toString() || '',  
        status: room.status || 'available',  
        amenities: room.amenities || [],  
        notes: room.notes || ''  
      });  
    }  
  }, [room]);  
  
  // Handle form input changes  
  const handleChange = (e) => {  
    const { name, value } = e.target;  
    setFormData(prev => ({  
      ...prev,  
      [name]: value  
    }));  
  };  
  
  // Handle amenity checkbox toggle  
  const handleAmenityToggle = (amenity) => {  
    setFormData(prev => {  
      const amenities = [...prev.amenities];  
      if (amenities.includes(amenity)) {  
        return { ...prev, amenities: amenities.filter(a => a !== amenity) };  
      } else {  
        return { ...prev, amenities: [...amenities, amenity] };  
      }  
    });  
  };  
  
  // Handle form submission  
  const handleSubmit = (e) => {  
    e.preventDefault();  
    onSave({  
      ...formData,  
      id: room?.id || `R${Math.floor(1000 + Math.random() * 9000)}`  
    });  
    onClose();  
  };  
  
  // Handle room deletion  
  const handleDelete = () => {  
    if (window.confirm('Are you sure you want to delete this room?')) {  
      onDelete(room.id);  
      onClose();  
    }  
  };

  return (  
    <div className="fixed inset-0 z-50 overflow-y-auto">  
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">  
        {/* Background overlay */}  
        <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-75" onClick={onClose}></div>

        {/* Modal panel */}  
        <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white dark:bg-gray-800 rounded-lg shadow-xl">  
          {/* Form implementation */}  
          <div className="flex justify-between items-center mb-4">  
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">  
              {isEditMode ? 'Edit Room' : 'Add New Room'}  
            </h3>  
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">  
              <X size={20} />  
            </button>  
          </div>  
           
          <form onSubmit={handleSubmit}>  
            {/* Room details section */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              {/* Room Number */}
              <div>
                <label htmlFor="number" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Room Number*
                </label>
                <input
                  type="text"
                  id="number"
                  name="number"
                  value={formData.number}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              {/* Room Type */}
              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Room Type*
                </label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  {roomTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              
              {/* Property */}
              <div>
                <label htmlFor="property" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Property*
                </label>
                <select
                  id="property"
                  name="property"
                  value={formData.property}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="" disabled>Select Property</option>
                  {properties.map((property) => (
                    <option key={property.id} value={property.name}>{property.name}</option>
                  ))}
                </select>
              </div>
              
              {/* Floor */}
              <div>
                <label htmlFor="floor" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Floor*
                </label>
                <input
                  type="number"
                  id="floor"
                  name="floor"
                  value={formData.floor}
                  onChange={handleChange}
                  min="1"
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              {/* Capacity */}
              <div>
                <label htmlFor="capacity" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Capacity*
                </label>
                <input
                  type="number"
                  id="capacity"
                  name="capacity"
                  value={formData.capacity}
                  onChange={handleChange}
                  min="1"
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              {/* Rate */}
              <div>
                <label htmlFor="rate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Rate (₹)*
                </label>
                <input
                  type="number"
                  id="rate"
                  name="rate"
                  value={formData.rate}
                  onChange={handleChange}
                  min="0"
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              {/* Status */}
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Status*
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="available">Available</option>
                  <option value="occupied">Occupied</option>
                  <option value="maintenance">Maintenance</option>
                </select>
              </div>
            </div>
            
            {/* Amenities section */}
            <div className="mb-4">
              <p className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Amenities
              </p>
              <div className="grid grid-cols-2 gap-2">
                {amenitiesOptions.map((amenity) => (
                  <div key={amenity} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`amenity-${amenity}`}
                      checked={formData.amenities.includes(amenity)}
                      onChange={() => handleAmenityToggle(amenity)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor={`amenity-${amenity}`} className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                      {amenity}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Notes */}
            <div className="mb-4">
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Notes
              </label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              ></textarea>
            </div>
            
            {/* Form footer */}  
            <div className="mt-6 flex justify-end space-x-3">  
              <button  
                type="button"  
                onClick={onClose}  
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"  
              >  
                Cancel  
              </button>  
               
              {isEditMode && (  
                <button  
                  type="button"  
                  onClick={handleDelete}  
                  className="px-4 py-2 border border-red-300 dark:border-red-600 rounded-md shadow-sm text-sm font-medium text-red-700 dark:text-red-200 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30"  
                >  
                  Delete  
                </button>  
              )}  
               
              <button  
                type="submit"  
                className="px-4 py-2 bg-blue-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700"  
              >  
                {isEditMode ? 'Update' : 'Add'} Room  
              </button>  
            </div>  
          </form>  
        </div>  
      </div>  
    </div>  
  );  
};

export default RoomModal;