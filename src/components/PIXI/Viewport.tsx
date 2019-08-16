import { PixiComponent } from '@inlet/react-pixi';
import { Viewport } from 'pixi-viewport';

const TYPE = 'Viewport';
const behavior = {
  create: props => new Viewport({
    screenWidth: props.app.renderer.width,
    screenHeight: props.app.renderer.height,
    worldWidth: 1000,
    worldHeight: 1000,
    interaction: props.app.renderer.plugins.interaction,
  }).drag()
    .pinch()
    .wheel()
    .clampZoom({
      minWidth: 500, minHeight: 500, maxWidth: 8000, maxHeight: 8000,
    })
};

export default PixiComponent(TYPE, behavior);
