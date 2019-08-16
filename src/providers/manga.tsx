import React, {
  createContext, useState, useContext, useReducer, useEffect,
} from 'react';
import PropTypes from 'prop-types';

const MangaContext = createContext({});

const initialState = {
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_NOTI_COUNT': {
      const { system, replied, quoted } = action;
      return {
        ...state,
        unreadNotiCount: {
          system: system || 0,
          replied: replied || 0,
          quoted: quoted || 0,
        },
      };
    }
    default:
      throw new Error('Invalid action type.');
  }
};

const MangaProvider = ({ children }: { children: React.ReactNode }) => (
  <MangaContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </MangaContext.Provider>
);
MangaProvider.propTypes = {
  reducer: PropTypes.func,
  children: PropTypes.node.isRequired,
};


export default MangaContext;
export { MangaProvider };
