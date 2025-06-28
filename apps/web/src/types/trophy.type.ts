import { ExerciseType } from "./exercise.type";
import { ExerciseUserType } from "./exerciseUser.type";

export interface TrophyType {
  _id: string;
  name: string;
  exerciseType: ExerciseType;
  exerciseUser: ExerciseUserType;
  repsGoal: number;
  weightMultiplier: number;
  awardedAt: string | null;
  achieved: boolean;
  description: string;
  repsUser: number;
  weightUser: number;
  owner: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  trophyType: string;
  level: number;
  rewardText: string;
  bodyWeight: number;
}
