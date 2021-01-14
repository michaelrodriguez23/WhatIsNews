import React, {Component} from 'react'
import Styled from 'styled-components';

class SubCaption extends Component {
     render(){
  console.log(this.props.todos) // the state of app.js
    return (
    <Wrapper>
      <h1 className="caption">Circulation of News Can Vary Through The Web</h1>
      <p>How does the top ten articles shared online </p>
      <p>{`From "The New York Times" compare at face value`}</p>
      <p> When shared through facebook or through email</p>
    </Wrapper>
    );
  }
}
const Wrapper = Styled.div`
background-color: black;
color:white;
font-size: calc(07px + 2vmin);
padding: 1.5%;
display: flex;
flex-direction: center;
color:#f56468;
padding-left: 2%;
display:flex;
`
export default SubCaption;
