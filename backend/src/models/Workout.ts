import { WorkoutExercise } from './WorkoutExcercise';
export class Workout {
    _id: string;
    userID: string;
    name: string;
    exercises: WorkoutExercise[];
    duration: number;
    startDate: Date;
    endDate: Date;
  
    constructor(
      _id: string,
      userID: string,
      name: string,
      exercises: WorkoutExercise[],
      duration: number,
      startDate: Date,
      endDate: Date
    ) {
      this._id = _id;
      this.userID = userID;
      this.name = name;
      this.exercises = exercises;
      this.duration = duration;
      this.startDate = startDate;
      this.endDate = endDate;
    }
  }
  