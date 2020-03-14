import React from "react";
import styled from "styled-components";
import { connectCurrentRefinements } from "react-instantsearch-dom";

import { Icons } from "../Icons";
import { TypeBadge } from "../TypeBadge";

const RemoveFilterIcon = props => (
  <svg height="14" viewBox="0 0 14 14" width="14" {...props}>
    <path
      d="m69 6c3.8659961 0 7 3.13400391 7 7 0 3.8659961-3.1340039 7-7 7s-7-3.1340039-7-7c0-3.86599609 3.1340039-7 7-7zm0 12.6875c3.1411133 0 5.6875-2.5463867 5.6875-5.6875 0-3.14111328-2.5463867-5.6875-5.6875-5.6875s-5.6875 2.54638672-5.6875 5.6875c0 3.1411133 2.5463867 5.6875 5.6875 5.6875zm2.1875-9.1875 1.3125 1.3125-2.1875 2.1875 2.1875 2.1875-1.3125 1.3125-2.1875-2.1875-2.1875 2.1875-1.3125-1.3125 2.1875-2.1875-2.1875-2.1875 1.3125-1.3125 2.1875 2.1875z"
      fill="#8393aa"
      transform="translate(-62 -6)"
    />
  </svg>
);

const RefinementLabel = ({ attribute, label }) => {
  if (attribute === "types.name") {
    return (
      <>
        Type
        <TypeBadge
          type={{
            name: label,
            // @TODO: get the ID somewhere to have a correct link
            id: label,
          }}
          className="ml-2"
        />
      </>
    );
  } else if (attribute === "weakTo.name") {
    return (
      <>
        Weak to
        <TypeBadge
          type={{
            name: label,
            // @TODO: get the ID somewhere to have a correct link
            id: label,
          }}
          className="ml-2"
        />
      </>
    );
  } else if (attribute === "resistantTo.name") {
    return (
      <>
        Resistant to
        <TypeBadge
          type={{
            name: label,
            // @TODO: get the ID somewhere to have a correct link
            id: label,
          }}
          className="ml-2"
        />
      </>
    );
  } else if (attribute === "abilities.name") {
    return (
      <>
        Ability
        <Icons icon="ct" className="text-gray-500 ml-2" />
        <div className="text-gray-500 ml-2">{label}</div>
      </>
    );
  }

  return null;
};

export const CurrentRefinements = connectCurrentRefinements(props => {
  if (props.items.length === 0) {
    return null;
  }

  const items = props.items.filter(item => item.items);

  return (
    <FilterList className="pt-8">
      {items.map(item =>
        item.items.map(refinement => {
          return (
            <FilterListItem key={refinement.label}>
              <FilterCard>
                <FilterLabel>
                  <RefinementLabel
                    attribute={item.attribute}
                    label={refinement.label}
                  />
                </FilterLabel>
                <FilterRemoveButton
                  onClick={() => props.refine(refinement.value)}
                >
                  Remove
                  <RemoveFilterIcon css={{ marginLeft: 5 }} />
                </FilterRemoveButton>
              </FilterCard>
            </FilterListItem>
          );
        })
      )}
    </FilterList>
  );
});

const FilterList = styled.ul`
  display: flex;
`;

const FilterListItem = styled.li`
  &:not(:last-of-type) {
    margin-right: 8px;
  }
`;

const FilterCard = styled.div`
  background-image: linear-gradient(180deg, #2f3544 0%, #1a202c 100%);
  box-shadow: 0 3px 7px 0 rgba(0, 0, 0, 0.39),
    inset 1px 1px 0 0 rgba(255, 255, 255, 0.12);
  border-radius: 4px;
  padding: 11px;
  color: #fff;
  display: flex;
  align-items: center;
  min-width: 200px;
  justify-content: space-between;
`;

const FilterLabel = styled.span`
  font-family: Futura-Medium;
  font-size: 15px;
  color: #fff;
  letter-spacing: 0;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
`;

const FilterRemoveButton = styled.button`
  background: #2d3342;
  box-shadow: 1px 2px 0 0 rgba(0, 0, 0, 0.22),
    inset 1px 1px 0 0 rgba(198, 210, 171, 0.25);
  border-radius: 4px;
  font-family: Futura-Medium;
  font-size: 13px;
  color: #78839a;
  letter-spacing: 0;
  display: flex;
  align-items: center;
  padding: 3px 10px;
  margin-left: 16px;

  &:focus {
    outline: none;
  }
`;
