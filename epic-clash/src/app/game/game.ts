import { Engine, Actor, Color, vec, Input } from "excalibur";
import { Warrior, Mage, Monster, Weapon } from "./characters"; // Asegúrate de que las clases están correctamente importadas

export const initializeGame = (canvasElement: HTMLCanvasElement) => {
  // Tamaño fijo para el juego
  const width = 800; // Ancho fijo
  const height = 400; // Altura fija

  const game = new Engine({
    canvasElement: canvasElement,
    width: width,
    height: height,
    backgroundColor: Color.Azure,
  });

  // Crear un héroe (puede ser Warrior o Mage)
  const hero = new Actor({
    pos: vec(100, height / 2),
    color: Color.Red,
    width: 50,
    height: 50,
  });
  const heroCharacter = new Warrior(new Weapon(10)); // Aquí usamos Warrior, pero también podría ser Mage

  // Velocidad a la que se moverá el héroe
  const speed = 100;

  game.input.keyboard.on("hold", (evt) => {
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

  game.input.keyboard.on("release", () => {
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
        pos: vec(Math.random() * width, Math.random() * height), // Posición aleatoria dentro del canvas
        color: Color.Green,
        width: 50,
        height: 50,
      })
  );

  game.add(hero);
  monsterActors.forEach((monsterActor) => game.add(monsterActor));

  // Lógica para atacar a un monstruo
  game.input.keyboard.on("press", (evt) => {
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

  return game;
};

export const startGame = (game: Engine) => {
  game.start();
};
