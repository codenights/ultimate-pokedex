import React from "react";
import styled from "styled-components";
import { connectRefinementList } from "react-instantsearch-dom";
import algoliasearch from "algoliasearch/lite";

import { Icons } from "../Icons";

const searchClient = algoliasearch(
  process.env.ALGOLIA_APP_ID,
  process.env.ALGOLIA_API_KEY
);

const WeakToList = connectRefinementList(props => {
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
            <div className="text-white mr-1">
              <svg width={16} height={16} viewBox="0 0 28 28">
                <path
                  d="M14.05.29l-.31.23a26.89 26.89 0 01-12.7 5.44l-.43.07v.44c0 1.1.49 2.8 1.28 4.9a53.5 53.5 0 003.17 6.88 33.03 33.03 0 004.26 6.21c1.5 1.67 3.09 2.83 4.73 2.83 1.65 0 3.23-1.16 4.74-2.83a33.85 33.85 0 004.25-6.2 54.44 54.44 0 003.18-6.88c.78-2.1 1.27-3.82 1.27-4.91v-.44l-.43-.07A26.99 26.99 0 0114.36.52l-.3-.23zm0 1.28c3.53 2.6 7.18 4.39 12.37 5.32a20.8 20.8 0 01-1.17 4.13c-.24.62-.5 1.28-.8 1.96H15.9v2.65l3.69-.92-5.54 6.46-5.54-6.46 3.7.92v-2.65H3.64c-.29-.68-.55-1.34-.79-1.96a21.2 21.2 0 01-1.17-4.13 28 28 0 0012.37-5.32z"
                  fill="#E14270"
                  fillRule="nonzero"
                />
              </svg>
            </div>
            {hit.value}
          </FilterButton>
        </li>
      ))}
    </ul>
  );
});

const ResistantToList = connectRefinementList(props => {
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
            <div className="text-white mr-1">
              <svg width={16} height={16} viewBox="0 0 28 28">
                <path
                  d="M13.54.91l-.31.23A26.89 26.89 0 01.53 6.58l-.42.07v.44C.1 8.2.59 9.9 1.38 12a53.5 53.5 0 003.17 6.88 33.03 33.03 0 004.26 6.2c1.5 1.68 3.09 2.83 4.73 2.83 1.65 0 3.23-1.15 4.74-2.82a33.85 33.85 0 004.25-6.21A54.44 54.44 0 0025.71 12c.78-2.1 1.27-3.81 1.27-4.9v-.45l-.43-.07a26.99 26.99 0 01-12.7-5.44l-.3-.23zm0 1.28c3.53 2.6 7.18 4.4 12.37 5.33a20.8 20.8 0 01-1.17 4.12c-.24.63-.5 1.28-.8 1.96H15.4v-2.82l3.69.93-5.54-6.46L8 11.7l3.7-.93v2.82H3.13c-.29-.68-.55-1.33-.79-1.96a21.2 21.2 0 01-1.17-4.12 28 28 0 0012.37-5.33z"
                  fill="#58CC94"
                  fillRule="nonzero"
                />
              </svg>
            </div>
            {hit.value}
          </FilterButton>
        </li>
      ))}
    </ul>
  );
});

const AbilityList = connectRefinementList(props => {
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
  const [suggestions, setSuggestions] = React.useState(null);

  React.useEffect(() => {
    searchClient
      .searchForFacetValues([
        {
          indexName: process.env.ALGOLIA_INDEX_NAME,
          params: {
            filters: "isDefaultForm:true",
            facetName: "weakTo.name",
            facetQuery: props.query,
            maxFacetHits: 3,
          },
        },
        {
          indexName: process.env.ALGOLIA_INDEX_NAME,
          params: {
            filters: "isDefaultForm:true",
            facetName: "resistantTo.name",
            facetQuery: props.query,
            maxFacetHits: 3,
          },
        },
        {
          indexName: process.env.ALGOLIA_INDEX_NAME,
          params: {
            filters: "isDefaultForm:true",
            facetName: "abilities.name",
            facetQuery: props.query,
            maxFacetHits: 3,
          },
        },
      ])
      .then(response => {
        const suggestions = response.map(x => x.facetHits);
        setSuggestions(suggestions);

        if (suggestions.every(items => items.length === 0)) {
          props.onEmpty();
        }
      });
  }, [props.query]);

  if (suggestions === null) {
    return null;
  }

  return (
    <FilterList isOpen={props.isOpen}>
      <li>
        <WeakToList
          attribute="weakTo.name"
          facetHits={suggestions[0]}
          onSelect={props.onSelect}
        />
      </li>

      <li>
        <ResistantToList
          attribute="resistantTo.name"
          facetHits={suggestions[1]}
          onSelect={props.onSelect}
        />
      </li>

      <li>
        <AbilityList
          attribute="abilities.name"
          facetHits={suggestions[2]}
          onSelect={props.onSelect}
        />
      </li>
    </FilterList>
  );
}

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
