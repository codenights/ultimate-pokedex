import styled from "styled-components";

const getColorFromTypeFromProps = props =>
  `--color-type-${props.type.toLowerCase()}`;

export const Tag = styled.span`
  cursor: pointer;
  color: #718096;

  &.active {
    background-image: linear-gradient(
      96%,
      rgba(75, 79, 92, 0.3) 45%,
      transparent
    );

    box-shadow: -1px -1px 0 0 #334058, 2px 2px 4px 0 rgba(0, 0, 0, 0.31);
    border-radius: 16px;
  }

  &:hover {
    box-shadow: inset 0 0 2px 0 var(${getColorFromTypeFromProps}),
      inset 0 0 10px var(${getColorFromTypeFromProps});

    span:last-child {
      color: #8497be;
    }
  }
`;

export const TypeName = styled.span`
  &.active {
    color: var(${getColorFromTypeFromProps});
    text-shadow: 0 0 12px var(${getColorFromTypeFromProps});
  }
`;

export const TypeCount = styled.span`
  color: #515969;
  font-weight: 600;

  &.active {
    color: #8497be;
  }
`;
