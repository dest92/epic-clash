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
  BaseAlign,
} from "excalibur";
import { Warrior, Mage, Monster, Weapon, ICharacter } from "./characters";
import { Images, Warriors, loader, Monsters, Mages } from "./resources";
import HealthBar from "./HealthBar";

import {
  createCharacters,
  getRandomInt,
  getRandomName,
  hasWeapon,
} from "./actors";
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
    let currentActor = this.heroes[this.currentHeroIndex];
    console.log(`currentHero: ${currentHero.name}`);
    // Determina el nuevo tipo de héroe
    let newHeroType = currentHero instanceof Warrior ? Mage : Warrior;

    // Crea una nueva instancia del nuevo tipo de héroe con el mismo nombre y salud
    let newHero = new newHeroType(currentHero.name);
    let isMage;
    if (newHero instanceof Mage) {
      isMage = true;
      const assets = [Mages.mage, Mages.mage2, Mages.mage3];
      const attackAssets = [
        Mages.mageAttack,
        Mages.mage2Attack,
        Mages.mage3Attack,
      ];
      const randomIndex = getRandomInt(0, assets.length - 1);

      const mageAsset = assets[randomIndex];
      const attackGraphic = attackAssets[randomIndex];

      const graphic = mageAsset;
      graphic.width = 300;
      graphic.height = 300;
      currentActor.scale = new Vector(
        mageAsset === Mages.mage2 ? 1 : 2,
        mageAsset === Mages.mage2 ? 1 : 2
      );
      currentActor.graphics.use(graphic.toAnimation(100));
      currentActor.graphics.add("idle", graphic.toAnimation(100));
      currentActor.graphics.add("attack", attackGraphic.toAnimation(120));
    } else {
      isMage = false;
      const assets = [
        Warriors.warrior,
        Warriors.warrior2,
        Warriors.knight,
        Warriors.archer,
      ];
      const attackAssets = [
        Warriors.warriorAttack,
        Warriors.warrior2Attack,
        Warriors.knightAttack,
        Warriors.archerAttack,
      ];
      const randomIndex = getRandomInt(0, assets.length - 1);

      const warriorAsset = assets[randomIndex];
      const attackGraphic = attackAssets[randomIndex];

      const graphic = warriorAsset;
      graphic.width = 300;
      graphic.height = 300;
      currentActor.scale = new Vector(2, 2);
      currentActor.graphics.add("idle", graphic.toAnimation(100));
      currentActor.graphics.add("attack", attackGraphic.toAnimation(120));
      currentActor.graphics.use(graphic.toAnimation(120));
    }
    newHero.name = getRandomName(isMage ? "wizard" : "warrior");
    newHero.health = currentHero.health;

    console.log(`newHero: ${newHero.name}`);
    // Si el nuevo héroe es un mago, asegúrate de que no tenga un arma
    if (newHero instanceof Mage) {
      newHero.weapon = undefined;
    } else {
      newHero.weapon = hasWeapon()
        ? new Weapon(getRandomInt(1, 10))
        : undefined;
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
      setTimeout(() => this.engine.goToScene("gameOver"), 4000);
    } else if (this.monsterCharacters.length === 0) {
      const label = this.createGameOverLabel("Heroes win! Game Over.");
      this.engine.add(label);
      setTimeout(() => this.engine.goToScene("gameOver"), 4000);
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
        const selecetHero = new Label({
          text: "Selected Hero",
          color: Color.Yellow,
          pos: vec(hero.pos.x, hero.pos.y + 50),
          font: new Font({
            family: "PressStart2P",
            size: 10,
            unit: FontUnit.Px,
            textAlign: TextAlign.Center,
          }),
        });
        this.add(selecetHero);

        setTimeout(() => {
          selecetHero.kill();
        }, 1500);
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
      attackButton.kill();
      labelAttack.kill();
      setTimeout(() => {
        this.add(attackButton);
        attackButton.color = Color.Red;
        this.add(labelAttack);
      }, 3200);
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
      pos: vec(engine.halfDrawWidth + 150, engine.halfDrawHeight + 170),
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
      pos: vec(engine.halfDrawWidth + 150, engine.halfDrawHeight + 175),
      color: Color.Black,
    });

    let posCount = 0;
    let monsterPosCount = 0;

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

      if (character instanceof Warrior || character instanceof Mage) {
        if (character instanceof Warrior) {
          const assets = [
            Warriors.warrior,
            Warriors.warrior2,
            Warriors.knight,
            Warriors.archer,
          ];
          const attackAssets = [
            Warriors.warriorAttack,
            Warriors.warrior2Attack,
            Warriors.knightAttack,
            Warriors.archerAttack,
          ];
          const randomIndex = getRandomInt(0, assets.length - 1);

          const warriorAsset = assets[randomIndex];
          const attackGraphic = attackAssets[randomIndex];

          const graphic = warriorAsset;
          graphic.width = 300;
          graphic.height = 300;
          actor.scale = new Vector(2, 2);
          actor.graphics.add("idle", graphic.toAnimation(100));
          actor.graphics.add("attack", attackGraphic.toAnimation(120));
          actor.graphics.use(graphic.toAnimation(120));
        } else {
          const assets = [Mages.mage, Mages.mage2, Mages.mage3];
          const attackAssets = [
            Mages.mageAttack,
            Mages.mage2Attack,
            Mages.mage3Attack,
          ];
          const randomIndex = getRandomInt(0, assets.length - 1);

          const mageAsset = assets[randomIndex];
          const attackGraphic = attackAssets[randomIndex];

          const graphic = mageAsset;
          graphic.width = 300;
          graphic.height = 300;
          actor.scale = new Vector(
            mageAsset === Mages.mage2 ? 1 : 2,
            mageAsset === Mages.mage2 ? 1.5 : 2
          );
          actor.graphics.add("idle", graphic.toAnimation(100));
          actor.graphics.add("attack", attackGraphic.toAnimation(120));
          actor.graphics.use(graphic.toAnimation(120));
        }

        actor.pos = vec(
          engine.halfDrawWidth - 270 + posCount,
          engine.halfDrawHeight + 85
        );
      } else {
        const assets = [Monsters.demon, Monsters.beast, Monsters.ghost];
        const attackAssets = [
          Monsters.demonAttack,
          Monsters.beastAttack,
          Monsters.ghostAttack,
        ];

        const randomIndex = getRandomInt(0, assets.length - 1);

        // Usa el mismo índice para ambos, porque están en orden correspondiente
        const monsterAsset = assets[randomIndex];
        const attackGraphic = attackAssets[randomIndex];
        const graphic = monsterAsset;

        graphic.width = 300;
        graphic.height = 300;
        actor.scale = new Vector(
          monsterAsset === Monsters.demon ? 1 : 2,
          monsterAsset === Monsters.demon ? 1 : 2
        );
        actor.graphics.add("idle", graphic.toAnimation(100));
        actor.graphics.use(graphic.toAnimation(120));
        actor.graphics.add("attack", attackGraphic.toAnimation(120));
        actor.pos = vec(
          engine.halfDrawWidth + 300 - monsterPosCount,
          monsterAsset === Monsters.ghost || monsterAsset === Monsters.demon
            ? engine.halfDrawHeight
            : engine.halfDrawHeight - 10
        );
        monsterPosCount += 100;
      }
      posCount += 100;

      const healthBar = new HealthBar(
        100,
        character.health,
        new Vector(actor.pos.x, actor.pos.y - getRandomInt(45, 60))
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

      this.currentTurn = true; // Start the heroes' turn
      this.currentActor = this.heroes[0]; // Start with the first hero
    });

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
    if (this.monsterCharacters.length === 0) return;

    setTimeout(() => {
      this.performMonsterAttack();
    }, 3000); // Espera 3 segundos antes de que el monstruo ataque
  }
  performHeroAttack() {
    let posY = 0;
    // Utiliza un bucle for en lugar de map para poder salir del bucle si es necesario
    for (let index = 0; index < this.heroes.length; index++) {
      const currentHero = this.heroes[index];
      const currentHeroCharacter = this.heroCharacters[index];
      if (!currentHero || !currentHeroCharacter) continue;

      // Asegúrate de que haya monstruos disponibles para atacar
      if (this.monsters.length === 0) {
        this.checkGameOver();
        break; // Sal del bucle si no hay monstruos
      }

      // Genera un índice aleatorio para seleccionar un monstruo al azar
      const randomIndex = Math.floor(Math.random() * this.monsters.length);
      const monsterActor = this.monsters[randomIndex];
      const monsterCharacter = this.monsterCharacters[randomIndex];

      // Verifica si el monstruo ya ha sido eliminado
      if (!monsterActor || !monsterCharacter) continue;

      const damage = currentHeroCharacter.attack(monsterCharacter);
      currentHero.graphics.use("attack");
      setTimeout(() => {
        currentHero.graphics.use("idle");
      }, 2000);

      if (this.monsterCharacters[randomIndex]) {
        const labelmessage = new Label({
          font: new Font({
            family: "PressStart2P",
            size: 10,
            baseAlign: BaseAlign.Middle,
            padding: 10,
            unit: FontUnit.Px,
            textAlign: TextAlign.Center,
          }),
          text: `${
            currentHeroCharacter.name
          } Causó: ${damage} de daño a ${monsterCharacter.name.replace(
            "| Monster",
            " "
          )}`,
          pos: vec(
            this.engine.halfDrawWidth - 150,
            currentHero.pos.y - 200 + posY
          ),
          color: Color.White,
        });
        posY += 25;

        this.add(labelmessage);

        setTimeout(() => {
          labelmessage.kill();
        }, 3000);
      }

      const monsterHealthBar = this.monsterHealthBars[randomIndex];

      monsterHealthBar.updateHealth(monsterCharacter.health);

      if (monsterCharacter.health <= 0) {
        monsterActor.kill();
        monsterHealthBar.kill();
        if (monsterCharacter.hasWeapon()) {
          const droppedWeapon = monsterCharacter.weapon;
          let heroToEquipWeapon = this.findHeroToEquipWeapon();
          if (droppedWeapon !== undefined) {
            heroToEquipWeapon.pickWeapon(droppedWeapon);
            const weaponPicked = new Label({
              font: new Font({
                family: "PressStart2P",
                size: 10,
                unit: FontUnit.Px,
                textAlign: TextAlign.Center,
              }),
              text: `Weapon with ${droppedWeapon?.damage} damage picked up by ${heroToEquipWeapon.name}`,
              pos: vec(
                this.engine.halfDrawWidth,
                this.engine.halfDrawWidth + 220
              ),
              color: Color.White,
            });
            this.add(weaponPicked);
            setTimeout(() => {
              weaponPicked.kill();
            }, 4000);
          }
        }
        this.remove(monsterActor);
        this.remove(monsterHealthBar);
        this.monsters.splice(randomIndex, 1);
        this.monsterCharacters.splice(randomIndex, 1);
        this.monsterHealthBars.splice(randomIndex, 1);

        // Drop Weapon del Warrior que muere.
        if (
          currentHeroCharacter instanceof Warrior &&
          !currentHeroCharacter.hasDroppedWeapon &&
          currentHeroCharacter.hasWeapon()
        ) {
          console.log(
            ` *********${currentHeroCharacter.name} dropped a weapon...`
          );

          const labelWeapons = new Label({
            font: new Font({
              family: "PressStart2P",
              size: 10,
              unit: FontUnit.Px,
              textAlign: TextAlign.Center,
            }),
            text: `${currentHeroCharacter.name} dropped a weapon...`,
            pos: vec(
              this.engine.halfDrawWidth,
              this.engine.halfDrawWidth + 200
            ),
            color: Color.White,
          });

          this.add(labelWeapons);

          setTimeout(() => {
            labelWeapons.kill();
          }, 3000);

          const weapon = currentHeroCharacter.dropWeapon();
          console.log(` weapon with ${weapon?.damage} damage dropped...`);

          // Obtén un array de todos los héroes excepto el que soltó el arma
          const heroesExceptCurrent = this.heroCharacters.filter(
            (hero) => hero !== currentHeroCharacter
          );

          // Si hay otros héroes, selecciona uno al azar para recibir el arma
          if (heroesExceptCurrent.length > 0 && weapon !== undefined) {
            let randomHeroIndex = Math.floor(
              Math.random() * heroesExceptCurrent.length
            );
            let heroToReceiveWeapon = heroesExceptCurrent[randomHeroIndex];
            heroToReceiveWeapon.pickWeapon(weapon);
            console.log(
              `Weapon with ${weapon?.damage} damage picked up by ${heroToReceiveWeapon.name}...`
            );
          }
        }

        // Si se eliminó un monstruo, ajusta el índice si es necesario
        index = index > 0 ? index - 1 : 0;

        // Verifica si este era el último monstruo
        if (this.monsters.length === 0) {
          this.checkGameOver();
          break; // Sal del bucle si todos los monstruos han sido derrotados
        }
      }
    }

    this.changeTurn();
    this.scheduleMonsterAttack();
  }

  findHeroToEquipWeapon() {
    return (
      this.heroCharacters.find((hero) => !hero.hasWeapon()) ||
      this.heroCharacters[0]
    );
  }
  performMonsterAttack() {
    console.log("-----Monster turn-----");

    // Utiliza un bucle for en lugar de map para poder salir del bucle si es necesario
    let posY = 0;
    for (let index = 0; index < this.monsterCharacters.length; index++) {
      const currentMonsterCharacter = this.monsterCharacters[index];
      const currentMonster = this.monsters[index];

      if (!currentMonsterCharacter) continue;

      // Asegúrate de que haya héroes disponibles para atacar
      if (this.heroes.length === 0) {
        this.checkGameOver();
        break; // Sal del bucle si no hay héroes
      }

      // Genera un índice aleatorio para seleccionar un héroe al azar
      const randomIndex = Math.floor(Math.random() * this.heroes.length);
      const heroActor = this.heroes[randomIndex];
      const heroCharacter = this.heroCharacters[randomIndex];

      // Verifica si el héroe ya ha sido eliminado
      if (!heroActor || !heroCharacter) continue;

      const damage = currentMonsterCharacter.attack(heroCharacter);
      currentMonster.graphics.use("attack");
      setTimeout(() => {
        currentMonster.graphics.use("idle");
      }, 2000);
      const heroHealthBar = this.heroHealthBars[randomIndex];
      heroHealthBar.updateHealth(heroCharacter.health);

      if (this.heroCharacters[randomIndex]) {
        const labelmessage = new Label({
          font: new Font({
            family: "PressStart2P",
            size: 10,
            unit: FontUnit.Px,
            textAlign: TextAlign.Center,
          }),
          text: `${currentMonsterCharacter.name.replace(
            "| Monster",
            ""
          )} Causó: ${damage} de daño a ${heroCharacter.name}`,
          pos: vec(
            this.engine.halfDrawWidth + 150,
            this.engine.halfDrawWidth - 100 + posY
          ),
          color: Color.White,
        });

        this.add(labelmessage);

        setTimeout(() => {
          labelmessage.kill();
        }, 3000);
      }
      posY += 25;

      if (heroCharacter.health < 1) {
        heroActor.kill();
        heroHealthBar.kill();
        this.remove(heroActor);
        this.remove(heroHealthBar);
        this.heroes.splice(randomIndex, 1);
        this.heroCharacters.splice(randomIndex, 1);
        this.heroHealthBars.splice(randomIndex, 1);

        if (
          currentMonsterCharacter instanceof Monster &&
          !currentMonsterCharacter.hasDroppedWeapon &&
          currentMonsterCharacter.hasWeapon()
        ) {
          console.log(
            ` ****${currentMonsterCharacter.name} dropped a weapon...`
          );
          const weapon = currentMonsterCharacter.dropWeapon();

          // Get an array of all monsters except the one that dropped the weapon
          const monstersExceptCurrent = this.monsterCharacters.filter(
            (monster) => monster !== currentMonsterCharacter
          );
          const heroWarriors = this.heroCharacters.filter(
            (character) => character instanceof Warrior
          );
          const poolDrop = monstersExceptCurrent.concat(heroWarriors);
          // If there are characters left, select a random one to receive the weapon
          if (poolDrop.length > 0 && weapon !== undefined) {
            let randomDropIndex = Math.floor(Math.random() * poolDrop.length);
            let characterToReceiveWeapon = poolDrop[randomDropIndex];
            characterToReceiveWeapon.pickWeapon(weapon);
            const labelWeapons = new Label({
              font: new Font({
                family: "PressStart2P",
                size: 10,
                unit: FontUnit.Px,
                textAlign: TextAlign.Center,
              }),
              text: `Weapon with ${weapon?.damage} damage dropped and given to ${characterToReceiveWeapon.name}`,
              pos: vec(
                this.engine.halfDrawWidth,
                this.engine.halfDrawWidth + 200
              ),
              color: Color.White,
            });
            this.add(labelWeapons);
            setTimeout(() => {
              labelWeapons.kill();
            }, 3000);
          }
        }

        // Si se eliminó un héroe, ajusta el índice si es necesario
        index = index > 0 ? index - 1 : 0;

        // Verifica si este era el último héroe
        if (this.heroCharacters.length === 0) {
          this.checkGameOver();
          break; // Sal del bucle si todos los héroes han sido derrotados
        }
      }
    }

    this.changeTurn();
  }

  // showWeapon() {
  //   this.heroCharacters.map((currentHero, index) => {
  //     const heroActor = this.heroes[index];

  //     if (currentHero.hasWeapon()) {
  //       const label = new Label({
  //         text: `${currentHero.name} Has Weapon`,
  //         color: Color.White,
  //         pos: vec(heroActor.pos.x, this.engine.halfDrawHeight - 50),
  //         font: new Font({
  //           family: "PressStart2P",
  //           size: 10,
  //           unit: FontUnit.Px,
  //           textAlign: TextAlign.Center,
  //         }),
  //       });
  //       this.add(label);
  //       setTimeout(() => {
  //         label.kill();
  //       }, 3000);
  //     } else {
  //       const label = new Label({
  //         text: `${currentHero.name}`,
  //         color: Color.White,
  //         pos: vec(heroActor.pos.x, heroActor.pos.y + 50),
  //         font: new Font({
  //           family: "PressStart2P",
  //           size: 10,
  //           unit: FontUnit.Px,
  //           textAlign: TextAlign.Center,
  //         }),
  //       });
  //       setTimeout(() => {
  //         label.kill();
  //       }, 3000);
  //     }
  //   });

  //   this.monsterCharacters.map((currentMonster, index) => {
  //     const monsterActor = this.monsters[index];
  //     if (currentMonster.hasWeapon()) {
  //       const label = new Label({
  //         text: `${currentMonster.name.replace("| Monster", "")} Has Weapon`,
  //         color: Color.White,
  //         pos: vec(monsterActor.pos.x, monsterActor.pos.y + 50),
  //         font: new Font({
  //           family: "PressStart2P",
  //           size: 10,
  //           unit: FontUnit.Px,
  //           textAlign: TextAlign.Center,
  //         }),
  //       });
  //       this.add(label);
  //       setTimeout(() => {
  //         label.kill();
  //       }, 3000);
  //     } else {
  //       const label = new Label({
  //         text: `${currentMonster.name.replace("| Monster", "")}`,
  //         color: Color.White,
  //         pos: vec(monsterActor.pos.x, monsterActor.pos.y - 50),
  //         font: new Font({
  //           family: "PressStart2P",
  //           size: 10,
  //           unit: FontUnit.Px,
  //           textAlign: TextAlign.Center,
  //         }),
  //       });
  //       this.add(label);

  //       setTimeout(() => {
  //         label.kill();
  //       }, 3000);
  //     }
  //   });
  // }
}
