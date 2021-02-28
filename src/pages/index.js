import React from "react"
import Container from "../components/container"
import Timer from "../components/timer"
import {Helmet} from "react-helmet";

export default function Home() {
  return (
    <Container>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Hugleiðsla</title>
        <link rel="canonical" href="https://hugleidsla.tumigisla.is" />
      </Helmet>
      <h1>Hugleiðsla</h1>
      <Timer/>
    </Container>
  )
}