import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Search, Filter, X } from 'lucide-react-native';
import { COLORS } from '@/constants/colors';
import { TYPOGRAPHY } from '@/constants/typography';
import { EventCard } from '@/components/EventCard';
import { MOCK_EVENTS } from '@/mocks/events';

const CUISINE_TAGS = [
  'Italian', 'Japanese', 'Mexican', 'Thai', 'Mediterranean', 
  'Indian', 'French', 'Chinese', 'American', 'Vegan'
];

const EVENT_TYPES = [
  'Dinner', 'Cooking Class', 'Wine Tasting', 'Food Tour', 
  'Brunch', 'Potluck', 'Tasting Menu', 'Pop-up'
];

export default function ExploreScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
  const [selectedEventTypes, setSelectedEventTypes] = useState<string[]>([]);
  
  const toggleCuisine = (cuisine: string) => {
    if (selectedCuisines.includes(cuisine)) {
      setSelectedCuisines(selectedCuisines.filter(c => c !== cuisine));
    } else {
      setSelectedCuisines([...selectedCuisines, cuisine]);
    }
  };
  
  const toggleEventType = (type: string) => {
    if (selectedEventTypes.includes(type)) {
      setSelectedEventTypes(selectedEventTypes.filter(t => t !== type));
    } else {
      setSelectedEventTypes([...selectedEventTypes, type]);
    }
  };
  
  const clearFilters = () => {
    setSelectedCuisines([]);
    setSelectedEventTypes([]);
  };
  
  const hasFilters = selectedCuisines.length > 0 || selectedEventTypes.length > 0;
  
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Explore</Text>
      </View>
      
      <View style={styles.searchContainer}>
        <Search size={20} color={COLORS.mediumGray} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search events, cuisines, locations..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor={COLORS.mediumGray}
        />
        {searchQuery ? (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <X size={20} color={COLORS.mediumGray} />
          </TouchableOpacity>
        ) : (
          <Filter size={20} color={COLORS.mediumGray} />
        )}
      </View>
      
      <View style={styles.filtersContainer}>
        <Text style={styles.filterTitle}>Cuisines</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tagsContainer}
        >
          {CUISINE_TAGS.map((cuisine) => (
            <TouchableOpacity
              key={cuisine}
              style={[
                styles.tagButton,
                selectedCuisines.includes(cuisine) && styles.selectedTagButton
              ]}
              onPress={() => toggleCuisine(cuisine)}
            >
              <Text 
                style={[
                  styles.tagText,
                  selectedCuisines.includes(cuisine) && styles.selectedTagText
                ]}
              >
                {cuisine}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        
        <Text style={styles.filterTitle}>Event Types</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tagsContainer}
        >
          {EVENT_TYPES.map((type) => (
            <TouchableOpacity
              key={type}
              style={[
                styles.tagButton,
                selectedEventTypes.includes(type) && styles.selectedTagButton
              ]}
              onPress={() => toggleEventType(type)}
            >
              <Text 
                style={[
                  styles.tagText,
                  selectedEventTypes.includes(type) && styles.selectedTagText
                ]}
              >
                {type}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        
        {hasFilters && (
          <TouchableOpacity 
            style={styles.clearFiltersButton}
            onPress={clearFilters}
          >
            <Text style={styles.clearFiltersText}>Clear All Filters</Text>
          </TouchableOpacity>
        )}
      </View>
      
      <ScrollView 
        style={styles.resultsContainer}
        contentContainerStyle={styles.resultsContent}
        showsVerticalScrollIndicator={false}
      >
        {MOCK_EVENTS.map((event) => (
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
  header: {
    paddingTop: 60,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  headerTitle: {
    ...TYPOGRAPHY.heading1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 16,
    marginBottom: 16,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: COLORS.text,
  },
  filtersContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  filterTitle: {
    ...TYPOGRAPHY.heading3,
    fontSize: 16,
    marginBottom: 8,
  },
  tagsContainer: {
    paddingBottom: 16,
  },
  tagButton: {
    backgroundColor: COLORS.lightGray,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  selectedTagButton: {
    backgroundColor: COLORS.primary,
  },
  tagText: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.text,
  },
  selectedTagText: {
    color: COLORS.white,
  },
  clearFiltersButton: {
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  clearFiltersText: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.primary,
    textDecorationLine: 'underline',
  },
  resultsContainer: {
    flex: 1,
  },
  resultsContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
});