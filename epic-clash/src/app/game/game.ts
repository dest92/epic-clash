import { Engine, Actor, Color, vec, Scene, Input } from "excalibur";
import { Warrior, Mage, Monster, Weapon } from "./characters"; // Asegúrate de que las clases están correctamente importadas

class MainMenuScene extends Scene {
  onInitialize(engine: Engine) {
    const playButton = new Actor({
      pos: vec(engine.halfDrawWidth, engine.halfDrawHeight),
      width: 100, // Ancho del botón
      height: 40, // Altura del botón
      color: Color.Gray, // Color del botón
    });

    playButton.on("pointerup", () => {
      engine.goToScene("game");
    });

    // Habilitar la captura de eventos de puntero para el botón de Play
    playButton.enableCapturePointer = true;

    this.add(playButton);
  }
}

class GameScene extends Scene {
  onInitialize(engine: Engine) {
    // Crear un héroe (puede ser Warrior o Mage)
    const hero = new Actor({
      pos: vec(100, engine.drawHeight / 2),
      color: Color.Red,
      width: 50,
      height: 50,
    });
    const heroCharacter = new Warrior(new Weapon(10)); // Aquí usamos Warrior, pero también podría ser Mage

    // Velocidad a la que se moverá el héroe
    const speed = 100;

    engine.input.keyboard.on("hold", (evt) => {
      if (evt.key === Input.Keys.W) {
        hero.vel = vec(0, -speed);
      } else if (evt.key === Input.Keys.S) {
        hero.vel = vec(0, speed);
      } else if (evt.key === Input.Keys.A) {
        hero.vel = vec(-speed, 0);
      } else if (evt.key === Input.Keys.D) {
        hero.vel = vec(speed, 0);
      }
    });

    engine.input.keyboard.on("release", () => {
      hero.vel = vec(0, 0);
    });

    // Crear monstruos y sus correspondientes actores
    const monsters = [
      new Monster(50, new Weapon(5)),
      new Monster(50, new Weapon(5)),
      // ... Añadir más monstruos si es necesario
    ];

    const monsterActors = monsters.map(
      (monster) =>
        new Actor({
          pos: vec(
            Math.random() * engine.drawWidth,
            Math.random() * engine.drawHeight
          ), // Posición aleatoria dentro del canvas
          color: Color.Green,
          width: 50,
          height: 50,
        })
    );

    this.add(hero);
    monsterActors.forEach((monsterActor) => this.add(monsterActor));

    // Lógica para atacar a un monstruo
    engine.input.keyboard.on("press", (evt) => {
      if (evt.key === Input.Keys.C) {
        console.log("Attacking monsters...");
        monsterActors.forEach((monsterActor, index) => {
          if (hero.pos.distance(monsterActor.pos) < 50) {
            console.log(monsterActor.pos.distance(hero.pos));
            heroCharacter.attack(monsters[index]); // El héroe ataca al monstruo
            console.log(`Monster health: ${monsters[index].health}`);

            if (monsters[index].health <= 0) {
              monsterActor.color = Color.Gray; // Cambiar color si el monstruo muere
            }
          }
        });
      }
    });
  }
}

export const initializeGame = (canvasElement: HTMLCanvasElement) => {
  const game = new Engine({
    canvasElement: canvasElement,
    width: 800,
    height: 400,
    backgroundColor: Color.Azure,
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
