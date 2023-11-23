import React, {
  useState, useEffect, createContext, useContext,
} from 'react';
import PropTypes from 'prop-types';

const LanguaugeRussianContext = createContext();

export const LanguaugeRussianProvider = ({ children }) => {
  const [isRussian, setIsRussian] = useState(
    localStorage.getItem('russian') === 'enabled',
  );

  useEffect(() => {
    localStorage.setItem('russian', isRussian ? 'enabled' : 'disabled');
  }, [isRussian]);

  const toggleRussian = () => {
    setIsRussian((prevMode) => !prevMode);
  };

  return (
    <LanguaugeRussianContext.Provider value={{ isRussian, toggleRussian }}>
      {children}
    </LanguaugeRussianContext.Provider>
  );
};

export const useLanguageRussian = () => useContext(LanguaugeRussianContext);

// prop validation

LanguaugeRussianProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
