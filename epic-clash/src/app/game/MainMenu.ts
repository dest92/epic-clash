// MainMenuScene.ts
"use client";

import {
  Actor,
  Color,
  vec,
  Scene,
  Engine,
  Text,
  Font,
  FontUnit,
  Label,
  TextAlign,
  Sound,
  SceneActivationContext,
} from "excalibur";
import { loader, Images } from "./resources";
import { GameScene } from "./GameScene";
import { gameOverSound } from "./GameOverScene";
export const backgroundSounds = new Sound("../assets/sounds/title.wav");

export class MainMenuScene extends Scene {
  onActivate(_context: SceneActivationContext<unknown>): void {
    if (gameOverSound.isLoaded()) {
      gameOverSound.stop();
    }
  }
  onInitialize(engine: Engine) {
    // const spriteSheetImage = new ImageSource("../assets/images/background.png");

    const background = new Actor({
      pos: vec(engine.halfDrawWidth, engine.halfDrawHeight),
      width: engine.drawWidth,
      height: engine.drawHeight,
    });

    background.graphics.use(Images.backgroundImage.toSprite());

    loader.addResource(backgroundSounds);

    engine.start(loader);

    backgroundSounds.loop = true;
    backgroundSounds.volume = 0.1;

    const playButton = new Actor({
      pos: vec(engine.halfDrawWidth, engine.halfDrawHeight + 15),
      width: 150, // Ancho del botón
      height: 40, // Altura del botón
      color: Color.Gray, // Color del botón
    });

    // Habilitar la captura de eventos de puntero para el botón de Play
    // @ts-ignore
    playButton.enableCapturePointer = true;

    playButton.graphics.use(Images.play.toSprite());
    playButton.on("pointerenter", () => {
      playButton.color = Color.Yellow;
    });

    // playButton.on("pointerleave", () => {
    //   playButton.color = Color.Gray;
    // });

    playButton.on("pointerup", () => {
      if (backgroundSounds.isLoaded() && !backgroundSounds.isPlaying()) {
        backgroundSounds.play();
      }
      engine.add("game", new GameScene());
      engine.goToScene("game");
    });

    this.add(background);
    this.add(playButton);
  }
}
