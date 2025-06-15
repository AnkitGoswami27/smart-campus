import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Building, Calendar, Clock, MapPin, Users, Plus, Search, Filter } from 'lucide-react';
import { motion } from 'framer-motion';

const Resources: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'rooms' | 'equipment' | 'bookings'>('rooms');
  const [showBookModal, setShowBookModal] = useState(false);
  const [selectedResource, setSelectedResource] = useState<any>(null);

  const rooms = [
    {
      id: 1,
      name: 'Lecture Hall A',
      type: 'Lecture Hall',
      capacity: 150,
      location: 'Building A, Floor 1',
      amenities: ['Projector', 'Audio System', 'AC', 'WiFi'],
      status: 'available',
      nextBooking: '2024-03-15 14:00'
    },
    {
      id: 2,
      name: 'Computer Lab 1',
      type: 'Computer Lab',
      capacity: 40,
      location: 'Building B, Floor 2',
      amenities: ['40 PCs', 'Projector', 'AC', 'WiFi'],
      status: 'occupied',
      nextBooking: '2024-03-15 16:00'
    },
    {
      id: 3,
      name: 'Conference Room',
      type: 'Meeting Room',
      capacity: 20,
      location: 'Admin Building, Floor 3',
      amenities: ['Video Conferencing', 'Whiteboard', 'AC'],
      status: 'available',
      nextBooking: null
    },
    {
      id: 4,
      name: 'Physics Lab',
      type: 'Laboratory',
      capacity: 30,
      location: 'Science Building, Floor 1',
      amenities: ['Lab Equipment', 'Safety Gear', 'Fume Hood'],
      status: 'maintenance',
      nextBooking: '2024-03-16 09:00'
    }
  ];

  const equipment = [
    {
      id: 1,
      name: 'Portable Projector',
      type: 'AV Equipment',
      quantity: 5,
      available: 3,
      location: 'Equipment Room A',
      status: 'available'
    },
    {
      id: 2,
      name: 'Laptop Cart (20 units)',
      type: 'Computing',
      quantity: 2,
      available: 1,
      location: 'IT Storage',
      status: 'available'
    },
    {
      id: 3,
      name: 'Digital Camera',
      type: 'Recording',
      quantity: 8,
      available: 5,
      location: 'Media Center',
      status: 'available'
    },
    {
      id: 4,
      name: 'Microscope Set',
      type: 'Lab Equipment',
      quantity: 15,
      available: 0,
      location: 'Science Lab',
      status: 'unavailable'
    }
  ];

  const bookings = [
    {
      id: 1,
      resource: 'Lecture Hall A',
      bookedBy: 'Dr. Sarah Johnson',
      date: '2024-03-15',
      time: '14:00 - 16:00',
      purpose: 'CS101 Lecture',
      status: 'confirmed'
    },
    {
      id: 2,
      resource: 'Computer Lab 1',
      bookedBy: 'Prof. Michael Brown',
      date: '2024-03-15',
      time: '10:00 - 12:00',
      purpose: 'Programming Lab',
      status: 'confirmed'
    },
    {
      id: 3,
      resource: 'Conference Room',
      bookedBy: 'Admin Office',
      date: '2024-03-16',
      time: '09:00 - 11:00',
      purpose: 'Faculty Meeting',
      status: 'pending'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800';
      case 'occupied':
        return 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800';
      case 'maintenance':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-800';
      case 'unavailable':
        return 'bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-900/20 dark:text-gray-300 dark:border-gray-800';
      case 'confirmed':
        return 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800';
      case 'pending':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-800';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-900/20 dark:text-gray-300 dark:border-gray-800';
    }
  };

  const handleBookResource = (resource: any) => {
    setSelectedResource(resource);
    setShowBookModal(true);
  };

  return (
    <Layout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Resource Management</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Manage and book campus facilities and equipment
            </p>
          </div>
          <button
            onClick={() => setShowBookModal(true)}
            className="mt-4 sm:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium flex items-center transition-colors"
          >
            <Plus className="h-5 w-5 mr-2" />
            Book Resource
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'rooms', name: 'Rooms & Facilities', icon: Building },
              { id: 'equipment', name: 'Equipment', icon: Users },
              { id: 'bookings', name: 'My Bookings', icon: Calendar }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                <tab.icon className="h-5 w-5 mr-2" />
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Search and Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search resources..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex space-x-2">
              <button className="flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </button>
              <select className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500">
                <option value="">All Types</option>
                <option value="lecture">Lecture Halls</option>
                <option value="lab">Laboratories</option>
                <option value="meeting">Meeting Rooms</option>
              </select>
            </div>
          </div>
        </div>

        {/* Rooms & Facilities Tab */}
        {activeTab === 'rooms' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
          >
            {rooms.map((room, index) => (
              <motion.div
                key={room.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow card-hover"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                      <Building className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{room.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{room.type}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border capitalize ${getStatusColor(room.status)}`}>
                    {room.status}
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                    <Users className="h-4 w-4 mr-2" />
                    <span>Capacity: {room.capacity}</span>
                  </div>

                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{room.location}</span>
                  </div>

                  {room.nextBooking && (
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                      <Clock className="h-4 w-4 mr-2" />
                      <span>Next: {new Date(room.nextBooking).toLocaleString()}</span>
                    </div>
                  )}

                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Amenities:</p>
                    <div className="flex flex-wrap gap-1">
                      {room.amenities.map((amenity, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full"
                        >
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={() => handleBookResource(room)}
                    disabled={room.status !== 'available'}
                    className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                      room.status === 'available'
                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/40'
                        : 'bg-gray-50 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {room.status === 'available' ? 'Book Now' : 'Unavailable'}
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Equipment Tab */}
        {activeTab === 'equipment' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
          >
            {equipment.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow card-hover"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-green-50 dark:bg-green-900/20">
                      <Users className="h-6 w-6 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{item.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{item.type}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border capitalize ${getStatusColor(item.status)}`}>
                    {item.status}
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-300">Available</span>
                    <span className="text-gray-900 dark:text-white font-medium">
                      {item.available}/{item.quantity}
                    </span>
                  </div>

                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        item.available > 0 ? 'bg-green-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${(item.available / item.quantity) * 100}%` }}
                    ></div>
                  </div>

                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{item.location}</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={() => handleBookResource(item)}
                    disabled={item.available === 0}
                    className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                      item.available > 0
                        ? 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/40'
                        : 'bg-gray-50 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {item.available > 0 ? 'Request Equipment' : 'Not Available'}
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Bookings Tab */}
        {activeTab === 'bookings' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">My Bookings</h3>
            <div className="space-y-4">
              {bookings.map((booking) => (
                <div key={booking.id} className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4">
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">{booking.resource}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300">{booking.purpose}</p>
                        </div>
                      </div>
                      <div className="mt-2 flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>{new Date(booking.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{booking.time}</span>
                        </div>
                        <span>by {booking.bookedBy}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium border capitalize ${getStatusColor(booking.status)}`}>
                        {booking.status}
                      </span>
                      <button className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300">
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Book Resource Modal */}
        {showBookModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Book Resource</h2>
                <button
                  onClick={() => setShowBookModal(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  ×
                </button>
              </div>

              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Resource
                  </label>
                  <input
                    type="text"
                    value={selectedResource?.name || ''}
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Date
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Start Time
                    </label>
                    <input
                      type="time"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      End Time
                    </label>
                    <input
                      type="time"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Purpose
                  </label>
                  <textarea
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Describe the purpose of booking..."
                  ></textarea>
                </div>

                <div className="flex justify-end space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowBookModal(false)}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    Book Resource
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Resources;