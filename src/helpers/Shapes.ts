import { ShapeProps } from "../components/Shape/Shape";

 const shapes: ShapeProps[] = [
    {
      width: 3,
      length: 1,
      depth: 2,
      color: 'blue',
      position: [0, 0, 0],
      visible: true,
      rotation: [90, 0, 20],
    },
    {
      width: 3,
      length: 1,
      depth: 2,
      color: 'green',
      position: [1, 0, 0],
      visible: true,
      rotation: [90, 0, 20],
    },
    {
      width: 3,
      length: 4,
      depth: 1,
      color: 'pink',
      position: [-5, 1, 0],
      visible: true,
      rotation: [90, 0, 20],
    },
  ];

  export default shapes;