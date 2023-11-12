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
} from "excalibur";
import { loader, Images } from "./resources";
import { GameScene } from "./GameScene";

export class MainMenuScene extends Scene {
  onInitialize(engine: Engine) {
    // const spriteSheetImage = new ImageSource("../assets/images/background.png");

    const background = new Actor({
      pos: vec(engine.halfDrawWidth, engine.halfDrawHeight),
      width: engine.drawWidth,
      height: engine.drawHeight,
    });

    background.graphics.use(Images.backgroundImage.toSprite());

    engine.start(loader);

    const playButton = new Actor({
      pos: vec(engine.halfDrawWidth, engine.halfDrawHeight+15),
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
      engine.add("game", new GameScene());
      engine.goToScene("game");
    });

    const label = new Label({
      font: new Font({
        family: "PressStart2P",
        size: 24,
        unit: FontUnit.Px,
        textAlign: TextAlign.Center,
      }),
      text: "Play",
      pos: vec(engine.halfDrawWidth, engine.halfDrawHeight + 10), // Ajustar la posición
      color: Color.Black,
    });

    this.add(background);
    this.add(playButton);
  }
}
