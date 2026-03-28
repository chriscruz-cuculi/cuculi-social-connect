import { User } from '@/types/user';

export const MOCK_USER: User = {
  id: 'u1',
  name: 'Jamie Smith',
  email: 'jamie@example.com',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
  neighborhood: 'Brooklyn Heights',
  bio: 'Food enthusiast and design lover. New to NYC and looking to meet like-minded people.',
  preferences: {
    dietaryRestrictions: ['vegetarian'],
    cuisinePreferences: ['Italian', 'Thai', 'Mediterranean'],
    socialEnergy: 7,
    interests: ['design', 'photography', 'hiking', 'cooking'],
    conversationTopics: ['travel', 'art', 'food', 'technology']
  },
  upcomingEvents: ['1'],
  pastEvents: [],
  connections: ['a1', 'a3', 'a6']
};