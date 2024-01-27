export type StackParamList = {
  Home: undefined,
  Score: undefined,
  Map: undefined
}

export type CourseData = {
  [courseId: string]: Array<{ courseScore: number; timestamp: string }>;
};