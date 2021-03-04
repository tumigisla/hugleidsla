import React, { useState, useEffect } from "react"
import Slider from 'react-input-slider';
import styles from "./timer.module.css"
import meditationBell from "../../static/139345096-large-tibetan-meditation-bell-.mp3"

const Timer = () => {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [sessionStarted, setSessionStarted] = useState(false);
  const [sliderState, setSliderState] = useState({x:10});

  const toggle = () => {
    setIsActive(!isActive);
  }

  const getMinutesStr = () => {
    const mins = Math.floor(seconds / 60);
    return mins < 10 ? "0" + mins : mins;
  }

  const getSecondsStr = () => {
    const secs = seconds % 60;
    return secs < 10 ? "0" + secs : secs;
  }

  const playAudio = () => {
    document.getElementById('meditationAudio').muted = false;
    document.getElementById('meditationAudio').play();
  }

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          playAudio(meditationBell);
          setSessionStarted(true);
        }
        if ((seconds / 60) >= sliderState.x) {
          playAudio(meditationBell);
          return setIsActive(_ => false);
        }
        return setSeconds(seconds => seconds + 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds, sliderState.x, sessionStarted]);

  return (
    <div className={styles.app}>
      <div className={styles.timer}>
          <div className={styles.description}>
            <h2 className={styles.timerminutes}>{sliderState.x} mín</h2>
          </div>
      </div>
      <div className={styles.slider}>
        <Slider
          disabled={sessionStarted}
          axis="x"
          x={sliderState.x}
          xmin={1}
          xmax={30}
          onChange={({ x }) => {
            setSliderState(sliderState => ({ ...sliderState, x }));
          }}
          styles={{
            active: {
              backgroundColor: '#43a49d'
            },
            disabled: {
              opacity: 0.5
            }
          }}
        />
      </div>
      <div className={styles.time}>
        {getMinutesStr()}:{getSecondsStr()}
      </div>
      <div className={styles.row}>
        <button className={styles.button} onClick={toggle}>
          {isActive ? 'Pása' : 'Byrja'}
        </button>
        <audio id='meditationAudio' autoPlay muted>
          <track default kind='captions'></track>
          <source src={meditationBell} type='audio/mpeg' />
        </audio>
      </div>
    </div>
  );
};

export default Timer;