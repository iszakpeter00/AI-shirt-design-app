import { proxy } from "valtio";

const state = proxy({
    intro: true,
    color: "#EFBD48",
    isLogoTexture: false,
    isFullTexture: false,
    logoDecal: './threejs.png',
    fullDecal: './threejs.png',
    xPos: 0,
    yPos: 0,
    zPos: 2,
    logoSize: 0.15,
    logoXPos: 0,
    logoYPos: 0.04,
    designXPos: 0,
    designYPos: -0.05,
    designSize: 0.8,
});

export default state;