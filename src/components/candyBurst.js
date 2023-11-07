// CandyBurst.js
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { startGame, clickCandy } from "../redux/actions";
import "./candyBurst.css"; // Import the CSS file

const CandyBurst = () => {
    const dispatch = useDispatch();
    const { gamesPlayed, gamesWon, gamesLost, score, candyGrid } = useSelector(
        (state) => state
    );
    function getRandomNumber() {
        // Generate a random decimal between 0 (inclusive) and 1 (exclusive)
        const randomDecimal = Math.random();

        // Decide whether to return a 1-digit or 2-digit number
        if (randomDecimal < 0.9) {
            // Return a random 1-digit number
            console.log(Math.floor(randomDecimal * 9) + 1);
            return Math.floor(randomDecimal * 9) + 1; // Random number between 1 and 9
        } else {
            // Return a random 2-digit number
            console.log(Math.floor(randomDecimal * 90) + 10);
            return Math.floor(randomDecimal * 90) + 10; // Random number between 10 and 99
        }
    }
    const handleStartGame = () => {
        dispatch(startGame());
    };

    const handleCandyClick = (row, col) => {
        dispatch(clickCandy(row, col));
    };

    const renderCandyGrid = () => {
        return candyGrid.map((row, rowIndex) => (
            <div key={rowIndex} className="candy-row">
                {row.map((candy, colIndex) => (
                    <div
                        key={`${rowIndex}-${colIndex}`} // Use a unique key based on row and col indices
                        className={`candy ${candy.color}`}
                        onClick={() => handleCandyClick(rowIndex, colIndex)}
                    >{``}</div>
                ))}
            </div>
        ));
    };

    return (
        <div className="container">
            <div>
                <strong>Games Played:</strong> {gamesPlayed}
            </div>
            <div>
                <strong>Games Won:</strong> {getRandomNumber()}
            </div>
            <div>
                <strong>Games Lost:</strong> {getRandomNumber()}
            </div>
            <div>
                <strong>Score:</strong> {score}
            </div>

            <button onClick={handleStartGame} className="gap">Start Game</button>
            <div className="candy-grid">{renderCandyGrid()}</div>
        </div>
    );
};

export default CandyBurst;
