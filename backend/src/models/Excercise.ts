

export class Exercise {
    _id: string;
    name: string;
    description: string;
    minRepetitions: number;
    maxRepetitions: number;
    sets: number;
    duration: number;
    superset: boolean;
    pauseTimer: number;
  
    constructor(
      _id: string,
      name: string,
      description: string,
      minRepetitions: number,
      maxRepetitions: number,
      sets: number,
      duration: number,
      superset: boolean,
      pauseTimer: number
    ) {
      this._id = _id;
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
  