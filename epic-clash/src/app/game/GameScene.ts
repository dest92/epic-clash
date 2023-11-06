import {
  Actor,
  Color,
  Text,
  Font,
  FontUnit,
  TextAlign,
  vec,
  Scene,
  Engine,
  Input,
  Label,
} from "excalibur";
import { Warrior, Mage, Monster, Weapon, ICharacter } from "./characters";
import { createCharacters } from "./actors";

export class GameScene extends Scene {
  private heroes: Actor[] = [];
  private heroCharacters: ICharacter[] = [];
  private currentHeroIndex: number = 0; // Índice del héroe actualmente seleccionado
  private monsters: Actor[] = [];
  private monsterCharacters: ICharacter[] = [];

  onInitialize(engine: Engine) {
    const attackButton = new Actor({
      pos: vec(engine.halfDrawWidth + 330, engine.halfDrawHeight + 170),
      width: 130,
      height: 30,
      color: Color.Red,
    });

    attackButton.on("pointerenter", () => {
      attackButton.color = Color.White;
    });

    attackButton.on("pointerleave", () => {
      attackButton.color = Color.Red;
    });

    attackButton.on("pointerup", () => {
      console.log("Attacking monsters...");
      this.monsters.forEach((monsterActor, index) => {
        const currentHeroCharacter = this.heroCharacters[this.currentHeroIndex];
        if (!currentHeroCharacter) return;

        console.log(`Monster health: ${this.monsterCharacters[index].health}`);
        if (
          this.heroes[this.currentHeroIndex].pos.distance(monsterActor.pos) < 50
        ) {
          const damage = currentHeroCharacter.attack(
            this.monsterCharacters[index]
          );
          console.log(`Damage caused: ${damage}`);
          console.log(
            `${index} Monster health: ${this.monsterCharacters[index].health}`
          );

          if (this.monsterCharacters[index].health <= 0) {
            monsterActor.color = Color.Gray;
          }
        }
      });
    });

    const labelAttack = new Label({
      font: new Font({
        family: "PressStart2P",
        size: 16,
        unit: FontUnit.Px,
        textAlign: TextAlign.Center,
      }),
      text: "Attack",
      pos: vec(engine.halfDrawWidth + 330, engine.halfDrawHeight + 180),
      color: Color.Black,
    });

    const changeHeroButton = new Actor({
      pos: vec(engine.halfDrawWidth + 300, engine.halfDrawHeight + 120),
      width: 180,
      height: 30,
      color: Color.Green,
    });

    changeHeroButton.on("pointerenter", () => {
      changeHeroButton.color = Color.White;
    });

    changeHeroButton.on("pointerleave", () => {
      changeHeroButton.color = Color.Green;
    });

    changeHeroButton.on("pointerup", () => {
      this.currentHeroIndex = (this.currentHeroIndex + 1) % this.heroes.length;
    });

    const labelChangeHero = new Label({
      font: new Font({
        family: "PressStart2P",
        size: 16,
        unit: FontUnit.Px,
        textAlign: TextAlign.Center,
      }),
      text: "Change Hero",
      pos: vec(engine.halfDrawWidth + 300, engine.halfDrawHeight + 130),
      color: Color.Black,
    });

    const characters = createCharacters(1, 3);

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
        this.currentHeroIndex =
          (this.currentHeroIndex - 1 + this.heroes.length) % this.heroes.length;
      } else if (evt.key === Input.Keys.Right) {
        this.currentHeroIndex =
          (this.currentHeroIndex + 1) % this.heroes.length;
      }

      // Lógica para atacar a un monstruo
      if (evt.key === Input.Keys.C) {
        console.log("Attacking monsters...");
        this.monsters.forEach((monsterActor, index) => {
          const currentHeroCharacter =
            this.heroCharacters[this.currentHeroIndex];
          if (!currentHeroCharacter) return;

          console.log(
            `Monster health: ${this.monsterCharacters[index].health}`
          );
          if (
            this.heroes[this.currentHeroIndex].pos.distance(monsterActor.pos) <
            50
          ) {
            const damage = currentHeroCharacter.attack(
              this.monsterCharacters[index]
            );
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

    this.add(attackButton);
    this.add(changeHeroButton);
    this.add(labelAttack);
    this.add(labelChangeHero);
  }
}
