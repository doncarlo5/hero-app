import { ExerciseType } from "./exercise.type";

export interface ProgramType {
  _id: string;
  sessionType: string;
  exercises: [
    {
      _id: string;
      exerciseType: ExerciseType;
      order: number;
      alternatives: [ExerciseType];
    },
  ];
  owner: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
