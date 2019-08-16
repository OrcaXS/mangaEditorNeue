import React, { useState } from 'react';
import { styled } from 'linaria/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Topbar = styled.nav`
  background-color: theme('colors.peach-mono-1');
  height: 3rem;

  position: fixed;
  top: 0;
  z-index: 10;
  width: 100%;
  padding: 0 1rem;

  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
`;

const ToolBtn = styled.button`
  font-size: 1.125rem;
  color: white;
  padding: .875rem;

  cursor: default;
  line-height: 0;

  &:hover {
    background-color: theme('colors.peach');
  }
`;

const Top: React.FC = () => (
  <Topbar>
    <ToolBtn>
      <FontAwesomeIcon icon="save" />
    </ToolBtn>
    <ToolBtn>
      <FontAwesomeIcon icon="undo" />
    </ToolBtn>
    <ToolBtn>
      <FontAwesomeIcon icon="redo" />
    </ToolBtn>
    <ToolBtn>
      <FontAwesomeIcon icon="plus-square" />
    </ToolBtn>
    <ToolBtn>
      <FontAwesomeIcon icon="crop" />
    </ToolBtn>
  </Topbar>
);

export default Top;
