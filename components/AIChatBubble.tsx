import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { COLORS } from '@/constants/colors';
import { TYPOGRAPHY } from '@/constants/typography';

interface AIChatBubbleProps {
  message: string;
  isTyping?: boolean;
  delay?: number;
}

export const AIChatBubble: React.FC<AIChatBubbleProps> = ({ 
  message, 
  isTyping = false,
  delay = 500
}) => {
  const [displayedMessage, setDisplayedMessage] = useState('');
  const [isAnimating, setIsAnimating] = useState(true);
  
  useEffect(() => {
    if (isTyping) {
      setDisplayedMessage('');
      setIsAnimating(true);
      return;
    }
    
    let timeout: NodeJS.Timeout;
    
    // Simulate typing effect
    if (message) {
      setIsAnimating(true);
      timeout = setTimeout(() => {
        let i = 0;
        const typingInterval = setInterval(() => {
          if (i <= message.length) {
            setDisplayedMessage(message.substring(0, i));
            i++;
          } else {
            clearInterval(typingInterval);
            setIsAnimating(false);
          }
        }, 15); // Speed of typing
        
        return () => clearInterval(typingInterval);
      }, delay);
    }
    
    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [message, isTyping, delay]);
  
  return (
    <View style={styles.container}>
      <View style={styles.bubble}>
        {isTyping || isAnimating ? (
          <View style={styles.typingContainer}>
            <Text style={styles.message}>{displayedMessage}</Text>
            {isTyping && (
              <ActivityIndicator size="small" color={COLORS.primary} style={styles.loader} />
            )}
          </View>
        ) : (
          <Text style={styles.message}>{message}</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    alignItems: 'flex-start',
  },
  bubble: {
    backgroundColor: COLORS.secondary,
    borderRadius: 20,
    borderTopLeftRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 12,
    maxWidth: '80%',
  },
  message: {
    ...TYPOGRAPHY.body,
    color: COLORS.white,
  },
  typingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loader: {
    marginLeft: 8,
  },
});