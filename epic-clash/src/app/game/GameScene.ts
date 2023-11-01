import { Actor, Color, vec, Scene, Engine, Input } from "excalibur";
import { Warrior, Mage, Monster, Weapon, ICharacter } from "./characters";
import { createCharacters } from "./actors";

export class GameScene extends Scene {
  private heroes: Actor[] = [];
  private heroCharacters: ICharacter[] = [];
  private currentHeroIndex: number = 0; // Índice del héroe actualmente seleccionado
  private monsters: Actor[] = [];
  private monsterCharacters: ICharacter[] = [];

  onInitialize(engine: Engine) {
    const characters = createCharacters(2, 1); // 10 héroes y 1 monstruo

    characters.forEach((character) => {
      const actor = new Actor({
        pos: vec(
          Math.random() * engine.drawWidth,
          Math.random() * engine.drawHeight
        ),
        color: character instanceof Monster ? Color.Green : Color.Red,
        width: 50,
        height: 50,
      });

      if (character instanceof Monster) {
        this.monsters.push(actor);
        this.monsterCharacters.push(character);
      } else {
        this.heroes.push(actor);
        this.heroCharacters.push(character);
      }

      this.add(actor);
    });

    // Velocidad a la que se moverán los héroes
    const speed = 100;

    engine.input.keyboard.on("hold", (evt) => {
      const currentHero = this.heroes[this.currentHeroIndex];
      if (!currentHero) return;

      if (evt.key === Input.Keys.W) {
        currentHero.vel = vec(0, -speed);
      } else if (evt.key === Input.Keys.S) {
        currentHero.vel = vec(0, speed);
      } else if (evt.key === Input.Keys.A) {
        currentHero.vel = vec(-speed, 0);
      } else if (evt.key === Input.Keys.D) {
        currentHero.vel = vec(speed, 0);
      }
    });

    engine.input.keyboard.on("release", () => {
      const currentHero = this.heroes[this.currentHeroIndex];
      if (currentHero) {
        currentHero.vel = vec(0, 0);
      }
    });

    // Cambiar entre héroes
    engine.input.keyboard.on("press", (evt) => {
      if (evt.key === Input.Keys.Left) {
        this.currentHeroIndex = (this.currentHeroIndex - 1 + this.heroes.length) % this.heroes.length;
      } else if (evt.key === Input.Keys.Right) {
        this.currentHeroIndex = (this.currentHeroIndex + 1) % this.heroes.length;
      }

      // Lógica para atacar a un monstruo
      if (evt.key === Input.Keys.C) {
        console.log("Attacking monsters...");
        this.monsters.forEach((monsterActor, index) => {
          const currentHeroCharacter = this.heroCharacters[this.currentHeroIndex];
          if (!currentHeroCharacter) return;

          console.log(`Monster health: ${this.monsterCharacters[index].health}`);
          if (this.heroes[this.currentHeroIndex].pos.distance(monsterActor.pos) < 50) {
            const damage = currentHeroCharacter.attack(this.monsterCharacters[index]);
            console.log(`Damage caused: ${damage}`);
            console.log(`${index} Monster health: ${this.monsterCharacters[index].health}`);

            if (this.monsterCharacters[index].health <= 0) {
              monsterActor.color = Color.Gray;
            }
          }
        });
      }
    });
  }
}
