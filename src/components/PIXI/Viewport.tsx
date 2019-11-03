import { PixiComponent } from '@inlet/react-pixi';
import { Viewport } from 'pixi-viewport';

const TYPE = 'Viewport';
const behavior = {
  create: (
    { height, width, app }:
    { height: number; width: number; app: PIXI.Application }
  ): Viewport => new Viewport({
    screenWidth: height,
    screenHeight: width,
    worldWidth: 3000,
    worldHeight: 3000,
    interaction: app.renderer.plugins.interaction,
  }).drag()
    .pinch()
    .wheel()
    .clampZoom({
      minWidth: 500, minHeight: 500, maxWidth: 8000, maxHeight: 8000,
    }),
  applyProps: (
    instance: Viewport, _, { height, width }: { height: number; width: number }
  ): void => {
    instance.resize(width, height);
  },
};

export default PixiComponent(TYPE, behavior);
