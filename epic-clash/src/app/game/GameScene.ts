"use client";
import {
  Actor,
  Color,
  Font,
  FontUnit,
  TextAlign,
  vec,
  Scene,
  Engine,
  Label,
  SceneActivationContext,
  Vector,
} from "excalibur";
import { Warrior, Mage, Monster, Weapon, ICharacter } from "./characters";
import { Images, loader } from "./resources";
import HealthBar from "./HealthBar";

import { createCharacters, getRandomName } from "./actors";
export class GameScene extends Scene {
  private heroes: Actor[] = [];
  private heroCharacters: ICharacter[] = [];
  private currentHeroIndex: number = 0; // Índice del héroe actualmente seleccionado
  private monsters: Actor[] = [];
  private monsterCharacters: ICharacter[] = [];
  private currentMonsterIndex: number = 0; // Índice del héroe actualmente seleccionado
  private currentActor: Actor | null = null; // The actor that currently has control
  private currentTurn: boolean = true; // true for heroes' turn, false for monsters' turn
  private heroHealthBars: HealthBar[] = [];
  private monsterHealthBars: HealthBar[] = [];

  private changeHeroType() {
    // Obtén el héroe actual y su barra de salud
    let currentHero = this.heroCharacters[this.currentHeroIndex];
    console.log(`currentHero: ${currentHero.name}`);
    // Determina el nuevo tipo de héroe
    let newHeroType = currentHero instanceof Warrior ? Mage : Warrior;

    // Crea una nueva instancia del nuevo tipo de héroe con el mismo nombre y salud
    let newHero = new newHeroType(currentHero.name);
    let isMage;
    if (newHero instanceof Mage) {
      isMage = true;
    } else {
      isMage = false;
    }
    newHero.name = getRandomName(isMage ? "wizard" : "warrior");
    newHero.health = currentHero.health;
    newHero.weapon = currentHero.weapon; // Asegúrate de que el mago no reciba un arma
    console.log(`newHero: ${newHero.name}`);
    // Si el nuevo héroe es un mago, asegúrate de que no tenga un arma
    if (newHero instanceof Mage) {
      newHero.weapon = undefined;
    }

    // Actualiza la referencia en el arreglo de héroes
    this.heroCharacters[this.currentHeroIndex] = newHero;

    // Actualiza la posición y la salud de la barra de salud
  }

  private checkGameOver() {
    console.log("Checking game over...");
    if (this.heroCharacters.length === 0) {
      const label = this.createGameOverLabel("Monsters win! Game Over.");
      this.engine.add(label);
      setTimeout(() => this.engine.goToScene("gameOver"), 2000);
    } else if (this.monsterCharacters.length === 0) {
      const label = this.createGameOverLabel("Heroes win! Game Over.");
      this.engine.add(label);
      setTimeout(() => this.engine.goToScene("gameOver"), 2000);
    }
  }

  private nextHero() {
    this.currentHeroIndex =
      (this.currentHeroIndex + 1) % this.heroCharacters.length;
    this.updateCurrentHero();
  }

  // Método para cambiar al héroe anterior
  private previousHero() {
    this.currentHeroIndex =
      (this.currentHeroIndex - 1 + this.heroCharacters.length) %
      this.heroCharacters.length;
    this.updateCurrentHero();
  }

  // Método para actualizar el héroe actual
  private updateCurrentHero() {
    // Aquí puedes agregar lógica para actualizar la UI con la información del nuevo héroe seleccionado
    // Por ejemplo, si muestras el nombre o la salud del héroe en la UI, deberías actualizar esos elementos aquí

    // También puedes resaltar el héroe seleccionado para que el jugador sepa cuál está controlando
    this.heroes.forEach((hero, index) => {
      if (index === this.currentHeroIndex) {
        hero.color = Color.Yellow; // Color de resaltado para el héroe seleccionado
      } else {
        hero.color = Color.Red; // Color normal para los otros héroes
      }
    });
  }
  private createGameOverLabel = (message: string) => {
    const gameOverLabel = new Label({
      text: message,
      color: Color.White,
      pos: vec(this.engine.halfDrawWidth, this.engine.halfDrawHeight),
      font: new Font({
        family: "PressStart2P",
        size: 24,
        unit: FontUnit.Px,
        textAlign: TextAlign.Center,
      }),
    });

    return gameOverLabel;
  };

  onActivate(_context: SceneActivationContext<unknown>): void {
    console.log("GameScene activated");
  }

  onInitialize(engine: Engine) {
    const background = new Actor({
      pos: vec(engine.halfDrawWidth, engine.halfDrawHeight),
      width: engine.drawWidth + 100,
      height: engine.drawHeight + 100,
    });

    background.graphics.use(Images.inGame.toSprite());

    engine.start(loader);
    this.add(background);
    const characters = createCharacters(2, 3);
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
      this.changeHeroType();
    });

    engine.input.keyboard.on("press", (evt) => {
      if (evt.key === "ArrowRight") {
        // Cambiar al siguiente héroe
        this.nextHero();
      } else if (evt.key === "ArrowLeft") {
        // Cambiar al héroe anterior
        this.previousHero();
      }
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

      const healthBar = new HealthBar(
        100,
        character.health,
        new Vector(actor.pos.x, actor.pos.y - 50)
      );
      this.add(healthBar);
      if (character instanceof Monster) {
        this.monsters.push(actor);
        this.monsterCharacters.push(character);
        this.monsterHealthBars.push(healthBar);
      } else {
        this.heroes.push(actor);
        this.heroCharacters.push(character);
        this.heroHealthBars.push(healthBar);
      }
      this.add(actor);
      console.log(character.name);

      this.currentTurn = true; // Start the heroes' turn
      this.currentActor = this.heroes[0]; // Start with the first hero
    });

    this.showWeapon();

    this.add(attackButton);
    this.add(changeHeroButton);
    this.add(labelAttack);
    this.add(labelChangeHero);
  }

  update(engine: Engine, delta: number) {
    super.update(engine, delta);
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
    this.checkGameOver();

    setTimeout(() => {
      this.performMonsterAttack();
    }, 2000); // Espera 1 segundo antes de que el monstruo ataque
  }

  performHeroAttack() {
    console.log("-----Heroes turn-----");
    this.heroes.map((currentHero, index) => {
      const currentHeroCharacter = this.heroCharacters[index];
      if (!currentHero || !currentHeroCharacter) return;

      console.log(`-> ${currentHeroCharacter.name}${index} is attacking...`);

      // Genera un índice aleatorio para seleccionar un monstruo al azar
      const randomIndex = Math.floor(Math.random() * this.monsters.length);

      const monsterActor = this.monsters[randomIndex];
      const monsterCharacter = this.monsterCharacters[randomIndex];

      const damage = currentHeroCharacter.attack(monsterCharacter);
      console.log(
        `${monsterCharacter.name}:${this.currentMonsterIndex} being attacked`
      );
      const monsterHealthBar = this.monsterHealthBars[randomIndex];
      monsterHealthBar.updateHealth(monsterCharacter.health);
      console.log(`Damage caused: ${damage}`);
      console.log(`Monster health: ${monsterCharacter.health}`);
      if (monsterCharacter.health <= 0) {
        monsterActor.color = Color.Gray;
        monsterActor.kill();
        // Elimina el monstruo de la lista después de que haya sido "muerto"
        if (monsterActor.isKilled()) {
          this.monsters.splice(randomIndex, 1);
          this.monsterCharacters.splice(randomIndex, 1);

          // Drop Weapon del Warrior que muere.
          if (
            currentHeroCharacter instanceof Warrior &&
            !currentHeroCharacter.hasDroppedWeapon &&
            currentHeroCharacter.hasWeapon()
          ) {
            // console.log(`currentHeroCharacter instanceof Warrior: ${currentHeroCharacter instanceof Warrior}`);
            // console.log(`currentHeroCharacter.hasDroppedWeapon: ${currentHeroCharacter.hasDroppedWeapon}`);
            // console.log(`currentHeroCharacter.hasWeapon(): ${currentHeroCharacter.hasWeapon()}`);

            console.log(
              ` *********${currentHeroCharacter.name} dropped a weapon...`
            );
            const weapon = currentHeroCharacter.dropWeapon();
            console.log(` weapon with ${weapon?.damage} damage dropped...`);

            // Get an array of all heroes except the one that dropped the weapon
            const heroesExceptCurrent = this.heroCharacters.filter(
              (hero) => hero !== currentHeroCharacter
            );

            // If there are heroes left, select a random hero to receive the weapon
            if (heroesExceptCurrent.length > 0) {
              let randomIndex = Math.floor(
                Math.random() * heroesExceptCurrent.length
              );
              let heroToReceiveWeapon = heroesExceptCurrent[randomIndex];
              heroToReceiveWeapon.pickWeapon(weapon);
              console.log(
                `weapon with ${weapon?.damage} damage dropped and given to ${heroToReceiveWeapon.name}...`
              );
            }
          }
        }

        this.checkGameOver();
      }
    });

    this.changeTurn();
    this.scheduleMonsterAttack();
  }

  performMonsterAttack() {
    console.log("-----Monster turn-----");

    this.monsterCharacters.map((currentMonsterCharacter) => {
      if (!currentMonsterCharacter) return;

      console.log(`->${currentMonsterCharacter.name} is attacking...`);

      // Genera un índice aleatorio para seleccionar un héroe al azar
      const randomIndex = Math.floor(Math.random() * this.heroes.length);

      const heroActor = this.heroes[randomIndex];
      const heroCharacter = this.heroCharacters[randomIndex];

      const damage = currentMonsterCharacter.attack(heroCharacter);
      const heroHealthBar = this.heroHealthBars[randomIndex];
      heroHealthBar.updateHealth(heroCharacter.health);
      console.log(`${heroCharacter.name} being attacked`);
      console.log(`Damage caused: ${damage}`);
      console.log(`Hero health: ${heroCharacter.health}`);
      if (heroCharacter.health <= 0) {
        heroActor.color = Color.Gray;
        console.log(` ///Has Died: ${heroCharacter.name}...`);
        heroActor.kill();
        if (heroActor.isKilled()) {
          this.heroes.splice(randomIndex, 1);
          this.heroCharacters.splice(randomIndex, 1);
          console.log("heros alive " + this.heroCharacters.length);

          // Drop Weapon del Monster que muere.
          if (
            currentMonsterCharacter instanceof Monster &&
            !currentMonsterCharacter.hasDroppedWeapon &&
            currentMonsterCharacter.hasWeapon()
          ) {
            // console.log(`currentHeroCharacter instanceof Warrior: ${currentMonsterCharacter instanceof Monster}`);
            // console.log(`currentHeroCharacter.hasDroppedWeapon: ${currentMonsterCharacter.hasDroppedWeapon}`);
            // console.log(`currentHeroCharacter.hasWeapon(): ${currentMonsterCharacter.hasWeapon()}`);

            console.log(
              ` ****${currentMonsterCharacter.name} dropped a weapon...`
            );
            const weapon = currentMonsterCharacter.dropWeapon();

            // Get an array of all monsters except the one that dropped the weapon
            const monstersExceptCurrent = this.monsterCharacters.filter(
              (monster) => monster !== currentMonsterCharacter
            );

            // If there are monsters left, select a random monster to receive the weapon
            if (monstersExceptCurrent.length > 0) {
              let randomIndex = Math.floor(
                Math.random() * monstersExceptCurrent.length
              );
              let monsterToReceiveWeapon = monstersExceptCurrent[randomIndex];
              monsterToReceiveWeapon.pickWeapon(weapon);
              console.log(
                `weapon with ${weapon?.damage} damage dropped and given to ${monsterToReceiveWeapon.name}...`
              );
            }
          }
        }
      }
    });

    this.changeTurn();
  }

  showWeapon() {
    this.heroCharacters.map((currentHero, index) => {
      const heroActor = this.heroes[index];

      if (currentHero.hasWeapon()) {
        heroActor.color = Color.fromHex("fa7c5f");
        console.log(`${currentHero.name} has a Weapon `);
      }
      console.log(`and ${currentHero.health} of Health `);
    });
    this.monsterCharacters.map((currentMonster, index) => {
      const monsterActor = this.monsters[index];
      if (currentMonster.hasWeapon()) {
        monsterActor.color = Color.fromHex("9cff86");
        console.log(`${currentMonster.name} has a Weapon `);
      }
      console.log(`and ${currentMonster.health} of Health `);
    });
  }
}
