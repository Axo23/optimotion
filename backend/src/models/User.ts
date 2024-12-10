

export class User {
    _id: string;
    name: string;
    email: string;
    password: string;
    age: number;
    fitnessLevel: string;
    goals: string[];
    weight: number;
    height: number;
  
    constructor(
      _id: string,
      name: string,
      email: string,
      password: string,
      age: number,
      fitnessLevel: string,
      goals: string[],
      weight: number,
      height: number
    ) {
      this._id = _id;
      this.name = name;
      this.email = email;
      this.password = password;
      this.age = age;
      this.fitnessLevel = fitnessLevel;
      this.goals = goals;
      this.weight = weight;
      this.height = height;
    }
  }
  