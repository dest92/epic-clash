// MainMenuScene.ts
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

    const text = new Text({
      text: "EPIC CLASH",
      color: Color.Orange,
      font: new Font({ size: 48, unit: FontUnit.Px, family: "PressStart2P" }),
    });

    const actorText = new Actor({ pos: vec(engine.halfDrawWidth, 150) });
    actorText.graphics.add(text);

    const playButton = new Actor({
      pos: vec(engine.halfDrawWidth, engine.halfDrawHeight),
      width: 150, // Ancho del botón
      height: 40, // Altura del botón
      color: Color.Gray, // Color del botón
    });

    // Habilitar la captura de eventos de puntero para el botón de Play
    playButton.enableCapturePointer = true;

    playButton.on("pointerenter", () => {
      playButton.color = Color.Yellow;
    });

    playButton.on("pointerleave", () => {
      playButton.color = Color.Gray;
    });

    playButton.on("pointerup", () => {
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
    this.add(label);
    this.add(actorText);
  }
}
