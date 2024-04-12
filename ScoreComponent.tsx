// React Imports
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DataTable } from 'react-native-paper';

// Project Imports
import { retrieveCurrentScoresheet, setRecentCourseIdAsync } from './Utilities';

function ScoreComponent() {
  const [score, setScore] = useState<number>(0);
  const [recentCourseId, setRecentCourseId] = useState<string>("test");
  const [currentScoresheet, setCurrentScoresheet] = useState<Array<number>>([]);

  useState(() => {
    (async () => {
      await setRecentCourseIdAsync(setRecentCourseId)
      .then(async() => {
        var ss = await retrieveCurrentScoresheet() as Array<number>;
        if (ss == null) {
          ss = Array(0).fill(0);
          AsyncStorage.setItem("currentScoresheet", JSON.stringify(ss));
        }
        setCurrentScoresheet(ss);
      });
    })();
  });

  useEffect(() => {
    var summed = currentScoresheet.reduce((partialSum, a) => partialSum + a, 0);
    setScore(summed);
  },[currentScoresheet])

  return (
    <View>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title numeric>{recentCourseId} - Hole #</DataTable.Title>
          <DataTable.Title numeric>Strokes</DataTable.Title>
        </DataTable.Header>

        {currentScoresheet.slice(1).map((item:number, index:number) => (
          <DataTable.Row key={index}>
            <DataTable.Cell numeric>{index+1}</DataTable.Cell>
            <DataTable.Cell numeric>{item}</DataTable.Cell>
          </DataTable.Row>
        ))}
        
        <DataTable.Row key={currentScoresheet.length}>
            <DataTable.Cell numeric textStyle={{fontWeight:"bold"}}>Score:</DataTable.Cell>
            <DataTable.Cell numeric>{score}</DataTable.Cell>
          </DataTable.Row>
      </DataTable>
    </View>
  );
}

export default ScoreComponent;