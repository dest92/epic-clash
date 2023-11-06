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
  private currentMonsterIndex: number = 0; // Índice del héroe actualmente seleccionado
  private currentActor: Actor | null = null; // The actor that currently has control
  private currentTurn: boolean = true; // true for heroes' turn, false for monsters' turn

  onInitialize(engine: Engine) {
    const characters = createCharacters(1, 3); // 2 héroes y 3 monstruos

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
      this.performHeroAttack();
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
      //deberia cambiar el tipo de heroe y el actor
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
      this.currentTurn = true; // Start the heroes' turn
      this.currentActor = this.heroes[0]; // Start with the first hero
    });

    // Velocidad a la que se moverán los héroes

    engine.input.keyboard.on("press", (evt) => {
      // Lógica para atacar a un monstruo con la tecla "C"
      if (evt.key === Input.Keys.C) {
        if (this.currentTurn) {
          this.performHeroAttack();
        } else {
          this.performMonsterAttack();
        }
      }
    });

    this.add(attackButton);
    this.add(changeHeroButton);
    this.add(labelAttack);
    this.add(labelChangeHero);
  }

  update(engine: Engine, delta: number) {
    super.update(engine, delta);

    // //If it's the current actor's turn
    // if (this.currentActor) {
    //   // Allow the actor to perform an action
    //   this.currentActor.rotation = 1;
    // }
  }

  changeTurn() {
    // Si es el turno de los héroes
    if (this.currentTurn) {
      // Pasa al siguiente héroe
      this.currentHeroIndex = (this.currentHeroIndex + 1) % this.heroes.length;
      // Establece el actor actual como el héroe actual
      this.currentActor = this.heroes[this.currentHeroIndex];
    } else {
      // Si es el turno de los monstruos
      // Pasa al siguiente monstruo
      this.currentMonsterIndex =
        (this.currentMonsterIndex + 1) % this.monsters.length;
      // Establece el actor actual como el monstruo actual
      this.currentActor = this.monsters[this.currentMonsterIndex];
    }

    // Cambia el turno
    this.currentTurn = !this.currentTurn;
  }

  scheduleMonsterAttack() {
    // Espera un breve período antes de realizar el ataque del monstruo
    setTimeout(() => {
      this.performMonsterAttack();
    }, 2000); // Espera 1 segundo antes de que el monstruo ataque
  }

  performHeroAttack() {
    const currentHero = this.heroes[this.currentHeroIndex];
    const currentHeroCharacter = this.heroCharacters[this.currentHeroIndex];
    if (!currentHero || !currentHeroCharacter) return;

    console.log(`-> ${currentHeroCharacter.name} is attacking...`);

    // Genera un índice aleatorio para seleccionar un monstruo al azar
    const randomIndex = Math.floor(Math.random() * this.monsters.length);

    const monsterActor = this.monsters[randomIndex];
    const monsterCharacter = this.monsterCharacters[randomIndex];

    const damage = currentHeroCharacter.attack(monsterCharacter);
    console.log(`${monsterCharacter.name} being attacked`);
    console.log(`Damage caused: ${damage}`);
    console.log(`Monster health: ${monsterCharacter.health}`);
    if (monsterCharacter.health <= 0) {
      monsterActor.color = Color.Gray;
    }

    this.changeTurn();
    this.scheduleMonsterAttack();
  }

  performMonsterAttack() {
    console.log("-----Monster turn-----");

    const currentMonsterCharacter =
      this.monsterCharacters[this.currentMonsterIndex];
    if (!currentMonsterCharacter) return;

    console.log(`->${currentMonsterCharacter.name} is attacking...`);

    // Genera un índice aleatorio para seleccionar un héroe al azar
    const randomIndex = Math.floor(Math.random() * this.heroes.length);

    const heroActor = this.heroes[randomIndex];
    const heroCharacter = this.heroCharacters[randomIndex];

    const damage = currentMonsterCharacter.attack(heroCharacter);
    console.log(`${heroCharacter.name} being attacked`);
    console.log(`Damage caused: ${damage}`);
    console.log(`Hero health: ${heroCharacter.health}`);
    if (heroCharacter.health <= 0) {
      heroActor.color = Color.Gray;
    }

    this.changeTurn();
  }
}
