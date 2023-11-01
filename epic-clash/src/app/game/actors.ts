import {
  IWeapon,
  Weapon,
  IHero,
  ICharacter,
  Hero,
  Warrior,
  Mage,
  Monster,
} from "./characters"; // Asegúrate de que las rutas sean correctas

// Función para generar un número aleatorio entre min y max
function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Función para determinar si un personaje tiene un arma
function hasWeapon(): boolean {
  return Math.random() < 0.5; // 50% de probabilidad de tener un arma
}

// Función para crear héroes y monstruos
export function createCharacters(
  numHeroes: number,
  numMonsters: number
): ICharacter[] {
  const characters: ICharacter[] = [];

  // Crear héroes
  for (let i = 0; i < numHeroes; i++) {
    const isMage = Math.random() < 0.5; // 50% de probabilidad de ser mago
    const weapon = hasWeapon() ? new Weapon(getRandomInt(1, 10)) : undefined; // Arma aleatoria o ninguna
    if (isMage) {
      characters.push(new Mage(weapon));
    } else {
      characters.push(new Warrior(weapon));
    }
  }

  // Crear monstruos
  for (let i = 0; i < numMonsters; i++) {
    const health = getRandomInt(20, 100); // Salud aleatoria entre 20 y 100
    const weapon = hasWeapon() ? new Weapon(getRandomInt(1, 10)) : undefined; // Arma aleatoria o ninguna
    characters.push(new Monster(health, weapon));
  }

  return characters;
}
