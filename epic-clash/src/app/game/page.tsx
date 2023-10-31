"use client";
import React, { useRef, useEffect } from "react";
import { Engine } from "excalibur";
import { initializeGame, startGame } from "./main";
import Layout from "../components/layout";

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
      <div className=" fondo-about">
        <Layout home={true} title about>
          <div className="flex justify-center items-center mt-10">
            <div className="border-8  border-stone-900">
              <canvas ref={canvasRef} className="align-middle"></canvas>
            </div>
          </div>
        </Layout>
      </div>
    </>
  );
};

export default GamePage;
