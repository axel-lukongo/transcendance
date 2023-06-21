import React from 'react';
import Authentication from './components/Authentication/Authentication';
import Contact from './components/Contact/Contact';
import CreateChanelForm from './components/Chanel/CreateChanelForm';

const App = () => {
  return (
    <React.Fragment>
      <Authentication />
      <Contact />
      <CreateChanelForm/>
    </React.Fragment>
  )
 }

export default App;
