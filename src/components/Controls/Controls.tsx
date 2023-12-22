import './Controls.css';
import { Slider } from '@mui/material';
import { useShapeStore } from '../../stores/ShapeStore';
import { ColorResult, GithubPicker } from 'react-color';

function Controls() {
  const { dimensions, setDimensions, setColor } = useShapeStore();

  const changeColor = (color: ColorResult) => {
    setColor(color.hex);
  };
  return (
    <div className="dimensions">
      <div>Width: {dimensions.width}</div>
      <Slider
        defaultValue={dimensions.width}
        aria-label="Default"
        valueLabelDisplay="auto"
        style={{ zIndex: 1 }}
        step={0.25}
        max={10}
        min={1}
        onChange={(_, val) => setDimensions({ ...dimensions, width: val as number })}
      />
      <div>Length: {dimensions.length}</div>
      <Slider
        defaultValue={dimensions.length}
        aria-label="Default"
        valueLabelDisplay="auto"
        style={{ zIndex: 1 }}
        step={0.25}
        max={10}
        min={1}
        onChange={(_, val) => setDimensions({ ...dimensions, length: val as number })}
      />

      <div>Depth: {dimensions.depth}</div>
      <Slider
        defaultValue={dimensions.depth}
        aria-label="Default"
        valueLabelDisplay="auto"
        style={{ zIndex: 1 }}
        step={0.25}
        max={10}
        min={1}
        onChange={(_, val) => setDimensions({ ...dimensions, depth: val as number })}
      />

      <div className="shape-title">Shape Color</div>
      <GithubPicker
        onChange={(c) => {
          changeColor(c);
        }}
      />
    </div>
  );
}

export default Controls;
