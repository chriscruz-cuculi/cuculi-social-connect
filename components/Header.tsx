import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, StatusBar, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Bell } from 'lucide-react-native';
import { COLORS } from '@/constants/colors';
import { TYPOGRAPHY } from '@/constants/typography';

interface HeaderProps {
  title: string;
  showBack?: boolean;
  showNotification?: boolean;
  transparent?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ 
  title, 
  showBack = false, 
  showNotification = false,
  transparent = false
}) => {
  const router = useRouter();
  
  const handleBack = () => {
    router.back();
  };
  
  const handleNotification = () => {
    // Handle notification
  };
  
  return (
    <View style={[
      styles.container, 
      transparent && styles.transparentContainer
    ]}>
      <StatusBar 
        barStyle={transparent ? "light-content" : "dark-content"} 
        backgroundColor={transparent ? "transparent" : COLORS.background}
        translucent={transparent}
      />
      
      <View style={styles.leftContainer}>
        {showBack && (
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={handleBack}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <ArrowLeft 
              size={24} 
              color={transparent ? COLORS.white : COLORS.text} 
            />
          </TouchableOpacity>
        )}
      </View>
      
      <Text style={[
        styles.title,
        transparent && styles.transparentTitle
      ]}>
        {title}
      </Text>
      
      <View style={styles.rightContainer}>
        {showNotification && (
          <TouchableOpacity 
            style={styles.notificationButton} 
            onPress={handleNotification}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Bell 
              size={24} 
              color={transparent ? COLORS.white : COLORS.text} 
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 48 : StatusBar.currentHeight || 0 + 16,
    paddingBottom: 16,
    backgroundColor: COLORS.background,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  transparentContainer: {
    backgroundColor: 'transparent',
    borderBottomWidth: 0,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  leftContainer: {
    width: 40,
  },
  rightContainer: {
    width: 40,
    alignItems: 'flex-end',
  },
  backButton: {
    padding: 4,
  },
  notificationButton: {
    padding: 4,
  },
  title: {
    ...TYPOGRAPHY.heading2,
    textAlign: 'center',
  },
  transparentTitle: {
    color: COLORS.white,
  },
});