import React from 'react'
import Styled from 'styled-components';
import Parallax from 'react-rellax'
import fake from '../fake.jpg'

const SectionA = () => {
  return (
    <Wrapper>

        <Parallax speed={-20}>

</Parallax>

    </Wrapper>
  )
}
const Wrapper = Styled.div`
background-color: black;
background-image: url(${fake});
background-repeat: repeat;
background-color:black;
min-height: 200vh;
color:white;

`


export default SectionA
