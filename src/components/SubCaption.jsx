import React, {Component} from 'react'
import Styled from 'styled-components';

class SubCaption extends Component {
     render(){
  console.log(this.props.todos) // the state of app.js
    return (
    <Wrapper>
      <h1 className="caption">Useful Idiots in the Digital Age</h1>
      <p>Do yourself a favor, and be safe out there !</p>
      <p>It isn't <em>easy</em> navigating this strange place.</p>
      <p>If we aren't careful, the world may end up an arms race</p>
    </Wrapper>
    );
  }
}
const Wrapper = Styled.div`
color:white;
font-size: calc(07px + 2vmin);
padding: 1.5%;
display: flex;
flex-direction: center;
`

export default SubCaption;
