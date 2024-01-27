// React Imports
import React, { useEffect, useState } from 'react';
import { Button, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUniqueId } from 'react-native-device-info';

// Project Imports
import { CourseData } from './types';

// Assuming courseId is available in this component, otherwise you'll need to pass it as a prop
const courseId = 'course1'; // Replace with actual course ID

function ScoreComponent() {
  const [score, setScore] = useState(0);
  const [deviceId, setDeviceId] = useState('');

  useState(() => {
    const setDeviceIdAsync = async () => {
      const id = await getUniqueId();
      setDeviceId(id);
    };
    setDeviceIdAsync();
  });

  useEffect(() => {
    if (deviceId) {
      AsyncStorage.getItem(deviceId).then(storedData => {
        if (storedData !== null) {
          const data = JSON.parse(storedData);
          if (data[courseId] && data[courseId].length > 0) {
            setScore(data[courseId][data[courseId].length - 1].score);
          }
        }
      });
    }
  }, [deviceId]);

  const incrementScore = () => {
    const newScore = score + 1;
    setScore(newScore);

    if (deviceId) {
      const timestamp = new Date().toISOString();
      // courseData is device-specfic (eventually user-specific)
      AsyncStorage.getItem(deviceId).then(courseData => {
        let data: CourseData = {};
        if (courseData !== null) {
          data = JSON.parse(courseData);
        }
        if (!data[courseId]) {
          data[courseId] = [];
        }
        data[courseId].push({ courseScore: newScore, timestamp: timestamp });
        AsyncStorage.setItem(deviceId, JSON.stringify(data));
      });
    }
  };

  return (
    <View>
      <Text>Score: {score}</Text>
      <Text>DeviceId: {deviceId}</Text>
      <Button title="Increment Score" onPress={incrementScore} />
    </View>
  );
}

export default ScoreComponent;