import './App.css';
import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import { BrowserRouter as Router,Routes,Route} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'
export default class App extends Component {
  state ={
    progress : 0
  }
  setProgress= (progress)=>{
    this.setState({progress:progress})
  }
  render() {
    return (
      <>
        <Router>
          <Navbar/>
          <LoadingBar
            color='#f11946'
            progress={this.state.progress}
          />
          <Routes>
            <Route path="/"  element={<News setProgress={this.setProgress} apikey={this.apiKey} key="general" pagesize={18} country="in" category="general"/>}></Route>
            <Route path="/technology"  element={<News setProgress={this.setProgress} apikey={this.apiKey} key="technology" pagesize={18} country="in" category="technology"/>}></Route>
            <Route path="/sports"  element={<News setProgress={this.setProgress} apikey={this.apiKey} key="sports" pagesize={18} country="in" category="sports"/>}></Route>
            <Route path="/entertainment"  element={<News setProgress={this.setProgress} apikey={this.apiKey} key="entertainment" pagesize={18} country="in" category="entertainment"/>}></Route>
            <Route path="/health"  element={<News setProgress={this.setProgress} apikey={this.apiKey} key="health" pagesize={18} country="in" category="health"/>}></Route>
            <Route path="/science"  element={<News setProgress={this.setProgress} apikey={this.apiKey} key="science" pagesize={18} country="in" category="science"/>}></Route>
            <Route path="/business"  element={<News setProgress={this.setProgress} apikey={this.apiKey} key="business" pagesize={18} country="in" category="business"/>}></Route>
          </Routes>
        </Router>
      </>
    )
  }
}
