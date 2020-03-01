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

export const CardList = styled.ul``;

export const CardItem = styled.li`
  display: flex;
  align-items: center;
  background-image: radial-gradient(
    circle at -75% -7%,
    #88cd69 0%,
    #364154 40%,
    #1a202c 60%
  );
  box-shadow: 0 6px 15px 0 rgba(0, 0, 0, 0.21), 0 3px 3px 0 rgba(0, 0, 0, 0.17),
    inset 1px 1px 0 0 rgba(255, 255, 255, 0.12),
    inset 1px 1px 3px 0 rgba(136, 205, 105, 0.21);
  border-radius: 29px;
  padding: 6px 24px;

  &:not(:last-of-type) {
    margin-bottom: 14px;
  }

  & dl {
    display: inline-grid;
    grid-template-columns: minmax(175px, 1fr) minmax(175px, 1fr) 50px 50px 50px 1fr;
  }

  & dt {
    font-family: Futura-Medium;
    font-size: 12px;
    color: rgba(91, 108, 142, 0.8);
    letter-spacing: 0;
  }
`;

export const CardTitle = styled.div`
  font-family: Futura-Medium;
  color: #fff;
  letter-spacing: 0;
  min-width: 150px;
`;
