import { Actor, Color, vec, Scene, Engine, Input } from "excalibur";
import { Warrior, Mage, Monster, Weapon, ICharacter, Hero } from "./characters";
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
    const characters = createCharacters(2, 3); // 2 héroes y 3 monstruos

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
    const speed = 40;


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

    engine.input.keyboard.on("hold", (evt) => {

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
    // });
  }


  update(engine: Engine, delta: number) {
    super.update(engine, delta);

     //If it's the current actor's turn
    if (this.currentActor) {
   // Allow the actor to perform an action
      this.currentActor.rotation = 1

    }
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
      this.currentMonsterIndex = (this.currentMonsterIndex + 1) % this.monsters.length;
      // Establece el actor actual como el monstruo actual
      this.currentActor = this.monsters[this.currentMonsterIndex];
    }
    
    // Cambia el turno
    this.currentTurn = !this.currentTurn;
   }
   
   performHeroAttack() {
    const currentHero = this.heroes[this.currentHeroIndex];
    const currentHeroCharacter = this.heroCharacters[this.currentHeroIndex];
    if (!currentHero || !currentHeroCharacter) return;
   
    console.log(`->Hero ${this.currentHeroIndex} is attacking...`);
    
    // Genera un índice aleatorio para seleccionar un monstruo al azar
    const randomIndex = Math.floor(Math.random() * this.monsters.length);
   
    const monsterActor = this.monsters[randomIndex];
    const monsterCharacter = this.monsterCharacters[randomIndex];
   
    const damage = currentHeroCharacter.attack(monsterCharacter);
    console.log(`Monster ${monsterCharacter.name} being attacked`);
    console.log(`Damage caused: ${damage}`);
    console.log(`Monster health: ${monsterCharacter.health}`);
    if (monsterCharacter.health <= 0) {
      monsterActor.color = Color.Gray;
    }
   
    this.changeTurn()
   }
   

   performMonsterAttack() {
    console.log("-----Monster turn-----");
    
    const currentMonsterCharacter = this.monsterCharacters[this.currentMonsterIndex];
    if (!currentMonsterCharacter) return;
   
    console.log(`->Monster ${this.currentMonsterIndex} is attacking...`);
    
    // Genera un índice aleatorio para seleccionar un héroe al azar
    const randomIndex = Math.floor(Math.random() * this.heroes.length);
   
    const heroActor = this.heroes[randomIndex];
    const heroCharacter = this.heroCharacters[randomIndex];
   
    const damage = currentMonsterCharacter.attack(heroCharacter);
    console.log(`Hero ${heroCharacter.name} being attacked`);
    console.log(`Damage caused: ${damage}`);
    console.log(`Hero health: ${heroCharacter.health}`);
    if (heroCharacter.health <= 0) {
     heroActor.color = Color.Gray;
    }
   
    this.changeTurn()
   }
   
}
