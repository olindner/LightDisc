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
    await AsyncStorage.clear()
    .then(() => {
      AsyncStorage.multiSet([[recentCourseKey, recentCourseValue], [courseArrayKey, JSON.stringify(courseArrayValue)]])
    });
    
  } catch (error) {
    console.log(`Error when setting Dummy data: ${error}`);
  }
}

export const setRecentCourseIdAsync = async (setRecentCourseId:React.Dispatch<React.SetStateAction<string>>) => {
  // Don't want try/catch here because it is handled by caller
  var recentCourseId = await AsyncStorage.getItem("recentCourseId");
  if (recentCourseId == null) {
    throw new Error("recentCourseId is null");
  }
  setRecentCourseId(recentCourseId);
  return recentCourseId;
}

// Could remove the unused optional param, but leaving in case needed in the future
export const retrieveCurrentScoresheet = async (hole?:number) => {
  try {
    let ss = await AsyncStorage.getItem("currentScoresheet");

    let scoresheetArray: Array<number>;
    if (ss == null) {
      return Array<number>();
    }
    scoresheetArray = JSON.parse(ss);

    if (typeof hole !== "undefined") {
      return scoresheetArray[hole];
    }

    return scoresheetArray;
  } 
  catch (error) {
    console.log(`Error when retrieving Stroke Scoresheet: ${error}`);
  }
}

export const computeDistance = (prevLat:number, prevLong:number, lat:number, long:number) => {
  const prevLatInRad = toRad(prevLat);
  const prevLongInRad = toRad(prevLong);
  const latInRad = toRad(lat);
  const longInRad = toRad(long);
  const circumferenceOfEarthInKms = 6377.830272;
  const ftInKm = 3280.84;

  // In kilometers
  let result = circumferenceOfEarthInKms *
    Math.acos(
      Math.sin(prevLatInRad) * Math.sin(latInRad) +
        Math.cos(prevLatInRad) * Math.cos(latInRad) * Math.cos(longInRad - prevLongInRad)
    ) * ftInKm;
  return (result as Number).toPrecision(5);
}

function toRad(angle:number) {
  return (angle * Math.PI) / 180;
}