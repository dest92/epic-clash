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

    engine.input.keyboard.on("press", (evt) => {
          // Lógica para atacar a un monstruo
          if (evt.key === Input.Keys.C) {
            console.log("Attacking monsters...");
            this.monsters.forEach((monsterActor, index) => {
              const currentHeroCharacter = this.heroCharacters[this.currentHeroIndex];
              if (!currentHeroCharacter) return;
    
              console.log(`Monster health: ${this.monsterCharacters[index].health}`);
              
                const damage = currentHeroCharacter.attack(this.monsterCharacters[index]);
                console.log(`Damage caused: ${damage}`);
                console.log(`${index} Monster health: ${this.monsterCharacters[index].health}`);
    
                if (this.monsterCharacters[index].health <= 0) {
                  monsterActor.color = Color.Gray;
                }
              
            });
          } 
                 // Lógica para atacar a un heroe
                 if (evt.key === Input.Keys.V) {
                  console.log("Attacking hero...");
                  this.heroes.forEach((heroesActor, index) => {
                    const currentMonsterCharacter = this.monsterCharacters[this.currentMonsterIndex];
                    if (!currentMonsterCharacter) return;
          
                    console.log(`Hero health: ${this.heroCharacters[index].health}`);
                    
                      const damage = currentMonsterCharacter.attack(this.heroCharacters[index]);
                      console.log(`Damage caused: ${damage}`);
                      console.log(`${index} Hero health: ${this.heroCharacters[index].health}`);
          
                      if (this.heroCharacters[index].health <= 0) {
                        heroesActor.color = Color.Gray;
                      }
                    
                  });
                } 
      if (evt.key === Input.Keys.F) { // Press F to end turn
        console.log("Turn Change...");
        this.changeTurn();
      }
    });


  }
  update(engine: Engine, delta: number) {
    super.update(engine, delta);

    // Actualiza el actor activo

    const currentActor = this.currentTurn ? this.heroes[this.currentHeroIndex] : this.monsters[this.currentMonsterIndex];
    if (currentActor) {
        currentActor.rotation = 1;
       
    }
   }
     
  changeTurn() {
    // Cambia al siguiente actor (héroe o monstruo) y alterna el tipo
    if (this.currentActor === this.heroes[this.currentHeroIndex]) {
      this.currentHeroIndex = (this.currentHeroIndex + 1) % this.heroes.length;
      this.currentActor = this.monsters[this.currentMonsterIndex];
    } else {
      this.currentActor = this.heroes[this.currentHeroIndex];
    }
  
    //Activa al nuevo actor
    this.currentActor.active = true
  
    // Cambia el turno
    this.currentTurn = !this.currentTurn;
  }
}
