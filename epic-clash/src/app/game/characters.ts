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
  pickWeapon(weapon: Weapon | undefined): void;
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
  hasDroppedWeapon: boolean = false;
  constructor(name: string, weapon?: Weapon) {
    this.name = name;
    this.weapon = weapon;
  }

  abstract attack(target: ICharacter): number;

  dropWeapon(): Weapon | undefined {
    const droppedWeapon = this.weapon;
    this.weapon = undefined;
    this.hasDroppedWeapon = true; // con este método, esto sirve para que no se vuelva a droppear
    return droppedWeapon;
  }

  hasWeapon(): boolean {
    return this.weapon !== undefined;
  }
  pickWeapon(weapon: Weapon): void {
    this.weapon = weapon;
  }
}

// Clase Warrior
export class Warrior extends Hero {
  pickWeapon(weapon: Weapon): void { 
    this.weapon = weapon;
  }
  attack(target: ICharacter): number {
    const damage = this.hasWeapon() ? this.weapon!.damage * 3 : 0;
    target.health -= damage;
    return damage;
  }
}

// Clase Mage
export class Mage extends Hero {
  weapon = undefined;
  hasWeapon(): boolean {
    return false;
  }
  attack(target: ICharacter): number {
    const damage = 20;
    target.health -= damage;
    return damage;
  }
}

// Clase Monster
export class Monster implements IMonster {
  name: string;
  public hasDroppedWeapon: boolean;
  constructor(
    name: string,
    public health: number,
    public weapon: Weapon = new Weapon(1)
  ) {
    this.name = name;
    this.hasDroppedWeapon = false;
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
      this.hasDroppedWeapon = true;
      return droppedWeapon;
    }
    return undefined;
  }

  hasWeapon(): boolean {
    return this.weapon.damage > 1;
  }

  pickWeapon(weapon: Weapon): void { 
    this.weapon.damage = weapon.damage;
  }
}
