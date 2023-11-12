"use client";
import React, { useRef, useState, useEffect } from "react";
import Layout from "../components/layout";
import { Engine } from "excalibur";

export default function GamePage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameInstance, setGameInstance] = useState<Engine | null>(null);

  useEffect(() => {
    let isMounted = true; // Esta bandera determina si el componente está montado

    if (canvasRef.current && !gameInstance) {
      // Importa dinámicamente las funciones de inicialización y arranque del juego
      import("./main").then(({ initializeGame, startGame }) => {
        if (isMounted) {
          // Solo procede si el componente sigue montado
          const engine = initializeGame(canvasRef.current!);
          setGameInstance(engine); // Guarda la instancia del juego en el estado
          startGame(engine);
        }
      });
    }

    // Función de limpieza para cuando el componente se desmonte
    return () => {
      isMounted = false; // Indica que el componente se ha desmontado
      if (gameInstance) {
        // Detén el juego y realiza cualquier limpieza necesaria
        gameInstance.stop();
        setGameInstance(null); // Limpia la instancia del juego
      }
    };
  }, [gameInstance]); // Dependencia: solo re-ejecuta este efecto si gameInstance cambia

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
