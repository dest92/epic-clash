import * as ex from "excalibur";

const Images = {
  backgroundImage: new ex.ImageSource("/assets/images/gameBackground.png"),
};

const loader = new ex.Loader();
const allResources = { ...Images };
for (const res in allResources) {
  loader.addResource(allResources[res]);
}

export { loader, Images };
