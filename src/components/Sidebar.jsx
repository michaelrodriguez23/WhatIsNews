import React, {Component} from 'react'
import Styled from 'styled-components';

class Sidebar extends Component {
     render(){
  return (
    <Wrapper>
      <ScrollBar width="40%" direction="up" height="100px"scrollamount="1" >
        I'M DELETING YOU, DADDY!😥😥

    ██]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]] 10% complete.....😎

    ████]]]]]]]]]]]]]]]]]]]]]]]]]]] 35% complete....😎

    ███████]]]]]]]]]]]]]]]] 60% complete....😎

    ███████████] 99% complete.....😎
</ScrollBar>
</Wrapper>
  )
}
}

const Wrapper = Styled.div`
display:flex;
 padding: 0;

 box-sizing: border-box;
font: inherit;
`;
const ScrollBar = Styled.marquee`
width:40%;
height:47%;
text-align:center;
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -65%);
`;

export default Sidebar
