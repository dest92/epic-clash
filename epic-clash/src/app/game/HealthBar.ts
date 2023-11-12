import { Actor, Color, Engine, Font, FontUnit, Label, Vector } from "excalibur";

class HealthBar extends Actor {
  private label: Label;
  private maxHealth: number;
  private currentHealth: number;

  constructor(maxHealth: number, initialHealth: number, pos: Vector) {
    super({
      pos: pos,
      width: 100, // Ancho inicial de la barra de vida
      height: 10,
      color: Color.Green,
    });
    this.maxHealth = maxHealth;
    this.currentHealth = initialHealth;

    // Crear una etiqueta para mostrar la salud actual
    this.label = new Label({
      text: `${this.currentHealth} / ${this.maxHealth}`,
      font: new Font({
        size: 10,
        unit: FontUnit.Px,
        family: "PressStart2P",
      }),
      pos: pos.add(new Vector(0, -20)), // Posición de la etiqueta encima de la barra de vida
      color: Color.White,
    });
  }

  // Actualizar la barra de vida
  public updateHealth(currentHealth: number) {
    this.currentHealth = currentHealth;
    this.label.text = `${this.currentHealth} / ${this.maxHealth}`;
    // Ajustar la escala de la barra de vida basada en la salud actual
    this.scale.setTo(this.currentHealth / this.maxHealth, 1);

    // Cambiar el color de la barra de vida basado en la salud actual
    if (this.currentHealth < this.maxHealth / 2) {
      this.color = Color.Yellow;
    }
    if (this.currentHealth < this.maxHealth / 4) {
      this.color = Color.Red;
    }
  }

  // Sobrescribir el método onInitialize para agregar la etiqueta al motor
  onInitialize(engine: Engine) {
    engine.add(this.label);
  }
}

export default HealthBar;
