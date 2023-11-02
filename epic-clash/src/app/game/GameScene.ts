import { Actor, Color, vec, Scene, Engine, Input } from "excalibur";
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
      this.currentTurn = true; // Start the heroes' turn
      this.currentActor = this.heroes[0]; // Start with the first hero
    });

    // Velocidad a la que se moverán los héroes
    const speed = 80;

    engine.input.keyboard.on("hold", (evt) => {
      // if (this.currentTurn) { // Only allow heroes to perform actions on their turn

        const currentActor = this.currentActor;
        if (!currentActor) return;

        if (evt.key === Input.Keys.W) {
          currentActor.vel = vec(0, -speed);
        } else if (evt.key === Input.Keys.S) {
          currentActor.vel = vec(0, speed);
        } else if (evt.key === Input.Keys.A) {
          currentActor.vel = vec(-speed, 0);
        } else if (evt.key === Input.Keys.D) {
          currentActor.vel = vec(speed, 0);
        }

    });

    // engine.input.keyboard.on("release", () => {
    //   if (this.currentTurn) { // Only allow heroes to perform actions on their turn
    //     const currentHero = this.heroes[this.currentHeroIndex];
    //     if (currentHero) {
    //       currentHero.vel = vec(0, 0);
    //     }
    //   }a
    // });
    engine.input.keyboard.on("press", (evt) => {
      if (evt.key === Input.Keys.F) { // Press F to end turn
        this.changeTurn();
      }
    });


  }
  update(engine: Engine, delta: number) {
    super.update(engine, delta);
   
    // Actualiza el actor activo
    const currentActor = this.currentTurn ? this.heroes[this.currentHeroIndex] : this.monsters[this.currentMonsterIndex];
    if (currentActor) {
    currentActor.rotation = 1
  
    }
   }
     
  changeTurn() {
    // Desactiva al actor actual sin cambiar su estado
    if (this.currentActor) {
      this.currentActor.active = false;
    }
  
    // Cambia al siguiente actor (héroe o monstruo) y alterna el tipo
    if (this.currentActor === this.heroes[this.currentHeroIndex]) {
      this.currentHeroIndex = (this.currentHeroIndex + 1) % this.heroes.length;
      this.currentActor = this.monsters[this.currentMonsterIndex];
    } else {
      this.currentActor = this.heroes[this.currentHeroIndex];
    }
  
    // Activa al nuevo actor
    this.currentActor.active 
  
    // Cambia el turno
    this.currentTurn = !this.currentTurn;
  }
  
  
}
