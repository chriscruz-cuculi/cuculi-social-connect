import React from 'react';
import { StyleSheet, View, Text, Pressable, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Clock, Users, MapPin } from 'lucide-react-native';

import { Event } from '@/types/event';
import { COLORS } from '@/constants/colors';
import { TYPOGRAPHY } from '@/constants/typography';

interface EventCardProps {
  event: Event;
}

export const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const router = useRouter();

  const handlePress = () => {
    router.push(`/event/${event.id}`);
  };

  return (
    <Pressable 
      style={styles.container} 
      onPress={handlePress}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: event.image }} style={styles.image} />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.7)']}
          style={styles.gradient}
        />
        <View style={styles.vibeMatchContainer}>
          <Text style={styles.vibeMatchText}>{event.vibeMatch}%</Text>
          <Text style={styles.vibeMatchLabel}>vibe match</Text>
        </View>
      </View>
      
      <View style={styles.contentContainer}>
        <Text style={styles.title} numberOfLines={1}>{event.title}</Text>
        
        <View style={styles.detailsContainer}>
          <View style={styles.detailItem}>
            <Clock size={16} color={COLORS.primary} />
            <Text style={styles.detailText}>{event.time}</Text>
          </View>
          
          <View style={styles.detailItem}>
            <Users size={16} color={COLORS.primary} />
            <Text style={styles.detailText}>
              {event.attendees.length}/{event.maxAttendees}
            </Text>
          </View>
          
          <View style={styles.detailItem}>
            <MapPin size={16} color={COLORS.primary} />
            <Text style={styles.detailText} numberOfLines={1}>
              {event.location.name}
            </Text>
          </View>
        </View>
        
        <View style={styles.tagsContainer}>
          {event.tags.slice(0, 3).map((tag, index) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
        
        <View style={styles.attendeesPreview}>
          {event.attendees.slice(0, 3).map((attendee, index) => (
            <Image 
              key={index}
              source={{ uri: attendee.avatar }} 
              style={[
                styles.attendeeAvatar,
                { marginLeft: index > 0 ? -10 : 0 }
              ]} 
            />
          ))}
          {event.attendees.length > 3 && (
            <View style={styles.moreAttendeesContainer}>
              <Text style={styles.moreAttendeesText}>+{event.attendees.length - 3}</Text>
            </View>
          )}
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: COLORS.white,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  imageContainer: {
    width: '100%',
    height: 180,
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
    height: 80,
  },
  vibeMatchContainer: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: COLORS.secondary,
    borderRadius: 12,
    padding: 8,
    alignItems: 'center',
  },
  vibeMatchText: {
    ...TYPOGRAPHY.heading3,
    color: COLORS.white,
    fontSize: 18,
  },
  vibeMatchLabel: {
    ...TYPOGRAPHY.caption,
    color: COLORS.white,
    fontSize: 10,
  },
  contentContainer: {
    padding: 16,
  },
  title: {
    ...TYPOGRAPHY.heading3,
    marginBottom: 12,
  },
  detailsContainer: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  detailText: {
    ...TYPOGRAPHY.bodySmall,
    marginLeft: 4,
    color: COLORS.text,
  },
  tagsContainer: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  tag: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
  },
  tagText: {
    ...TYPOGRAPHY.tag,
    color: COLORS.white,
  },
  attendeesPreview: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  attendeeAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  moreAttendeesContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: -10,
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  moreAttendeesText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.text,
    fontSize: 10,
  },
});