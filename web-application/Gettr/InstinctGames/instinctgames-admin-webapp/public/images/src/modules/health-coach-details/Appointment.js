import React from 'react'
import DoctorList from "./docterList";
import Appointcontainer from "./Appointcontainer";
import styled from "styled-components";
import Route from "../../routes";
import { Column } from 'simple-flexbox';


function Appointment() {
    const Container=styled.div`
    display:flex;
    flex-direction:row;
    
    @media(max-width:1025px){
        flex-direction:Column;
    }
    `;
    return (
        <>
        <Container>
         <DoctorList/>

         <Appointcontainer/>
          
         </Container>
   
        </>
    )
}

export default Appointment;
