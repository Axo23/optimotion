import { v4 as uuidv4 } from "uuid";

export class Exercise {
    exerciseID: string;
    name: string;
    description: string;
    minRepetitions: number;
    maxRepetitions: number;
    sets: number;
    duration: number;
    superset: boolean;
    pauseTimer: number;
  
    constructor(
      name: string,
      description: string,
      minRepetitions: number,
      maxRepetitions: number,
      sets: number,
      duration: number,
      superset: boolean,
      pauseTimer: number
    ) {
      this.exerciseID = uuidv4();
      this.name = name;
      this.description = description;
      this.minRepetitions = minRepetitions;
      this.maxRepetitions = maxRepetitions;
      this.sets = sets;
      this.duration = duration;
      this.superset = superset;
      this.pauseTimer = pauseTimer;
    }
  }
  