import './Controls.css';
import { Slider } from '@mui/material';
import { useShapeStore } from '../../stores/ShapeStore';

function Controls() {
  const { dimensions, setDimensions } = useShapeStore();

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
        onChange={(_, val) => setDimensions({ ...dimensions, depth: val as number })}
      />
    </div>
  );
}

export default Controls;
