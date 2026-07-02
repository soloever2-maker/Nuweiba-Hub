// Nuweiba Hub Design System
export const Colors = {
  // Brand palette inspired by Nuweiba's nature
  sand: '#E8D5B7',
  sandLight: '#F5EDDF',
  sandDark: '#D4BC96',
  ocean: '#1B6CA8',
  oceanLight: '#2A85C9',
  oceanDark: '#134F7A',
  sunset: '#D85A30',
  sunsetLight: '#E8724A',
  palm: '#3B6D11',
  palmLight: '#4D8F17',
  night: '#0B3D5E',
  nightLight: '#1A5580',

  // UI semantic tokens
  primary: '#1B6CA8',
  primaryLight: '#2A85C9',
  accent: '#D85A30',
  success: '#3B6D11',
  warning: '#F59E0B',
  error: '#DC2626',

  background: '#F5EDDF',
  surface: '#FFFFFF',
  surfaceTinted: '#FDF8F0',
  card: '#FFFFFF',

  textPrimary: '#0B3D5E',
  textSecondary: '#5A7A8A',
  textMuted: '#8FA5B0',
  textOnDark: '#FFFFFF',
  textOnPrimary: '#FFFFFF',

  border: '#E0CCAA',
  borderLight: '#EDE0CC',
  divider: '#F0E4CE',

  tabBar: '#0B3D5E',
  tabBarActive: '#E8D5B7',
  tabBarInactive: '#6A95AA',

  // Tag colors
  tagBudget: '#3B6D11',
  tagChill: '#1B6CA8',
  tagPremium: '#8B4513',
  tagParty: '#D85A30',
  tagFamily: '#6B4EAE',
  tagBeachfront: '#0E8A8A',

  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
};

export const BorderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
};

export const FontSize = {
  xs: 11,
  sm: 13,
  md: 15,
  base: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 30,
  display: 36,
};

export const FontWeight = {
  regular: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
  extrabold: '800' as const,
};

export const Shadows = {
  sm: {
    shadowColor: '#0B3D5E',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowColor: '#0B3D5E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowColor: '#0B3D5E',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.16,
    shadowRadius: 16,
    elevation: 8,
  },
};
