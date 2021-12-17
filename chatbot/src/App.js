import Chathome from  './components/home/Home'
import Chat from './components/chat/Chat'
import Home from './home/home';
import Signup from './home/signup/signup';
import Login from './home/login/login';
import './App.css';
import {BrowserRouter as Router,Route} from 'react-router-dom';


function App() {
  return (
    <div className="App">
       <Router>
         <Route exact path="/" component={Home}/>
         <Route exact path="/chat" component={Chat}/>
         <Route exact path="/signup" component={Signup}/>
         <Route exact path="/login" component={Login}/>
         <Route exact path="/chathome" component={Chathome}/>
       </Router>
    </div>
  );
}

export default App;
