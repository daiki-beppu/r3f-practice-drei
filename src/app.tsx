import type { Object3D } from "three";

import {
  Float,
  Html,
  MeshReflectorMaterial,
  OrbitControls,
  PivotControls,
  Text,
  TransformControls,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useRef } from "react";

export const App = () => (
  <div className="fixed top-0 left-0  w-dvw h-dvh overflow-hidden">
    <Canvas>
      <Scene />
    </Canvas>
  </div>
);

export const Scene = () => {
  const cubeRef = useRef<Object3D>(null!);
  const sphereRef = useRef<Object3D>(null!);

  return (
    <>
      <OrbitControls makeDefault />

      <directionalLight position={[1, 2, 3]} intensity={4.5} />
      <ambientLight intensity={1.5} />

      <PivotControls anchor={[0, 0, 0]} depthTest={false}>
        <mesh position-x={-2} ref={sphereRef}>
          <sphereGeometry />
          <meshStandardMaterial color="orange" />
          <Html
            className="text-white whitespace-nowrap bg-gray-500/80 rounded-lg p-4"
            position={[1, 1, 0]}
            center
            distanceFactor={8}
            occlude={[sphereRef, cubeRef]}
          >
            good sphere 👍
          </Html>
        </mesh>
      </PivotControls>

      <mesh position-x={2} scale={1.5} ref={cubeRef}>
        <boxGeometry />
        <meshStandardMaterial color="mediumpurple" />
      </mesh>
      <TransformControls object={cubeRef} />

      <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <MeshReflectorMaterial
          resolution={512}
          blur={[1000, 1000]}
          mixBlur={1}
          mirror={0.5}
          color="greenyellow"
        />
      </mesh>

      <Float speed={5} floatIntensity={2}>
        <Text
          font="./font/alfa-slab-one-v21-latin-regular.woff"
          fontSize={1}
          position={[0, 2, 0]}
          textAlign="center"
        >
          I Love R3F
          <meshNormalMaterial />
        </Text>
      </Float>
    </>
  );
};
