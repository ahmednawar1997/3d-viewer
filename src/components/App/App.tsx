import './App.css';
import { Canvas } from '@react-three/fiber';
import Scene from '../Scene/Scene';
import { useShapeStore } from '../../stores/shapeStore';
import { Slider } from '@mui/material';
import zIndex from '@mui/material/styles/zIndex';

function App() {
  const { dimensions, setDimensions } = useShapeStore();

  return (
    <div className="canvas-container">
      <div className="dimensions">
        <div>Width: {dimensions.width}</div>
        <Slider
          defaultValue={dimensions.width}
          aria-label="Default"
          valueLabelDisplay="auto"
          style={{ zIndex: 1 }}
          step={0.25}
          max={10}
          onChange={(e, val) => setDimensions({ ...dimensions, width: val as number })}
        />
        <div>Length: {dimensions.length}</div>
        <Slider
          defaultValue={dimensions.length}
          aria-label="Default"
          valueLabelDisplay="auto"
          style={{ zIndex: 1 }}
          step={0.25}
          max={10}
          onChange={(e, val) => setDimensions({ ...dimensions, length: val as number })}
        />

        <div>Depth: {dimensions.depth}</div>
        <Slider
          defaultValue={dimensions.depth}
          aria-label="Default"
          valueLabelDisplay="auto"
          style={{ zIndex: 1 }}
          step={0.25}
          max={10}
          onChange={(e, val) => setDimensions({ ...dimensions, depth: val as number })}
        />
      </div>
      <Canvas className="canvas">
        <Scene></Scene>
      </Canvas>
    </div>
  );
}

export default App;
