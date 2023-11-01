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
  name: string;
  health: number;
  weapon?: Weapon;
  attack(target: ICharacter): number;
  hasWeapon(): boolean;
}

// Interfaz para los héroes
export interface IHero extends ICharacter {
  dropWeapon(): Weapon | undefined;
}

// Interfaz para los monstruos
export interface IMonster extends ICharacter {
  dropWeapon(): Weapon | undefined;
}

// Clase abstracta Hero
export abstract class Hero implements IHero {
  name: string;
  health: number = 100;
  weapon?: Weapon;

  constructor(name: string, weapon?: Weapon) {
    this.name = name;
    this.weapon = weapon;
  }

  abstract attack(target: ICharacter): number;

  dropWeapon(): Weapon | undefined {
    const droppedWeapon = this.weapon;
    this.weapon = undefined;
    return droppedWeapon;
  }

  hasWeapon(): boolean {
    return this.weapon !== undefined;
  }
}

// Clase Warrior
export class Warrior extends Hero {
  attack(target: ICharacter): number {
    const damage = this.hasWeapon() ? this.weapon!.damage * 3 : 1;
    target.health -= damage;
    return damage;
  }
}

// Clase Mage
export class Mage extends Hero {
  attack(target: ICharacter): number {
    const damage = this.hasWeapon() ? 20 : 1;
    target.health -= damage;
    return damage;
  }
}

// Clase Monster
export class Monster implements IMonster {
  name: string;

  constructor(name: string, public health: number, public weapon: Weapon = new Weapon(1)) {
    this.name = name;
  }

  attack(target: ICharacter): number {
    const damage = this.hasWeapon() ? this.weapon.damage : 1;
    target.health -= damage;
    return damage;
  }

  dropWeapon(): Weapon | undefined {
    if (this.weapon) {
      const droppedWeapon = this.weapon;
      this.weapon = new Weapon(0);
      return droppedWeapon;
    }
    return undefined;
  }

  hasWeapon(): boolean {
    return this.weapon.damage > 1;
  }
}
