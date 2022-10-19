import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';
import CreateSpotForm from '../CreateSpotForm';

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
        <NavLink to="/signup">
          <button>Sign Up</button>
        </NavLink>
      </>
      // </ul>
    );
  }

  return (

    <div id='navList'>
      <NavLink exact to="/">Home</NavLink>
      <div className='topRight'>
        <NavLink to='/spots'>
          <h3>Become a Host</h3>
        </NavLink>
        {/* <h3 onClick={() => setShow(!show)}>
          Become a Host
          {show && <CreateSpotForm />}
        </h3> */}

        {isLoaded && sessionLinks}
      </div>
    </div>

  );
}

export default Navigation;
