import { create } from 'zustand';

type Dimension = {width?: number, length?: number, depth?: number};
interface ShapeState {
  dimensions: Dimension;
  setDimensions: (dimensions: Dimension) => void;
}

export const useShapeStore = create<ShapeState>((set) => ({
    dimensions: {width: 0, length: 0, depth:0},
    setDimensions: (dimensions) => set((state) => ( {...state.dimensions, dimensions: dimensions})),
}));