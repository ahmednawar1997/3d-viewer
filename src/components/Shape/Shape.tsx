import { ThreeElements, useFrame, useThree } from '@react-three/fiber';
import { useState, useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useShapeStore } from '../../stores/ShapeStore';
import Dimension, { DimensionType } from '../Dimension/Dimension';

export type ShapeProps = ThreeElements['mesh'] & {
  width?: number;
  length?: number;
  depth?: number;
  isRotating?: boolean;
};

type CanvasEvents = {
  mousePos: { x: number; y: number };
};

type Props = ShapeProps & CanvasEvents;

const Shape: React.FC<Props> = (props: Props) => {
  const { isRotating, mousePos } = props;
  const { dimensions, color } = useShapeStore();

  const ref = useRef<THREE.Mesh>(null!);
  const geometryRef = useRef<THREE.BoxGeometry>(null!);
  const { raycaster } = useThree();
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked] = useState(false);
  const [materials, setMaterials] = useState<THREE.Material[]>([]);
  const [corners, setCorners] = useState<THREE.Vector3[]>([]);
  const [selectedFaceIndex, setSelectedFaceIndex] = useState(-1);
  const { camera } = useThree();

  useEffect(() => {
    const materials: THREE.MeshStandardMaterial[] = [];
    for (let i = 0; i < 6; i++) {
      materials.push(new THREE.MeshStandardMaterial({ color: color }));
    }
    setMaterials(materials);
  }, [color]);

  useEffect(() => {
    geometryRef.current.computeBoundingBox();

    const boundingBox = geometryRef.current.boundingBox;

    const low = boundingBox?.min;
    const high = boundingBox?.max;

    const corner1 = new THREE.Vector3(high?.x, high?.y, high?.z);
    const corner2 = new THREE.Vector3(high?.x, high?.y, low?.z);
    const corner3 = new THREE.Vector3(high?.x, low?.y, high?.z);
    const corner4 = new THREE.Vector3(low?.x, high?.y, high?.z);
    setCorners([corner1, corner2, corner3, corner4]);
  }, [dimensions]);

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
      colorCubeFace(faceIndex, 0.1);

      // Precaution to clear all the other faces.
      for (let i = 0; i < 6; i++) {
        if (i !== faceIndex) {
          colorCubeFace(i, 0);
        }
      }
    }
  };

  const getDimensions = () => {};

  return (
    <mesh
      {...props}
      ref={ref}
      scale={isClicked ? 1.3 : 1}
      onClick={() => handleClick()}
      onPointerOver={() => {
        setIsHovered(true);
        getDimensions();
      }}
      onPointerOut={() => setIsHovered(false)}
      material={materials}
    >
      <boxGeometry args={[dimensions.width, dimensions.length, dimensions.depth]} ref={geometryRef} />
      <Dimension
        corners={[corners[0], corners[1]]}
        camera={camera}
        dimension={dimensions.depth ?? 0}
        type={DimensionType.DEPTH}
      />
      <Dimension
        corners={[corners[0], corners[2]]}
        camera={camera}
        dimension={dimensions.length ?? 0}
        type={DimensionType.LENGTH}
      />
      <Dimension
        corners={[corners[0], corners[3]]}
        camera={camera}
        dimension={dimensions.width ?? 0}
        type={DimensionType.WIDTH}
      />
    </mesh>
  );
};

export default Shape;
