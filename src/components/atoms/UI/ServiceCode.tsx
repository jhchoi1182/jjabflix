import { useState } from "react";
import styled from "styled-components";
import { theme } from "../../../styles/theme";

const ServiceCode = () => {
  const [serviceCode, setServiceCode] = useState<string>("서비스 코드");

  const serviceCodeGenerator = () => {
    const num = Math.random().toFixed(6).split(".")[1];
    const code = `${num.substring(0, 3)}-${num.substring(3)}`;
    setServiceCode(code);
  };

  return (
    <ServiceCodeBox>
      <button disabled={serviceCode !== "서비스 코드"} onClick={serviceCodeGenerator}>
        {serviceCode}
      </button>
    </ServiceCodeBox>
  );
};

export default ServiceCode;

const ServiceCodeBox = styled.div`
  button {
    height: 3.2rem;
    background-color: transparent;
    color: ${theme.grey.lighter};
    border: 1px solid;
    cursor: pointer;
    &:hover {
      color: ${theme.white.darker};
      border: 1px solid ${theme.grey.lighter};
    }
  }
`;
