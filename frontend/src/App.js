import React, { Component } from 'react';
import './App.css';
import Main from './components/Main';
import { BrowserRouter, Route, Switch } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Main />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
