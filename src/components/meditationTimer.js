import React from "react"
import styles from "./meditationTimer.module.css"

export default function MeditationTimer(props) {
    return (
        <div className={styles.timer}>
            <div className={styles.description}>
            <h2 className={styles.timerminutes}>{props.timerminutes} minutes</h2>
            <p className={styles.player}>{props.player}</p>
            </div>
        </div>
    )
}