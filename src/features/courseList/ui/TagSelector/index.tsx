import React, { useCallback, useMemo, memo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import closeIcon from '@/shared/assets/icons/close.png';

interface TagSelectorProps {
  tags: string[];
  selectedTag: string | null;
  onSelectTag: (tag: string | null) => void;
  onClose: () => void;
}

interface TagItemProps {
  tag: string;
  isSelected: boolean;
  onPress: () => void;
}

function TagItemComponent({ 
  tag, 
  isSelected, 
  onPress 
}: TagItemProps) {
  return (
    <TouchableOpacity 
      style={[
        styles.tagItem, 
        isSelected && styles.selectedTagItem
      ]} 
      onPress={onPress}
    >
      <Text
        numberOfLines={1}
        style={[
          styles.tagText, 
          isSelected && styles.selectedTagText
        ]}
      >
        {tag}
      </Text>
    </TouchableOpacity>
  );
}

const TagItem = memo(TagItemComponent);

function TagSelectorComponent({ 
  tags, 
  selectedTag, 
  onSelectTag, 
  onClose 
}: TagSelectorProps) {
  const handleTagPress = useCallback((tag: string) => {
    if (selectedTag === tag) {
      onSelectTag(null);
    } else {
      onSelectTag(tag);
    }
  }, [selectedTag, onSelectTag]);

  const handleAllTagsPress = useCallback(() => {
    onSelectTag(null);
  }, [onSelectTag]);

  const tagItems = useMemo(() => (
    tags.map((item) => (
      <TagItem 
        key={item}
        tag={item}
        isSelected={selectedTag === item}
        onPress={() => handleTagPress(item)}
      />
    ))
  ), [tags, selectedTag, handleTagPress]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Выбор темы</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton} hitSlop={{top: 10, right: 10, bottom: 10, left: 10}}>
            <Image source={closeIcon} style={styles.closeButtonIcon} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.content}>
          <ScrollView 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
            removeClippedSubviews={true}
          >
            <TagItem 
              tag="Все темы"
              isSelected={selectedTag === null}
              onPress={handleAllTagsPress}
            />
            
            {tagItems}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}

export const TagSelector = memo(TagSelectorComponent);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    paddingHorizontal: 20,
    marginTop: 24,
    marginBottom: 18,

  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#39414B',
  },
  closeButton: {
    position: 'absolute',
    right: 24,
  },
  closeButtonIcon: {
    width: 24,
    height: 24,
  },
  content: {
    flex: 1,
    width: 336,
    alignSelf: 'center',
  },
  listContent: {
    paddingBottom: 20,
  },
  tagItem: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginVertical: 3,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#C5D0E6',
  },
  selectedTagItem: {
    backgroundColor: '#5CBB73',
    borderColor: '#5CBB73',
  },
  tagText: {
    fontSize: 18,
    color: '#39414B',
    textAlign: 'left',
    fontWeight: 'bold',
  },
  selectedTagText: {
    color: '#fff',
  },
});
