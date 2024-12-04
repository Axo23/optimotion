import { Workout } from './Workout';

export class WorkoutSession {
    sessionID: string;
    userID: string;
    date: Date;
    workout: Workout;
  
    constructor(sessionID: string, userID: string, date: Date, workout: Workout) {
      this.sessionID = sessionID;
      this.userID = userID;
      this.date = date;
      this.workout = workout;
    }
  }
  