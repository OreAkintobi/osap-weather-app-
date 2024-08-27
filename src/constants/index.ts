import { Theme } from '@/src/types';

export const themes: Record<'A' | 'B', Theme> = {
  A: {
    primary: '#1E90FF',
    secondary: '#FFFFFF',
    accent: '#FFA500',
    background: '#F0F8FF',
    text: '#000080',
    buttonBackground: '#4682B4',
    buttonText: '#FFFFFF',
  },
  B: {
    primary: '#32CD32',
    secondary: '#F5F5F5',
    accent: '#FF4500',
    background: '#F0FFF0',
    text: '#2F4F4F',
    buttonBackground: '#228B22',
    buttonText: '#FFFFFF',
  },
};
