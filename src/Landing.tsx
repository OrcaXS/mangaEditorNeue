import React, { useState, useCallback, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslation } from 'react-i18next';
import { styled } from 'linaria/react';

import Upload from '~/components/Upload';

const Wrapper = styled.div`
  @apply p-4 w-full;
`;

const Landing = ({ routeProps }: { routeProps: RouteComponentProps }) => {
  return (
    <Wrapper>
      <Upload routeProps={routeProps} />
    </Wrapper>
  );
};

export default Landing;
