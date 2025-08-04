import React, { useCallback, useEffect, useRef, memo } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Modal, Text, Image } from 'react-native';
import { Course, CourseCard } from '@/entities/course';
import arrowDownIcon from '@/shared/assets/icons/arrow-down.png';
import { TagSelector } from '../TagSelector';

interface CourseListProps {
  courses: Course[];
  selectedTag: string | null;
  allTags: string[];
  isTagSelectorVisible: boolean;
  onSelectTag: (tag: string | null) => void;
  onToggleTagSelector: () => void;
}

function CourseListComponent({
  courses,
  selectedTag,
  allTags,
  isTagSelectorVisible,
  onSelectTag,
  onToggleTagSelector
}: CourseListProps) {
  const coursesListRef = useRef<FlatList>(null);

  useEffect(() => {
    if (coursesListRef.current) {
      coursesListRef.current.scrollToOffset({ offset: 0, animated: false });
    }
  }, [selectedTag]);

  const renderCourseItem = useCallback(({ item }: { item: Course }) => (
    <CourseCard course={item} />
  ), []);
  
  const keyExtractor = useCallback((item: Course) => item.id, []);

  return (
    <View style={styles.container}>
      <View style={styles.tagSelectorWrapper}>
        <TouchableOpacity
          style={styles.tagSelector}
          onPress={onToggleTagSelector}
        >
          <Text style={styles.tagSelectorText}>
            {selectedTag || 'Все темы'}
          </Text>
          <Image source={arrowDownIcon} style={styles.arrowIcon} />
        </TouchableOpacity>
      </View>
      
      <FlatList
        ref={coursesListRef}
        horizontal
        data={courses}
        keyExtractor={keyExtractor}
        renderItem={renderCourseItem}
        contentContainerStyle={styles.coursesList}
        showsHorizontalScrollIndicator={false}
        initialNumToRender={10}
      />
      
      <Modal
        visible={isTagSelectorVisible}
        animationType="slide"
        onRequestClose={onToggleTagSelector}
        supportedOrientations={['landscape']}
        presentationStyle="fullScreen"
      >
        <TagSelector
          tags={allTags}
          selectedTag={selectedTag}
          onSelectTag={onSelectTag}
          onClose={onToggleTagSelector}
        />
      </Modal>
    </View>
  );
}

export const CourseList = memo(CourseListComponent);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  tagSelectorWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 12,
    width: '100%',
    zIndex: 1,
  },
  tagSelector: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    padding: 5,
    borderRadius: 100,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  tagSelectorText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 5,
  },
  arrowIcon: {
    width: 18,
    height: 18,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 9,
  },
  coursesList: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
});
