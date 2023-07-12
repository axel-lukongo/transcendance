
// import Chanel from './components/Chanel/Chanel';
// import Contact from './components/Contact/Contact';
// import ListContact from './components/Contact/ListContact';
// import Home from './components/message/my_message_app';
import Authentication from './components/Authentication/Authentication';
import Home from './components/Home/Home';
import './components/Home/Home.css'
import { Route, Routes, Link} from 'react-router-dom';
import Chat from './components/message/message';
const App = () => {
	
	return (
		<div className='bg'>
			<Authentication /> 
		</div> 
	);
};

export default App;
