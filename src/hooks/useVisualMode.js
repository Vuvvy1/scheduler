import { useState } from "react";

export const useVisualMode = (initial) => {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  // push current mode to history if replace is false true
  const transition = (newMode, replace = false) => {
    !replace && setHistory((prev) => [...prev, mode]);
    return setMode(newMode);
  };

  // set current mode to last in history array
  const back = () => {
    return setMode(history.pop());
  };

  return { mode, transition, back };
};
