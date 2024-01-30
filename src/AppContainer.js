// AppContainer.js

import React from 'react';
import { useTheme } from './config/ThemeContext';
import DrawerAuth from './modules/home/DrawerAuth';
import Routing from './routing';

const AppContainer = () => {
  const { selectedBackground } = useTheme();

  return (
    <div style={{ background: `url(${selectedBackground})`, backgroundSize: 'cover' }}>
      {/* Your app components */}
      <DrawerAuth />
      <Routing />
    </div>
  );
};

export default AppContainer;
