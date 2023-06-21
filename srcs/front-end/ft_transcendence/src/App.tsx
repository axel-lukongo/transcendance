import React from 'react';
import Authentication from './components/Authentication/Authentication';
import Contact from './components/Contact/Contact';
import CreateChanelForm from './components/Chanel/CreateChanelForm';
import UserChanelsList from './components/Chanel/ChanelsList';

const App = () => {
  return (
    <React.Fragment>
      <Authentication />
      <Contact />
      <CreateChanelForm/>
      <UserChanelsList/>
    </React.Fragment>
  )
 }

export default App;
