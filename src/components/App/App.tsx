import './App.css';
import { Canvas } from '@react-three/fiber';
import Scene from '../Scene/Scene';
import Controls from '../Controls/Controls';

function App() {
  return (
    <div className="canvas-container">
      <Controls></Controls>
      <Canvas className="canvas">
        <Scene></Scene>
      </Canvas>
    </div>
  );
}

export default App;
