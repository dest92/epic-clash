import * as ex from "excalibur";

const Images = {
  howToPlayButton: new ex.ImageSource("/assets/images/howButton.png"),
  play: new ex.ImageSource("/assets/images/play.png"),
  backgroundImage: new ex.ImageSource("/assets/images/gameBackground.png"),
  gameOverImage: new ex.ImageSource("/assets/images/gameOver.png"),
  back: new ex.ImageSource("/assets/images/back.png"),
  inGame: new ex.ImageSource("/assets/images/inGame.png"),
  howToPlay: new ex.ImageSource("/assets/images/howTo.png"),
};

const Warriors = {
  warrior: new ex.Gif("/assets/images/warrior-idle.gif", ex.Color.Transparent),
  warriorAttack: new ex.Gif(
    "/assets/images/warrior-attack.gif",
    ex.Color.Transparent
  ),
  warrior2: new ex.Gif(
    "/assets/images/warrior2-idle.gif",
    ex.Color.fromRGB(8, 64, 93),
    true
  ),
  warrior2Attack: new ex.Gif(
    "/assets/images/warrior2-attack.gif",
    ex.Color.fromRGB(8, 64, 93),
    true
  ),
  knight: new ex.Gif("/assets/images/knight-idle.gif", ex.Color.Black, true),
  knightAttack: new ex.Gif(
    "/assets/images/knight-attack.gif",
    ex.Color.Black,
    true
  ),
  // warriorAttack: new ex.ImageSource("/assets/images/warriorAttack.png"),
  // warriorDead: new ex.ImageSource("/assets/images/warriorDead.png"),
};

const Mages = {
  mage: new ex.Gif(
    "/assets/images/mage-idle.gif",
    ex.Color.fromRGB(0, 255, 255)
  ),
  mageAttack: new ex.Gif(
    "/assets/images/mage-attack.gif",
    ex.Color.fromRGB(0, 255, 255)
  ),
  mage2: new ex.Gif(
    "/assets/images/mage2-idle.gif",
    ex.Color.fromRGB(0, 255, 255)
  ),
  mage2Attack: new ex.Gif(
    "/assets/images/mage2-attack.gif",
    ex.Color.fromRGB(0, 255, 255)
  ),
  mage3: new ex.Gif("/assets/images/mage3-idle.gif", ex.Color.Black),
  mage3Attack: new ex.Gif(
    "/assets/images/mage3-attack.gif",
    ex.Color.fromRGB(6, 6, 6)
  ),
};

const Monsters = {
  beast: new ex.Gif("/assets/images/beast-idle.gif", ex.Color.Transparent),
  demon: new ex.Gif("/assets/images/demon-idle.gif", ex.Color.Transparent),
  ghost: new ex.Gif("/assets/images/ghost-idle.gif", ex.Color.Transparent),
  beastAttack: new ex.Gif(
    "/assets/images/beast-attack.gif",
    ex.Color.Transparent
  ),
  demonAttack: new ex.Gif(
    "/assets/images/demon-attack.gif",
    ex.Color.Transparent
  ),
  ghostAttack: new ex.Gif(
    "/assets/images/ghost-attack.gif",
    ex.Color.Transparent
  ),
};

const loader = new ex.Loader();

const allResources = { ...Images, ...Warriors, ...Monsters, ...Mages };
for (const res in allResources) {
  // @ts-ignore
  loader.addResource(allResources[res]);
}

export { loader, Images, Warriors, Monsters, Mages };
