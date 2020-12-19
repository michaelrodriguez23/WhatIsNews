import React from 'react'
import Styled from 'styled-components';
import Parallax from 'react-rellax'


const SectionA = () => {
  return (
    <Wrapper>

        <Parallax speed={-3}>
    <img src={process.env.PUBLIC_URL+'/guy_on_phone.png'} alt=""/>
</Parallax>

    </Wrapper>
  )
}
const Wrapper = Styled.div`
background-image: url('/laptop.png');
  background-repeat: no-repeat, repeat;
background-color:#27184f;
min-height: 99.9vh;
color:white;
`


export default SectionA
