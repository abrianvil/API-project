import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignUpFormModal from '../SignupFormPage';
import './Navigation.css';
import CreateSpotForm from '../CreateSpotForm';
import image from '../../image/logo.png'

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session);
  const [show, setShow] = useState(false)

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {

    sessionLinks = (
      // <ProfileButton user={null} />
      // <ul className="profile-dropdown">
      <>
        <LoginFormModal />
        <SignUpFormModal />
      </>
      // </ul>
    );
  }

  return (

    <div id='navList'>
      <NavLink exact to="/">
        <img id='home-image' src={image}></img>
      </NavLink>
      <div className='topRight'>
        {/* {sessionUser && (<NavLink to='/spots'>
          <h3>Become a Host</h3>
        </NavLink>)} */}

        {isLoaded && sessionLinks}
      </div>
    </div>

  );
}

export default Navigation;
