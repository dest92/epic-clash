// main.ts
import { Engine, Color } from "excalibur";
import { MainMenuScene } from "./MainMenu";
import { GameScene } from "./GameScene";

export const initializeGame = (canvasElement: HTMLCanvasElement) => {
  const game = new Engine({
    canvasElement: canvasElement,
    width: 800,
    height: 400,
    backgroundColor: Color.Azure,
    suppressPlayButton: true,
  });

  // Agregar escenas al juego
  game.add("menu", new MainMenuScene());
  game.add("game", new GameScene());

  // Iniciar con el menú principal
  game.goToScene("menu");

  return game;
};

export const startGame = (game: Engine) => {
  game.start();
};
