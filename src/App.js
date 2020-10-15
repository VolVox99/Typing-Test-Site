import React from 'react';
import Home from './pages/home'
import CompletedPage from './pages/completedpage'
import ErrorPage from './pages/errorpage'
import About from './components/about'
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Router>

          <About/>
          <Switch>

            <Route path = '/completed' exact component = {(props) => <CompletedPage {...props}/>}/>
            <Route path = '/' exact component = {Home}/>
            <Route component = {ErrorPage}/>

          </Switch>
            
      </Router>
    </div>
  );
}

export default App;
