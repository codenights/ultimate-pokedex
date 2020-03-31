import React from "react";
import styled from "styled-components";

export function RefinementHeader(props) {
  return (
    <RefinementHeaderContainer>
      <RefinementLabel>{props.children}</RefinementLabel>

      <RefinementButton onClick={props.onRemove}>
        Remove
        <svg height="14" viewBox="0 0 14 14" width="14" css={{ marginLeft: 5 }}>
          <path
            d="m69 6c3.8659961 0 7 3.13400391 7 7 0 3.8659961-3.1340039 7-7 7s-7-3.1340039-7-7c0-3.86599609 3.1340039-7 7-7zm0 12.6875c3.1411133 0 5.6875-2.5463867 5.6875-5.6875 0-3.14111328-2.5463867-5.6875-5.6875-5.6875s-5.6875 2.54638672-5.6875 5.6875c0 3.1411133 2.5463867 5.6875 5.6875 5.6875zm2.1875-9.1875 1.3125 1.3125-2.1875 2.1875 2.1875 2.1875-1.3125 1.3125-2.1875-2.1875-2.1875 2.1875-1.3125-1.3125 2.1875-2.1875-2.1875-2.1875 1.3125-1.3125 2.1875 2.1875z"
            fill="#8393aa"
            transform="translate(-62 -6)"
          />
        </svg>
      </RefinementButton>
    </RefinementHeaderContainer>
  );
}

const RefinementHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const RefinementLabel = styled.span`
  font-family: Futura-Medium;
  font-size: 15px;
  color: #fff;
  letter-spacing: 0;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const RefinementButton = styled.button`
  background: #2d3342;
  box-shadow: 1px 2px 0 0 rgba(0, 0, 0, 0.22),
    inset 1px 1px 0 0 rgba(198, 210, 171, 0.25);
  border-radius: 4px;
  font-family: Futura-Medium;
  font-size: 13px;
  color: #78839a;
  letter-spacing: 0;
  display: flex;
  align-items: center;
  padding: 3px 10px;
  margin-left: 16px;

  &:focus {
    outline: none;
  }
`;
