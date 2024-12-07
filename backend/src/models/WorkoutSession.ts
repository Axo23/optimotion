import { Workout } from './Workout';

export class WorkoutSession {
    _id: string;
    userID: string;
    date: Date;
    workout: Workout;
  
    constructor(_id: string, userID: string, date: Date, workout: Workout) {
      this._id = _id;
      this.userID = userID;
      this.date = date;
      this.workout = workout;
    }
  }
  