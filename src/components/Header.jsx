import React from 'react'
import Styled from 'styled-components'
export default function Header() {
    return (
      <MainImg>
      </MainImg>
    );
  };

  const MainImg = Styled.img`
    box-sizing: border-box;
    width:40%;
    height:100%;
    display:flex;
    justify-content:flex-end;
    box-shadow: -3px 10px 25px rgb(90, 20, 100);
    margin: 5% 30%;
  `;
