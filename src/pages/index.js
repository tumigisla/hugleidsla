import React from "react"
import MeditationTimer from "../components/meditationTimer"
import Container from "../components/container"

export default function Home() {
  return (
    <Container>
      <h1>Hugleiðsla</h1>
      <MeditationTimer
        timerminutes="3"
        player="Here comes a player..."
      />
    </Container>
  )
}