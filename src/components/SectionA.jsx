import React from 'react'
import Styled from 'styled-components';
import Parallax from 'react-rellax'


const SectionA = () => {
  return (
    <Wrapper>

        <Parallax speed={2}>
    <img src={process.env.PUBLIC_URL+'/mickey.jpg'} alt=""/>
</Parallax>

    </Wrapper>
  )
}
const Wrapper = Styled.div`
background-color: black;
background-image: url('/fake.jpg');
background-repeat: repeat;
background-color:black;
min-height: 500vh;
color:white;
`


export default SectionA
