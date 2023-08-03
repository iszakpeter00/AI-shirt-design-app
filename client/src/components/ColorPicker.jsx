import React from 'react'
import { SketchPicker } from 'react-color'
import { useSnapshot } from 'valtio'

import state from '../store'

const ColorPicker = () => {

    const snap = useSnapshot(state);

    return (
        <div
            className="absolute left-full ml-3"
        >
            <SketchPicker
                width="1%"
                color={snap.color}
                disableAlpha
                // presetColors={[
                //     '#000000',
                //     '#FFFFFF',
                //     '#FF0000',
                //     '#00FF00',
                //     '#0000FF',
                //     '#FFFF00',
                //     '#00FFFF',
                //     '#FF00FF',
                //     '#C0C0C0',
                //     '#808080',
                //     '#800000',
                //     '#808000',
                //     '#008000',
                //     '#800080',
                //     '#008080',
                //     '#000080',
                //     '#FFA500',
                //     '#A52A2A',
                //     '#800080',
                //     '#FF00FF',
                //     '#FFC0CB',
                // ]}
                onChange={(color) => state.color = color.hex}

            />
        </div>
    )
}

export default ColorPicker