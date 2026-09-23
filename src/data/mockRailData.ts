import { Station, Train, FoodItem, Ticket } from '../types';

export const MAJOR_STATIONS: Station[] = [
  { code: 'NDLS', name: 'NEW DELHI', city: 'Delhi', state: 'Delhi' },
  { code: 'CSMT', name: 'MUMBAI CSMT', city: 'Mumbai', state: 'Maharashtra' },
  { code: 'MMCT', name: 'MUMBAI CENTRAL', city: 'Mumbai', state: 'Maharashtra' },
  { code: 'HWH', name: 'HOWRAH JN', city: 'Kolkata', state: 'West Bengal' },
  { code: 'SDAH', name: 'SEALDAH', city: 'Kolkata', state: 'West Bengal' },
  { code: 'MAS', name: 'MGR CHENNAI CENTRAL', city: 'Chennai', state: 'Tamil Nadu' },
  { code: 'SBC', name: 'KSR BENGALURU', city: 'Bengaluru', state: 'Karnataka' },
  { code: 'ADI', name: 'AHMEDABAD JN', city: 'Ahmedabad', state: 'Gujarat' },
  { code: 'PNBE', name: 'PATNA JN', city: 'Patna', state: 'Bihar' },
  { code: 'BSB', name: 'VARANASI JN', city: 'Varanasi', state: 'Uttar Pradesh' },
  { code: 'LKO', name: 'LUCKNOW NR', city: 'Lucknow', state: 'Uttar Pradesh' },
  { code: 'CNB', name: 'KANPUR CENTRAL', city: 'Kanpur', state: 'Uttar Pradesh' },
  { code: 'AGC', name: 'AGRA CANTT', city: 'Agra', state: 'Uttar Pradesh' },
  { code: 'JP', name: 'JAIPUR JN', city: 'Jaipur', state: 'Rajasthan' },
  { code: 'PUNE', name: 'PUNE JN', city: 'Pune', state: 'Maharashtra' },
  { code: 'HYB', name: 'HYDERABAD DECCAN', city: 'Hyderabad', state: 'Telangana' },
  { code: 'SC', name: 'SECUNDERABAD JN', city: 'Hyderabad', state: 'Telangana' },
  { code: 'TVC', name: 'THIRUVANANTHAPURAM', city: 'Thiruvananthapuram', state: 'Kerala' },
  { code: 'GKP', name: 'GORAKHPUR JN', city: 'Gorakhpur', state: 'Uttar Pradesh' },
  { code: 'ASR', name: 'AMRITSAR JN', city: 'Amritsar', state: 'Punjab' },
  { code: 'BPL', name: 'BHOPAL JN', city: 'Bhopal', state: 'Madhya Pradesh' },
  { code: 'GWL', name: 'GWALIOR JN', city: 'Gwalior', state: 'Madhya Pradesh' },
  { code: 'JHS', name: 'VIRANGANA LAKSHMIBAI (JHANSI)', city: 'Jhansi', state: 'Uttar Pradesh' },
  { code: 'KOTA', name: 'KOTA JN', city: 'Kota', state: 'Rajasthan' },
  { code: 'BRC', name: 'VADODARA JN', city: 'Vadodara', state: 'Gujarat' },
  { code: 'ST', name: 'SURAT', city: 'Surat', state: 'Gujarat' },
  { code: 'R', name: 'RAIPUR JN', city: 'Raipur', state: 'Chhattisgarh' },
  { code: 'BBS', name: 'BHUBANESWAR', city: 'Bhubaneswar', state: 'Odisha' },
  { code: 'GHY', name: 'GUWAHATI', city: 'Guwahati', state: 'Assam' },
  { code: 'DDU', name: 'PT DEEN DAYAL UPADHYAYA JN', city: 'Mughalsarai', state: 'Uttar Pradesh' },
];

export const QUOTAS = [
  { code: 'GN', name: 'GENERAL' },
  { code: 'LD', name: 'LADIES' },
  { code: 'SS', name: 'LOWER BERTH / SR. CITIZEN' },
  { code: 'HP', name: 'PERSON WITH DISABILITY' },
  { code: 'TQ', name: 'TATKAL' },
  { code: 'PT', name: 'PREMIUM TATKAL' },
];

export const TRAIN_CLASSES = [
  { code: 'All', name: 'All Classes' },
  { code: '1A', name: 'AC First Class (1A)' },
  { code: '2A', name: 'AC 2 Tier (2A)' },
  { code: '3A', name: 'AC 3 Tier (3A)' },
  { code: '3E', name: 'AC 3 Economy (3E)' },
  { code: 'EC', name: 'Exec. Chair Car (EC)' },
  { code: 'CC', name: 'AC Chair Car (CC)' },
  { code: 'SL', name: 'Sleeper (SL)' },
  { code: '2S', name: 'Second Sitting (2S)' },
  { code: 'EV', name: 'Vistadome AC (EV)' },
];

export const MOCK_TRAINS: Train[] = [
  {
    number: '12952',
    name: 'MUMBAI TEJAS RAJDHANI',
    type: 'RAJDHANI',
    origin: { code: 'NDLS', name: 'NEW DELHI', city: 'Delhi', state: 'Delhi' },
    destination: { code: 'MMCT', name: 'MUMBAI CENTRAL', city: 'Mumbai', state: 'Maharashtra' },
    departureTime: '16:55',
    arrivalTime: '08:35',
    duration: '15h 40m',
    runsOn: [true, true, true, true, true, true, true],
    pantryAvailable: true,
    classes: [
      { className: '1A', classFullName: 'AC First Class', status: 'AVAILABLE', statusNumber: 12, fare: 4850, updatedAt: '10 mins ago' },
      { className: '2A', classFullName: 'AC 2 Tier', status: 'AVAILABLE', statusNumber: 48, fare: 2980, updatedAt: '5 mins ago' },
      { className: '3A', classFullName: 'AC 3 Tier', status: 'AVAILABLE', statusNumber: 164, fare: 2150, updatedAt: 'Just now' },
      { className: '3E', classFullName: 'AC 3 Economy', status: 'RAC', statusNumber: 14, fare: 1950, updatedAt: '2 mins ago', chancePercentage: 92 },
    ],
    route: [
      { stationCode: 'NDLS', stationName: 'NEW DELHI', arrivalTime: 'Source', departureTime: '16:55', haltMinutes: 0, distanceKm: 0, day: 1, platform: '1', status: 'PASSED' },
      { stationCode: 'KOTA', stationName: 'KOTA JN', arrivalTime: '21:30', departureTime: '21:40', haltMinutes: 10, distanceKm: 466, day: 1, platform: '1', delayMinutes: 0, status: 'PASSED' },
      { stationCode: 'BRC', stationName: 'VADODARA JN', arrivalTime: '03:45', departureTime: '03:55', haltMinutes: 10, distanceKm: 994, day: 2, platform: '2', delayMinutes: 5, status: 'CURRENT' },
      { stationCode: 'ST', stationName: 'SURAT', arrivalTime: '05:15', departureTime: '05:20', haltMinutes: 5, distanceKm: 1124, day: 2, platform: '1', status: 'UPCOMING' },
      { stationCode: 'MMCT', stationName: 'MUMBAI CENTRAL', arrivalTime: '08:35', departureTime: 'Dest', haltMinutes: 0, distanceKm: 1386, day: 2, platform: '5', status: 'UPCOMING' },
    ]
  },
  {
    number: '22436',
    name: 'VANDE BHARAT EXPRESS',
    type: 'VANDE BHARAT',
    origin: { code: 'NDLS', name: 'NEW DELHI', city: 'Delhi', state: 'Delhi' },
    destination: { code: 'BSB', name: 'VARANASI JN', city: 'Varanasi', state: 'Uttar Pradesh' },
    departureTime: '06:00',
    arrivalTime: '14:00',
    duration: '08h 00m',
    runsOn: [true, true, true, false, true, true, true],
    pantryAvailable: true,
    classes: [
      { className: 'EC', classFullName: 'Exec. Chair Car', status: 'AVAILABLE', statusNumber: 22, fare: 3350, updatedAt: '3 mins ago' },
      { className: 'CC', classFullName: 'AC Chair Car', status: 'AVAILABLE', statusNumber: 88, fare: 1750, updatedAt: 'Just now' },
    ],
    route: [
      { stationCode: 'NDLS', stationName: 'NEW DELHI', arrivalTime: 'Source', departureTime: '06:00', haltMinutes: 0, distanceKm: 0, day: 1, platform: '16', status: 'PASSED' },
      { stationCode: 'CNB', stationName: 'KANPUR CENTRAL', arrivalTime: '10:08', departureTime: '10:10', haltMinutes: 2, distanceKm: 440, day: 1, platform: '1', status: 'PASSED' },
      { stationCode: 'DDU', stationName: 'PT DEEN DAYAL UPADHYAYA', arrivalTime: '13:00', departureTime: '13:02', haltMinutes: 2, distanceKm: 760, day: 1, platform: '2', status: 'PASSED' },
      { stationCode: 'BSB', stationName: 'VARANASI JN', arrivalTime: '14:00', departureTime: 'Dest', haltMinutes: 0, distanceKm: 778, day: 1, platform: '1', status: 'PASSED' },
    ]
  },
  {
    number: '12004',
    name: 'LUCKNOW SHATABDI EXP',
    type: 'SHATABDI',
    origin: { code: 'NDLS', name: 'NEW DELHI', city: 'Delhi', state: 'Delhi' },
    destination: { code: 'LKO', name: 'LUCKNOW NR', city: 'Lucknow', state: 'Uttar Pradesh' },
    departureTime: '06:10',
    arrivalTime: '12:40',
    duration: '06h 30m',
    runsOn: [true, true, true, true, true, true, true],
    pantryAvailable: true,
    classes: [
      { className: 'EC', classFullName: 'Exec. Chair Car', status: 'AVAILABLE', statusNumber: 15, fare: 2150, updatedAt: '7 mins ago' },
      { className: 'CC', classFullName: 'AC Chair Car', status: 'AVAILABLE', statusNumber: 142, fare: 1165, updatedAt: 'Just now' },
    ],
    route: [
      { stationCode: 'NDLS', stationName: 'NEW DELHI', arrivalTime: 'Source', departureTime: '06:10', haltMinutes: 0, distanceKm: 0, day: 1, platform: '9', status: 'PASSED' },
      { stationCode: 'CNB', stationName: 'KANPUR CENTRAL', arrivalTime: '11:20', departureTime: '11:25', haltMinutes: 5, distanceKm: 440, day: 1, platform: '3', status: 'PASSED' },
      { stationCode: 'LKO', stationName: 'LUCKNOW NR', arrivalTime: '12:40', departureTime: 'Dest', haltMinutes: 0, distanceKm: 512, day: 1, platform: '1', status: 'PASSED' },
    ]
  },
  {
    number: '12302',
    name: 'HOWRAH RAJDHANI EXP',
    type: 'RAJDHANI',
    origin: { code: 'NDLS', name: 'NEW DELHI', city: 'Delhi', state: 'Delhi' },
    destination: { code: 'HWH', name: 'HOWRAH JN', city: 'Kolkata', state: 'West Bengal' },
    departureTime: '16:50',
    arrivalTime: '09:55',
    duration: '17h 05m',
    runsOn: [true, true, true, true, true, true, true],
    pantryAvailable: true,
    classes: [
      { className: '1A', classFullName: 'AC First Class', status: 'WL', statusNumber: 4, fare: 4950, updatedAt: '4 mins ago', chancePercentage: 65 },
      { className: '2A', classFullName: 'AC 2 Tier', status: 'AVAILABLE', statusNumber: 26, fare: 3120, updatedAt: 'Just now' },
      { className: '3A', classFullName: 'AC 3 Tier', status: 'AVAILABLE', statusNumber: 82, fare: 2260, updatedAt: '1 min ago' },
    ],
    route: [
      { stationCode: 'NDLS', stationName: 'NEW DELHI', arrivalTime: 'Source', departureTime: '16:50', haltMinutes: 0, distanceKm: 0, day: 1, platform: '12', status: 'PASSED' },
      { stationCode: 'CNB', stationName: 'KANPUR CENTRAL', arrivalTime: '21:32', departureTime: '21:37', haltMinutes: 5, distanceKm: 440, day: 1, platform: '4', status: 'PASSED' },
      { stationCode: 'DDU', stationName: 'PT DEEN DAYAL UPADHYAYA', arrivalTime: '00:45', departureTime: '00:55', haltMinutes: 10, distanceKm: 792, day: 2, platform: '1', status: 'PASSED' },
      { stationCode: 'HWH', stationName: 'HOWRAH JN', arrivalTime: '09:55', departureTime: 'Dest', haltMinutes: 0, distanceKm: 1450, day: 2, platform: '9', status: 'UPCOMING' },
    ]
  },
  {
    number: '12626',
    name: 'KERALA SUPERFAST EXP',
    type: 'SUPERFAST',
    origin: { code: 'NDLS', name: 'NEW DELHI', city: 'Delhi', state: 'Delhi' },
    destination: { code: 'TVC', name: 'THIRUVANANTHAPURAM', city: 'Thiruvananthapuram', state: 'Kerala' },
    departureTime: '20:10',
    arrivalTime: '18:00',
    duration: '45h 50m',
    runsOn: [true, true, true, true, true, true, true],
    pantryAvailable: true,
    classes: [
      { className: '2A', classFullName: 'AC 2 Tier', status: 'AVAILABLE', statusNumber: 18, fare: 3640, updatedAt: '12 mins ago' },
      { className: '3A', classFullName: 'AC 3 Tier', status: 'AVAILABLE', statusNumber: 52, fare: 2510, updatedAt: '3 mins ago' },
      { className: '3E', classFullName: 'AC 3 Economy', status: 'AVAILABLE', statusNumber: 94, fare: 2320, updatedAt: 'Just now' },
      { className: 'SL', classFullName: 'Sleeper', status: 'AVAILABLE', statusNumber: 210, fare: 980, updatedAt: '5 mins ago' },
    ],
    route: [
      { stationCode: 'NDLS', stationName: 'NEW DELHI', arrivalTime: 'Source', departureTime: '20:10', haltMinutes: 0, distanceKm: 0, day: 1, platform: '3', status: 'PASSED' },
      { stationCode: 'AGC', stationName: 'AGRA CANTT', arrivalTime: '22:20', departureTime: '22:25', haltMinutes: 5, distanceKm: 195, day: 1, platform: '1', status: 'PASSED' },
      { stationCode: 'BPL', stationName: 'BHOPAL JN', arrivalTime: '05:30', departureTime: '05:35', haltMinutes: 5, distanceKm: 700, day: 2, platform: '1', status: 'PASSED' },
      { stationCode: 'TVC', stationName: 'THIRUVANANTHAPURAM', arrivalTime: '18:00', departureTime: 'Dest', haltMinutes: 0, distanceKm: 3030, day: 3, platform: '1', status: 'UPCOMING' },
    ]
  },
  {
    number: '12138',
    name: 'PUNJAB MAIL',
    type: 'MAIL/EXPRESS',
    origin: { code: 'ASR', name: 'AMRITSAR JN', city: 'Amritsar', state: 'Punjab' },
    destination: { code: 'CSMT', name: 'MUMBAI CSMT', city: 'Mumbai', state: 'Maharashtra' },
    departureTime: '21:45',
    arrivalTime: '07:35',
    duration: '33h 50m',
    runsOn: [true, true, true, true, true, true, true],
    pantryAvailable: true,
    classes: [
      { className: '1A', classFullName: 'AC First Class', status: 'AVAILABLE', statusNumber: 6, fare: 4620, updatedAt: '15 mins ago' },
      { className: '2A', classFullName: 'AC 2 Tier', status: 'AVAILABLE', statusNumber: 24, fare: 2715, updatedAt: '8 mins ago' },
      { className: '3A', classFullName: 'AC 3 Tier', status: 'AVAILABLE', statusNumber: 68, fare: 1890, updatedAt: 'Just now' },
      { className: 'SL', classFullName: 'Sleeper', status: 'AVAILABLE', statusNumber: 144, fare: 710, updatedAt: 'Just now' },
      { className: '2S', classFullName: 'Second Sitting', status: 'AVAILABLE', statusNumber: 280, fare: 415, updatedAt: '1 min ago' },
    ],
    route: [
      { stationCode: 'ASR', stationName: 'AMRITSAR JN', arrivalTime: 'Source', departureTime: '21:45', haltMinutes: 0, distanceKm: 0, day: 1, platform: '1', status: 'PASSED' },
      { stationCode: 'NDLS', stationName: 'NEW DELHI', arrivalTime: '05:00', departureTime: '05:15', haltMinutes: 15, distanceKm: 448, day: 2, platform: '5', status: 'PASSED' },
      { stationCode: 'CSMT', stationName: 'MUMBAI CSMT', arrivalTime: '07:35', departureTime: 'Dest', haltMinutes: 0, distanceKm: 1980, day: 3, platform: '18', status: 'UPCOMING' },
    ]
  },
  {
    number: '20608',
    name: 'MYSURU VANDE BHARAT',
    type: 'VANDE BHARAT',
    origin: { code: 'MAS', name: 'MGR CHENNAI CENTRAL', city: 'Chennai', state: 'Tamil Nadu' },
    destination: { code: 'SBC', name: 'KSR BENGALURU', city: 'Bengaluru', state: 'Karnataka' },
    departureTime: '05:50',
    arrivalTime: '10:20',
    duration: '04h 30m',
    runsOn: [true, false, true, true, true, true, true],
    pantryAvailable: true,
    classes: [
      { className: 'EC', classFullName: 'Exec. Chair Car', status: 'AVAILABLE', statusNumber: 28, fare: 1890, updatedAt: '2 mins ago' },
      { className: 'CC', classFullName: 'AC Chair Car', status: 'AVAILABLE', statusNumber: 154, fare: 995, updatedAt: 'Just now' },
    ],
    route: [
      { stationCode: 'MAS', stationName: 'MGR CHENNAI CENTRAL', arrivalTime: 'Source', departureTime: '05:50', haltMinutes: 0, distanceKm: 0, day: 1, platform: '2', status: 'PASSED' },
      { stationCode: 'SBC', stationName: 'KSR BENGALURU', arrivalTime: '10:20', departureTime: 'Dest', haltMinutes: 0, distanceKm: 360, day: 1, platform: '7', status: 'UPCOMING' },
    ]
  }
];

export const MOCK_TICKETS: Ticket[] = [
  {
    pnr: '4256198421',
    trainNumber: '12952',
    trainName: 'MUMBAI TEJAS RAJDHANI',
    journeyDate: '24-Sep-2026',
    bookingDate: '20-Sep-2026',
    fromStation: { code: 'NDLS', name: 'NEW DELHI', city: 'Delhi', state: 'Delhi' },
    toStation: { code: 'MMCT', name: 'MUMBAI CENTRAL', city: 'Mumbai', state: 'Maharashtra' },
    boardingStation: { code: 'NDLS', name: 'NEW DELHI', city: 'Delhi', state: 'Delhi' },
    selectedClass: '3A',
    quota: 'GN',
    chartStatus: 'CHART PREPARED',
    transactionId: 'TXN-984210398',
    baseFare: 2150,
    reservationCharge: 40,
    superfastCharge: 45,
    tatkalCharge: 0,
    cateringCharge: 380,
    gst: 110,
    insuranceAmount: 0.90,
    totalFare: 5450,
    passengers: [
      {
        id: 'p-1',
        name: 'Rahul Sharma',
        age: 32,
        gender: 'MALE',
        berthPreference: 'LOWER',
        mealPreference: 'VEG',
        allocatedCoach: 'B3',
        allocatedBerth: 37,
        allocatedBerthType: 'Lower Berth (LB)',
        bookingStatus: 'CNF B3 37',
        currentStatus: 'CNF B3 37',
      },
      {
        id: 'p-2',
        name: 'Priya Sharma',
        age: 29,
        gender: 'FEMALE',
        berthPreference: 'MIDDLE',
        mealPreference: 'VEG',
        allocatedCoach: 'B3',
        allocatedBerth: 38,
        allocatedBerthType: 'Middle Berth (MB)',
        bookingStatus: 'CNF B3 38',
        currentStatus: 'CNF B3 38',
      }
    ]
  },
  {
    pnr: '8123901245',
    trainNumber: '22436',
    trainName: 'VANDE BHARAT EXPRESS',
    journeyDate: '26-Sep-2026',
    bookingDate: '22-Sep-2026',
    fromStation: { code: 'NDLS', name: 'NEW DELHI', city: 'Delhi', state: 'Delhi' },
    toStation: { code: 'BSB', name: 'VARANASI JN', city: 'Varanasi', state: 'Uttar Pradesh' },
    boardingStation: { code: 'NDLS', name: 'NEW DELHI', city: 'Delhi', state: 'Delhi' },
    selectedClass: 'CC',
    quota: 'GN',
    chartStatus: 'CHART NOT PREPARED',
    transactionId: 'TXN-124598011',
    baseFare: 1750,
    reservationCharge: 40,
    superfastCharge: 45,
    tatkalCharge: 0,
    cateringCharge: 240,
    gst: 90,
    insuranceAmount: 0.45,
    totalFare: 2165.45,
    passengers: [
      {
        id: 'p-3',
        name: 'Amit Patel',
        age: 41,
        gender: 'MALE',
        berthPreference: 'WINDOW_SIDE',
        mealPreference: 'NON_VEG',
        allocatedCoach: 'C4',
        allocatedBerth: 19,
        allocatedBerthType: 'Window Seat (WS)',
        bookingStatus: 'CNF C4 19',
        currentStatus: 'CNF C4 19',
      }
    ]
  }
];

export const MOCK_FOOD_ITEMS: FoodItem[] = [
  {
    id: 'f-1',
    name: 'IRCTC Deluxe Veg Thali',
    restaurant: 'IRCTC Food Track Plaza',
    category: 'VEG',
    price: 180,
    rating: 4.6,
    deliveryStation: 'KOTA JN (21:30)',
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=600&auto=format&fit=crop&q=80',
    description: 'Steamed Basmati Rice, 3 Soft Rotis, Paneer Butter Masala, Dal Tadka, Seasonal Mix Veg, Gulab Jamun, Pickle & Curd.',
  },
  {
    id: 'f-2',
    name: 'Royal Chicken Dum Biryani',
    restaurant: 'Comesum Express',
    category: 'NON_VEG',
    price: 260,
    rating: 4.7,
    deliveryStation: 'KANPUR CENTRAL (10:10)',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&auto=format&fit=crop&q=80',
    description: 'Authentic Awadhi spiced dum biryani with two tender chicken pieces, egg, mirchi ka salan, and onion raita.',
  },
  {
    id: 'f-3',
    name: 'South Indian Combo Box',
    restaurant: 'Sangeetha Vegetarian',
    category: 'VEG',
    price: 140,
    rating: 4.5,
    deliveryStation: 'VADODARA JN (03:45)',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&auto=format&fit=crop&q=80',
    description: '2 Crispy Medu Vadas, 2 Fluffy Steamed Idlis, Mini Masala Dosa with Drumstick Sambar & 3 varieties of Chutney.',
  },
  {
    id: 'f-4',
    name: 'Haldiram Special Rajbhog & Snacks',
    restaurant: 'Haldiram Quick Serve',
    category: 'SNACKS',
    price: 120,
    rating: 4.8,
    deliveryStation: 'AGRA CANTT (22:20)',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&auto=format&fit=crop&q=80',
    description: '2 Samosas with mint sauce, Aloo Bhujia packet (100g), and 2 spongy saffron Rajbhog sweets.',
  },
  {
    id: 'f-5',
    name: 'Farmhouse Veggie Cheesy Pizza (Medium)',
    restaurant: 'Dominos On Track',
    category: 'VEG',
    price: 320,
    rating: 4.4,
    deliveryStation: 'BHOPAL JN (05:30)',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=80',
    description: 'Delivered hot to your seat! Crisp crust loaded with mushroom, capsicum, tomato, onion and 100% mozzarella.',
  },
  {
    id: 'f-6',
    name: 'Kulhad Masala Chai & Biscuit Set',
    restaurant: 'Chai Point Railways',
    category: 'BEVERAGES',
    price: 60,
    rating: 4.9,
    deliveryStation: 'NEW DELHI (16:55)',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=600&auto=format&fit=crop&q=80',
    description: 'Freshly brewed ginger-cardamom railway tea served in eco-friendly earthenware kulhad with Osmania biscuits.',
  }
];

export const DISHA_FAQS = [
  {
    q: 'What are the Tatkal booking timings?',
    a: 'Tatkal booking opens at 10:00 AM for AC classes (1A, 2A, 3A, 3E, CC, EC) and at 11:00 AM for Non-AC classes (Sleeper, 2S) one day in advance of the train departure date from the origin station.'
  },
  {
    q: 'What is the refund rule on ticket cancellation?',
    a: 'For confirmed tickets cancelled >48 hrs before departure: AC 1st/Executive ₹240, AC 2 Tier ₹200, AC 3 Tier/Chair Car ₹180, Sleeper ₹120, Second class ₹60 flat clerkage. Between 48 hrs and 12 hrs: 25% subject to min flat rate. Between 12 hrs and 4 hrs: 50% subject to min flat rate. After charting: File TDR.'
  },
  {
    q: 'What is RAC (Reservation Against Cancellation)?',
    a: 'An RAC ticket guarantees travel permission on the train with a shared sitting seat (lower berth shared by 2 RAC passengers). If any confirmed passenger cancels or doesn\'t show up, RAC passengers get automatically upgraded to full berths.'
  },
  {
    q: 'How does IRCTC deploy as a WAR file on Tomcat?',
    a: 'A WAR (Web Application Archive) file packages the frontend build and a WEB-INF/web.xml file. When placed into Tomcat\'s "webapps/" folder (e.g. as irctc.war or ROOT.war), Tomcat automatically extracts and serves the application at http://localhost:8080/irctc.'
  }
];
