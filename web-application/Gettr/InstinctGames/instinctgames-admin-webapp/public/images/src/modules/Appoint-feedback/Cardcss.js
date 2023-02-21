import styled from "styled-components";
const Container = styled.div`
  border-radius: 7px;
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 4px 15px #00000012;
  width: 100%;
  padding-left: 20px;
  padding-right: 20px;
  @media (max-width: 1025px) {
    padding-right: 40px;
  }
`;
const CardHeader = styled.div`
  padding: 15px 0 10px 20px;
`;
const CardRow = styled.div`
  border-top: 1px solid #e8e8e8;
  display: flex;
  flex-direction: row;
`;
const Heading = styled.p`
  color: var(--unnamed-color-686868);
  text-align: left;
  font: normal normal bold 16px/22px Nunito;
  letter-spacing: 0px;
  color: #686868;
  opacity: 1;
  margin: 0;
`;
const CardImg = styled.div`
  margin: 10px 10px 10px 25px;
  // box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
`;
const CardText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 20px;
  margin-top: 10px;
`;
const Img = styled.img.attrs((props) => ({
  src: props.path,
}))`
  width: 60px;
  height: 60px;
  border-radius: 50%;
`;

// const Text2 = styled.p`
//   margin: 0;
//   color: var(--unnamed-color-7d84c0);
// text-align: left;
// font: normal normal normal 15px/20px Nunito;
// letter-spacing: 0px;
// color: #7D84C0;
// opacity: 1
// margin-ottom:5px;
// `;

const Text = styled.p`
  margin: 0;

  text-align: left;
  font: normal normal normal 16px/22px Nunito;
  letter-spacing: 0px;
  color: #ACACAC;
  opacity: 1;

  margin-bottom: 20px;
`;
const Text1 = styled.p`
  margin-left: 75px;

  text-align: left;
  font: normal normal normal 16px/22px Nunito;
  letter-spacing: 0px;
  color: #acacac;
  letter-spacing: 0px;
  color: #7d84c0;
  opacity: 1;
  @media (max-width: 850px) {
    margin: 0;
  }
`;
const TextBold = styled.p`
  margin: 0;
  color: var(--unnamed-color-5c4b75);
  text-align: left;
  font: normal normal bold 16px/22px Nunito;
  letter-spacing: 0px;
  color: #5C4B75;
  opacity: 1;

  color: #5c4b75;
`;
const CardInfo = styled.div`
  padding-top: 20px;
  margin-left: auto;
`;
const CardRating = styled.div`
  padding-top: 8px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;
const Star = styled.img.attrs((props) => ({
  src: props.path,
}))`
  width: 15px;
  height: 15px;
  margin-right: 15px;
`;
export {
  Container,
  Img,
  TextBold,
  Text,
  CardRow,
  CardText,
  CardHeader,
  Heading,
  CardImg,
  CardInfo,
  CardRating,
  Star,
  Text1,
};
