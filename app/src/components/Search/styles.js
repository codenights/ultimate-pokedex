import styled from "styled-components";

const getColorFromTypeFromProps = props =>
  `--color-type-${props.type.name.toLowerCase()}`;

export const PokemonName = styled.div`
  /* text-shadow: 0 0 24px var(${getColorFromTypeFromProps}),
    0 0 70px var(${getColorFromTypeFromProps}); */
`;

export const Dcard = styled.div`
  position: relative;
  display: block;
  perspective: 500px;
  height: 120px;

  mark {
    background: transparent;
    color: white;
    text-shadow: 0 0 5px rgba(255, 255, 255, 0.8);
  }
`;

export const Card = styled.div.attrs({
  className: "card",
})`
  height: 130px;
  position: relative;
  display: block;
  border-radius: 7px;
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

  transition: box-shadow 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);

  &:hover {
    box-shadow: 0 8px 3px rgba(0, 0, 0, 0.24), 0 15px 20px rgba(0, 0, 0, 0.3),
      0 -2px 5px rgba(200, 200, 200, 0.08),
      inset 1px 1px 1px rgba(255, 255, 255, 0.3),
      inset -1px -1px 1px rgba(75, 75, 75, 0.5);
  }

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
  src: props.artworkUrl,
}))`
  position: absolute;
  filter: drop-shadow(15px 15px 10px rgba(4, 2, 36, 0.377));
  top: 45%;
  left: 40%;
  transform-origin: center;
  transform: scale(0.65) translateY(-50%) translateX(-55%) translateZ(60px);
  text-align: center;
  max-height: 180px;
`;
