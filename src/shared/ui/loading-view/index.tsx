import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

interface LoadingViewProps {
  color?: string;
  size?: 'large' | 'small';
  bgColor?: string;
}

export function LoadingView({ bgColor = 'transparent' , color = '#fff' , size = 'large' }: LoadingViewProps) {
  return (
    <View style={[styles.loadingContainer, { backgroundColor: bgColor }]}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
