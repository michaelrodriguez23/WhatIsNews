import './App.css'; // global css
import React, { Component } from 'react';
import Header from './components/Header';
import About from './components/About';
import Sidebar from './components/Sidebar';
import SectionA from './components/SectionA';
import NewsTicker from './components/NewsTicker';
import Nytimes from './components/Nytimes';
import Parallax from 'react-rellax'
import p5 from 'p5'

class App extends Component{
  state = {
  todos:  [
     {
      id: 1,
      title: 'Dog',
      completed: false
    },
    {
      id: 2,
      title: 'Iguana',
      completed: false
    },
    {
      id: 3,
      title: 'Cat',
      completed: false
    }
]
}
render(){
  return (
    <div className="App-header">
        <Parallax speed={1}>
    <NewsTicker />

  </Parallax>
    <Header/>
        <Nytimes />
  <Parallax speed={3}>
    <About todos={this.state.todos}/>
  </Parallax>
    <SectionA/>

    </div>


  );
}
}
export default App;
