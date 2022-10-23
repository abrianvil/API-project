import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SplashPage from "./components/SplashPage";
import ShowDetails from "./components/SpotDetails";
import CreateSpotForm from "./components/CreateSpotForm";
import UpdateSpotForm from "./components/UpdateForm";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path='/'>
            <SplashPage />
          </Route>

          <Route exact path='/spots/:id/edit'>
            <UpdateSpotForm />
          </Route>

          <Route path='/Spots/:id'>
            <ShowDetails />
          </Route>

          <Route path='/spots'>
            <CreateSpotForm />
          </Route>

        </Switch>
      )}
    </>
  );
}

export default App;
