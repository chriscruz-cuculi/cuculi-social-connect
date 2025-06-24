import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Calendar, Clock } from 'lucide-react-native';
import { COLORS } from '@/constants/colors';
import { TYPOGRAPHY } from '@/constants/typography';
import { MOCK_EVENTS } from '@/mocks/events';
import { useUserStore } from '@/store/userStore';

type EventTab = 'upcoming' | 'past';

export default function EventsScreen() {
  const [activeTab, setActiveTab] = useState<EventTab>('upcoming');
  const user = useUserStore((state) => state.user);
  
  const upcomingEvents = MOCK_EVENTS.filter(event => 
    user?.upcomingEvents.includes(event.id)
  );
  
  const pastEvents = MOCK_EVENTS.filter(event => 
    user?.pastEvents.includes(event.id)
  );
  
  const events = activeTab === 'upcoming' ? upcomingEvents : pastEvents;
  
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Events</Text>
      </View>
      
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'upcoming' && styles.activeTab
          ]}
          onPress={() => setActiveTab('upcoming')}
        >
          <Text 
            style={[
              styles.tabText,
              activeTab === 'upcoming' && styles.activeTabText
            ]}
          >
            Upcoming
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'past' && styles.activeTab
          ]}
          onPress={() => setActiveTab('past')}
        >
          <Text 
            style={[
              styles.tabText,
              activeTab === 'past' && styles.activeTabText
            ]}
          >
            Past
          </Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView 
        style={styles.eventsContainer}
        contentContainerStyle={styles.eventsContent}
        showsVerticalScrollIndicator={false}
      >
        {events.length > 0 ? (
          events.map((event) => (
            <TouchableOpacity 
              key={event.id}
              style={styles.eventCard}
              onPress={() => {}}
            >
              <Image 
                source={{ uri: event.image }} 
                style={styles.eventImage} 
              />
              
              <View style={styles.eventContent}>
                <Text style={styles.eventTitle} numberOfLines={1}>
                  {event.title}
                </Text>
                
                <View style={styles.eventDetails}>
                  <View style={styles.eventDetail}>
                    <Calendar size={16} color={COLORS.primary} />
                    <Text style={styles.eventDetailText}>
                      {event.date}
                    </Text>
                  </View>
                  
                  <View style={styles.eventDetail}>
                    <Clock size={16} color={COLORS.primary} />
                    <Text style={styles.eventDetailText}>
                      {event.time}
                    </Text>
                  </View>
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
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>
              No {activeTab} events
            </Text>
            <Text style={styles.emptyText}>
              {activeTab === 'upcoming' 
                ? "You don't have any upcoming events. Explore and join some food events!"
                : "You haven't attended any events yet. Join some events to see them here later!"}
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  headerTitle: {
    ...TYPOGRAPHY.heading1,
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  tab: {
    paddingVertical: 12,
    marginRight: 24,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: COLORS.primary,
  },
  tabText: {
    ...TYPOGRAPHY.heading3,
    fontSize: 16,
    color: COLORS.mediumGray,
  },
  activeTabText: {
    color: COLORS.primary,
  },
  eventsContainer: {
    flex: 1,
  },
  eventsContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  eventCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  eventImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },
  eventContent: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  eventTitle: {
    ...TYPOGRAPHY.heading3,
    fontSize: 16,
    marginBottom: 8,
  },
  eventDetails: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  eventDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  eventDetailText: {
    ...TYPOGRAPHY.bodySmall,
    marginLeft: 4,
  },
  attendeesPreview: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  attendeeAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.white,
  },
  moreAttendeesContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: -10,
    borderWidth: 1,
    borderColor: COLORS.white,
  },
  moreAttendeesText: {
    ...TYPOGRAPHY.caption,
    fontSize: 8,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
    paddingHorizontal: 32,
  },
  emptyTitle: {
    ...TYPOGRAPHY.heading2,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyText: {
    ...TYPOGRAPHY.body,
    color: COLORS.mediumGray,
    textAlign: 'center',
  },
});