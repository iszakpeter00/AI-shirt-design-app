import React from 'react'
import Tab from './Tab'
import { useSnapshot } from 'valtio'
import Switch from '@mui/material/Switch'

import state from '../store'

const ControlTab = ({ title, tabs, handleClick }) => {

    const snap = useSnapshot(state);

    return (
        <div className='glassmorphism p-4 w-[250px] flex-column rounded-lg'>
            {title !== "Camera" ? (
                <div className='w-full flex flex-row items-center justify-center gap-3 mb-4'>
                    <Switch
                        onClick={() => handleClick(title)}
                        color='success'
                        id={title}
                        name={title}
                        checked={title === "Logo" ? snap.isLogoTexture : snap.isFullTexture}
                    />
                    <label htmlFor={title} className='font-semibold'>
                        {title}
                    </label>
                </div>
            ) : (
                <h3 className='w-full text-center font-semibold mb-6 mt-1'>
                    {title}
                </h3>
            )
            }

            <div className='flex flex-wrap justify-center gap-3'>
                {tabs.map((tab) => (
                    <Tab
                        key={tab.name}
                        tab={tab}
                        isFilterTab
                        // isActiveTab={activeFilterTab[tab.name]}
                        handleClick={() => handleClick(tab.name)}
                    />
                ))}
            </div>

        </div>
    )
}

export default ControlTab