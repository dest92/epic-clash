import { Engine, Actor, Color, vec, Input } from "excalibur";

export const initializeGame = (canvasElement: HTMLCanvasElement) => {
  const game = new Engine({
    canvasElement: canvasElement,
    width: 1920,
    height: 600,
    backgroundColor: Color.Azure,
  });

  const hero = new Actor({
    pos: vec(100, 300),
    color: Color.Red,
    width: 50,
    height: 50,
  });

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

  const monsters = [
    new Actor({
      pos: vec(500, 300),
      color: Color.Green,
      width: 50,
      height: 50,
    }),
    new Actor({
      pos: vec(800, 300),
      color: Color.Green,
      width: 50,
      height: 50,
    }),
    // ... Añadir más monstruos si es necesario
  ];

  game.add(hero);
  monsters.forEach((monster) => game.add(monster));

  return game;
};

export const startGame = (game: Engine) => {
  game.start();
};
