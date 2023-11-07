// sagas.js
import { takeEvery, put,select } from "redux-saga/effects";
import { ActionTypes } from "./actions";

// Function to generate a random candy color
const getRandomColor = () => {
  const colors = ["red", "green", "blue"]; // Add more colors as needed
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};

// Function to initialize the candy grid
const initializeCandyGrid = () => {
  const grid = [];
  for (let i = 0; i < 10; i++) {
    const row = [];
    for (let j = 0; j < 10; j++) {
      row.push({ color: getRandomColor() });
    }
    grid.push(row);
  }
  return grid;
};

// Function to find connected candies of the same color
const findConnectedCandies = (grid, row, col, targetColor, visited) => {
    if (
      row < 0 ||
      row >= grid.length ||
      col < 0 ||
      col >= grid[row].length ||
      visited[row][col] ||
      grid[row][col].color !== targetColor
    ) {
      return [];
    }
  
    visited[row][col] = true;
  
    const connectedCandies = [
      { row, col },
      ...findConnectedCandies(grid, row - 1, col, targetColor, visited),
      ...findConnectedCandies(grid, row + 1, col, targetColor, visited),
      ...findConnectedCandies(grid, row, col - 1, targetColor, visited),
      ...findConnectedCandies(grid, row, col + 1, targetColor, visited),
    ];
  
    return connectedCandies;
  };
  
  // Function to burst connected candies and update the grid
  const burstCandies = (grid, connectedCandies) => {
    connectedCandies.forEach(({ row, col }) => {
      grid[row][col] = { color: null }; // Set color to null to mark as burst
    });
  };
  const refillGrid = (grid) => {
    const updatedGrid = [...grid];
  
    // Iterate through each column
    for (let col = 0; col < updatedGrid[0].length; col++) {
      // Iterate from bottom to top to shift candies down
      for (let row = updatedGrid.length - 1; row >= 0; row--) {
        if (!updatedGrid[row][col].color) {
          // Find the nearest non-burst candy above
          let aboveRow = row - 1;
          while (aboveRow >= 0 && !updatedGrid[aboveRow][col].color) {
            aboveRow--;
          }
  
          if (aboveRow >= 0) {
            // Swap the candies
            updatedGrid[row][col].color = updatedGrid[aboveRow][col].color;
            updatedGrid[aboveRow][col].color = null; // Mark the moved candy as null
          } else {
            // If there is no candy above, generate a new random candy
            updatedGrid[row][col].color = getRandomColor();
          }
        }
      }
    }
  
    return updatedGrid;
  };
  
  

  function* handleStartGame() {
    try {
      // Initialize the candy grid
      const candyGrid = initializeCandyGrid();
  
      // Update the gamesPlayed count and candy grid in the Redux state
      yield put({
        type: ActionTypes.START_GAME_SUCCESS,
        payload: { candyGrid },
      });
    } catch (error) {
      yield put({ type: ActionTypes.START_GAME_FAILURE, error });
    }
  }
  
  function* handleCandyClick(action) {
    try {
      const { row, col } = action.payload;
  
      // Access the current candy grid from the Redux state
      const candyGrid = yield select((state) => state.candyGrid);
  
      const targetColor = candyGrid[row][col].color;
  
      if (!targetColor) {
        return; // Clicked on an already burst candy
      }
  
      const visited = Array.from({ length: candyGrid.length }, () =>
        Array(candyGrid[0].length).fill(false)
      );
  
      const connectedCandies = findConnectedCandies(
        candyGrid,
        row,
        col,
        targetColor,
        visited
      );
  
      if (connectedCandies.length >= 3) {
        // Burst connected candies
        const updatedCandyGrid = [...candyGrid];
        burstCandies(updatedCandyGrid, connectedCandies);
        const refilledGrid = refillGrid(updatedCandyGrid);
        // Update the candy grid and score in the Redux state
        yield put({
          type: ActionTypes.CANDY_CLICK_SUCCESS,
          payload: { candyGrid: refilledGrid },
        });
      }
    } catch (error) {
      yield put({ type: ActionTypes.CANDY_CLICK_FAILURE, error });
    }
  }
  
  
  function* rootSaga() {
    yield takeEvery(ActionTypes.START_GAME, handleStartGame);
    yield takeEvery(ActionTypes.CLICK_CANDY, handleCandyClick);
  }
  
  export default rootSaga;