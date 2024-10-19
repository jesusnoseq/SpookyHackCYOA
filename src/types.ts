export interface Choice {
  nextScene: string;
  action: string;
  choiceDescription: string;
  quest?: string
}

export interface Scene {
  text: string;
  backgroundTransform: string;
  choices: {
    a?: Choice;
    b?: Choice;
  };
}

export interface Story {
  [key: string]: Scene;
}

export interface GameState {
  imageId: string
  currentScene: string;
  backgroundImage: string;
  choiceImages: {
    a: string;
    b: string;
  };
}