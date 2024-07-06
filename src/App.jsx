import React, { useState, useRef } from "react";
import "./App.css";

function App() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [finalTime, setFinalTime] = useState(null);
  const startTimeRef = useRef(null);
  const timerRef = useRef(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleStartPause = () => {
    if (isRunning) {
      clearInterval(timerRef.current);
    } else {
      setFinalTime(null); // Clear final time when starting the timer
      startTimeRef.current = Date.now() - time;
      timerRef.current = setInterval(() => {
        setTime(Date.now() - startTimeRef.current);
      }, 10); // Update every 10 milliseconds
    }
    setIsRunning(!isRunning);
  };

  const handleStop = () => {
    clearInterval(timerRef.current);
    setIsRunning(false);
    setFinalTime(time); // Store the final elapsed time
    setTime(0);
  };

  const handleReset = () => {
    clearInterval(timerRef.current);
    setTime(0);
    setFinalTime(null); // Clear final time when resetting
    if (isRunning) {
      startTimeRef.current = Date.now();
      timerRef.current = setInterval(() => {
        setTime(Date.now() - startTimeRef.current);
      }, 10); // Update every 10 milliseconds
    }
  };
  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
  };
  const formatTime = (time) => {
    const milliseconds = Math.floor((time / 10) % 100);
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    const hours = Math.floor((time / (1000 * 60 * 60)) % 24);

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(seconds).padStart(2, "0")}:${String(milliseconds).padStart(
      2,
      "0"
    )}`;
  };

  return (
    <div className={`App ${isDarkMode ? "dark-mode" : "light-mode"}`}>
      <button className="theme-toggle" onClick={handleThemeToggle}>
        {isDarkMode ? "🌞" : "🌜"}
      </button>
      <div className="stopwatch">
        <h1>Stopwatch</h1>
        <div className="timer">
          {finalTime !== null ? formatTime(finalTime) : formatTime(time)}
        </div>
        <div className="buttons">
          <button className="start" onClick={handleStartPause}>
            {isRunning ? "Pause" : "Start"}
          </button>
          <button className="stop" onClick={handleStop}>
            Stop
          </button>
          <button className="reset" onClick={handleReset}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
