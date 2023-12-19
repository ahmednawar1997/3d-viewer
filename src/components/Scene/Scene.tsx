import { useThree } from '@react-three/fiber';
import Shape from '../Shape/Shape';
import defaultShapes from '../../helpers/Shapes';
import { OrbitControls, OrbitControlsChangeEvent } from '@react-three/drei';
import { useEffect, useState } from 'react';
import { useShapeStore } from '../../stores/shapeStore';

function Scene() {
  const [shapes, setShapes] = useState(defaultShapes);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { setDimensions } = useShapeStore();

  const {
    camera,
    gl: { domElement },
  } = useThree();

  const onPointerMove = (event: PointerEvent) => {
    // calculate pointer position in normalized device coordinates
    // (-1 to +1) for both components

    const pointer: { x: number; y: number } = { x: 0, y: 0 };
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
    setMousePos(pointer);
  };

  useEffect(() => {
    window.addEventListener('pointermove', onPointerMove);
    const shape = shapes[0];
    setDimensions({ width: shape.width, depth: shape.depth, length: shape.length });
    return () => {
      document.removeEventListener('pointermove', onPointerMove);
    };
  }, [shapes, setDimensions]);

  return (
    <>
      <OrbitControls enableZoom={true} args={[camera, domElement]}></OrbitControls>
      <ambientLight intensity={0.3} />
      <directionalLight color="white" position={[0, 0, 5]} />
      <Shape {...shapes[0]} mousePos={mousePos}></Shape>
    </>
  );
}

export default Scene;
