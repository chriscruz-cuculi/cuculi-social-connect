import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { COLORS } from '@/constants/colors';
import { TYPOGRAPHY } from '@/constants/typography';

interface AttendeeInsightProps {
  insight: string;
}

export const AttendeeInsight: React.FC<AttendeeInsightProps> = ({ insight }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{insight}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.secondary,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  text: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.white,
  },
});