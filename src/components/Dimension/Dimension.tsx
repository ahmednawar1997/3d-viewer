import { Line, Text } from '@react-three/drei';
import * as THREE from 'three';
import { useEffect, useRef, useState } from 'react';
import { Camera } from '@react-three/fiber';

export enum DimensionType {
  LENGTH,
  WIDTH,
  DEPTH,
}
const Dimension: React.FC<{
  corners: THREE.Vector3[];
  camera: Camera & {
    manual?: boolean | undefined;
  };
  dimension: number;
  type: DimensionType;
}> = ({ corners, camera, dimension, type }) => {
  const [textPosition, setTextPosition] = useState<THREE.Vector3>(new THREE.Vector3(0, 0, 0));
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const textRef = useRef<any>();

  useEffect(() => {
    if (corners && corners[0] && corners[1]) {
      const midX = (corners[0].x + corners[1].x + (type !== DimensionType.WIDTH ? 0.1 : 0)) / 2;
      const midY = (corners[0].y + corners[1].y + (type == DimensionType.WIDTH ? 0.1 : 0)) / 2;
      const midZ = (corners[0].z + corners[1].z) / 2;
      const vect = new THREE.Vector3(midX, midY, midZ);
      setTextPosition(vect);
      textRef.current?.lookAt(camera.position);
    }
  }, [camera.position, corners, type]);

  return (
    <>
      {corners && corners[0] && corners[1] && (
        <Line
          points={[corners[0], corners[1]]} // Array of points, Array<Vector3 | Vector2 | [number, number, number] | [number, number] | number>
          color="red"
          lineWidth={2}
          segments={false} // If true, renders a THREE.LineSegments2. Otherwise, renders a THREE.Line2
          dashed={false}
        />
      )}
      <Text color="white" fontSize={0.15} position={textPosition} ref={textRef}>
        {dimension}
      </Text>
    </>
  );
};

export default Dimension;
