import { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { ResponsiveContainer, AreaChart, Area } from "recharts";
import { coinList } from "../constants";

export const Container = styled.div`
  max-width: 600px;
  width: 100%;
  justify-content: center;
  margin: 20px auto auto auto;
  padding-bottom: ${(props) => (props.padding ? props.padding : "")};
`;

export const PopupContainer = styled.div`
  width: 460px;
  height: ${(props) => props.height};
  background: #ffffff;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.3);
  border-radius: 12px;
  padding: ${(props) => (props.padding ? props.padding : "")};
`;

export const PhraseContainer = styled.div`
  width: 100%;
  max-width: 396px;
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  & > ol {
    list-style: none;
    padding-left: 0px;
    font: 500 15px/22px var(--root-font);
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 16px;
    & > li {
      counter-increment: li;
      width: 91px;
      height: 43px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid #eaeaea;
      border-radius: 32px;
    }
    & > li::before {
      content: counter(li) ".";
    }
  }
`;

export const Graph = ({ data, coin }) => {
  return (
    <ResponsiveContainer width="100%" height={67}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop
              offset="0%"
              style={{
                stopColor: "#CF2C1E",
                stopOpacity: 7.5,
              }}
            />
            <stop
              offset="75%"
              style={{ stopColor: "#F5F6F9", stopOpacity: 0 }}
            />
          </linearGradient>
          <linearGradient id="grad2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop
              offset="0%"
              style={{
                stopColor: "#DAAA4D",
                stopOpacity: 7.5,
              }}
            />
            <stop
              offset="75%"
              style={{ stopColor: "#F5F6F9", stopOpacity: 0 }}
            />
          </linearGradient>
        </defs>
        <Area
          dataKey="pv"
          type="linear"
          stroke={`${coin === coinList[0] ? "#CF2C1E" : "#D4A043"}`}
          fill={`${coin === coinList[0] ? "url(#grad1)" : "url(#grad2)"}`}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export const SettingsDashboard = styled(Container)`
  position: relative;
  & > img {
    position: absolute;
    left: -20px;
    top: -5px;
    cursor: pointer;
  }
`;

export const RevealDashboard = styled(SettingsDashboard)`
  & > img {
    left: -40px;
  }
`;

export const BackIconContainer = styled.div`
  width: 100%;
  max-width: 600px;
  display: flex;
  gap: 11px;
  align-items: center;
  img {
    cursor: pointer;
    height: 30px;
  }
  p {
    letter-spacing: -0.408px;
    font: 700 20px/22px var(--root-font);
    color: #000000;
    margin: 0;
  }
`;

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

export const Loader = () => {
  return <LoaderCircular src="/images/loader.svg" />;
};
export const WarnText = styled.div`
  margin: 20px 0 0 0;
  font: 400 15px/22px var(--root-font);
  color: #fc223b;
`;
export const useDebounce = (value, delay) => {
  const [debounceVal, setDebounce] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounce(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return debounceVal;
};
export const ErrorMsgContainer = styled.div`
  height: 35px;
`;
