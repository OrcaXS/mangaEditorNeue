import React, { Component, useState } from 'react';
import { Sprite, Stage } from 'react-pixi-fiber';
import * as PIXI from 'pixi.js';

import bg from '~/assets/bj13_009_006.jpg';

const Bg = props => (
  <Sprite texture={PIXI.Texture.fromImage(bg)} {...props} />
);

const Main = () => (
  <Stage width={1280} height={1280} options={{ backgroundColor: 0x10bb99 }}>
    <Bg />
  </Stage>
);

export default Main;
