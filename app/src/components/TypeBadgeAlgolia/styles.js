import styled from "styled-components";

const getColorFromTypeFromProps = props =>
  `--color-type-${props.type.toLowerCase()}`;

export const Tag = styled.span`
  box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.3),
    inset 1px 1px 1px rgba(255, 255, 255, 0.1);

  background-image: linear-gradient(
    -40deg,
    rgba(75, 79, 92, 0.3) 15%,
    rgba(0, 0, 0, 0.4) 90%,
    var(${getColorFromTypeFromProps})
  );

  &.active {
    box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.3),
      inset 1px 1px 1px rgba(255, 255, 255, 0.1);

    background-image: linear-gradient(
      45deg,
      rgba(75, 79, 92, 0.3) 45%,
      var(${getColorFromTypeFromProps})
    );

    color: var(${getColorFromTypeFromProps});
    text-shadow: 0 0 12px var(${getColorFromTypeFromProps});

    span:last-child {
      color: rgb(25, 29, 42);
      font-weight: 600;
    }
  }

  &:hover {
    cursor: pointer;
    box-shadow: inset 0 0 2px 0 var(${getColorFromTypeFromProps}),
      inset 0 0 10px var(${getColorFromTypeFromProps});

    span:last-child {
      color: rgb(163, 188, 210);
    }
  }
`;

export const TypeName = styled.span`
  color: var(${getColorFromTypeFromProps});
  text-shadow: 0 0 12px var(${getColorFromTypeFromProps});
`;

export const TypeCount = styled.span`
  color: rgb(163, 188, 210);
`;
