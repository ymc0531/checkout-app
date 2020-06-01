import React, { useState, useEffect, useRef } from "react";

const Timer = ({ minutes } : {minutes :number}) => {
  // initialize timeLeft with the seconds prop
  const [timeLeft, setTimeLeft] = useState(minutes*60);
  const [display, setDisplay] = useState(`${minutes}:00`);

  useEffect(() => {
    // exit early when we reach 0
    if (!timeLeft) return;
    let s, m, sDisplay, mDisplay;
    // save intervalId to clear the interval when the
    // component re-renders
    const intervalId = setInterval(() => {
      m = Math.floor((timeLeft-1) % 3600 / 60);
      s = Math.floor((timeLeft-1) % 3600 % 60);
      setTimeLeft(timeLeft - 1);
      setDisplay(`${m<10?'0':''}${m}:${s<10?'0':''}${s}`)
    }, 1000);

    // clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId);
    // add timeLeft as a dependency to re-rerun the effect
    // when we update it
  }, [timeLeft]);

  return (
    <span>
      {display}
    </span>
  );
};

export default Timer
