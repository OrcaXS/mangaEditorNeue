import React, { Component, useState } from 'react';
import { styled } from 'linaria/react';

const NavWrapper = styled.nav`
  @apply bg-gray-900;
  height: 3rem;

  display: flex;
  flex-flow: row nowrap;
  width: 100%;
`;

const NavBtn = styled.button`
  @apply text-white;
  padding: 1em;
  line-height: 1.15;

  &:hover {
    @apply bg-indigo-200 text-black;
  }
`;

const Navbar = () => (
  <NavWrapper>
    <NavBtn>Nav</NavBtn>
  </NavWrapper>
);

export default Navbar;
