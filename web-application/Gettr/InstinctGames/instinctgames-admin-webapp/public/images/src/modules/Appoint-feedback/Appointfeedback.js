import React from 'react';
import Userdetail from "./userdetail";
import Reviewpart from "./Reviewpart";
import styled from "styled-components";


function Feedback() {
    const Container=styled.div`
    display:flex;
    flex-direction:row;
    width:auto;

    @media(max-width:1025px){
        flex-direction:Column;
        width:auto;    
    }
    `;
    return (
        <>
        <Container>
         <Userdetail/>
         <Reviewpart/>
         </Container>
        </>
    )
}

export default Feedback;
