

export class Exercise {
    _id: string;
    name: string;
    category: string;
    primaryMuscles: string[];
    secondaryMuscles: string[];
    level: string;
    equipment: string;
    instructions: string[];
    force: string;
    mechanic: string;
  
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
    ) {
      this._id = _id;
      this.name = name;
      this.category = category;
      this.primaryMuscles = primaryMuscles;
      this.secondaryMuscles = secondaryMuscles;
      this.level = level;
      this.equipment = equipment;
      this.force = force;
      this.mechanic = mechanic;
      this.instructions = instructions;
    }
  }
  