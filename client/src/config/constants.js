import { 
    swatch, 
    fileIcon, 
    ai, 
    logoShirt, 
    stylishShirt, 
    zoomIn, 
    zoomOut, 
    moveDown, 
    moveUp, 
    moveLeft, 
    moveRight 
} from "../assets";

export const EditorTabs = [
    {
        name: "colorpicker",
        icon: swatch,
    },
    {
        name: "filepicker",
        icon: fileIcon,
    },
    {
        name: "aipicker",
        icon: ai,
    },
];

export const CameraButtons = [
    {
        name: "moveUp",
        icon: moveUp,
    },
    {
        name: "moveDown",
        icon: moveDown,
    },
    
    {
        name: "moveLeft",
        icon: moveLeft,
    },
    {
        name: "moveRight",
        icon: moveRight,
    },
    {
        name: "zoomOut",
        icon: zoomOut,
    },
    {
        name: "zoomIn",
        icon: zoomIn,
    }
];

export const LogoButtons = [
    {
        name: "increaseLogoYPos",
        icon: moveUp,
    },
    {
        name: "decreaseLogoYPos",
        icon: moveDown,
    },
    {
        name: "decreaseLogoXPos",
        icon: moveLeft,
    },
    {
        name: "increaseLogoXPos",
        icon: moveRight,
    },
    {
        name: "decreaseLogo",
        icon: zoomOut,
    },
    {
        name: "increaseLogo",
        icon: zoomIn,
    },

];

export const DesignButtons = [
    {
        name: "increaseDesignYPos",
        icon: moveUp,
    },
    {
        name: "decreaseDesignYPos",
        icon: moveDown,
    },
    {
        name: "decreaseDesignXPos",
        icon: moveLeft,
    },
    {
        name: "increaseDesignXPos",
        icon: moveRight,
    },
    {
        name: "decreaseDesign",
        icon: zoomOut,
    },
    {
        name: "increaseDesign",
        icon: zoomIn,
    },
];

export const DecalTypes = {
    logo: {
        stateProperty: "logoDecal",
        filterTab: "logoShirt",
    },
    full: {
        stateProperty: "fullDecal",
        filterTab: "stylishShirt",
    },
};
