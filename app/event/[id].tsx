import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, Image, TouchableOpacity, Platform } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { Calendar, Clock, MapPin, Users, ChevronDown, ChevronUp, MessageCircle } from 'lucide-react-native';
import { COLORS } from '@/constants/colors';
import { TYPOGRAPHY } from '@/constants/typography';
import { Button } from '@/components/Button';
import { MenuItem } from '@/components/MenuItem';
import { AttendeeInsight } from '@/components/AttendeeInsight';
import { Header } from '@/components/Header';
import { MOCK_EVENTS } from '@/mocks/events';
import { useUserStore } from '@/store/userStore';

export default function EventDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  const addSelectedEvent = useUserStore((state) => state.addSelectedEvent);
  const removeSelectedEvent = useUserStore((state) => state.removeSelectedEvent);
  const selectedEventIds = useUserStore((state) => state.selectedEventIds);
  
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [selectedMenuItems, setSelectedMenuItems] = useState<string[]>([]);
  
  const event = MOCK_EVENTS.find(e => e.id === id);
  
  const isEventSelected = selectedEventIds.includes(id || '');
  
  const toggleMenuItemSelection = (itemId: string) => {
    if (selectedMenuItems.includes(itemId)) {
      setSelectedMenuItems(selectedMenuItems.filter(id => id !== itemId));
    } else {
      setSelectedMenuItems([...selectedMenuItems, itemId]);
    }
  };
  
  const handleRSVP = () => {
    if (isEventSelected) {
      removeSelectedEvent(id || '');
    } else {
      addSelectedEvent(id || '');
      router.push(`/chat/${id}`);
    }
  };
  
  if (!event) {
    return (
      <View style={styles.container}>
        <Text>Event not found</Text>
      </View>
    );
  }
  
  // Generate AI insights about attendees
  const generateInsights = () => {
    const insights = [
      `${event.attendees.filter(a => a.neighborhood).length} from nearby neighborhoods`,
      `${event.attendees.filter(a => a.interests.includes('cooking')).length} love cooking`,
      `${event.attendees.filter(a => a.profession).length} professionals attending`,
      `${event.attendees.filter(a => user?.preferences.interests.some(i => a.interests.includes(i))).length} share your interests`
    ];
    return insights;
  };
  
  const insights = generateInsights();
  
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <Header title="" showBack transparent />
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.imageContainer}>
          <Image source={{ uri: event.image }} style={styles.image} />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.8)']}
            style={styles.gradient}
          />
          <View style={styles.imageOverlay}>
            <Text style={styles.title}>{event.title}</Text>
            <View style={styles.hostContainer}>
              <Image source={{ uri: event.host.avatar }} style={styles.hostAvatar} />
              <Text style={styles.hostName}>Hosted by {event.host.name}</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.detailsContainer}>
          <View style={styles.detailItem}>
            <Calendar size={20} color={COLORS.primary} />
            <Text style={styles.detailText}>{event.date}</Text>
          </View>
          
          <View style={styles.detailItem}>
            <Clock size={20} color={COLORS.primary} />
            <Text style={styles.detailText}>{event.time} • {event.duration}</Text>
          </View>
          
          <View style={styles.detailItem}>
            <MapPin size={20} color={COLORS.primary} />
            <Text style={styles.detailText}>{event.location.name}</Text>
          </View>
          
          <View style={styles.detailItem}>
            <Users size={20} color={COLORS.primary} />
            <Text style={styles.detailText}>
              {event.attendees.length}/{event.maxAttendees} attending
            </Text>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.description} numberOfLines={showFullDescription ? undefined : 3}>
            {event.description}
          </Text>
          <TouchableOpacity 
            style={styles.showMoreButton}
            onPress={() => setShowFullDescription(!showFullDescription)}
          >
            <Text style={styles.showMoreText}>
              {showFullDescription ? 'Show less' : 'Show more'}
            </Text>
            {showFullDescription ? (
              <ChevronUp size={16} color={COLORS.primary} />
            ) : (
              <ChevronDown size={16} color={COLORS.primary} />
            )}
          </TouchableOpacity>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Attendee Insights</Text>
          <View style={styles.insightsContainer}>
            {insights.map((insight, index) => (
              <AttendeeInsight key={index} insight={insight} />
            ))}
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Who's Coming</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.attendeesContainer}
          >
            {event.attendees.map((attendee, index) => (
              <View key={index} style={styles.attendeeItem}>
                <Image source={{ uri: attendee.avatar }} style={styles.attendeeAvatar} />
                <Text style={styles.attendeeName}>{attendee.name}</Text>
                {attendee.profession && (
                  <Text style={styles.attendeeProfession}>{attendee.profession}</Text>
                )}
              </View>
            ))}
          </ScrollView>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Menu</Text>
          <Text style={styles.menuSubtitle}>Select items you're interested in</Text>
          
          {event.menu.map((item) => (
            <MenuItem 
              key={item.id}
              item={item}
              isSelected={selectedMenuItems.includes(item.id)}
              onSelect={() => toggleMenuItemSelection(item.id)}
              compatibleWithDiet={!user?.preferences.dietaryRestrictions.includes('vegetarian') || 
                item.dietaryTags.includes('vegetarian') || 
                item.dietaryTags.includes('vegan')}
            />
          ))}
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Location</Text>
          <View style={styles.locationContainer}>
            <Image source={{ uri: event.location.image }} style={styles.locationImage} />
            <View style={styles.locationDetails}>
              <Text style={styles.locationName}>{event.location.name}</Text>
              <Text style={styles.locationAddress}>{event.location.address}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      
      <View style={styles.footer}>
        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>Price</Text>
          <Text style={styles.price}>${event.price}</Text>
        </View>
        
        <Button 
          title={isEventSelected ? "Cancel RSVP" : "RSVP Now"} 
          onPress={handleRSVP} 
          variant={isEventSelected ? "outline" : "primary"}
          style={styles.rsvpButton}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  imageContainer: {
    width: '100%',
    height: 300,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 150,
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
  },
  title: {
    ...TYPOGRAPHY.heading1,
    color: COLORS.white,
    marginBottom: 8,
  },
  hostContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  hostAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
  },
  hostName: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.white,
  },
  detailsContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    margin: 16,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  detailText: {
    ...TYPOGRAPHY.body,
    marginLeft: 12,
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    ...TYPOGRAPHY.heading2,
    fontSize: 20,
    marginBottom: 12,
  },
  description: {
    ...TYPOGRAPHY.body,
  },
  showMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  showMoreText: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.primary,
    marginRight: 4,
  },
  insightsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  attendeesContainer: {
    paddingRight: 16,
  },
  attendeeItem: {
    alignItems: 'center',
    marginRight: 16,
    width: 80,
  },
  attendeeAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginBottom: 8,
  },
  attendeeName: {
    ...TYPOGRAPHY.bodySmall,
    textAlign: 'center',
  },
  attendeeProfession: {
    ...TYPOGRAPHY.caption,
    textAlign: 'center',
  },
  menuSubtitle: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.mediumGray,
    marginBottom: 12,
  },
  locationContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  locationImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  locationDetails: {
    padding: 16,
  },
  locationName: {
    ...TYPOGRAPHY.heading3,
    marginBottom: 4,
  },
  locationAddress: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.mediumGray,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.05)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingBottom: Platform.OS === 'ios' ? 32 : 16,
  },
  priceContainer: {
    flex: 1,
  },
  priceLabel: {
    ...TYPOGRAPHY.caption,
    color: COLORS.mediumGray,
  },
  price: {
    ...TYPOGRAPHY.heading2,
  },
  rsvpButton: {
    flex: 1,
    marginLeft: 16,
  },
});