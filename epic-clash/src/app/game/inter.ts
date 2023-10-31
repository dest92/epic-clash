// Definición de una interfaz para las armas
export interface IWeapon {
  damage: number;
}

// Implementación de la clase Weapon
export class Weapon implements IWeapon {
  constructor(public damage: number) {}
}

// Interfaz para los personajes en general
export interface ICharacter {
  health: number;
  weapon?: Weapon;
  attack(target: ICharacter): void;
}

// Interfaz para los héroes
export interface IHero extends ICharacter {
  health: number;
  weapon?: Weapon;
  dropWeapon(): Weapon | undefined; // Cambiado a Weapon | undefined
}

// Interfaz para los monstruos
export interface IMonster extends ICharacter {
  dropWeapon(): Weapon | undefined; // Cambiado a Weapon | undefined
}

// Clase abstracta Hero
export abstract class Hero implements IHero {
  health: number = 100;
  weapon?: Weapon;

  constructor(weapon?: Weapon) {
    this.weapon = weapon;
  }

  abstract attack(target: ICharacter): void;

  dropWeapon(): Weapon | undefined {
    // Cambiado a Weapon | undefined
    const droppedWeapon = this.weapon;
    this.weapon = undefined;
    return droppedWeapon;
  }
}

// Clase Warrior
export class Warrior extends Hero {
  attack(target: ICharacter): void {
    const damage = this.weapon ? this.weapon.damage * 3 : 0;
    target.health -= damage;
  }
}

// Clase Mage
export class Mage extends Hero {
  attack(target: ICharacter): void {
    const damage = 20;
    target.health -= damage;
  }
}

// Clase Monster
export class Monster implements IMonster {
  constructor(public health: number, public weapon: Weapon = new Weapon(1)) {}

  attack(target: ICharacter): void {
    target.health -= this.weapon.damage;
  }

  dropWeapon(): Weapon | undefined {
    if (this.weapon) {
      const droppedWeapon = this.weapon;
      this.weapon = new Weapon(0);
      return droppedWeapon;
    }
    return undefined;
  }
}