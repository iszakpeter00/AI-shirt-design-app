import React from 'react'
import { easing } from 'maath';
import { useSnapshot } from 'valtio';
import { useFrame } from '@react-three/fiber';
import { Decal, useGLTF, useTexture } from '@react-three/drei';

import state from '../store';

const Shirt = () => {
    const snap = useSnapshot(state);
    const { nodes, materials } = useGLTF('/shirt_baked.glb');

    const logoTexture = useTexture(snap.logoDecal);
    const fullTexture = useTexture(snap.fullDecal);

    useFrame((state, delta) => easing.dampC(materials.lambert1.color, snap.color, 0.25, delta));

    const stateString = JSON.stringify(snap);

    return (
        <group key={stateString}>
            <mesh
                castShadow
                geometry={nodes.T_Shirt_male.geometry}
                material={materials.lambert1}
                material-roughness={1}
                dispose={null}
            >
                {snap.isFullTexture && (
                    <Decal
                        position={[snap.designXPos, snap.designYPos, 0.14]}
                        rotation={[0, 0, 0]}
                        scale={[
                            snap.designSize * (fullTexture.source.data.width/fullTexture.source.data.height),
                            snap.designSize,
                            snap.designSize
                        ]}
                        map={fullTexture}
                    />
                )}

                {snap.isLogoTexture && (
                    <Decal
                        position={[snap.logoXPos, snap.logoYPos, 0.16]}
                        rotation={[0, 0, 0]}
                        scale={[
                            snap.logoSize,
                            snap.logoSize / (logoTexture.source.data.width/logoTexture.source.data.height),
                            snap.logoSize
                        ]}
                        map={logoTexture}
                        depthTest={false}
                        depthWrite={true}
                    />
                )}
            </mesh>
        </group>
    )
}

export default Shirt