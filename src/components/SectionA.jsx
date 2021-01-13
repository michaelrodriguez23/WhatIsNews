import React from 'react'
import Styled from 'styled-components';
import Parallax from 'react-rellax'


const SectionA = () => {
  return (
    <Wrapper>

        <Parallax speed={40}>
    <img src={process.env.PUBLIC_URL+'/guy_on_phone.png'} alt=""/>
</Parallax>

    </Wrapper>
  )
}
const Wrapper = Styled.div`
background-color: black;
background-image: url('/computer_rave.png');
background-repeat: repeat;
background-color:#27184f;
min-height: 100vh;
color:white;
`


export default SectionA
