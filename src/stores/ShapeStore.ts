import { create } from 'zustand';

type Dimension = {width?: number, length?: number, depth?: number};
interface ShapeState {
  dimensions: Dimension;
  color: string;
  setDimensions: (dimensions: Dimension) => void;
  setColor: (color: string) => void;
}

export const useShapeStore = create<ShapeState>((set) => ({
    dimensions: {width: 0, length: 0, depth:0},
    color: '#004dcf',//blue
    setDimensions: (dimensions) => set((state) => ( {...state.dimensions, dimensions: dimensions})),
    setColor: (color) => set({ color: color }),
}));