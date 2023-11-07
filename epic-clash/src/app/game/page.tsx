"use client"
import React, { useRef, useEffect } from 'react';
import Layout from '../components/layout';
import { Engine } from 'excalibur';

export default function GamePage() {
  const canvasRef = useRef(null);
  const gameRef = useRef<Engine | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      // Dynamically import the initialize and start functions from your game module
      import("./main").then(({ initializeGame, startGame }) => {
        gameRef.current = initializeGame(canvasRef.current!);
        startGame(gameRef.current);
      });
    }

    // Define a cleanup function in case your component unmounts
    return () => {
      if (gameRef.current) {
        // Assuming your game instance has a method to clean up or stop the game
        gameRef.current.stop();
      }
    };
  }, []);

  return (
    <>
      <div className="fondo-about">
        <Layout home title>
          <div className="flex justify-center items-center mt-20 mb-10">
            <div className="border-8 border-stone-900">
              <canvas ref={canvasRef} className="align-middle" />
            </div>
          </div>
        </Layout>
      </div>
    </>
  );
}
