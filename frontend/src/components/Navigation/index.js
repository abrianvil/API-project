import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignUpFormModal from '../SignupFormPage';
import { getAllSpots } from '../../store/spots';
import './Navigation.css';
import CreateSpotForm from '../CreateSpotForm';
import image from '../../image/logo.png'
import Fuse from 'fuse.js'


function Navigation({ isLoaded }) {
  const dispatch = useDispatch()

  const sessionUser = useSelector(state => state.session);
  const spots = useSelector(state => Object.values(state.spots.all))

  const [show, setShow] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchArr, setSearchArr] = useState([])
  const [showSearchContainer, setShowSearchContainer] = useState(false)

  // console.log('thi is what', searchQuery)
  // console.log('this is spots in navigation', spots)

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

  useEffect(() => {
    dispatch(getAllSpots())
  }, [dispatch])

  const options = {
    // isCaseSensitive: false,
    // includeScore: false,
    // shouldSort: true,
    includeMatches: true,
    // findAllMatches: false,
    minMatchCharLength: 3,
    // location: 0,
    // threshold: 0.6,
    // distance: 100,
    // useExtendedSearch: false,
    // ignoreLocation: false,
    // ignoreFieldNorm: false,
    // fieldNormWeight: 1,
    keys: [
      "city",
      "state",
      "name"
    ]
  };

  const fuse = new Fuse(spots, options)
  useEffect(() => {
    setSearchArr(fuse.search(searchQuery.trim()))
    // setShowSearchContainer(true)
  }, [searchQuery])

  useEffect(() => {
    const clickAway = () => {
      setShowSearchContainer(false)
    }
    document.addEventListener('click', clickAway);
    return () => document.removeEventListener('click', clickAway);
  }, [showSearchContainer])

  console.log(searchArr)

  const handleChange=(e)=>{
    setSearchQuery(e.target.value)
    setShowSearchContainer(true)
  }

  return (

    <div id='navList'>
      <NavLink exact to="/">
        <img id='home-image' src={image}></img>
      </NavLink>
      <div>
        <input
          className='search-bar'
          value={searchQuery}
          onChange={handleChange}
          placeholder='Name | City | State'
        ></input>

        {showSearchContainer ?
          <div className='search-results'>
            {searchArr && showSearchContainer &&
              <div >
                {searchArr.length > 0 ? <div className='search-name'>{searchArr.map((data) => (
                  <NavLink key={data.item.id} to={`/spots/${data.item.id}`} className='one-search'>
                    <div>{data.item.name}</div>
                    <div className='search-city-state'>{data.item.city}, {data.item.state}</div>
                  </NavLink>
                ))}
                </div> :
                  <div>No results found!</div>
                }
              </div>
            }
          </div> : null}

      </div>


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
