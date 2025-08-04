import React from 'react';
import { StyleSheet, View } from 'react-native';
import { CourseExplorer } from '@/widgets/CourseExplorer';

export function HomePage() {
  return (
    <View style={styles.container}>
      <CourseExplorer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
