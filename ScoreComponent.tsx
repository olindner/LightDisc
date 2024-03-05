// React Imports
import React, { useEffect, useState } from 'react';
import { Button, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Project Imports
import { CourseData } from './types';
import { setRecentCourseIdAsync } from './Utilities';

function ScoreComponent() {
  const [score, setScore] = useState<number>(0);
  const [recentCourseId, setRecentCourseId] = useState<string>("test");

  useEffect(() => {
    setCourseAndScoreAsync()
    .catch((error) => console.log(`error ScoreComponent!!!\n ${error}`))
    .finally(() => {});
  }, [recentCourseId]);

  const setCourseAndScoreAsync = async() => {
    var rci = await setRecentCourseIdAsync(setRecentCourseId);
    if ((!score || score !== null) && rci) {
      setScoreAsync(setScore, rci);
    }
  }

  const setScoreAsync = async (setScore:React.Dispatch<React.SetStateAction<number>>, rci:string) => {
    let courseId = rci || recentCourseId;

    try {
      AsyncStorage.getItem(courseId).then(data => {
        let parsedData: CourseData = {};
        if (data == null) {
          throw new Error("recentCourse data is null");
        }
        parsedData = JSON.parse(data);
        let courseScore:number = parsedData[courseId][0].courseScore;
        setScore(courseScore);
      });
    } catch (error) {
      console.log(`Error setScoreAsync: ${error}`);
    }
  }

  const incrementScore = () => {
    const newScore = score + 1;
    setScore(newScore);
  };

  const saveScore = () => {
    try {
      const timestamp = new Date().toISOString();
      const scoreData = { courseScore: score, timestamp };
      const builder: CourseData = {
          [recentCourseId]: [scoreData]
      };

      AsyncStorage.setItem(recentCourseId, JSON.stringify(builder));
    } catch (error) {
      console.log("Error when saving score: ", error);
    }
  };

  return (
    <View>
      <Text>RecentCourseId: {recentCourseId}</Text>
      <Text>Score: {score}</Text>
      <Button title="Increment Score" onPress={incrementScore} />
      <Button title="Save Score" onPress={saveScore} />
    </View>
  );
}

export default ScoreComponent;