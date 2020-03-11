import React from "react";
import styled from "styled-components";
import { connectRefinementList } from "react-instantsearch-dom";
import algoliasearch from "algoliasearch/lite";

import { Icons } from "../Icons";

const searchClient = algoliasearch(
  process.env.ALGOLIA_APP_ID,
  process.env.ALGOLIA_API_KEY
);

const FilterList = styled.ul`
  display: ${props => (props.isOpen ? "flex" : "none")};
  position: absolute;
  width: 100%;
  top: 100%;
  padding: 5px 8px;
  border-radius: 0px 0px 19px 19px;
  border: 1px solid rgba(255, 255, 255, 0.16);
  background: rgba(55, 62, 76, 0.85);
  box-shadow: rgba(156, 157, 158, 0.1) 1px 1px 0px 0px,
    rgba(53, 50, 50, 0.5) 2px 5px 0px 0px inset;
`;

const FilterButton = styled.button`
  display: flex;
  align-items: center;
  padding: 1px 6px;
  box-shadow: rgb(51, 64, 88) -1px -1px 0px 0px,
    rgba(0, 0, 0, 0.31) 2px 2px 4px 0px;
  border-radius: 16px;
  background: rgb(111, 111, 111);
  font-size: 0.9rem;
  white-space: nowrap;
  color: #f7f7f7;

  &:focus {
    outline: none;
  }
`;

const Abilities = connectRefinementList(props => {
  return (
    <ul className="flex">
      {props.facetHits.map(hit => (
        <li key={hit.value} className="mr-2">
          <FilterButton
            onClick={() => {
              props.refine(hit.value);
              props.onSelect();
            }}
          >
            <Icons icon="ct" className="text-white mr-1" />
            {hit.value}
          </FilterButton>
        </li>
      ))}
    </ul>
  );
});

export function FilterPanel(props) {
  const [suggestions, setSuggestions] = React.useState([]);

  React.useEffect(() => {
    searchClient
      .searchForFacetValues([
        {
          indexName: process.env.ALGOLIA_INDEX_NAME,
          params: {
            filters: "isDefaultForm:true",
            facetName: "abilities.name",
            facetQuery: props.query,
            maxFacetHits: 5,
          },
        },
      ])
      .then(response => {
        setSuggestions(response);
      });
  }, [props.query]);

  return (
    <FilterList isOpen={props.isOpen}>
      {suggestions.map(({ facetHits }, index) => (
        <li key={index}>
          <Abilities
            attribute="abilities.name"
            facetHits={facetHits}
            onSelect={props.onSelect}
          />
        </li>
      ))}
    </FilterList>
  );
}
