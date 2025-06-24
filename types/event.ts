export interface Attendee {
  id: string;
  name: string;
  avatar: string;
  interests: string[];
  neighborhood?: string;
  profession?: string;
}

export interface EventLocation {
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  image: string;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  dietaryTags: string[];
  popular: boolean;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  image: string;
  date: string;
  time: string;
  duration: string;
  vibeMatch: number;
  location: EventLocation;
  attendees: Attendee[];
  maxAttendees: number;
  menu: MenuItem[];
  tags: string[];
  price: number;
  host: Attendee;
}