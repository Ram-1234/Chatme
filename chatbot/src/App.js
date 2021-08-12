import Home from  './components/home/Home'
import Chat from './components/chat/Chat'
import './App.css';
import {BrowserRouter as Router,Route} from 'react-router-dom'

function App() {
  return (
    <div className="App">
       <Router>
         <Route exact path="/" component={Home}/>
         <Route exact path="/chat" component={Chat}/>
       </Router>
    </div>
  );
}

export default App;
