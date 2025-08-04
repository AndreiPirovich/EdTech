import React, { useCallback, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { CourseList } from '@/features/courseList';
import { useCourses } from '@/features/courseList/model/hooks/useCourses';
import { LoadingView, ErrorView } from '@/shared/ui';

const BG_COLOR = '#7446EE';

export function CourseExplorer() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [isTagSelectorVisible, setIsTagSelectorVisible] = useState(false);

  const { courses, isLoading, error, allTags } = useCourses(selectedTag);

  const handleSelectTag = useCallback((tag: string | null) => {
    setSelectedTag(tag);
    setIsTagSelectorVisible(false);
  }, []);

  const toggleTagSelector = useCallback(() => {
    setIsTagSelectorVisible(prev => !prev);
  }, []);

  if (isLoading) {
    return <LoadingView bgColor={BG_COLOR} />;
  }

  if (error) {
    return <ErrorView message={error} bgColor={BG_COLOR} textColor="#fff" />;
  }

  return (
    <View style={styles.container}>
      <CourseList 
        courses={courses}
        selectedTag={selectedTag}
        allTags={allTags}
        isTagSelectorVisible={isTagSelectorVisible}
        onSelectTag={handleSelectTag}
        onToggleTagSelector={toggleTagSelector}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_COLOR,
  },
});
