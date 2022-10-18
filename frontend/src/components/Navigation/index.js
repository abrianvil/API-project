import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
// import LoginFormModal from '../LoginFormModal';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <ProfileButton user={null} />
    );
  }

  return (
  
      <div id='navList'>
        <NavLink exact to="/">Home</NavLink>
        <div>
        {isLoaded && sessionLinks}
        </div>
      </div>

  );
}

export default Navigation;
