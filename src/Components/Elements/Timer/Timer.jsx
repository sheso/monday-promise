import "./Timer.css";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const Timer = ({ duration, initialRemainingTime, remainingDays, word }) => {
  return (
    <div className="timer">
      <div className="timer-wrapper">
        <CountdownCircleTimer
          isPlaying
          duration={duration}
					initialRemainingTime={initialRemainingTime}
          colors={[["#26b926", 0.33], ["#ffff00", 0.33], ["#ff0000"]]}
          onComplete={() => [true, 1000]}
        >
          <div className="timer">
						<div className="text">Осталось</div>
						<div className="value">{remainingDays}</div>
						<div className="text">{word}</div>
					</div>
        </CountdownCircleTimer>
      </div>
    </div>
  );
};

export default Timer;
