import React, { createContext, useState } from 'react';
import IntervalTimer from './intervaltimer'



export const Store = createContext()

function App() {

  const [pause, setPause] = useState("")
  return (

    <Store.Provider value={{ pause, setPause }}>
      <IntervalTimer />

    </Store.Provider>


  );
}

export default App;
