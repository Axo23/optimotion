import { Exercise } from './Excercise';

export class WorkoutLog {
    logID: string;
    userID: string;
    date: Date;
    exercise: Exercise[];
    duration: number;
  
    constructor(
      logID: string,
      userID: string,
      date: Date,
      exercise: Exercise[],
      duration: number
    ) {
      this.logID = logID;
      this.userID = userID;
      this.date = date;
      this.exercise = exercise;
      this.duration = duration;
    }
  }
  