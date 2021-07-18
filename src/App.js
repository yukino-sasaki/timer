import React, { createContext, useState } from 'react';
import IntervalTimer from './intervaltimer'
import { BrowserRouter, Route, Switch } from 'react-router-dom'


export const Store = createContext()

function App() {

  const [pause, setPause] = useState("")
  return (
    <BrowserRouter>
      <Switch>
        <Store.Provider value={{ pause, setPause }}>
          <Route exact path="/" component={IntervalTimer} />

        </Store.Provider>

      </Switch>
    </BrowserRouter>

  );
}

export default App;
