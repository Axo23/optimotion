import { v4 as uuidv4 } from "uuid";
export class Goal {
    goalID: string;
    userID: string;
    description: string;
  
    constructor(userID: string, description: string) {
      this.goalID = uuidv4();
      this.userID = userID;
      this.description = description;
    }
  }
  