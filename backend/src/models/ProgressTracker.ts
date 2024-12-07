import { WorkoutLog } from './WorkoutLog';

export class ProgressTracker {
    _id: string;
    userID: string;
    workoutLogs: WorkoutLog[];
    weightLog: Map<Date, number>;
  
    constructor(
      _id: string,
      userID: string,
      workoutLogs: WorkoutLog[],
      weightLog: Map<Date, number>
    ) {
      this._id = _id;
      this.userID = userID;
      this.workoutLogs = workoutLogs;
      this.weightLog = weightLog;
    }
  }
  