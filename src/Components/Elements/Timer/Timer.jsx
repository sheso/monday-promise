import "./Timer.css";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const renderTime = ({ remainingTime }) => {
  if (remainingTime === 0) {
    return <div className="timer">Время вышло</div>;
  }

  return (
    <div className="timer">
      <div className="text">Осталось</div>
      <div className="value">{remainingTime}</div>
      <div className="text">часов</div>
    </div>
  );
};

const Timer = ({ duration, initialRemainingTime, remainingDays }) => {
  return (
    <div className="timer">
      <div className="timer-wrapper">
        <CountdownCircleTimer
          isPlaying
          duration={duration}
					initialRemainingTime={initialRemainingTime}
          colors={[["#008000", 0.33], ["#ffff00", 0.33], ["#ff0000"]]}
          onComplete={() => [true, 1000]}
        >
          <div className="timer">
						<div className="text">Осталось</div>
						<div className="value">{remainingDays}</div>
						<div className="text">дней</div>
					</div>
        </CountdownCircleTimer>
      </div>
    </div>
  );
};

export default Timer;
