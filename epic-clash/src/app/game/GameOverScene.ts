import {
  Scene,
  Engine,
  Color,
  Label,
  Font,
  TextAlign,
  vec,
  FontUnit,
  Actor,
} from "excalibur";
import { Images, loader } from "./resources";

export class GameOverScene extends Scene {
  onInitialize(engine: Engine) {
    const background = new Actor({
      pos: vec(engine.halfDrawWidth, engine.halfDrawHeight),
      width: engine.drawWidth + 100,
      height: engine.drawHeight + 100,
    });

    background.graphics.use(Images.gameOverImage.toSprite());

    engine.start(loader);

    // Crear un label para el mensaje de Game Over
    

    // Agregar el label a la escena

    // Crear un botón para regresar al menú
    const menuButton = new Actor({
      pos: vec(engine.halfDrawWidth, engine.halfDrawHeight + 85),
      width: 350,
      height: 50,
      color: Color.Gray,
    });
    menuButton.graphics.use(Images.back.toSprite());

    // Crear un label para el texto del botón
  

    // Habilitar la captura de eventos de puntero para el botón de menú
    menuButton.on("pointerup", () => {
      engine.goToScene("menu");
    });

    menuButton.on("pointerenter", () => (menuButton.color = Color.DarkGray));
    menuButton.on("pointerleave", () => (menuButton.color = Color.Gray));

    // Agregar el botón y el label a la escena

    this.add(background);
    this.add(menuButton);
  }
}
