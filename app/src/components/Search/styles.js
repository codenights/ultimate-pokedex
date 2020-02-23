import styled from "styled-components";

const getColorFromTypeFromProps = props =>
  `--color-type-${props.type.name.toLowerCase()}`;

export const PokemonName = styled.div`
  text-shadow: 0 0 24px var(${getColorFromTypeFromProps}),
    0 0 70px var(${getColorFromTypeFromProps});
`;

export const Dcard = styled.div`
  position: relative;
  display: block;
  perspective: 500px;
  height: 120px;

  * {
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  }

  mark {
    background: transparent;
    color: white;
    text-shadow: 0 0 5px rgba(255, 255, 255, 0.8);
  }
`;

export const Card = styled.div.attrs({
  className: "card"
})`
  height: 130px;
  position: relative;
  display: block;
  transform-style: preserve-3d;
  background-size: 150% 150%;
  background-position: center;
  box-shadow: 0 8px 3px rgba(0, 0, 0, 0.15), 0 15px 20px rgba(0, 0, 0, 0.3),
    inset 1px 1px 1px rgba(255, 255, 255, 0.2),
    inset -1px -1px 1px rgba(0, 0, 0, 0.5);

  background-image: radial-gradient(
      circle at 2%,
      rgba(230, 230, 255, 0.2),
      rgba(46, 52, 64, 0.3) 40%,
      rgba(26, 32, 44, 0.6) 85%
    ),
    linear-gradient(20deg, #1a202c 55%, var(${getColorFromTypeFromProps}));

  &::after {
    background-color: var(${getColorFromTypeFromProps});
  }
`;

export const CardTitle = styled.div`
  position: absolute;
  top: 75%;
  left: 50%;
  transform: scale(0.85) translateY(-55%) translateX(-55%) translateZ(40px);
`;

export const CardFrame = styled.div`
  display: block;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;

export const PokemonArtwork = styled.img.attrs(props => ({
  src: props.artworkUrl
}))`
  position: absolute;
  filter: drop-shadow(15px 15px 10px rgba(4, 2, 36, 0.377));
  top: 45%;
  left: 35%;
  transform-origin: center;
  transform: scale(0.65) translateY(-50%) translateX(-55%) translateZ(60px);
  text-align: center;
`;

export const Trigger = styled.div`
  position: absolute;
  height: 33.333333%;
  width: 33.333333%;
  display: block;
  z-index: 2;
  &:hover ~ .card {
    &::after {
      content: "";
      position: absolute;
      width: 200px;
      height: 180px;
      border-radius: 50%;
      transform: scale(0.75) translateY(-35%) translateX(-20%)
        translateZ(-100px);
      filter: blur(30px) opacity(0.6);
    }
  }
  &:nth-child(1) {
    left: 0%;
    top: 0%;
    &:hover ~ .card {
      transform: rotateY(-8deg) rotateX(5deg);
      background-position: left bottom;
    }
  }
  &:nth-child(2) {
    left: 33.333333%;
    top: 0%;
    &:hover ~ .card {
      transform: rotateY(0deg) rotateX(5deg);
      background-position: center bottom;
    }
  }
  &:nth-child(3) {
    left: 66.666666%;
    top: 0%;
    &:hover ~ .card {
      transform: rotateY(8deg) rotateX(5deg);
      background-position: right bottom;
    }
  }
  &:nth-child(4) {
    left: 0%;
    top: 33.333333%;
    &:hover ~ .card {
      transform: rotateY(-8deg);
      background-position: left center;
    }
  }
  &:nth-child(5) {
    left: 33.333333%;
    top: 33.333333%;
    &:hover ~ .card {
      transform: rotateY(0deg) rotateX(0deg);
      background-position: center;
    }
  }
  &:nth-child(6) {
    left: 66.666666%;
    top: 33.333333%;
    &:hover ~ .card {
      transform: rotateY(8deg) rotateX(0deg);
      background-position: right center;
    }
  }
  &:nth-child(7) {
    left: 0%;
    top: 66.666666%;
    &:hover ~ .card {
      transform: rotateY(-8deg) rotateX(-5deg);
      background-position: left top;
    }
  }
  &:nth-child(8) {
    left: 33.333333%;
    top: 66.666666%;
    &:hover ~ .card {
      transform: rotateY(0deg) rotateX(-5deg);
      background-position: center top;
    }
  }
  &:nth-child(9) {
    left: 66.666666%;
    top: 66.666666%;
    &:hover ~ .card {
      transform: rotateY(8deg) rotateX(-5deg);
      background-position: right top;
    }
  }
`;
