import React from 'react';
import Timer from './timer'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Count from './count'


function App() {

  return (
    <BrowserRouter>
      <Switch>

        <Route exact path="/" component={Timer} />
        <Route exact path="/count" component={Count} />

      </Switch>
    </BrowserRouter>

  );
}

export default App;
