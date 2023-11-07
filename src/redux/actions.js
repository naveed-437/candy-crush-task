// actions.js
export const ActionTypes = {
    START_GAME: "START_GAME",
    START_GAME_SUCCESS: "START_GAME_SUCCESS",
    START_GAME_FAILURE: "START_GAME_FAILURE",
    CLICK_CANDY: "CLICK_CANDY",
    CANDY_CLICK_SUCCESS: "CANDY_CLICK_SUCCESS",
    CANDY_CLICK_FAILURE: "CANDY_CLICK_FAILURE",
  };
  
  export const startGame = () => ({
    type: ActionTypes.START_GAME,
  });
  export const clickCandy = (row, col) => ({
    type: ActionTypes.CLICK_CANDY,
    payload: { row, col },
  });
  