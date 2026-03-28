import React from 'react';
import { StyleSheet, View, Text, Image, Pressable } from 'react-native';
import { Check } from 'lucide-react-native';
import { COLORS } from '@/constants/colors';
import { TYPOGRAPHY } from '@/constants/typography';
import { MenuItem as MenuItemType } from '@/types/event';

interface MenuItemProps {
  item: MenuItemType;
  isSelected?: boolean;
  onSelect?: () => void;
  compatibleWithDiet?: boolean;
}

export const MenuItem: React.FC<MenuItemProps> = ({ 
  item, 
  isSelected = false,
  onSelect,
  compatibleWithDiet = true
}) => {
  return (
    <Pressable 
      style={[
        styles.container, 
        isSelected && styles.selectedContainer
      ]}
      onPress={onSelect}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      
      <View style={styles.contentContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.name}>{item.name}</Text>
          {item.popular && (
            <View style={styles.popularBadge}>
              <Text style={styles.popularText}>Popular</Text>
            </View>
          )}
        </View>
        
        <Text style={styles.description} numberOfLines={2}>
          {item.description}
        </Text>
        
        <View style={styles.footer}>
          <Text style={styles.price}>${item.price.toFixed(2)}</Text>
          
          <View style={styles.tagsContainer}>
            {item.dietaryTags.map((tag, index) => (
              <View 
                key={index} 
                style={[
                  styles.dietaryTag,
                  !compatibleWithDiet && styles.incompatibleTag
                ]}
              >
                <Text 
                  style={[
                    styles.dietaryTagText,
                    !compatibleWithDiet && styles.incompatibleTagText
                  ]}
                >
                  {tag}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>
      
      {isSelected && (
        <View style={styles.checkmark}>
          <Check size={16} color={COLORS.white} />
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  selectedContainer: {
    borderColor: COLORS.primary,
    borderWidth: 2,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    ...TYPOGRAPHY.heading3,
    fontSize: 16,
    flex: 1,
  },
  popularBadge: {
    backgroundColor: COLORS.secondary,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginLeft: 8,
  },
  popularText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.white,
    fontSize: 10,
  },
  description: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.mediumGray,
    marginBottom: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    ...TYPOGRAPHY.heading3,
    fontSize: 16,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
  },
  dietaryTag: {
    backgroundColor: COLORS.lightGray,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginLeft: 4,
  },
  dietaryTagText: {
    ...TYPOGRAPHY.caption,
    fontSize: 10,
  },
  incompatibleTag: {
    backgroundColor: 'rgba(244, 67, 54, 0.1)',
  },
  incompatibleTagText: {
    color: COLORS.error,
  },
  checkmark: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
});