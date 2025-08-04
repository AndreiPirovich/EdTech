import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ErrorViewProps {
  message: string;
  bgColor?: string;
  textColor?: string;
}

/**
 * Компонент для отображения ошибки
 */
export function ErrorView({ message, bgColor = '#fff', textColor = 'red' }: ErrorViewProps) {
  return (
    <View style={[styles.errorContainer, { backgroundColor: bgColor }]}>
      <Text style={[styles.errorText, { color: textColor }]}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
  },
});
