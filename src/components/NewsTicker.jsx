import React from 'react'
import {useState} from 'react';
import Styled from 'styled-components';
import '../index.css';


const NewsTicker = () => {
  const now = new Date();
  return (
    <Wrapper>
    <BreakingBox>
    <BigHeader className="heading"></BigHeader>
      </BreakingBox>
    <NewsBox>
  <News className="textUpdate">
  <marquee behavior="scroll" direction="left" scrollamount="10"> 👁👄👁 it is of little comfort to realize that the Internet is "a favor" - a favor that can be taken away at any moment. Moreover, the Internet is more disfunctional than available, be it because of the nation-wide firewall of China or the massive data surveillance in the USA where this "favor" comes with indecent strings attached. It's high time to leave the Internet people.  🚫🤦⛓️< /marquee></News>
    </NewsBox>
    </Wrapper>

  )
}
const Wrapper = Styled.div`
background-color: black;
display:flex;
 padding: 0;
 border: 0;
 box-sizing: border-box;
font: inherit;
`;
const BreakingBox = Styled.div`
background:black;
flex-direction:row;
height:10vh;
width:20vw;
border-radius:100px;
position: relative;
justify-content: center;
box-shadow: 2px 5px 20px #27184f;

align-items: center;
border-right: 30px solid #f56468;
border-left: 30px solid #f56468;
margin-top:.5%;
margin-left:.5%;
`;
const NewsBox = Styled.div`
background:black;
height:10vh;
width:80vw;
border-bottom: 1.5px solid #f56468;

`;

const BigHeader = Styled.h1`
font-size:1.8vw;
color:#f56468;
text-align: center;
text-decoration-line:  ;
 text-decoration-style: ;
    font-family: 'Roboto Mono', monospace;`;

const News = Styled.p`
font-size: 1.5vw;
color:white;
position:center;
text-align: right;
padding: 25px;
`;
export default NewsTicker
