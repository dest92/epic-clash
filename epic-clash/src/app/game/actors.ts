import { IWeapon, Weapon, IHero, ICharacter, Hero, Warrior, Mage, Monster } from "./characters";

/// Definición del tipo para las claves posibles del objeto names
type CharacterType = 'wizard' | 'warrior' | 'monster';

// Objeto con los nombres
const names: Record<CharacterType, string[]> = {
  wizard: ['Merlin', 'Gandalf', 'Morgana'],
  warrior: ['Arthur', 'Leonidas', 'Achilles'],
  monster: ['Grendel', 'Hydra', 'Minotaur']
};

// Función para generar un número aleatorio entre min y max
function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Función para obtener un nombre aleatorio basado en el tipo de personaje
function getRandomName(type: CharacterType): string {
  const randomIndex = getRandomInt(0, names[type].length - 1);
  return `${names[type][randomIndex]} | ${type.charAt(0).toUpperCase() + type.slice(1)}`;
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
    const name = getRandomName(isMage ? 'wizard' : 'warrior');
    if (isMage) {
      characters.push(new Mage(name, weapon));
    } else {
      characters.push(new Warrior(name, weapon));
    }
  }

  // Crear monstruos
  for (let i = 0; i < numMonsters; i++) {
    const health = getRandomInt(20, 100); // Salud aleatoria entre 20 y 100
    const weapon = hasWeapon() ? new Weapon(getRandomInt(1, 10)) : undefined; // Arma aleatoria o ninguna
    const name = getRandomName('monster');
    characters.push(new Monster(name, health, weapon));
  }

  return characters;
}