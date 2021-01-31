import React, { useState, useEffect } from "react"
import Slider from 'react-input-slider';
import styles from "./timer.module.css"
import useSound from 'use-sound';
import meditationBell from "../../static/139345096-large-tibetan-meditation-bell-.mp3"


const Timer = () => {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [sliderState, setSliderState] = useState({x: 3});
  const [playMeditationBellSound] = useSound(meditationBell);

  function toggle() {
    setIsActive(!isActive);
  }

  function getMinutesStr() {
    const mins = Math.floor(seconds / 60);
    return mins < 10 ? "0" + mins : mins;
  }

  function getSecondsStr() {
    const secs = seconds % 60;
    return secs < 10 ? "0" + secs : secs;
  }

  function reset() {
    setSeconds(0);
    setIsActive(false);
  }

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          playMeditationBellSound({ forceSoundEnabled: true });
        }
        if ((seconds / 60) >= sliderState.x) {
          playMeditationBellSound({ forceSoundEnabled: true });
          return setIsActive(_ => false);
        }
        return setSeconds(seconds => seconds + 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds, sliderState.x, playMeditationBellSound]);

  return (
    <div className={styles.app}>
      <div className={styles.timer}>
          <div className={styles.description}>
            <h2 className={styles.timerminutes}>{sliderState.x} mín</h2>
          </div>
      </div>
      <Slider
        disabled={isActive}
        axis="x"
        x={sliderState.x}
        xmin={1}
        xmax={20}
        onChange={({ x }) => {
          setSliderState(sliderState => ({ ...sliderState, x }));
        }}
      />
      <div className={styles.time}>
        {getMinutesStr()}:{getSecondsStr()}
      </div>
      <div className={styles.row}>
        <button className={styles.button} onClick={toggle}>
          {isActive ? 'Pause' : 'Start'}
        </button>
        <button className={styles.button} onClick={reset}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default Timer;