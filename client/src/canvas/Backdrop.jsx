import React, { useRef } from 'react';
import { AccumulativeShadows, RandomizedLight } from '@react-three/drei';

const Backdrop = () => {
    const shadows = useRef();

    return (
        <AccumulativeShadows
            ref={shadows}
            // temporal
            frames={30}
            alphaTest={0.85}
            scale={10}
            rotation={[Math.PI / 2, 0, 0]}
            position={[0, 0, -0.2]}
        >
            <RandomizedLight
                amount={4}
                radius={5}
                intensity={1}
                ambient={0.7}
                position={[0, 5, -10]}
            />
        </AccumulativeShadows>
    )
}

export default Backdrop