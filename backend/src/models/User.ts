export class User {
    userID: string;
    name: string;
    email: string;
    password: string;
    fitnessLevel: string;
    goals: string[];
    age: number;
    weight: number;
    height: number;
  
    constructor(
      userID: string,
      name: string,
      email: string,
      password: string,
      fitnessLevel: string,
      goals: string[],
      age: number,
      weight: number,
      height: number
    ) {
      this.userID = userID;
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
  