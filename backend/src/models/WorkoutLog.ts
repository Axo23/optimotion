import { WorkoutExercise } from './WorkoutExcercise';

export class WorkoutLog {
    _id: string;
    userID: string;
    date: Date;
    exercise: WorkoutExercise[];
    duration: number;
  
    constructor(
      _id: string,
      userID: string,
      date: Date,
      exercise: WorkoutExercise[],
      duration: number
    ) {
      this._id = _id;
      this.userID = userID;
      this.date = date;
      this.exercise = exercise;
      this.duration = duration;
    }
  }
  