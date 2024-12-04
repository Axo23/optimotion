import { WorkoutLog } from './WorkoutLog';

export class ProgressTracker {
    trackerID: string;
    userID: string;
    workoutLogs: WorkoutLog[];
    weightLog: Map<Date, number>;
  
    constructor(
      trackerID: string,
      userID: string,
      workoutLogs: WorkoutLog[],
      weightLog: Map<Date, number>
    ) {
      this.trackerID = trackerID;
      this.userID = userID;
      this.workoutLogs = workoutLogs;
      this.weightLog = weightLog;
    }
  }
  