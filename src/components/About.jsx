import React, {Component} from 'react'

class About extends Component {
     render(){
  console.log(this.props.todos) // the state of app.js
    return (
    <div className="brief">
      <h1 className="caption">Useful Idiots in the Digital Age</h1>
      <p>Do yourself a favor, and be safe out there !</p>
      <p>It isn't <em>easy</em> navigating this strange place.</p>
      <p>If we aren't careful, the world may end up an arms race</p>

      </div>
    );
  }
};
export default About;
