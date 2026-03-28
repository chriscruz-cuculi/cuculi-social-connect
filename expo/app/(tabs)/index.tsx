import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, Image, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { COLORS } from '@/constants/colors';
import { TYPOGRAPHY } from '@/constants/typography';
import { EventCard } from '@/components/EventCard';
import { Button } from '@/components/Button';
import { AIChatBubble } from '@/components/AIChatBubble';
import { MOCK_EVENTS } from '@/mocks/events';
import { useUserStore } from '@/store/userStore';

export default function HomeScreen() {
  const user = useUserStore((state) => state.user);
  const [loading, setLoading] = useState(true);
  const [aiGreeting, setAiGreeting] = useState('');
  
  useEffect(() => {
    // Simulate AI loading
    const timeout = setTimeout(() => {
      setAiGreeting(`Hi ${user?.name || 'there'}! I've found some great food events for you today.`);
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timeout);
  }, [user]);
  
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.welcomeContainer}>
            <Text style={styles.welcomeText}>Cuculi</Text>
            <Text style={styles.tagline}>Meet Your People Through Food</Text>
          </View>
          
          <View style={styles.avatarContainer}>
            <Image 
              source={{ uri: user?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80' }} 
              style={styles.avatar} 
            />
          </View>
        </View>
        
        <View style={styles.aiContainer}>
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="small" color={COLORS.primary} />
              <Text style={styles.loadingText}>Finding perfect matches...</Text>
            </View>
          ) : (
            <AIChatBubble message={aiGreeting} />
          )}
        </View>
        
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recommended for You</Text>
          <Button 
            title="See All" 
            variant="outline" 
            size="small" 
            onPress={() => {}} 
          />
        </View>
        
        {MOCK_EVENTS.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
        
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>This Weekend</Text>
          <Button 
            title="See All" 
            variant="outline" 
            size="small" 
            onPress={() => {}} 
          />
        </View>
        
        {MOCK_EVENTS.slice().reverse().map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </ScrollView>
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
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  welcomeContainer: {
    flex: 1,
  },
  welcomeText: {
    ...TYPOGRAPHY.heading1,
    color: COLORS.primary,
    marginBottom: 4,
  },
  tagline: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.mediumGray,
  },
  avatarContainer: {
    marginLeft: 16,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  aiContainer: {
    marginBottom: 24,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.secondary,
    borderRadius: 20,
    borderTopLeftRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignSelf: 'flex-start',
  },
  loadingText: {
    ...TYPOGRAPHY.body,
    color: COLORS.white,
    marginLeft: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    ...TYPOGRAPHY.heading2,
    fontSize: 20,
  },
});