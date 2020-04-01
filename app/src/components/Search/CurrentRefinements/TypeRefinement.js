import React from "react";
import styled, { keyframes } from "styled-components";

import { TypeBadge } from "../../TypeBadge";
import { DamageTypeBadge } from "../../DamageTypeBadge";
import { RefinementHeader } from "./RefinementHeader";
import { RefinementCard, RefinementItem, RefinementDetails } from "./style";

const TYPE_MAP = {
  Normal: 1,
  Fighting: 2,
  Flying: 3,
  Poison: 4,
  Ground: 5,
  Rock: 6,
  Bug: 7,
  Ghost: 8,
  Steel: 9,
  Fire: 10,
  Water: 11,
  Grass: 12,
  Electric: 13,
  Psychic: 14,
  Ice: 15,
  Dragon: 16,
  Dark: 17,
  Fairy: 18,
};

export function TypeRefinement(props) {
  const [type, setType] = React.useState(null);

  React.useEffect(() => {
    async function getTypeInfo() {
      const query = `
      {
        type(id: ${TYPE_MAP[props.label]}) {
          id
          damagesFrom {
            type {
              id
              name
            }
            multiplier
          }
          damagesTo {
            type {
              id
              name
            }
            multiplier
          }
        }
      }
      `;
      const response = await fetch(`${window.location.origin}/api/graphql`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      const { data, errors } = await response.json();

      if (!errors) {
        setType(data.type);
      }
    }

    getTypeInfo();
  }, []);

  return (
    <Refinement>
      <RefinementCard>
        <RefinementHeader onRemove={() => props.refine(props.value)}>
          Type
          <TypeBadge
            type={{
              name: props.label,
              id: TYPE_MAP[props.label],
            }}
            className="ml-2"
          />
        </RefinementHeader>

        <RefinementContent>
          <RefinementDetails>
            <TypeCategory className="text-xl text-gray-400 flex items-center">
              <svg width="18" height="18" viewBox="0 0 28 28" className="mr-2">
                <path
                  d="M14.05.29l-.31.23a26.89 26.89 0 01-12.7 5.44l-.43.07v.44c0 1.1.49 2.8 1.28 4.9a53.5 53.5 0 003.17 6.88 33.03 33.03 0 004.26 6.21c1.5 1.67 3.09 2.83 4.73 2.83 1.65 0 3.23-1.16 4.74-2.83a33.85 33.85 0 004.25-6.2 54.44 54.44 0 003.18-6.88c.78-2.1 1.27-3.82 1.27-4.91v-.44l-.43-.07A26.99 26.99 0 0114.36.52l-.3-.23zm0 1.28c3.53 2.6 7.18 4.39 12.37 5.32a20.8 20.8 0 01-1.17 4.13c-.24.62-.5 1.28-.8 1.96H15.9v2.65l3.69-.92-5.54 6.46-5.54-6.46 3.7.92v-2.65H3.64c-.29-.68-.55-1.34-.79-1.96a21.2 21.2 0 01-1.17-4.13 28 28 0 0012.37-5.32z"
                  fill="#e14270"
                  fillRule="nonzero"
                />
              </svg>
              Weakness
            </TypeCategory>

            {type && (
              <TypeList>
                {type.damagesFrom
                  .filter(damage => damage.multiplier > 1)
                  .map(damage => (
                    <li key={damage.type.id} className="mr-2">
                      <DamageTypeBadge
                        type={damage.type}
                        multiplier={damage.multiplier}
                      />
                    </li>
                  ))}
              </TypeList>
            )}
          </RefinementDetails>

          <RefinementDetails>
            <TypeCategory className="text-xl text-gray-400 flex items-center">
              <svg width="18" height="18" viewBox="0 0 28 28" className="mr-2">
                <path
                  d="M13.54.91l-.31.23A26.89 26.89 0 01.53 6.58l-.42.07v.44C.1 8.2.59 9.9 1.38 12a53.5 53.5 0 003.17 6.88 33.03 33.03 0 004.26 6.2c1.5 1.68 3.09 2.83 4.73 2.83 1.65 0 3.23-1.15 4.74-2.82a33.85 33.85 0 004.25-6.21A54.44 54.44 0 0025.71 12c.78-2.1 1.27-3.81 1.27-4.9v-.45l-.43-.07a26.99 26.99 0 01-12.7-5.44l-.3-.23zm0 1.28c3.53 2.6 7.18 4.4 12.37 5.33a20.8 20.8 0 01-1.17 4.12c-.24.63-.5 1.28-.8 1.96H15.4v-2.82l3.69.93-5.54-6.46L8 11.7l3.7-.93v2.82H3.13c-.29-.68-.55-1.33-.79-1.96a21.2 21.2 0 01-1.17-4.12 28 28 0 0012.37-5.33z"
                  fill="#58CC94"
                  fillRule="nonzero"
                />
              </svg>
              Resistance
            </TypeCategory>

            {type && (
              <TypeList>
                {type.damagesTo
                  .filter(damage => damage.multiplier > 1)
                  .map(damage => (
                    <li key={damage.type.id} className="mr-2">
                      <DamageTypeBadge
                        type={damage.type}
                        multiplier={damage.multiplier}
                      />
                    </li>
                  ))}
              </TypeList>
            )}
          </RefinementDetails>
        </RefinementContent>
      </RefinementCard>
    </Refinement>
  );
}

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const RefinementContent = styled.div`
  display: none;
  margin-top: 4;
`;

const Refinement = styled(RefinementItem)`
  &:hover ${RefinementContent} {
    display: block;
  }
`;

const TypeCategory = styled.span`
  font-family: Futura;
  font-size: 14px;
  color: #8696ad;
  margin-right: 8px;
`;

const TypeList = styled.ul`
  display: flex;
  align-items: center;
  line-height: 0;
  opacity: 0;
  animation: ${fadeIn} 250ms ease-out forwards;
`;
