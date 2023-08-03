import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSnapshot } from 'valtio';

import config from '../config/config';
import state from '../store';
import { download } from '../assets';
import { downloadCanvasToImage, reader } from '../config/helpers';
import { EditorTabs, DecalTypes, CameraButtons, LogoButtons, DesignButtons } from '../config/constants';
import { fadeAnimation, slideAnimation } from '../config/motion';
import { AIPicker, ColorPicker, CustomButton, FilePicker, Tab } from '../components';
import ControlTab from '../components/ControlTab';

const Customizer = () => {

    const snap = useSnapshot(state);

    const [file, setFile] = useState('');
    const [prompt, setPrompt] = useState('');
    const [generatingImg, setGeneratingImg] = useState(false);
    const [activeEditorTab, setActiveEditorTab] = useState("");
    const [activeFilterTab, setActiveFilterTab] = useState({
        logoShirt: true,
        stylishShirt: false,
    });

    //Show tab content depending on the active tab

    const generateTabContent = () => {
        switch (activeEditorTab) {
            case "colorpicker":
                return <ColorPicker />;
            case "filepicker":
                return <FilePicker
                    file={file}
                    setFile={setFile}
                    readFile={readFile}
                />;
            case "aipicker":
                return <AIPicker
                    prompt={prompt}
                    setPrompt={setPrompt}
                    generatingImg={generatingImg}
                    handleSubmit={handleSubmit}
                />;
            default:
                return null;
        }
    }

    // Handle submit

    const handleSubmit = async (type) => {
        if (!prompt) return alert("Please enter a prompt");

        try {
            setGeneratingImg(true);

            const response = await fetch('http://localhost:8080/api/v1/dalle', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    prompt,
                })
            })

            const data = await response.json();

            handleDecals(type, `data:image/png;base64,${data.photo}`)
        } catch (error) {
            alert(error)
        } finally {
            setGeneratingImg(false);
            setActiveEditorTab("");
        }
    }

    // Reading file

    const handleDecals = (type, res) => {
        const decalType = DecalTypes[type];

        state[decalType.stateProperty] = res;

        if (!activeFilterTab[decalType.filterTab]) {
            handleActiveFilterTab(decalType.filterTab);
        }
    }

    const handleActiveFilterTab = (tab) => {
        switch (tab) {
            case "Logo":
                state.isLogoTexture = !activeFilterTab[tab];
                break;
            case "Design":
                state.isFullTexture = !activeFilterTab[tab];
                break;
            case "zoomIn":
                if (state.zPos > 0.6)
                    state.zPos -= 0.25;
                break;
            case "zoomOut":
                if (state.zPos < 2.5)
                    state.zPos += 0.25;
                break;
            case "moveUp":
                if (state.yPos < 0.2)
                    state.yPos += 0.05;
                break;
            case "moveDown":
                if (state.yPos > -0.2)
                    state.yPos -= 0.05;
                break;
            case "moveLeft":
                if (state.xPos > -0.2)
                    state.xPos -= 0.05;
                break;
            case "moveRight":
                if (state.xPos < 0.2)
                    state.xPos += 0.05;
                break;
            case "increaseLogo":
                if (state.logoSize < 0.3)
                    state.logoSize += 0.01;
                break;
            case "decreaseLogo":
                if (state.logoSize > 0.05)
                    state.logoSize -= 0.01;
                break;
            case "decreaseLogoXPos":
                if (state.logoXPos > -0.1)
                    state.logoXPos -= 0.01;
                break;
            case "increaseLogoXPos":
                if (state.logoXPos < 0.1)
                    state.logoXPos += 0.01;
                break;
            case "decreaseLogoYPos":
                if (state.logoYPos > -0.3)
                    state.logoYPos -= 0.01;
                break;
            case "increaseLogoYPos":
                if (state.logoYPos < 0.2)
                    state.logoYPos += 0.01;
                break;
            case "increaseDesign":
                if (state.designSize < 1.2)
                    state.designSize += 0.01;
                break;
            case "decreaseDesign":
                if (state.designSize > 0.2)
                    state.designSize -= 0.01;
                console.log(state.designSize);
                break;
            case "decreaseDesignXPos":
                if (state.designXPos > -0.3)
                    state.designXPos -= 0.01;
                console.log(state.designXPos);
                break;
            case "increaseDesignXPos":
                if (state.designXPos < 0.3)
                    state.designXPos += 0.01;
                console.log(state.designXPos);
                break;
            case "decreaseDesignYPos":
                if (state.designYPos > -0.3)
                    state.designYPos -= 0.01;
                console.log(state.designYPos);
                break;
            case "increaseDesignYPos":
                if (state.designYPos < 0.3)
                    state.designYPos += 0.01;
                console.log(state.designYPos);
                break;
            case "reset":
                state.logoSize = 0.1;
                state.logoXPos = 0;
                state.logoYPos = 0;
                state.designXPos = 0;
                state.designYPos = 0;
                state.zPos = 1;
                break;
            default:
                state.isLogoTexture = true;
                state.isFullTexture = false;
        }

        //After setting the state, we need to update the activeFilterTab state

        setActiveFilterTab({
            ...activeFilterTab,
            [tab]: !activeFilterTab[tab],
        })
    }

    const readFile = (type) => {
        reader(file)
            .then((res) => {
                handleDecals(type, res);
                setActiveEditorTab("");
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <AnimatePresence>
            {!snap.intro && (
                <>
                    <motion.div
                        key="custom"
                        className="absolute top-0 left-0 z-10"
                        {...slideAnimation('left')}
                    >
                        <div
                            className="flex items-center min-h-screen"
                        >
                            <div className='editortabs-container tabs'>
                                {EditorTabs.map((tab, index) => (
                                    <Tab
                                        key={index}
                                        tab={tab}
                                        isEditorTab
                                        handleClick={() => {
                                            if (tab.name === activeEditorTab)
                                                setActiveEditorTab("");
                                            else setActiveEditorTab(tab.name);
                                        }}
                                    />
                                ))}
                                {generateTabContent()}
                            </div>
                        </div>

                    </motion.div>

                    <motion.div
                        className='absolute top-5 right-5 z-10'
                        {...fadeAnimation}
                    >
                        <CustomButton
                            type="filled"
                            title="Go back"
                            handleClick={() => state.intro = true}
                            customStyles="w-fit px-4 py-2.5 font-bold text-sm"
                        />
                    </motion.div>

                    <motion.div
                        className='filtertabs-container'
                        {...slideAnimation('up')}
                    >
                        <ControlTab
                            title="Camera"
                            tabs={CameraButtons}
                            handleClick={handleActiveFilterTab}
                        />
                        <ControlTab
                            title="Logo"
                            tabs={LogoButtons}
                            handleClick={handleActiveFilterTab}
                        />
                        <ControlTab
                            title="Design"
                            tabs={DesignButtons}
                            handleClick={handleActiveFilterTab}
                        />
                        
                        {/* Download button */}
                        <button 
                            className='flex flex-row gap-3 items-center glassmorphism p-4 rounded-full'
                            onClick={downloadCanvasToImage}
                        >
                            <span className='font-semibold'>Download</span>
                            <img
                                src={download}
                                alt='download_image'
                                className='w-10 h-10 object-contain'
                            />
                        </button>

                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}

export default Customizer
