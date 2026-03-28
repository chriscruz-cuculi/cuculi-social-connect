import React from 'react';
import { StyleSheet, View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Settings, Edit, LogOut, Heart, Star, MessageCircle } from 'lucide-react-native';
import { COLORS } from '@/constants/colors';
import { TYPOGRAPHY } from '@/constants/typography';
import { Button } from '@/components/Button';
import { useUserStore } from '@/store/userStore';

export default function ProfileScreen() {
  const user = useUserStore((state) => state.user);
  
  if (!user) {
    return (
      <View style={styles.container}>
        <StatusBar style="dark" />
        <Text>Loading profile...</Text>
      </View>
    );
  }
  
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <Settings size={24} color={COLORS.text} />
        </TouchableOpacity>
      </View>
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <Image source={{ uri: user.avatar }} style={styles.avatar} />
            <TouchableOpacity style={styles.editAvatarButton}>
              <Edit size={16} color={COLORS.white} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.profileInfo}>
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.location}>{user.neighborhood}</Text>
            
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{user.upcomingEvents.length}</Text>
                <Text style={styles.statLabel}>Events</Text>
              </View>
              
              <View style={styles.statDivider} />
              
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{user.connections.length}</Text>
                <Text style={styles.statLabel}>Connections</Text>
              </View>
              
              <View style={styles.statDivider} />
              
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{user.preferences.cuisinePreferences.length}</Text>
                <Text style={styles.statLabel}>Cuisines</Text>
              </View>
            </View>
          </View>
        </View>
        
        <View style={styles.bioContainer}>
          <Text style={styles.bioText}>{user.bio}</Text>
          <TouchableOpacity style={styles.editBioButton}>
            <Edit size={16} color={COLORS.primary} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Interests</Text>
          <View style={styles.interestsContainer}>
            {user.preferences.interests.map((interest, index) => (
              <View key={index} style={styles.interestTag}>
                <Text style={styles.interestText}>{interest}</Text>
              </View>
            ))}
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Dietary Preferences</Text>
          <View style={styles.interestsContainer}>
            {user.preferences.dietaryRestrictions.map((diet, index) => (
              <View key={index} style={styles.dietTag}>
                <Text style={styles.dietText}>{diet}</Text>
              </View>
            ))}
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Favorite Cuisines</Text>
          <View style={styles.interestsContainer}>
            {user.preferences.cuisinePreferences.map((cuisine, index) => (
              <View key={index} style={styles.cuisineTag}>
                <Text style={styles.cuisineText}>{cuisine}</Text>
              </View>
            ))}
          </View>
        </View>
        
        <View style={styles.actionsContainer}>
          <Button 
            title="Edit Profile" 
            onPress={() => {}} 
            variant="primary"
            fullWidth
            style={styles.actionButton}
          />
          
          <Button 
            title="Log Out" 
            onPress={() => {}} 
            variant="outline"
            fullWidth
            style={styles.actionButton}
          />
        </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  headerTitle: {
    ...TYPOGRAPHY.heading1,
  },
  settingsButton: {
    padding: 4,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  profileHeader: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: COLORS.primary,
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  profileInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    ...TYPOGRAPHY.heading2,
    marginBottom: 4,
  },
  location: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.mediumGray,
    marginBottom: 12,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    ...TYPOGRAPHY.heading3,
    color: COLORS.primary,
  },
  statLabel: {
    ...TYPOGRAPHY.caption,
  },
  statDivider: {
    width: 1,
    height: 24,
    backgroundColor: COLORS.lightGray,
    marginHorizontal: 16,
  },
  bioContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    position: 'relative',
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  bioText: {
    ...TYPOGRAPHY.body,
    paddingRight: 24,
  },
  editBioButton: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    ...TYPOGRAPHY.heading3,
    marginBottom: 12,
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  interestTag: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  interestText: {
    ...TYPOGRAPHY.tag,
    color: COLORS.white,
  },
  dietTag: {
    backgroundColor: COLORS.secondary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  dietText: {
    ...TYPOGRAPHY.tag,
    color: COLORS.white,
  },
  cuisineTag: {
    backgroundColor: '#FF9F43', // Orange
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  cuisineText: {
    ...TYPOGRAPHY.tag,
    color: COLORS.white,
  },
  actionsContainer: {
    marginTop: 8,
  },
  actionButton: {
    marginBottom: 12,
  },
});