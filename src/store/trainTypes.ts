// trainTypes.ts
// export interface TrainCharacteristics {
//   speed: number;
//   force: number;
//   engineAmperage: number;
// }

// export interface Train {
//   name: string;
//   description: string;
//   characteristics: TrainCharacteristics[];
// }

// export interface AppState {
//   trains: Train[];
// }

export interface TrainCharacteristics {
  speed: number;
  force: number;
  engineAmperage: number;
}

export interface Train {
  name: string;
  description: string;
  characteristics: TrainCharacteristics[];
}

export interface AppState {
  trains: Train[];
}

export const ADD_TRAINS = "ADD_TRAINS";

export const addTrains = (trains: TrainCharacteristics[]) => ({
  type: ADD_TRAINS,
  payload: trains
});

export type TrainActionTypes = ReturnType<typeof addTrains>;
