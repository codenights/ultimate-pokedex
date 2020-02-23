import styled from "styled-components";

export const ColumnLayout = styled.div`
  @media (min-width: 800px) {
    display: grid;
    grid-template-columns: 1fr 2fr;
    height: 100vh;
    overflow: hidden;
  }
`;

export const LeftPane = styled.header.attrs({
  className: "bg-gray-800 flex flex-col items-center justify-center text-white"
})``;

export const LeftPaneTitle = styled.h1.attrs({
  className:
    "text-5xl leading-none py-8 border-t-2 border-b-2 border-solid border-top border-bottom border-gray-100"
})`
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;
