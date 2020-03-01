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
  margin-top: 60px;
  mark {
    background: transparent;
    color: white;
    text-shadow: 0 0 5px rgba(255, 255, 255, 0.6);
  }
`;

export const Card = styled.div.attrs({
  className: "card",
})`
  height: 120px;
  position: relative;
  display: block;
  border-radius: 7px;
  background-size: 150% 150%;
  background-position: center;
  box-shadow:  0 15px 20px rgba(0, 0, 0, 0.3),
    inset 1px 1px 1px rgba(255, 255, 255, 0.2);
  background-image: radial-gradient( circle at 2% 32%,rgb(60, 71, 97),rgb(29, 35, 48) 40%,rgb(42, 40, 45) 85% );
`;

export const CardTitle = styled.div`

`;

export const CardFrame = styled.div`
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
`;

export const PokemonArtwork = styled.img.attrs(props => ({
  src: props.artworkUrl,
}))`
  width: 110px;
  margin: 0 auto;
  height: 110px;
  margin-top: -60px;
`;
