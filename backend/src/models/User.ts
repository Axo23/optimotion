

export class User {
    _id: string;
    name: string;
    email: string;
    password: string;
    fitnessLevel: string;
    goals: string[];
    age: number;
    weight: number;
    height: number;
  
    constructor(
      _id: string,
      name: string,
      email: string,
      password: string,
      fitnessLevel: string,
      goals: string[],
      age: number,
      weight: number,
      height: number
    ) {
      this._id = _id;
      this.name = name;
      this.email = email;
      this.password = password;
      this.fitnessLevel = fitnessLevel;
      this.goals = goals;
      this.age = age;
      this.weight = weight;
      this.height = height;
    }
  }
  