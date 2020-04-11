import React from 'react';
import './App.scss';

import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import { WeatherProvider } from "./weatherContext"; // Import Provider from Context.js

//Import components
import Header from "./layout/Header";
import Weather from './Weather';
import About from './pages/About';

function App() {
  return (
    <WeatherProvider>
      <Router>
        <Header />
        
        <Switch>
          <Route exact path="/" component={Weather} />
          <Route exact path="/about" component={About} />
        </Switch>

      </Router>
    </WeatherProvider>
  );
}

export default App;
