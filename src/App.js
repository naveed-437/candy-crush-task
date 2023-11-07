// App.js
import React from "react";
import CandyBurst from "./components/candyBurst";
import { Provider } from "react-redux";
import store from "./redux";

const App = () => {
  return (
    <Provider store={store}>
      <title>Naveed</title>
      <div className="App">
        <h1 className="ad">Candy Burst Game</h1>
        <CandyBurst />
      </div>
    </Provider>
  );
};

export default App;
