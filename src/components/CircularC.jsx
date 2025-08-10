import React, { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { Animate } from "react-move";
import { easeExpOut } from "d3-ease";
import "react-circular-progressbar/dist/styles.css";

const AnimatedProgressProvider = ({ valueStart, valueEnd, duration, children }) => {
  const [shouldAnimate, setShouldAnimate] = useState(true);

  useEffect(() => {
    setShouldAnimate(false); // 마운트 후 애니메이션 트리거
  }, []);

  return (
    <Animate
      start={() => ({ value: valueStart })}
      update={() => ({
        value: valueEnd,
        timing: { duration: duration, ease: easeExpOut }
      })}
    >
      {({ value }) => children(value)}
    </Animate>
  );
};

const CircularProgress = () => {
  const percent = 66;

  return (
    <div className='w-2/5  h-1/2 m-auto mt-2'>
      <AnimatedProgressProvider
        valueStart={0}
        valueEnd={percent}
        duration={1000} // 1초
      >
        {value => (
          <CircularProgressbar
            value={value}
            text={`${Math.round(value)}%`}
            
            styles={buildStyles({
              textColor: "black",
              pathColor: "#38bdf8", // tailwind sky-400
              trailColor: "#1e293b"  // tailwind slate-800
            })}
          />
        )}
      </AnimatedProgressProvider>
    </div>
  );
};

export default CircularProgress;
