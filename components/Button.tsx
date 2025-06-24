import React from 'react';
import { StyleSheet, Text, TouchableOpacity, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';
import { COLORS } from '@/constants/colors';
import { TYPOGRAPHY } from '@/constants/typography';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  style,
  textStyle,
  fullWidth = false,
}) => {
  const getButtonStyle = () => {
    let buttonStyle: ViewStyle = {};
    
    // Variant styles
    switch (variant) {
      case 'primary':
        buttonStyle.backgroundColor = COLORS.primary;
        break;
      case 'secondary':
        buttonStyle.backgroundColor = COLORS.secondary;
        break;
      case 'outline':
        buttonStyle.backgroundColor = 'transparent';
        buttonStyle.borderWidth = 1;
        buttonStyle.borderColor = COLORS.primary;
        break;
    }
    
    // Size styles
    switch (size) {
      case 'small':
        buttonStyle.paddingVertical = 8;
        buttonStyle.paddingHorizontal = 16;
        break;
      case 'medium':
        buttonStyle.paddingVertical = 12;
        buttonStyle.paddingHorizontal = 24;
        break;
      case 'large':
        buttonStyle.paddingVertical = 16;
        buttonStyle.paddingHorizontal = 32;
        break;
    }
    
    // Disabled state
    if (disabled) {
      buttonStyle.opacity = 0.5;
    }
    
    // Full width
    if (fullWidth) {
      buttonStyle.width = '100%';
    }
    
    return buttonStyle;
  };
  
  const getTextStyle = () => {
    let textStyleObj: TextStyle = { ...TYPOGRAPHY.button };
    
    if (variant === 'outline') {
      textStyleObj.color = COLORS.primary;
    }
    
    switch (size) {
      case 'small':
        textStyleObj.fontSize = 14;
        break;
      case 'large':
        textStyleObj.fontSize = 18;
        break;
    }
    
    return textStyleObj;
  };
  
  return (
    <TouchableOpacity
      style={[styles.button, getButtonStyle(), style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator 
          color={variant === 'outline' ? COLORS.primary : COLORS.white} 
          size="small" 
        />
      ) : (
        <Text style={[getTextStyle(), textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
});