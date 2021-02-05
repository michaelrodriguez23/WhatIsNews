import React from 'react'
import {useState} from 'react';
import Styled from 'styled-components';
import '../index.css';


const NewsTicker = () => {
  const now = new Date();
  const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
  const date = `${monthNames[now.getMonth()+1]}.${now.getDate()}.${now.getFullYear()}`;
  return (
    <Wrapper>
    <BreakingBox>
      <DateT>
        {date}
      </DateT>
    <BigHeader className="heading"></BigHeader>
      </BreakingBox>
    <NewsBox>
  <News className="textUpdate">
  <marquee behavior="scroll" direction="left" scrollamount="12">👁👄👁Below are the keywords used in the NYTIMES for every article shared. Deconstucting their metadata provides a context of seeing outside their wireframe, a clear intake of the topics of media we consume as news. 👁👄👁 it is of little comfort to realize that the Internet is "a favor" - a favor that can be taken away at any moment. 🚫🤦⛓️< /marquee></News>
    </NewsBox>
    </Wrapper>

  )
}
const DateT = Styled.p`
  text-align: center;
  font-size: 1em;
  font-family: 'Roboto Mono', monospace;
  color: #f56468`;


const Wrapper = Styled.div`
background-color: black;
display:flex;
 padding: 0;
 border: 0;
 box-sizing: border-box;
font: inherit;
`;
const BreakingBox = Styled.div`
@media screen and (max-width: 1200px) {

    width:35vw;

}
background:black;
flex-direction:row;
height:10vh;
width:20vw;
border-radius:100px;
position: relative;
justify-content: center;
box-shadow: 2px 5px 20px #27184f;
font-family:serif;
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

font-family: 'Roboto Mono', monospace;`;

const News = Styled.p`
@media screen and (max-width: 1200px) {

font-size: 2vh;

}
font-size: 1.5vw;
color:white;
position:center;
text-align: right;
padding: 25px;
`;
export default NewsTicker
