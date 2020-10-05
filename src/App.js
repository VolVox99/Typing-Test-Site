import React from 'react';
import Home from './pages/home'
import CompletedPage from './pages/completedpage'
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Router>
        
          <Switch>

            <Route path = '/completed' component = {(props) => <CompletedPage {...props}/>}/>
            <Route path = '/' component = {Home}/>

          </Switch>
            
      
      </Router>
    </div>
  );
}

export default App;
