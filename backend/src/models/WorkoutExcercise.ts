import { Exercise } from "./Exercise";

export class WorkoutExercise extends Exercise {
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
    category: string,
    primaryMuscles: string[],
    secondaryMuscles: string[],
    level: string,
    equipment: string,
    force: string,
    mechanic: string,
    instructions: string[],
    description: string,
    minRepetitions: number,
    maxRepetitions: number,
    sets: number,
    duration: number,
    superset: boolean,
    pauseTimer: number
  ) {
    // Call the parent Exercise class constructor
    super(
      _id,
      name,
      category,
      primaryMuscles,
      secondaryMuscles,
      level,
      equipment,
      force,
      mechanic,
      instructions
    );

    // Initialize the WorkoutExercise-specific fields
    this.description = description;
    this.minRepetitions = minRepetitions;
    this.maxRepetitions = maxRepetitions;
    this.sets = sets;
    this.duration = duration;
    this.superset = superset;
    this.pauseTimer = pauseTimer;
  }
}
