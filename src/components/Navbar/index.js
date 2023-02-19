import React from "react";
import { Link } from "react-router-dom";




const Navbar = ({ logout, token, user, fetchAllTagPLayers}) => {
  const { id } = user;




  return (
    <header>
      <nav className="navBox">
      
        {token ? (
          <>    
   
            <Link to="/" onClick={() => { logout(); }} className="navbarLink">Logout</Link>

          </>
        ) : (
          <Link to="/login" className="navbarLink">
          Login
        </Link>
        )}
           
        
      </nav>
    </header>
  );
};

export default Navbar;