import { Event } from '@/types/event';

export const MOCK_EVENTS: Event[] = [
  {
    id: '1',
    title: 'Wine & Design Night',
    description: 'Join fellow creatives for a night of wine tasting and artistic conversation. Perfect for design enthusiasts and wine lovers alike.',
    image: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    date: '2025-06-20',
    time: '19:00',
    duration: '3 hours',
    vibeMatch: 85,
    location: {
      name: 'Artisan Studio',
      address: '123 Creative Ave, Brooklyn, NY',
      latitude: 40.678177,
      longitude: -73.944160,
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80'
    },
    attendees: [
      {
        id: 'a1',
        name: 'Maya',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
        interests: ['design', 'photography', 'hiking'],
        neighborhood: 'Williamsburg',
        profession: 'UX Designer'
      },
      {
        id: 'a2',
        name: 'Alex',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
        interests: ['art', 'wine', 'travel'],
        profession: 'Graphic Designer'
      },
      {
        id: 'a3',
        name: 'Sarah',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
        interests: ['design', 'cooking', 'hiking'],
        neighborhood: 'Park Slope'
      },
      {
        id: 'a4',
        name: 'James',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
        interests: ['photography', 'wine', 'music'],
        profession: 'Photographer'
      },
      {
        id: 'a5',
        name: 'Emma',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
        interests: ['art', 'travel', 'food'],
        neighborhood: 'Chelsea'
      },
      {
        id: 'a6',
        name: 'David',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
        interests: ['design', 'hiking', 'coffee'],
        profession: 'Product Designer'
      }
    ],
    maxAttendees: 8,
    menu: [
      {
        id: 'm1',
        name: 'Truffle Pasta',
        description: 'Handmade pasta with black truffle and parmesan',
        price: 24,
        image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
        dietaryTags: ['vegetarian'],
        popular: true
      },
      {
        id: 'm2',
        name: 'Charcuterie Board',
        description: 'Selection of fine cheeses and cured meats',
        price: 32,
        image: 'https://images.unsplash.com/photo-1432835305417-6919779246b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
        dietaryTags: ['contains dairy', 'contains gluten'],
        popular: true
      },
      {
        id: 'm3',
        name: 'Wine Flight',
        description: 'Selection of three premium wines',
        price: 18,
        image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
        dietaryTags: ['alcohol'],
        popular: false
      }
    ],
    tags: ['creative', 'wine', 'design', 'networking'],
    price: 45,
    host: {
      id: 'h1',
      name: 'Artisan Studio',
      avatar: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
      interests: ['art', 'design', 'community']
    }
  },
  {
    id: '2',
    title: 'Farm-to-Table Dinner',
    description: 'Experience the freshest seasonal ingredients in this intimate farm-to-table dinner. Meet local food enthusiasts and learn about sustainable farming.',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    date: '2025-06-22',
    time: '18:30',
    duration: '2.5 hours',
    vibeMatch: 92,
    location: {
      name: 'Green Harvest Restaurant',
      address: '456 Organic Lane, Manhattan, NY',
      latitude: 40.741895,
      longitude: -73.989308,
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80'
    },
    attendees: [
      {
        id: 'a7',
        name: 'Olivia',
        avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
        interests: ['cooking', 'sustainability', 'gardening'],
        neighborhood: 'West Village',
        profession: 'Chef'
      },
      {
        id: 'a8',
        name: 'Noah',
        avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
        interests: ['food', 'wine', 'travel'],
        profession: 'Food Blogger'
      },
      {
        id: 'a9',
        name: 'Sophia',
        avatar: 'https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
        interests: ['organic food', 'hiking', 'photography'],
        neighborhood: 'SoHo'
      }
    ],
    maxAttendees: 10,
    menu: [
      {
        id: 'm4',
        name: 'Seasonal Vegetable Platter',
        description: 'Locally sourced vegetables with house-made dips',
        price: 18,
        image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
        dietaryTags: ['vegan', 'gluten-free'],
        popular: true
      },
      {
        id: 'm5',
        name: 'Grass-Fed Beef',
        description: 'Locally raised beef with seasonal vegetables',
        price: 34,
        image: 'https://images.unsplash.com/photo-1546964124-0cce460f38ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
        dietaryTags: ['paleo', 'keto'],
        popular: true
      },
      {
        id: 'm6',
        name: 'Organic Wine Selection',
        description: 'Biodynamic wines from local vineyards',
        price: 22,
        image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
        dietaryTags: ['alcohol', 'organic'],
        popular: false
      }
    ],
    tags: ['organic', 'sustainable', 'farm-to-table', 'foodie'],
    price: 65,
    host: {
      id: 'h2',
      name: 'Green Harvest',
      avatar: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
      interests: ['sustainability', 'organic farming', 'community']
    }
  },
  {
    id: '3',
    title: 'International Cooking Class',
    description: 'Learn to cook authentic international cuisine while making new friends. This hands-on class is perfect for food lovers of all skill levels.',
    image: 'https://images.unsplash.com/photo-1556910636-711c5a1bb0df?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    date: '2025-06-21',
    time: '17:00',
    duration: '3 hours',
    vibeMatch: 78,
    location: {
      name: 'Global Kitchen',
      address: '789 Flavor Street, Queens, NY',
      latitude: 40.756046,
      longitude: -73.954109,
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80'
    },
    attendees: [
      {
        id: 'a10',
        name: 'Ethan',
        avatar: 'https://images.unsplash.com/photo-1504257432389-52343af06ae3?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
        interests: ['cooking', 'travel', 'languages'],
        neighborhood: 'Astoria',
        profession: 'Teacher'
      },
      {
        id: 'a11',
        name: 'Isabella',
        avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
        interests: ['food', 'culture', 'art'],
        profession: 'Travel Writer'
      },
      {
        id: 'a12',
        name: 'William',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
        interests: ['cooking', 'music', 'hiking'],
        neighborhood: 'Long Island City'
      },
      {
        id: 'a13',
        name: 'Mia',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
        interests: ['baking', 'photography', 'travel'],
        profession: 'Pastry Chef'
      }
    ],
    maxAttendees: 12,
    menu: [
      {
        id: 'm7',
        name: 'Thai Green Curry',
        description: 'Authentic Thai curry with fresh herbs and vegetables',
        price: 0,
        image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
        dietaryTags: ['gluten-free', 'can be made vegan'],
        popular: true
      },
      {
        id: 'm8',
        name: 'Handmade Pasta',
        description: 'Learn to make pasta from scratch with seasonal sauces',
        price: 0,
        image: 'https://images.unsplash.com/photo-1473093226795-af9932fe5856?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
        dietaryTags: ['contains gluten', 'vegetarian'],
        popular: true
      },
      {
        id: 'm9',
        name: 'Moroccan Tagine',
        description: 'Slow-cooked stew with exotic spices and flavors',
        price: 0,
        image: 'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
        dietaryTags: ['gluten-free', 'can be made vegetarian'],
        popular: false
      }
    ],
    tags: ['cooking', 'international', 'hands-on', 'learning'],
    price: 75,
    host: {
      id: 'h3',
      name: 'Chef Marco',
      avatar: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
      interests: ['cooking', 'teaching', 'travel']
    }
  }
];