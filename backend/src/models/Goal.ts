
export class Goal {
    _id: string;
    userID: string;
    description: string;
  
    constructor(_id: string, userID: string, description: string) {
      this._id = _id;
      this.userID = userID;
      this.description = description;
    }
  }
  