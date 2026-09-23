export interface Station {
  code: string;
  name: string;
  city: string;
  state: string;
}

export type TrainClass = '1A' | '2A' | '3A' | '3E' | 'SL' | 'CC' | 'EC' | '2S' | 'EA' | 'EV';
export type QuotaType = 'GN' | 'TQ' | 'PT' | 'LD' | 'SS' | 'HP';

export interface ClassAvailability {
  className: TrainClass;
  classFullName: string;
  status: 'AVAILABLE' | 'RAC' | 'WL' | 'REGRET' | 'CURR_AVBL';
  statusNumber: number;
  fare: number;
  updatedAt: string;
  chancePercentage?: number; // e.g., 95% confirmation probability for WL
}

export interface StationStop {
  stationCode: string;
  stationName: string;
  arrivalTime: string;
  departureTime: string;
  haltMinutes: number;
  distanceKm: number;
  day: number;
  platform: string;
  actualArrival?: string;
  actualDeparture?: string;
  delayMinutes?: number;
  status?: 'PASSED' | 'CURRENT' | 'UPCOMING';
}

export interface Train {
  number: string;
  name: string;
  type: 'VANDE BHARAT' | 'RAJDHANI' | 'SHATABDI' | 'DURONTO' | 'SUPERFAST' | 'MAIL/EXPRESS';
  origin: Station;
  destination: Station;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  runsOn: boolean[]; // [Mon, Tue, Wed, Thu, Fri, Sat, Sun]
  classes: ClassAvailability[];
  route: StationStop[];
  pantryAvailable: boolean;
}

export interface Passenger {
  id: string;
  name: string;
  age: number;
  gender: 'MALE' | 'FEMALE' | 'TRANSGENDER';
  berthPreference: 'NO_CHOICE' | 'LOWER' | 'MIDDLE' | 'UPPER' | 'SIDE_LOWER' | 'SIDE_UPPER' | 'WINDOW_SIDE';
  mealPreference: 'VEG' | 'NON_VEG' | 'NO_FOOD';
  seniorCitizenConcession?: boolean;
  allocatedCoach?: string;
  allocatedBerth?: number;
  allocatedBerthType?: string;
  bookingStatus?: string;
  currentStatus?: string;
}

export interface Ticket {
  pnr: string;
  trainNumber: string;
  trainName: string;
  journeyDate: string;
  bookingDate: string;
  fromStation: Station;
  toStation: Station;
  boardingStation: Station;
  selectedClass: TrainClass;
  quota: QuotaType;
  passengers: Passenger[];
  baseFare: number;
  reservationCharge: number;
  superfastCharge: number;
  tatkalCharge: number;
  cateringCharge: number;
  gst: number;
  insuranceAmount: number;
  totalFare: number;
  chartStatus: 'CHART PREPARED' | 'CHART NOT PREPARED';
  transactionId: string;
}

export interface FoodItem {
  id: string;
  name: string;
  restaurant: string;
  category: 'VEG' | 'NON_VEG' | 'SNACKS' | 'BEVERAGES';
  price: number;
  rating: number;
  deliveryStation: string;
  image: string;
  description: string;
}

export interface CartItem {
  food: FoodItem;
  quantity: number;
}
