import './App.css';
import React, { Component } from 'react'
import Navbar from './Componant/Navbar';
import News from './Componant/News';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {

  // apiKey = process.env.REACT_APP_NEWS_API

  state={
    progress:0,
    // apiKey: process.env.REACT_APP_NEWS_API
  }
  setProgress=(progress)=>{
    this.setState({progress: progress})
  }
  render() {
    return (
      <>
      <Router>
      <Navbar/>
      <LoadingBar
      height={3}
        color='#f11946'
        progress={this.state.progress}
      />
      <Routes>
          <Route excact path="/" element= {<News setProgress={this.setProgress} apiKey={this.apiKey} key="general"pageSize={9} country='in' category='general'/>}/>
          <Route excact path="/business" element= {<News setProgress={this.setProgress} apiKey={this.apiKey} key="business"pageSize={9} country='in' category='business'/>}/>
          <Route excact path="/entertainment" element= {<News setProgress={this.setProgress} apiKey={this.apiKey} key="entertainment"pageSize={9} country='in' category='entertainment'/>}/>
          <Route excact path="/general" element= {<News setProgress={this.setProgress} apiKey={this.apiKey} key="general"pageSize={9} country='in' category='general'/>}/>
          <Route excact path="/health" element= {<News setProgress={this.setProgress} apiKey={this.apiKey} key="health"pageSize={9} country='in' category='health'/>}/>
          <Route excact path="/science" element= {<News setProgress={this.setProgress} apiKey={this.apiKey} key="science"pageSize={9} country='in' category='science'/>}/>
          <Route excact path="/sports" element= {<News setProgress={this.setProgress} apiKey={this.apiKey} key="sports"pageSize={9} country='in' category='sports'/>}/>
          <Route excact path="/technology" element= {<News setProgress={this.setProgress} apiKey={this.apiKey} key="technology"pageSize={9} country='in' category='technology'/>}/>
        </Routes>
      </Router>
      </>
    )
  }
}
