import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';
import LoginFormModal from "../LoginFormModal";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  // if (user) {
  return (
    <>
      <div className="dropdown">
        <button id='profile-button' onClick={openMenu}>
          <i className="fa fa-bars" aria-hidden='true' />
          <i id="userMan" className="fas fa-user-circle" aria-hidden='true' />
        </button>

        {user && showMenu && (
          <div className="profile-dropdown">
            <div className="host">
              <NavLink to='/spots'>
                <button id="logoutButton">Become a Host</button>
              </NavLink>
            </div>
            <div className="user-inf">
              <div>{user.username}</div>
              <div>{user.email}</div>

              <button id="logoutButton" onClick={logout}>Log Out</button>

            </div>
          </div>

        )}

      </div>
    </>
  );
}

export default ProfileButton;
