// reducer.js
import { ActionTypes } from "./actions";

const initialState = {
  gamesPlayed: 0,
  gamesWon: 0,
  gamesLost: 0,
  score: 0,
  candyGrid: [], // Your candy grid data structure
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.START_GAME_SUCCESS:
      return {
        ...state,
        gamesPlayed: state.gamesPlayed + 1,
        candyGrid: action.payload.candyGrid,
      };

    case ActionTypes.CANDY_CLICK_SUCCESS:
      const { candyGrid } = action.payload;
      const updatedState = {
        ...state,
        candyGrid,
        score: state.score + 1,
      };

      // Check for a win condition (e.g., all candies burst)
      const isGameWon = candyGrid.every((row) => row.every((candy) => !candy));
      if (isGameWon) {
        updatedState.gamesWon += 1;
        // You may want to add additional logic for game won state
      }

      return updatedState;

    // Add additional cases as needed for other actions

    default:
      return state;
  }
};

export default reducer;
