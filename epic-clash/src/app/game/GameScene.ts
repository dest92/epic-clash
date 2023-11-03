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
  // private actorQueue: Actor[] = []

  onInitialize(engine: Engine) {
    const characters = createCharacters(2, 3); // 10 héroes y 1 monstruo

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
      // this.actorQueue.push(actor);
    });

    // Velocidad a la que se moverán los héroes
    const speed = 40;


    engine.input.keyboard.on("press", (evt) => {
      // Lógica para atacar a un monstruo
      if (evt.key === Input.Keys.C) {
        console.log("Attacking monsters...");
        this.monsters.forEach((monsterActor, index) => {
          const currentHeroCharacter = this.heroCharacters[this.currentHeroIndex];
          if (!currentHeroCharacter) return;

          console.log(`Monster health: ${this.monsterCharacters[index].health}`);
          
            const damage = currentHeroCharacter.attack(this.monsterCharacters[index]);
            monsterActor.color = Color.LightGray;
            console.log(`Damage caused: ${damage}`);
            console.log(`${index} Monster health: ${this.monsterCharacters[index].health}`);

            if (this.monsterCharacters[index].health <= 0) {
              monsterActor.color = Color.Gray;
            }
          
        });
        this.changeTurn();
      } 
            //  // Lógica para atacar a un heroe
            //  if (evt.key === Input.Keys.V) {

            // } 
    });

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

    engine.input.keyboard.on("release", () => {

      // The Monster Attacks 
      console.log("Attacking hero...");
      this.heroes.forEach((heroesActor, index) => {
        const currentMonsterCharacter = this.monsterCharacters[this.currentMonsterIndex];
        if (!currentMonsterCharacter) return;

        console.log(`Hero health: ${this.heroCharacters[index].health}`);
        
          const damage = currentMonsterCharacter.attack(this.heroCharacters[0]);
          
          console.log(`Damage caused: ${damage}`);
          console.log(`${index} Hero health: ${this.heroCharacters[0].health}`);

          if (this.heroCharacters[index].health <= 0) {
            heroesActor.color = Color.Gray;
          }
        
      });
      this.changeTurn();

    });

  }


  update(engine: Engine, delta: number) {
    super.update(engine, delta);

    // Actualiza el actor activo

    const currentActor = this.currentTurn ? this.heroes[this.currentHeroIndex] : this.monsters[this.currentMonsterIndex];
     // If it's the current actor's turn
  //   if (this.actorQueue[0] === this.currentActor) {
  //  // Allow the actor to perform an action
  //     this.currentActor.rotation = 1
  //     currentActor.color = Color.White;
  //   }
  }
     
  changeTurn() {
    
//      // Remove the current actor from the front of the queue
//  const currentActor = this.actorQueue.shift();

//  // Add the current actor to the back of the queue
//  this.actorQueue.push(currentActor);

//  // Set the current actor to the new front of the queue
//  this.currentActor = this.actorQueue[0];
 
    // // Cambia al siguiente actor (héroe o monstruo) y alterna el tipo
    // if (this.currentActor === this.heroes[this.currentHeroIndex]) {
    //   this.currentHeroIndex = (this.currentHeroIndex + 1) % this.heroes.length;
    //   this.currentActor = this.monsters[this.currentMonsterIndex];
    // } else {
    //   this.currentActor = this.heroes[this.currentHeroIndex];
    // }
  
    // //Activa al nuevo actor
    // this.currentActor.active = true
  
    // Cambia el turno
    this.currentTurn = !this.currentTurn;
  }
}
