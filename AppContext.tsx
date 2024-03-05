import React, { createContext, useState, useContext, Dispatch, SetStateAction } from 'react';

type AppContextType = {
  courseId: string;
  deviceId: string;
  score: number;
  setCourseId: Dispatch<SetStateAction<string>>;
  setDeviceId: Dispatch<SetStateAction<string>>;
  setScore: Dispatch<SetStateAction<number>>;
};

const AppContext = createContext<AppContextType>({
  courseId: 'Default Course',
  deviceId: 'Default Device',
  score: 0,
  setCourseId: () => {},
  setDeviceId:  () => {},
  setScore: () => {},
});

export const useAppContext = () => {
  return useContext(AppContext);
};

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [courseId, setCourseId ] = useState('');
  const [deviceId, setDeviceId ] = useState('');
  const [score, setScore] = useState(0);

  return (
    <AppContext.Provider value={{ courseId, setCourseId, deviceId, setDeviceId, score, setScore }}>
      {children}
    </AppContext.Provider>
  );
};