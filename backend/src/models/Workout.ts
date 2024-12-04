import { Exercise } from './Excercise';
export class Workout {
    workoutID: string;
    userID: string;
    name: string;
    exercises: Exercise[];
    duration: number;
    startDate: Date;
    endDate: Date;
  
    constructor(
      workoutID: string,
      userID: string,
      name: string,
      exercises: Exercise[],
      duration: number,
      startDate: Date,
      endDate: Date
    ) {
      this.workoutID = workoutID;
      this.userID = userID;
      this.name = name;
      this.exercises = exercises;
      this.duration = duration;
      this.startDate = startDate;
      this.endDate = endDate;
    }
  }
  