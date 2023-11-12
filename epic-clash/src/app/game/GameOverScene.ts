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

export class GameOverScene extends Scene {
  onInitialize(engine: Engine) {
    // Crear un label para el mensaje de Game Over
    const gameOverLabel = new Label({
      text: "Game Over",
      font: new Font({
        family: "PressStart2P",
        size: 48,
        unit: FontUnit.Px,
        textAlign: TextAlign.Center,
      }),
      pos: vec(engine.halfDrawWidth, engine.halfDrawHeight - 100),
      color: Color.White,
    });

    // Agregar el label a la escena
    this.add(gameOverLabel);

    // Crear un botón para regresar al menú
    const menuButton = new Actor({
      pos: vec(engine.halfDrawWidth, engine.halfDrawHeight + 100),
      width: 200,
      height: 40,
      color: Color.Gray,
    });

    // Crear un label para el texto del botón
    const menuButtonLabel = new Label({
      text: "Back to Menu",
      font: new Font({
        family: "PressStart2P",
        size: 24,
        unit: FontUnit.Px,
        textAlign: TextAlign.Center,
      }),
      pos: vec(engine.halfDrawWidth, engine.halfDrawHeight + 95),
      color: Color.White,
    });

    // Habilitar la captura de eventos de puntero para el botón de menú
    menuButton.on("pointerup", () => {
      engine.goToScene("menu"); 
    });

    menuButton.on("pointerenter", () => menuButton.color = Color.DarkGray);
    menuButton.on("pointerleave", () => menuButton.color = Color.Gray);

    // Agregar el botón y el label a la escena
    this.add(menuButton);
    this.add(menuButtonLabel);
  }
}
