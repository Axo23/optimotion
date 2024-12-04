
export class ChatGPTService {
    apiKey: string;
    modelVersion: string;
  
    constructor(apiKey: string, modelVersion: string) {
      this.apiKey = apiKey;
      this.modelVersion = modelVersion;
    }
  }
  