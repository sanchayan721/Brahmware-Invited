/* ------ IMPORTING FILES ------- */
import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./assets/css/style.min.css";
import "./assets/scss/style.scss";

import LoadingPage from "./pages/loading";
import { Provider } from 'react-redux';
import store from './redux/store';

const HomePage = lazy(() => import("./pages/HomePage"));
const MeetingRoom = lazy(() => import("./pages/MeetingRoom"));

// Main function of the application
// Routes of different pages of the app are mentioned
// for use in the react application

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <BrowserRouter>
          <Suspense fallback={<LoadingPage />}>
            <Switch>
              <Route path="/" exact component={HomePage} />
              <Route path="/room" component={MeetingRoom} />
            </Switch>
          </Suspense>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
