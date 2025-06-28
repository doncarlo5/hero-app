import { ExerciseType } from "./exercise.type";

export interface SessionType {
  _id: string;
  name: string;
  description: string;
  owner: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  sessionType: string;
  exercises: [
    {
      _id: string;
      exerciseType: ExerciseType;
      order: number;
      alternatives: [ExerciseType];
    },
  ];
}
