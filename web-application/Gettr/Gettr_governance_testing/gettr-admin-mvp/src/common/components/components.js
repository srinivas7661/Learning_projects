import { useEffect, useRef } from "react";
import styled from "styled-components";

export const ClickOutside = (props) => {
  const ref = useRef(null);
  const { oneClickOutside, children } = props;

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      oneClickOutside();
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside, true);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside, true);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!children) {
    return null;
  }
  return <div ref={ref}>{children}</div>;
};

export const DummyImage = styled.section`
  height: ${(props) => props.height || "35px"};
  width: ${(props) => props.width || "35px"};
  background: ${(props) => props.background || "#DADADA"};
  border-radius: ${(props) => props.borderRadius || "50%"};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LoaderCircular = styled.img`
  animation-name: circle;
  animation-duration: 1s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  height: 100%;
  @keyframes circle {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const Loader = ({ white }) => {
  return (
    <LoaderCircular
      src={`/images/${white ? "loaderWhite.svg" : "loader.svg"}`}
    />
  );
};

export const Container = styled.div`
  width: 464px;
  height: ${(props) => (props.height ? props.height : "506px")};
  justify-content: center;
  padding-bottom: ${(props) => (props.padding ? props.padding : "")};
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.05);
`;
const OtpForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const PopupContainer = styled.div`
  width: ${(props) => (props.width ? props.width : "613px")};
  height: ${(props) => props.height};
  background: #ffffff;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.3);
  border-radius: 19px;
  padding: ${(props) => (props.padding ? props.padding : "")};
`;
const OtpContainer = styled.div`
  display: flex;
  padding-top: 10px;
`;

const OtpInput = styled.input`
  width: 50px;
  margin: 0 10px;
  border: none;
  border-bottom: ${(props) =>
    props.value ? "1px solid #52a5ff" : "1px solid #DADADA"};
  padding-top: 6px;
  outline: none;
  font-size: 30px;
  height: 40px;
  background-color: transparent;
  text-align: center;
`;
export const OtpFormComponent = ({ onChange, value }) => {
  function handleChange(target) {
    onChange(target.name, target.value);
    if (target.nextSibling && target.value) target.nextSibling.focus();
  }

  function inputFocus(elmnt) {
    if (elmnt.key === "Delete" || elmnt.key === "Backspace") {
      const next = elmnt.target.tabIndex - 1;
      if (next > -1) {
        elmnt.target.form[next].focus();
      }
    } else {
      const next = elmnt.target.tabIndex;
      if (next < 6) {
        elmnt.target.form[next].focus();
      }
    }
  }

  return (
    <OtpForm onSubmit={(e) => e.preventDefault()}>
      <OtpContainer>
        {[...new Array(6).keys()].map((ipt, index) => (
          <OtpInput
            key={ipt}
            name={ipt}
            type="password"
            autoComplete="off"
            value={value[ipt]}
            onChange={(e) => handleChange(e.target, index)}
            tabIndex={index}
            maxLength="1"
            onKeyUp={(e) => inputFocus(e, index)}
          />
        ))}
      </OtpContainer>
    </OtpForm>
  );
};
