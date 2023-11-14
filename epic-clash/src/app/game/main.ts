// main.ts
import { Engine, Color } from "excalibur";
import { MainMenuScene } from "./MainMenu";
import { GameOverScene } from "./GameOverScene";
import { HowToPlayScene } from "./HowToPlayScene";

export const initializeGame = (canvasElement: HTMLCanvasElement) => {
  const game = new Engine({
    canvasElement: canvasElement,
    width: 800,
    height: 400,
    backgroundColor: Color.Azure,
    suppressPlayButton: true,
    suppressConsoleBootMessage: true,
    antialiasing: false,
  });

  // Agregar escenas al juego
  game.add("menu", new MainMenuScene());
  game.add("gameOver", new GameOverScene());
  game.add("howToPlay", new HowToPlayScene());

  // Iniciar con el menú principal
  game.goToScene("menu");

  return game;
};

export const startGame = (game: Engine) => {
  game.start();
};
