import styled from "styled-components";

export const Title = styled.h2.attrs({
  className: "text-2xl text-gray-500 uppercase mb-4",
})`
  border-bottom: 1px solid #2d3748;
`;

export const InnerCard = styled.div`
  background: #1b212d;
  box-shadow: 1px 1px 0 0 rgba(68, 90, 96, 0.51),
    inset 1px 1px 4px 0 rgba(0, 0, 0, 0.54);
  border-radius: 3px;
  padding: 10px 16px;

  &:not(:last-of-type) {
    margin-bottom: 1rem;
  }
`;
