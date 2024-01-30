import React, { useState } from 'react';
import { Box } from "@mui/material";

import DrawerAuth from '../../modules/home/DrawerAuth';

function Header() {
  const user = JSON.parse(localStorage.getItem('user'))
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleAccountClick = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };


  return (
    <Box>
      <div className='wrapper_header'>
        <h1>SoundRelex</h1>
        <Box sx={{ display: 'flex', alignItems: 'center', height: '30px', cursor: 'pointer' }} >
          <img className='image_avata' src={user && user.photoURL} alt='avata'/>
          <p style={{ fontSize: '20px'}} onClick={handleAccountClick}>{user && user.displayName}</p>
        </Box>
      </div>
      {isDrawerOpen && <DrawerAuth isOpen={isDrawerOpen} onClose={closeDrawer} />}
    </Box>
  );
}

export default Header;