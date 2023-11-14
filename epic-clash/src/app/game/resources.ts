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
  // warriorAttack: new ex.ImageSource("/assets/images/warriorAttack.png"),
  // warriorDead: new ex.ImageSource("/assets/images/warriorDead.png"),
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

const allResources = { ...Images, ...Warriors, ...Monsters };
for (const res in allResources) {
  // @ts-ignore
  loader.addResource(allResources[res]);
}

export { loader, Images, Warriors, Monsters };
