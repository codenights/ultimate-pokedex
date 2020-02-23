import React from "react";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  .tag {
    box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.3),
      inset 1px 1px 1px rgba(255, 255, 255, 0.1);
    background-image: linear-gradient(
      -40deg,
      rgba(75, 79, 92, 0.3) 15%,
      rgba(0, 0, 0, 0.4) 90%
    );
  }

  .ais-RangeInput {
    color: #fff;
  }

  .ais-RangeInput-input {
    max-width: 80px;
  }

  .ais-RangeInput-submit {
    display: none;
  }

  .select-container,
  .ais-SortBy {
    position: relative;
  }

  .select-container::after,
  .ais-SortBy::after {
    content: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cpath d='M14-5v16H-2V-5z'/%3E%3Cpath fill='%23FFF' stroke='%23FFF' stroke-width='.5' d='M2.228 1.332a.664.664 0 0 0-.942.001.665.665 0 0 0-.002.941l4.247 4.247c.259.26.679.26.938 0l4.247-4.247a.664.664 0 0 0-.002-.94.666.666 0 0 0-.942-.002L6 5.105 2.228 1.332z'/%3E%3C/g%3E%3C/svg%3E");
    position: absolute;
    right: 8px;
    transform: translateY(-50%);
    top: 50%;
    pointer-events: none;
  }

  select,
  .ais-SortBy-select,
  .ais-RangeInput-input,
  .ais-RefinementList-showMore {
    appearance: none;
    color: #fff;
    border-radius: 8px;
    padding: 4px 8px;
    border: 1px solid rgba(255, 255, 255, 0.16);
    background: linear-gradient(
      40deg,
      rgba(255, 255, 255, 0.24),
      rgba(255, 255, 255, 0.1)
    );
    box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.3),
      inset 1px 1px 1px rgba(255, 255, 255, 0.1);
  }

  select:focus,
  .ais-SortBy-select:focus,
  .ais-RangeInput-input:focus,
  .ais-RefinementList-showMore:hover,
  .ais-RefinementList-showMore:focus,
  .ais-RefinementList-showMore:active {
    outline: none;
    border: 1px solid rgba(255, 255, 255, 0.4);
    box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.3),
      inset 1px 1px 1px rgba(255, 255, 255, 0.1),
      inset 0 0 2px 0 rgba(255, 255, 255, 0.2),
      inset 0 0 10px rgba(255, 255, 255, 0.2);
  }

  .select-container select,
  .ais-SortBy-select {
    padding-right: 24px;
  }

  .ais-ClearRefinements-button {
    cursor: pointer;
  }

  .ais-ClearRefinements-button--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .ais-RefinementList {
    color: #cbd5e0;
  }

  .ais-RefinementList-searchBox .ais-SearchBox {
    margin-bottom: 16px;
  }

  .ais-RefinementList-label {
    cursor: pointer;
    display: flex;
    align-items: center;
  }

  .ais-RefinementList-labelText {
    width: 100%;
  }

  .ais-RefinementList-count {
    color: #718096;
    font-size: 0.875rem;
  }

  .ais-RefinementList-checkbox {
    margin-right: 10px;
  }

  .ais-RefinementList-showMore {
    display: block;
    cursor: pointer;
    margin: 16px auto auto auto;
    background: none;
  }

  .ais-RefinementList-showMore--disabled {
    display: none;
  }

  .ais-Highlight-highlighted {
    font-style: normal;
    background-color: #718096;
    color: #fff;
  }
`;

export const ThemeProvider = ({ children }) => (
  <>
    {children}

    <GlobalStyle />
  </>
);
