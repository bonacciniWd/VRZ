import { OrbitControls } from "@react-three/drei";
import { Canvas, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import Computer from "./Computer";

function MoonPlane() {
  const moonTexture = useLoader(TextureLoader, "/canvas/moon.jpg");
  return (
    <mesh
      receiveShadow
      position={[0, -1.5, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
    >
      <circleGeometry args={[15, 64]} />
      <meshStandardMaterial map={moonTexture} transparent opacity={0.7} />
    </mesh>
  );
}

const ContactExperience = () => {
  return (
    <Canvas shadows camera={{ position: [0, 3, 7], fov: 45 }}>
      <ambientLight intensity={0.5} color="#fff4e6" />
      <directionalLight position={[5, 5, 3]} intensity={2.5} color="#000" />
      <directionalLight
        position={[5, 9, 1]}
        castShadow
        intensity={2.5}
        color="#fff"
      />
      <OrbitControls
        enableZoom={false}
        minPolarAngle={Math.PI / 5}
        maxPolarAngle={Math.PI / 2}
      />
      <group scale={[1, 1, 1]}>
        <MoonPlane />
      </group>
      <group scale={0.02} position={[0, -1.49, -2]} castShadow>
        <Computer />
      </group>
    </Canvas>
  );
};

export default ContactExperience;
