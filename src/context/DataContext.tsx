import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Property {
  id: string;
  name: string;
  type: string;
  location: string;
  rating: number;
  rooms: number;
  occupancy: number;
  revenue: string;
  image: string;
  status: 'active' | 'inactive';
  description?: string;
  amenities?: string[];
}

export interface Room {
  id: string;
  propertyId: string;
  name: string;
  type: string;
  capacity: number;
  price: number;
  availability: 'available' | 'occupied' | 'maintenance';
  amenities: string[];
  image: string;
  description?: string;
}

export interface Booking {
  id: string;
  guest: string;
  email: string;
  phone?: string;
  property: string;
  propertyId: string;
  room: string;
  roomId: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  amount: number;
  status: 'confirmed' | 'pending' | 'cancelled' | 'checked-in' | 'checked-out';
  channel: string;
  paymentStatus: 'paid' | 'pending' | 'refunded';
  createdAt: string;
}

export interface Transaction {
  id: string;
  bookingId: string;
  amount: number;
  method: string;
  provider: string;
  status: 'completed' | 'pending' | 'failed';
  date: string;
  guest: string;
  property: string;
}

export interface Partner {
  id: string;
  name: string;
  type: 'OTA' | 'Influencer' | 'Travel Agency';
  commission: number;
  totalBookings: number;
  revenue: number;
  earned: number;
  status: 'active' | 'pending' | 'inactive';
  rating: number;
  email?: string;
  phone?: string;
}

interface DataContextType {
  properties: Property[];
  rooms: Room[];
  bookings: Booking[];
  transactions: Transaction[];
  partners: Partner[];
  addProperty: (property: Omit<Property, 'id'>) => void;
  updateProperty: (id: string, updates: Partial<Property>) => void;
  deleteProperty: (id: string) => void;
  addRoom: (room: Omit<Room, 'id'>) => void;
  updateRoom: (id: string, updates: Partial<Room>) => void;
  deleteRoom: (id: string) => void;
  addBooking: (booking: Omit<Booking, 'id' | 'createdAt'>) => void;
  updateBooking: (id: string, updates: Partial<Booking>) => void;
  cancelBooking: (id: string) => void;
  checkInGuest: (bookingId: string) => void;
  checkOutGuest: (bookingId: string) => void;
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  updateTransaction: (id: string, updates: Partial<Transaction>) => void;
  addPartner: (partner: Omit<Partner, 'id'>) => void;
  updatePartner: (id: string, updates: Partial<Partner>) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [properties, setProperties] = useState<Property[]>([
    {
      id: '1',
      name: 'Sunset Resort',
      type: 'Hotel',
      location: 'Mombasa, Kenya',
      rating: 4.8,
      rooms: 45,
      occupancy: 85,
      revenue: 'KES 125K',
      image: 'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=400',
      status: 'active',
      description: 'Luxury beachfront resort with stunning ocean views',
      amenities: ['Pool', 'Spa', 'Restaurant', 'Beach Access', 'WiFi']
    },
    {
      id: '2',
      name: 'Chalet Vasmobile',
      type: 'Hotel',
      location: 'Mount Kenya Region, Kenya',
      rating: 4.8,
      rooms: 24,
      occupancy: 85,
      revenue: 'KES 145K',
      image: 'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg?auto=compress&cs=tinysrgb&w=400',
      status: 'active',
      description: 'Luxury mountain chalet resort with stunning alpine views and world-class amenities',
      amenities: ['Mountain Views', 'Spa & Wellness', 'Restaurant', 'WiFi', 'Parking', 'Fireplace']
    },
    {
      id: '3',
      name: 'Beach Villa',
      type: 'Vacation Rental',
      location: 'Diani, Kenya',
      rating: 4.9,
      rooms: 8,
      occupancy: 91,
      revenue: 'KES 67K',
      image: 'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg?auto=compress&cs=tinysrgb&w=400',
      status: 'active',
      description: 'Exclusive beachfront villa with private beach access',
      amenities: ['Private Beach', 'Pool', 'Kitchen', 'WiFi', 'Garden']
    }
  ]);

  const [rooms, setRooms] = useState<Room[]>([
    {
      id: '1',
      propertyId: '1',
      name: 'Deluxe Suite',
      type: 'Suite',
      capacity: 4,
      price: 15000,
      availability: 'available',
      amenities: ['WiFi', 'AC', 'Mini Bar', 'Ocean View'],
      image: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Spacious suite with panoramic ocean views'
    },
    {
      id: '2',
      propertyId: '1',
      name: 'Mountain View Suite',
      type: 'Suite',
      capacity: 2,
      price: 12000,
      availability: 'available',
      amenities: ['WiFi', 'AC', 'TV', 'Mountain View', 'Balcony'],
      image: 'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Elegant suite with panoramic mountain views'
    },
    {
      id: '3',
      propertyId: '2',
      name: 'Luxury Mountain Chalet',
      type: 'Presidential',
      capacity: 4,
      price: 45000,
      availability: 'available',
      amenities: ['WiFi', 'AC', 'Fireplace', 'Mountain View', 'Private Balcony', 'Kitchenette'],
      image: 'https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Stunning mountain chalet with panoramic views, perfect for a romantic getaway'
    },
    {
      id: '5',
      propertyId: '2',
      name: 'Cozy Forest Retreat',
      type: 'Deluxe',
      capacity: 2,
      price: 32000,
      availability: 'occupied',
      amenities: ['WiFi', 'AC', 'Forest View', 'Private Deck', 'Hot Tub', 'Mini Bar'],
      image: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Intimate forest retreat surrounded by nature, ideal for couples'
    },
    {
      id: '6',
      propertyId: '2',
      name: 'Alpine Family Lodge',
      type: 'Family',
      capacity: 6,
      price: 58000,
      availability: 'available',
      amenities: ['WiFi', 'AC', 'Valley View', 'Full Kitchen', 'Living Room', 'Game Room'],
      image: 'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Spacious family lodge with all amenities needed for a perfect mountain vacation'
    },
    {
      id: '7',
      propertyId: '2',
      name: 'Executive Mountain Suite',
      type: 'Executive',
      capacity: 3,
      price: 38000,
      availability: 'maintenance',
      amenities: ['WiFi', 'AC', 'City View', 'Work Desk', 'Meeting Area', 'Coffee Machine'],
      image: 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Perfect for business travelers who want comfort and functionality'
    },
    {
      id: '4',
      propertyId: '3',
      name: 'Presidential Suite',
      type: 'Presidential',
      capacity: 4,
      price: 35000,
      availability: 'available',
      amenities: ['WiFi', 'AC', 'Jacuzzi', 'Butler Service', 'Ocean View'],
      image: 'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Ultimate luxury suite with premium amenities'
    }
  ]);

  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: 'BK-001',
      guest: 'Alice Johnson',
      email: 'alice@example.com',
      phone: '+254 700 123 456',
      property: 'Sunset Resort',
      propertyId: '1',
      room: 'Deluxe Suite',
      roomId: '1',
      checkIn: '2025-01-20',
      checkOut: '2025-01-25',
      nights: 5,
      amount: 75000,
      status: 'confirmed',
      channel: 'Direct Website',
      paymentStatus: 'paid',
      createdAt: '2025-01-15T10:00:00Z'
    },
    {
      id: 'BK-002',
      guest: 'Bob Smith',
      email: 'bob@example.com',
      phone: '+254 711 234 567',
      property: 'Chalet Vasmobile',
      propertyId: '2',
      room: 'Luxury Mountain Chalet',
      roomId: '3',
      checkIn: '2025-01-21',
      checkOut: '2025-01-23',
      nights: 2,
      amount: 90000,
      status: 'pending',
      channel: 'Direct Website',
      paymentStatus: 'pending',
      createdAt: '2025-01-16T14:30:00Z'
    }
  ]);

  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: 'TXN-001',
      bookingId: 'BK-001',
      amount: 75000,
      method: 'Card',
      provider: 'DPO',
      status: 'completed',
      date: '2025-01-15',
      guest: 'Alice Johnson',
      property: 'Sunset Resort'
    },
    {
      id: 'TXN-002',
      bookingId: 'BK-002',
      amount: 90000,
      method: 'Card',
      provider: 'DPO',
      status: 'pending',
      date: '2025-01-16',
      guest: 'Bob Smith',
      property: 'Chalet Vasmobile'
    }
  ]);

  const [partners, setPartners] = useState<Partner[]>([
    {
      id: '1',
      name: 'Travel Kenya Tours',
      type: 'OTA',
      commission: 15,
      totalBookings: 24,
      revenue: 156000,
      earned: 23400,
      status: 'active',
      rating: 4.8,
      email: 'contact@travelkenya.com',
      phone: '+254 700 000 001'
    },
    {
      id: '2',
      name: '@KenyaTravel_Influencer',
      type: 'Influencer',
      commission: 8,
      totalBookings: 18,
      revenue: 89000,
      earned: 7120,
      status: 'active',
      rating: 4.6,
      email: 'kenya.travel@instagram.com'
    }
  ]);

  // Property management functions
  const addProperty = (property: Omit<Property, 'id'>) => {
    const newProperty = {
      ...property,
      id: `prop-${Date.now()}`
    };
    setProperties(prev => [...prev, newProperty]);
  };

  const updateProperty = (id: string, updates: Partial<Property>) => {
    setProperties(prev => prev.map(prop => 
      prop.id === id ? { ...prop, ...updates } : prop
    ));
  };

  const deleteProperty = (id: string) => {
    setProperties(prev => prev.filter(prop => prop.id !== id));
    setRooms(prev => prev.filter(room => room.propertyId !== id));
  };

  // Room management functions
  const addRoom = (room: Omit<Room, 'id'>) => {
    const newRoom = {
      ...room,
      id: `room-${Date.now()}`
    };
    setRooms(prev => [...prev, newRoom]);
  };

  const updateRoom = (id: string, updates: Partial<Room>) => {
    setRooms(prev => prev.map(room => 
      room.id === id ? { ...room, ...updates } : room
    ));
  };

  const deleteRoom = (id: string) => {
    setRooms(prev => prev.filter(room => room.id !== id));
  };

  // Booking management functions
  const addBooking = (booking: Omit<Booking, 'id' | 'createdAt'>) => {
    const newBooking = {
      ...booking,
      id: `BK-${String(bookings.length + 1).padStart(3, '0')}`,
      createdAt: new Date().toISOString()
    };
    setBookings(prev => [...prev, newBooking]);
  };

  const updateBooking = (id: string, updates: Partial<Booking>) => {
    setBookings(prev => prev.map(booking => 
      booking.id === id ? { ...booking, ...updates } : booking
    ));
  };

  const cancelBooking = (id: string) => {
    updateBooking(id, { status: 'cancelled', paymentStatus: 'refunded' });
  };

  const checkInGuest = (bookingId: string) => {
    updateBooking(bookingId, { status: 'checked-in' });
    const booking = bookings.find(b => b.id === bookingId);
    if (booking) {
      updateRoom(booking.roomId, { availability: 'occupied' });
    }
  };

  const checkOutGuest = (bookingId: string) => {
    updateBooking(bookingId, { status: 'checked-out' });
    const booking = bookings.find(b => b.id === bookingId);
    if (booking) {
      updateRoom(booking.roomId, { availability: 'available' });
    }
  };

  // Transaction management functions
  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction = {
      ...transaction,
      id: `TXN-${String(transactions.length + 1).padStart(3, '0')}`
    };
    setTransactions(prev => [...prev, newTransaction]);
  };

  const updateTransaction = (id: string, updates: Partial<Transaction>) => {
    setTransactions(prev => prev.map(txn => 
      txn.id === id ? { ...txn, ...updates } : txn
    ));
  };

  // Partner management functions
  const addPartner = (partner: Omit<Partner, 'id'>) => {
    const newPartner = {
      ...partner,
      id: `partner-${Date.now()}`
    };
    setPartners(prev => [...prev, newPartner]);
  };

  const updatePartner = (id: string, updates: Partial<Partner>) => {
    setPartners(prev => prev.map(partner => 
      partner.id === id ? { ...partner, ...updates } : partner
    ));
  };

  return (
    <DataContext.Provider value={{
      properties,
      rooms,
      bookings,
      transactions,
      partners,
      addProperty,
      updateProperty,
      deleteProperty,
      addRoom,
      updateRoom,
      deleteRoom,
      addBooking,
      updateBooking,
      cancelBooking,
      checkInGuest,
      checkOutGuest,
      addTransaction,
      updateTransaction,
      addPartner,
      updatePartner
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}