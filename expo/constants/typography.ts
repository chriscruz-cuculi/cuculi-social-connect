import { StyleSheet } from 'react-native';
import { COLORS } from './colors';

export const TYPOGRAPHY = StyleSheet.create({
  heading1: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.text,
    letterSpacing: 0.2,
  },
  heading2: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.text,
    letterSpacing: 0.2,
  },
  heading3: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.text,
  },
  body: {
    fontSize: 16,
    color: COLORS.text,
    lineHeight: 24,
  },
  bodySmall: {
    fontSize: 14,
    color: COLORS.text,
    lineHeight: 20,
  },
  caption: {
    fontSize: 12,
    color: COLORS.mediumGray,
    lineHeight: 16,
  },
  button: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.white,
  },
  tag: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.white,
  },
});