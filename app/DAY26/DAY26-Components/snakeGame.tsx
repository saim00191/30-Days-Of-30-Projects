"use client";

import React, { useState, useEffect, useCallback } from "react";

type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";
type Position = { x: number; y: number };

const GRID_SIZE = 20;
const CELL_SIZE = 20;
const INITIAL_SNAKE: Position[] = [{ x: 10, y: 10 }];
const INITIAL_FOOD: Position = { x: 15, y: 15 };
const INITIAL_DIRECTION: Direction = "RIGHT";
const GAME_SPEED = 270;

export default function SnakeGame() {
  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE);
  const [food, setFood] = useState<Position>(INITIAL_FOOD);
  const [direction, setDirection] = useState<Direction>(INITIAL_DIRECTION);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  const moveSnake = useCallback(() => {
    if (gameOver) return;

    const newSnake = [...snake];
    const head = { ...newSnake[0] };

    switch (direction) {
      case "UP":
        head.y -= 1;
        break;
      case "DOWN":
        head.y += 1;
        break;
      case "LEFT":
        head.x -= 1;
        break;
      case "RIGHT":
        head.x += 1;
        break;
    }

    if (
      head.x < 0 ||
      head.x >= GRID_SIZE ||
      head.y < 0 ||
      head.y >= GRID_SIZE ||
      newSnake.some((segment) => segment.x === head.x && segment.y === head.y)
    ) {
      setGameOver(true);
      return;
    }

    newSnake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
      setScore((prevScore) => prevScore + 1);
      setFood(generateFood(newSnake));
    } else {
      newSnake.pop();
    }

    setSnake(newSnake);
  }, [snake, direction, food, gameOver]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
          setDirection((prev) => (prev !== "DOWN" ? "UP" : prev));
          break;
        case "ArrowDown":
          setDirection((prev) => (prev !== "UP" ? "DOWN" : prev));
          break;
        case "ArrowLeft":
          setDirection((prev) => (prev !== "RIGHT" ? "LEFT" : prev));
          break;
        case "ArrowRight":
          setDirection((prev) => (prev !== "LEFT" ? "RIGHT" : prev));
          break;
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    const gameInterval = setInterval(moveSnake, GAME_SPEED);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
      clearInterval(gameInterval);
    };
  }, [moveSnake]);

  useEffect(() => {
    if (gameOver && score > highScore) {
      setHighScore(score);
    }
  }, [gameOver, score, highScore]);

  const generateFood = (snake: Position[]): Position => {
    let newFood: Position;
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
    } while (
      snake.some(
        (segment) => segment.x === newFood.x && segment.y === newFood.y
      )
    );
    return newFood;
  };

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setFood(INITIAL_FOOD);
    setDirection(INITIAL_DIRECTION);
    setGameOver(false);
    setScore(0);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-4">
      <h1 className="text-4xl font-bold mb-4 text-white">Snake Game</h1>
      <div className="mb-4 text-xl text-white">
        <span className="font-bold">Score:</span> {score} |{" "}
        <span className="font-bold">High Score:</span> {highScore}
      </div>
      <div
        className="bg-gray-800 border-4 border-green-500 rounded-lg shadow-lg overflow-hidden"
        style={{
          width: `${CELL_SIZE * GRID_SIZE}px`,
          height: `${CELL_SIZE * GRID_SIZE}px`,
        }}
      >
        {gameOver ? (
          <div className="flex flex-col items-center justify-center h-full bg-black bg-opacity-80">
            <p className="text-white text-2xl font-bold mb-4">Game Over!</p>
            <button
              onClick={resetGame}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
            >
              Play Again
            </button>
          </div>
        ) : (
          <div className="relative w-full h-full">
            {snake.map((segment, index) => (
              <div
                key={index}
                className="absolute bg-green-500 rounded-sm"
                style={{
                  width: `${CELL_SIZE}px`,
                  height: `${CELL_SIZE}px`,
                  left: `${segment.x * CELL_SIZE}px`,
                  top: `${segment.y * CELL_SIZE}px`,
                }}
              />
            ))}
            <div
              className="absolute bg-red-500 rounded-full"
              style={{
                width: `${CELL_SIZE}px`,
                height: `${CELL_SIZE}px`,
                left: `${food.x * CELL_SIZE}px`,
                top: `${food.y * CELL_SIZE}px`,
              }}
            />
          </div>
        )}
      </div>
      <div className="mt-4 text-gray-400 text-center">
        Use arrow keys to control the snake
      </div>
      <div className="mt-4 grid grid-cols-4 gap-2">
        <button
          onClick={() =>
            setDirection((prev) => (prev !== "DOWN" ? "UP" : prev))
          }
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          ↑
        </button>
        <button
          onClick={() =>
            setDirection((prev) => (prev !== "UP" ? "DOWN" : prev))
          }
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          ↓
        </button>
        <button
          onClick={() =>
            setDirection((prev) => (prev !== "RIGHT" ? "LEFT" : prev))
          }
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          ←
        </button>
        <button
          onClick={() =>
            setDirection((prev) => (prev !== "LEFT" ? "RIGHT" : prev))
          }
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          →
        </button>
      </div>
    </div>
  );
}
