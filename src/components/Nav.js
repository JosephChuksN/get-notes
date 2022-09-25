import React, { useState } from 'react';
import { Link, NavLink } from "react-router-dom"
import { RiMenuUnfoldLine, RiMenuFoldLine } from "react-icons/ri"
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { useEffect } from 'react';
import { auth } from '../firebaseConfig';
import { BarLoader } from "react-spinners"
import { FaBars, FaTimes, FaUser, FaUserCog, FaSignOutAlt } from 'react-icons/fa';
import { TbBookDownload, TbBookUpload } from 'react-icons/tb';
import { RiUserSettingsLine, RiUser } from 'react-icons/ri';
export default function Nav() {
  const { userInfo, fetchUserDetail, setHideNav, hideNav } = useData();
  const { logOut, user, isLogged } = useAuth();
  
  useEffect(() => {
    fetchUserDetail()
  }, [user])

  
// Mobile Navigation toggle
  function toggleNav(){    
    const hamburger = document.getElementById("showNav") 
    const mNav = document.getElementById("mNav");
    const closeNav = document.getElementById("hideNav");
 
    // switching between toggle icons on click from display block to display none
    if(hamburger.style.display != "none"){
        setHideNav(!hideNav)
        hamburger.style.display = "none"
        closeNav.style.display = "block"
    }else{
        setHideNav(true)
        hamburger.style.display = "block"
        closeNav.style.display = "none"
    }
  }
// //

  return (
    <React.StrictMode>
    <nav id='nav'>
      {user 
      && 
      userInfo.username ? <h3><FaUser />  : @{userInfo.username}</h3> 
      : 
      user && <i>{userInfo.email}</i>
      }
        {/* {user && <h3>{userInfo.username}</h3>} */}
        <ul>
          <NavLink to="/">
            <li>
              <TbBookDownload /> 
              GET NOTES
            </li>
          </NavLink>
          <NavLink to="/upload">
            <li><TbBookUpload /> Upload Notes</li>
          </NavLink>
        </ul>
        {user &&
          <div className='nav--buttons--container'>
            <button onClick={logOut}>
              Sign out 
              <FaSignOutAlt />
            </button>
            <button>
              <Link to='/user/settings' className='nav--buttons--Link'>  
                settings 
                <FaUserCog />
              </Link>
            </button>
          </div>
        }
        <FaBars id='showNav' onClick={toggleNav}/>
        <FaTimes id='hideNav' onClick={toggleNav}/>
    </nav>

{/* MOBILE NAVIGATION MENU */}
    {!hideNav &&
    <div id='mNav'>
      {user 
      && 
      userInfo.username ? <h3><FaUser /> : @{userInfo.username}</h3> 
      :  
      user && <i>{userInfo.email}</i>
      }
      <ul>
          <NavLink to="/">
            <li><TbBookDownload /> GET NOTES</li>
          </NavLink>
          <NavLink to="/upload">
          <li><TbBookUpload /> UPLOAD NOTES </li>
          </NavLink>
      </ul>
      {user &&
          <div className='nav--buttons--container'>
            <button onClick={logOut}>
              Sign out 
              <FaSignOutAlt />
            </button>
            <button>
              <Link to='/user/settings' className='nav--buttons--Link'> 
                settings 
                <FaUserCog /> 
              </Link>
              </button>
          </div>
      }
    </div>
    }
    </React.StrictMode>
  )
}
