import styled from "styled-components";

export const RefinementItem = styled.li`
  margin-bottom: 18px;
  &:not(:last-of-type) {
    margin-right: 18px;
  }
`;

export const RefinementCard = styled.div`
  background-image: linear-gradient(180deg, #2f3544 0%, #1a202c 100%);
  box-shadow: 0 3px 7px 0 rgba(0, 0, 0, 0.39),
    inset 1px 1px 0 0 rgba(255, 255, 255, 0.12);
  border-radius: 4px;
  padding: 11px;
  color: #fff;
  min-width: 290px;
`;

export const RefinementDetails = styled.div`
  display: flex;
  align-items: center;
  margin-top: 9px;
  background: rgba(27, 33, 45, 0.6);
  box-shadow: 1px 1px 0 0 rgba(255, 255, 255, 0.11),
    inset 1px 1px 4px 0 rgba(0, 0, 0, 0.33);
  border-radius: 3px;
  padding: 7px 11px;
`;
