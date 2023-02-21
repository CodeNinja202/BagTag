import React from "react";
import { Link } from "react-router-dom";
import LoginIcon from '@mui/icons-material/Login';

import LogoutIcon from '@mui/icons-material/Logout';

const Navbar = ({ logout, token, user, fetchAllTagPLayers}) => {
  const { id } = user;




  return (
    <header>
      <nav className="navBox">
      
        {token ? (
          <>    
   
            <Link to="/" onClick={() => { logout(); }} className="navbarLink" style={{ textDecoration: "none", color:"black"   }}><LogoutIcon/></Link>

          </>
        ) : (
          <Link to="/login" className="navbarLink" style={{ textDecoration: "none", color:"black"  }}>
            <LoginIcon/>
          
        </Link>
        )}
           
        
      </nav>
    </header>
  );
};

export default Navbar;