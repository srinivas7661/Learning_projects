import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { history } from "../managers/history";
import ButtonComponent from "./button";
import { ENCRYPT_WALLET, stringConstants } from "../constants";
import { RevealDashboard } from "./components";
import utils from "../utility";

const PhraseContainer = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  > h1 {
    align-self: flex-start;
    font: 700 16px/22px var(--root-font);
  }
`;

const PhraseForm = styled.form`
  width: 100%;
  max-width: 396px;
  margin-top: ${(props) => (props.margin ? props.margin : " 36px")};
  display: flex;
  flex-direction: column;
  position: relative;
  font: 700 16px/22px var(--root-font);

  & > p {
    text-align: center;
    margin: 0;
    font: 400 15px/22px var(--root-font);
  }

  & > section {
    width: 100%;
    border: 1px solid #d9d9d9;
    height: 83px;
    border-radius: 15px;
    display: flex;
    align-items: center;
    padding: 0 50px;
    text-align: center;
    margin-top: 15px;
    word-break: break-all;
  }

  & > input {
    margin-top: 66px;
    border: none;
    border-bottom: 1px solid #dadada;
    background-color: transparent;
    &:focus {
      outline: none;
      border-bottom: 1px solid #52a5ff;
    }
  }

  & > img {
    position: absolute;
    cursor: pointer;
    bottom: ${(props) => (!props.isError ? "140px" : "215px")};
    right: 4px;
  }
`;

const WarnText = styled.span`
  margin: 33px 0 0 0;
  text-align: center;
  font: 400 15px/22px var(--root-font);
  color: #fc223b;
`;

const ErrorText = styled(WarnText)`
  margin: 0;
  top: ${(props) => (props.top ? "185px" : "115px")};
  left: 30%;
  position: absolute;
`;

const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: ${(props) => (props.top ? "relative" : "")};

  & > label {
    font: 700 16px/22px var(--root-font);
  }

  & > input {
    border: none;
    margin-top: 40px;
    background-color: transparent;
    cursor: pointer;
    border-bottom: 1px solid #52a5ff;
    &:focus {
      outline: none;
    }
  }
  & > img {
    position: absolute;
    cursor: pointer;
    bottom: 0;
    right: 0;
    height: 30px;
  }
`;

function PasswordPhraseComponent(props) {
  const [typeState, setTypeState] = useState({
    ...props.state,
    errorMessage: false,
  });

  useEffect(() => {
    setTypeState((pre) => ({
      ...pre,
      errorMessage: false,
    }));
  }, [typeState.value.length]);

  const validateEvent = (data, password, displayPhrase) => {
    if (data) {
      try {
        const viewData = JSON.parse(utils.decryptData(data, password));
        if (displayPhrase) {
          props.handleSeed((pre) => ({
            ...pre,
            seed: viewData.seed,
            view: true,
          }));
        } else {
          setTypeState((pre) => ({
            ...pre,
            privateKey: viewData.privateKey,
            displayKey: true,
          }));
        }
      } catch (error) {
        setTypeState((pre) => ({
          ...pre,
          errorMessage: true,
        }));
      }
    } else {
      history.push("/create-wallet");
    }
  };

  const onSubmission = (e) => {
    const { value } = typeState;
    const data = localStorage.getItem(ENCRYPT_WALLET);
    e.preventDefault();
    if (typeState.displayPhrase) {
      validateEvent(data, value, typeState.displayPhrase);
      return;
    }
    if (!typeState.displayKey && !typeState.displayPhrase) {
      validateEvent(data, value);
    } else {
      history.push("/settings");
    }
  };

  return (
    <RevealDashboard>
      <img
        onClick={() => {
          history.goBack();
        }}
        src="/images/exit.svg"
        alt="exit"
      />
      <PhraseContainer>
        <h1>{props.title}</h1>
        <PhraseForm
          isError={typeState.error}
          onSubmit={onSubmission}
          margin={!typeState.displayKey ? "54px" : "36px"}
        >
          {typeState.displayKey ? (
            <>
              <p>This is your private key</p>
              <section>
                <span>{typeState.privateKey}</span>
              </section>
            </>
          ) : (
            <FieldContainer top>
              <label htmlFor="reveal-password">
                Enter password to continue
              </label>
              <input
                id="reveal-password"
                onChange={(e) =>
                  setTypeState((pre) => ({
                    ...pre,
                    value: e.target.value,
                  }))
                }
                type={typeState.field}
                value={typeState.value}
              />
              {typeState.value.length > 0 && (
                <img
                  onClick={() =>
                    setTypeState((pre) => {
                      if (pre.view) {
                        return {
                          ...pre,
                          field: "text",
                          view: !pre.view,
                        };
                      }
                      return {
                        ...pre,
                        field: "password",
                        view: !pre.view,
                      };
                    })
                  }
                  src={
                    !typeState.view
                      ? "/images/eyeOpen.svg"
                      : "/images/eyeClose.svg"
                  }
                  alt="/"
                />
              )}
            </FieldContainer>
          )}
          {typeState.error && (
            <WarnText>
              Warning: Never disclose this key. Anyone with your private keys
              can steal any assets held in your account.
            </WarnText>
          )}
          {typeState.errorMessage && (
            <ErrorText top={typeState.error}>
              {stringConstants.INCORRECT_PASSWORD}
            </ErrorText>
          )}
          <ButtonComponent
            margin={`${typeState.error ? "58px 0 0 0" : "89px 0 0 0"}`}
            type="submit"
            opacity={typeState.value.length === 0 ? "0.3" : "0"}
            disabled={typeState.value.length === 0}
          >
            {!typeState.displayKey ? "Continue" : "Done"}
          </ButtonComponent>
        </PhraseForm>
      </PhraseContainer>
    </RevealDashboard>
  );
}

export default PasswordPhraseComponent;
