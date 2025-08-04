import React, { memo } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Course } from '../../model/types';

interface CourseCardProps {
  course: Course;
  onPress?: () => void;
}

function CourseCardComponent({ course, onPress }: CourseCardProps) {
  const Container = onPress ? TouchableOpacity : View;
  
  return (
    <Container 
      style={[styles.container]} 
      onPress={onPress}
    >
      <View style={[styles.imageContainer, { backgroundColor: course.bgColor }]}>
      <Image 
        source={{ uri: course.image }} 
        style={styles.image}
        resizeMode="contain"
      />
      </View>
      <Text 
        style={styles.name} 
        numberOfLines={1}
      >
        {course.name}
      </Text>
    </Container>
  );
}

export const CourseCard = memo(CourseCardComponent);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 24,
    width: 210,
    height: 198,
    marginHorizontal: 9,
    position: 'relative',
    shadowColor:"#E5E8FE",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 12,
  },
  imageContainer: {
    flex: 1,
    paddingHorizontal: 33,
    paddingVertical: 9,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  image: {
    flex: 1
  },
  name: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#5A5776',
    paddingVertical: 10,
    paddingHorizontal: 8,
  },
});
