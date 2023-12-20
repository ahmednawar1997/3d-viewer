import { ThreeElements, useFrame, useThree } from '@react-three/fiber';
import { useState, useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useShapeStore } from '../../stores/ShapeStore';

export type ShapeProps = ThreeElements['mesh'] & {
  width?: number;
  length?: number;
  depth?: number;
  color: string;
  isRotating?: boolean;
};

type CanvasEvents = {
  mousePos: { x: number; y: number };
};

type Props = ShapeProps & CanvasEvents;

const Shape: React.FC<Props> = (props: Props) => {
  const { color, isRotating, mousePos } = props;
  const { dimensions } = useShapeStore();

  const ref = useRef<THREE.Mesh>(null!);
  const geometryRef = useRef<THREE.BoxGeometry>(null!);
  const { raycaster } = useThree();
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked] = useState(false);
  const [materials, setMaterials] = useState<THREE.Material[]>([]);
  const [selectedFaceIndex, setSelectedFaceIndex] = useState(-1);
  const { camera } = useThree();

  useEffect(() => {
    const materials: THREE.MeshStandardMaterial[] = [];
    for (let i = 0; i < 6; i++) {
      materials.push(new THREE.MeshStandardMaterial({ color: color }));
    }
    setMaterials(materials);
  }, [color]);

  useFrame((_, delta) => {
    if (!isRotating || isClicked) return;
    if (isHovered) return (ref.current.rotation.x += delta / 5);
    return (ref.current.rotation.x += delta);
  });

  const handleClick = () => {
    const mouse = new THREE.Vector2(mousePos.x, mousePos.y);
    raycaster.setFromCamera(mouse, camera);
    // console.log(raycaster.camera);

    const intersection = raycaster.intersectObject(ref.current);

    if (intersection.length > 0) {
      const faceIndex = intersection[0].faceIndex;
      let adjustedFaceIndex = -1;
      if (faceIndex) {
        adjustedFaceIndex = Math.floor(faceIndex / 2);
      }
      setSelectedFaceIndex(adjustedFaceIndex);

      highlightSelectedFace(adjustedFaceIndex);
    }
  };

  const colorCubeFace = (faceIndex: number, val: number) => {
    const cubeMaterial = ref.current.material as THREE.MeshStandardMaterial[];
    const cubeMaterialFace = cubeMaterial[faceIndex];
    cubeMaterialFace.emissive.r = val;
    cubeMaterialFace.emissive.g = val;
    cubeMaterialFace.emissive.b = val;
  };

  const highlightSelectedFace = (faceIndex: number) => {
    if (faceIndex === -1) return;
    if (faceIndex === selectedFaceIndex) {
      colorCubeFace(faceIndex, 0);
      setSelectedFaceIndex(-1);
    } else {
      colorCubeFace(faceIndex, 1);

      // Precaution to clear all the other faces.
      for (let i = 0; i < 6; i++) {
        if (i !== faceIndex) {
          colorCubeFace(i, 0);
        }
      }
    }
  };

  return (
    <mesh
      {...props}
      ref={ref}
      scale={isClicked ? 1.3 : 1}
      onClick={() => handleClick()}
      onPointerOver={() => setIsHovered(true)}
      onPointerOut={() => setIsHovered(false)}
      material={materials}
    >
      <boxGeometry args={[dimensions.width, dimensions.length, dimensions.depth]} ref={geometryRef} />
    </mesh>
  );
};

export default Shape;
