import React, { useState, useEffect } from 'react';
import { styled } from 'linaria/react';
import { match } from 'react-router-dom';
import Left from './sidebars/Left';
import Right from './sidebars/Right';
import Top from './sidebars/Top';
import Canvas from './Canvas';
import db from '~/utils/db';

const EditorWrapper = styled.main`
  display: flex;
  flex-flow: row wrap;
`;

const LeftWrapper = styled.aside`
  /* z-index: 10; */
  /* height: calc(100vw - 3rem); */
  width: 15rem;
  flex-shrink: 0;
  /* position: fixed; */
  /* top: 3rem; */
`;

const RightWrapper = styled.aside`
  z-index: 10;
  width: 15rem;
  position: fixed;
  top: 3rem;
  left: calc(100vw - 15rem);
`;

enum STATUS {
  INIT,
  LOADING,
  SUCCESS,
  ERROR,
}

const Editor: React.FC<{ match: match<EditorRouteParams>}> = (
  { match: matchRoute }: { match: match<EditorRouteParams> }
) => {
  const [status, setStatus] = useState(STATUS.INIT);
  useEffect(() => {
    const checkInDb = async (): Promise<void> => {
      setStatus(STATUS.LOADING);
      const result = await db.files.where('id').equals(matchRoute.params.id).count();
      if (result > 0) {
        setStatus(STATUS.SUCCESS);
      } else {
        setStatus(STATUS.ERROR);
      }
    };
    checkInDb();
  }, [matchRoute.params.id]);
  return (
    <EditorWrapper>
      {/* <p>{match.params.id}</p> */}
      {status === STATUS.SUCCESS && (
        <>
          <Top />
          <LeftWrapper>
            <Left />
          </LeftWrapper>
          <RightWrapper>
            <Right />
          </RightWrapper>
          <Canvas id={matchRoute.params.id} />
        </>
      )}
    </EditorWrapper>
  );
};

export default Editor;
