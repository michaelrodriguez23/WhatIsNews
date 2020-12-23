import './App.css'; // global css
import React, { Component } from 'react';
import Header from './components/Header';
import SubCaption from './components/SubCaption';
import SectionA from './components/SectionA';
import NewsTicker from './components/NewsTicker';
import Nytimes from './components/Nytimes';
import Parallax from 'react-rellax'

class App extends Component{
  state = {

}
render(){
  return (
    <div className="App-header">
        <Parallax speed={1}>
    <NewsTicker />
  </Parallax>
    <Header/>
      <Parallax speed={5}>
        <Nytimes />
    <SubCaption todos={this.state.todos}/>
  </Parallax>
    <SectionA/>
    </div>


  );
}
}
export default App;
