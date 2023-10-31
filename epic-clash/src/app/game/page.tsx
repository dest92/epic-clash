"use client";
import React, { useRef, useEffect } from "react";
import { Engine } from "excalibur";
import { initializeGame, startGame } from "./game";
import Link from "next/link";

export const GamePage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameRef = useRef<Engine | null>(null);

  const resetGame = () => {
    if (gameRef.current) {
      gameRef.current.stop();
    }
    // Aquí deberías agregar la función cleanUpPlayButtons si es necesario
  };

  useEffect(() => {
    // HMR support
    resetGame();

    // Verifica si el elemento canvas existe
    if (canvasRef.current) {
      // Inicializa y ejecuta el juego
      gameRef.current = initializeGame(canvasRef.current);
      startGame(gameRef.current);
    }

    return resetGame;
  }, []);

  return (
    <>
      <Link href="/">Home</Link>
      <canvas ref={canvasRef}></canvas>
    </>
  );
};

export default GamePage;
