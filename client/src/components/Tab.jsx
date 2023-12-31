import React from 'react'
import { useSnapshot } from 'valtio'

import state from '../store'

const Tab = ({ tab, isFilterTab, isActiveTab, handleClick }) => {

    const snap = useSnapshot(state);

    const activeStyles = isFilterTab && isActiveTab 
        ? { backgroundColor: snap.color, opacity: 0.5 } 
        : { backgroundColor: 'transparent', opacity: 1};

    return (
        <div
            key={tab.name} 
            className={`tab-btn transition-all duration-300 border-2 hover:border-black hover:shadow-md ${isFilterTab ? 'w-10 h-10 rounded-full glassmorphism' : 'w-12 h-12 rounded-4'}`}
            onMouseDown={handleClick}
        >
            <img 
                src={tab.icon}
                alt={tab.name}
                className={`${isFilterTab ? 'w-2/3 h-2/3' : 'w-11/12 h-11/12 object-contain'}`}
            />
        </div>
    )
}

export default Tab