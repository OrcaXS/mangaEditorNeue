import React, {
  useRef, useState, useEffect, useCallback,
} from 'react';
import { styled } from 'linaria/react'
import { AppConsumer, Sprite, Stage, Text } from '@inlet/react-pixi';
import * as PIXI from 'pixi.js';
import Viewport from '~/components/PIXI/Viewport';
import db, { Position } from '~/utils/db';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;

enum STATUS {
  INIT,
  LOADING,
  SUCCESS,
  ERROR,
}

const Main: React.FC<{ id: string }> = ({ id }: { id: string }) => {
  const [status, setStatus] = useState(STATUS.INIT);
  const bgImage = useRef(new File([''], ''));
  const balloons = useRef<Map<number, Blob>>(new Map());
  const positionMap = useRef<Map<number, Position>>(new Map());
  const containerRef = useRef<HTMLDivElement>(null);
  const [stageWidth, setStageWidth] = useState<number>(1000);
  const [stageHeight, setStageHeight] = useState<number>(500);

  const resize = useCallback(() => {
    if (containerRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect();
      setStageWidth(width);
      setStageHeight(height);
    }
  }, [containerRef]);

  const measuredRef = useCallback(node => {
    if (node !== null) {
      const { width, height } = node.getBoundingClientRect();
      setStageWidth(width);
      setStageHeight(height);
    }
  }, []);

  useEffect(() => {
    const fetchFromDb = async (): Promise<void> => {
      setStatus(STATUS.LOADING);
      const filesResult = await db.files.where('id').equals(id).first();
      const canvasResult = await db.canvas.where('id').equals(id).first();
      if (filesResult && canvasResult) {
        bgImage.current = filesResult.bgImage;
        balloons.current = filesResult.balloons;
        positionMap.current = canvasResult.positionMap;
        setStatus(STATUS.SUCCESS);
      }
      if (!filesResult || !canvasResult) {
        setStatus(STATUS.ERROR);
      }
    };
    fetchFromDb();
  }, [id]);

  useEffect(() => {
    resize();
  }, [resize]);

  useEffect(() => {
    window.addEventListener('resize', resize);
    return (): void => {
      window.removeEventListener('resize', resize);
    };
  }, [resize]);

  const Bg = (): React.ReactElement => (
    <Sprite texture={PIXI.Texture.from(URL.createObjectURL(bgImage.current))} />
  );

  const Balloon = ({ balloon, idx }: { balloon: Blob; idx: number }): React.ReactElement => {
    const position = positionMap.current.get(idx) as Position;
    return (
      <Sprite
        texture={PIXI.Texture.from(URL.createObjectURL(balloon))}
        x={position.boundingRect.x}
        y={position.boundingRect.y}
      />
    );
  };

  return status === STATUS.SUCCESS ? (
    <Container ref={measuredRef}>
      <div ref={containerRef}>
        <Stage height={stageHeight} width={stageWidth}>
          <AppConsumer>
            {(app): React.ReactElement => (
              <Viewport app={app}>
                <Bg />
                {[...balloons.current.keys()].map(idx => (
                  <Balloon
                    key={idx}
                    idx={idx}
                    balloon={balloons.current.get(idx) as Blob}
                  />
                ))}
              </Viewport>
            )}
          </AppConsumer>
        </Stage>
      </div>
    </Container>
  ) : <p />;
};

export default Main;
