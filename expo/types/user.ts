export interface UserPreference {
  dietaryRestrictions: string[];
  cuisinePreferences: string[];
  socialEnergy: number; // 1-10 scale
  interests: string[];
  conversationTopics: string[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  neighborhood: string;
  bio: string;
  preferences: UserPreference;
  upcomingEvents: string[];
  pastEvents: string[];
  connections: string[];
}