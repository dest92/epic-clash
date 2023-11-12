import * as ex from "excalibur";

const Images = {
  backgroundImage: new ex.ImageSource("/assets/images/gameBackground.png"),
  gameOverImage: new ex.ImageSource("/assets/images/gameOver.png"),
  play: new ex.ImageSource("/assets/images/play.png"),
  back: new ex.ImageSource("/assets/images/back.png"),
  inGame: new ex.ImageSource("/assets/images/inGame.png"),

};

const Sounds = {
  backgroundMusic: new ex.Sound("/assets/sounds/title.wav"),
  dead: new ex.Sound("/assets/sounds/dead.wav"),
};

const loader = new ex.Loader();
const allResources = { ...Images, ...Sounds };
for (const res in allResources) {
  // @ts-ignore
  loader.addResource(allResources[res]);
}

export { loader, Images };
