import { Exercise } from './Excercise';

export class WorkoutLog {
    _id: string;
    userID: string;
    date: Date;
    exercise: Exercise[];
    duration: number;
  
    constructor(
      _id: string,
      userID: string,
      date: Date,
      exercise: Exercise[],
      duration: number
    ) {
      this._id = _id;
      this.userID = userID;
      this.date = date;
      this.exercise = exercise;
      this.duration = duration;
    }
  }
  