import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '@/constants/colors';
import { TYPOGRAPHY } from '@/constants/typography';

interface UserChatBubbleProps {
  message: string;
}

export const UserChatBubble: React.FC<UserChatBubbleProps> = ({ message }) => {
  return (
    <View style={styles.container}>
      <View style={styles.bubble}>
        <Text style={styles.message}>{message}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    alignItems: 'flex-end',
  },
  bubble: {
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    borderTopRightRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 12,
    maxWidth: '80%',
  },
  message: {
    ...TYPOGRAPHY.body,
    color: COLORS.white,
  },
});