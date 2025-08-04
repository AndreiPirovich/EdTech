import { useState, useEffect, useMemo, useCallback } from 'react';
import { fetchCourses } from '../../api/coursesApi';
import { Course } from '@/entities/course';

export const useCourses = (selectedTag: string | null) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const fetchCoursesList = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await fetchCourses();
      setCourses(data);
    } catch (err) {
      setError('Ошибка при загрузке курсов. Пожалуйста, попробуйте позже.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  useEffect(() => {
    let isMounted = true;
    
    const loadCourses = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchCourses();
        
        if (isMounted) {
          setCourses(data);
        }
      } catch (err) {
        if (isMounted) {
          setError('Ошибка при загрузке курсов. Пожалуйста, попробуйте позже.');
          console.error(err);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };
    
    loadCourses();
    
    return () => {
      isMounted = false;
    };
  }, []);
  
  const filteredCourses = useMemo(() => {
    if (!selectedTag) return courses;
    return courses.filter(course => course.tags.includes(selectedTag));
  }, [courses, selectedTag]);
  
  const allTags = useMemo(() => {
    if (!courses.length) return [];
    return [...new Set(courses.flatMap(course => course.tags))].sort((a, b) => a.localeCompare(b, 'ru'));
  }, [courses]);
  
  return {
    courses: filteredCourses,
    allTags,
    isLoading,
    error,
    fetchCoursesList
  };
};
