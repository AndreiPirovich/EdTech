import { Course } from '@/entities/course';
import { api } from '@/shared/api/api';

export const fetchCourses = async (): Promise<Course[]> => {
  try {
    const response = await api.get<Course[]>('/courses.json');
    
    if (response.status !== 200) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.data;
  } catch (error: unknown) {
    console.error('Error fetching courses:', error);
    
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error(String(error));
    }
  }
};

