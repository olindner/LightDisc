// React Imports
import AsyncStorage from '@react-native-async-storage/async-storage';

// Project Imports
import { CourseData } from './types';

export const setDummyData = async () => {
  const recentCourseKey = "recentCourseId";
  const recentCourseValue = "Test Course";
  const courseArrayKey = recentCourseValue;
  const courseArrayValue: CourseData = {
    "Test Course": [{ courseScore: 5, timestamp: "fakeTimestamp" }]
  };

  try {
    AsyncStorage.multiSet([[recentCourseKey, recentCourseValue], [courseArrayKey, JSON.stringify(courseArrayValue)]])
    
  } catch (error) {
    console.log(`Error when setting Dummy data: ${error}`);
  }
}

export const setRecentCourseIdAsync = async (setRecentCourseId:React.Dispatch<React.SetStateAction<string>>) => {
  // Don't want try/catch here because it is handled by caller
  const key = "recentCourseId";
  var recentCourseId = await AsyncStorage.getItem(key);
  if (recentCourseId == null) {
    throw new Error("recentCourseId is null");
  }
  setRecentCourseId(recentCourseId);
  return recentCourseId;
}