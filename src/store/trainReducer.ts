// trainReducer.ts
// import { AppState, TrainCharacteristics } from "./trainTypes";

// const initialState: AppState = {
//   trains: []
// };

// export const ADD_TRAINS = "ADD_TRAINS";

// export const addTrains = (trains: TrainCharacteristics[]) => ({
//   type: ADD_TRAINS,
//   payload: trains
// });

// type TrainActionTypes = ReturnType<typeof addTrains>;

// const trainReducer = (
//   state = initialState,
//   action: TrainActionTypes
// ): AppState => {
//   switch (action.type) {
//     case ADD_TRAINS:
//       return { ...state, trains: action.payload };
//     default:
//       return state;
//   }
// };

// export default trainReducer;

// trainReducer.ts
import { AppState, TrainActionTypes, ADD_TRAINS } from "./trainTypes";

const initialState: AppState = {
  trains: []
};

export const addTrains = (trains: TrainCharacteristics[]) => ({
  type: ADD_TRAINS,
  payload: trains
});

const trainReducer = (
  state = initialState,
  action: TrainActionTypes
): AppState => {
  switch (action.type) {
    case ADD_TRAINS:
      return { ...state, trains: action.payload };
    default:
      return state;
  }
};

export default trainReducer;
