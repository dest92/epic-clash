// GameScene.ts
import { Actor, Color, vec, Scene, Engine, Input } from "excalibur";
import { Warrior, Mage, Monster, Weapon, ICharacter } from "./characters";
import { createCharacters } from "./actors";

export class GameScene extends Scene {
  private hero: Actor | null = null;
  private heroCharacter: ICharacter | null = null;
  private monsters: Actor[] = [];
  private monsterCharacters: ICharacter[] = [];

  onInitialize(engine: Engine) {
    const characters = createCharacters(1, 1); // 1 héroe y 3 monstruos

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

      console.log(character.hasWeapon() ? "Has weapon" : "No weapon");

      if (character instanceof Monster) {
        this.monsters.push(actor);
        this.monsterCharacters.push(character);
      } else {
        this.hero = actor;
        this.heroCharacter = character;
      }

      this.add(actor);
    });

    // Velocidad a la que se moverá el héroe
    const speed = 100;

    engine.input.keyboard.on("hold", (evt) => {
      if (this.hero && evt.key === Input.Keys.W) {
        this.hero.vel = vec(0, -speed);
      } else if (this.hero && evt.key === Input.Keys.S) {
        this.hero.vel = vec(0, speed);
      } else if (this.hero && evt.key === Input.Keys.A) {
        this.hero.vel = vec(-speed, 0);
      } else if (this.hero && evt.key === Input.Keys.D) {
        this.hero.vel = vec(speed, 0);
      }
    });

    engine.input.keyboard.on("release", () => {
      if (this.hero) {
        this.hero.vel = vec(0, 0);
      }
    });

    // Lógica para atacar a un monstruo
    // Lógica para atacar a un monstruo
    engine.input.keyboard.on("press", (evt) => {
      if (evt.key === Input.Keys.C) {
        console.log("Attacking monsters...");
        this.monsters.forEach((monsterActor, index) => {
          console.log(
            `Monster health: ${this.monsterCharacters[index].health}`
          );
          // Asegúrate de que tanto hero como heroCharacter no sean null antes de usarlos
          if (
            this.hero &&
            this.heroCharacter &&
            this.hero.pos.distance(monsterActor.pos) < 50
          ) {
            const damage = this.heroCharacter.attack(
              this.monsterCharacters[index]
            );

            // Muestra el daño causado en la consola
            console.log(`Damage caused: ${damage}`);
            console.log(
              `${index} Monster health: ${this.monsterCharacters[index].health}`
            );

            if (this.monsterCharacters[index].health <= 0) {
              monsterActor.color = Color.Gray;
            }
          }
        });
      }
    });
  }
}
