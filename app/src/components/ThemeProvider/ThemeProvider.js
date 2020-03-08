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

  .ais-SearchBox {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    color: #fff;
  }

  .ais-SearchBox-form {
    width: 100%;
  }

  .ais-SearchBox-input {
    padding: 10px 40px;
    width: 100%;
    box-sizing: border-box;
    font: inherit;
    appearance: none;
    border-radius: 19px;
    height: 38px;
    border: 1px solid rgba(255, 255, 255, 0.16);
    background: #1A202C;
    box-shadow: 1px 1px 0 0 rgba(156,157,158,0.1), inset 2px 5px 0 0 rgba(24,23,23,0.5);
  }

  .ais-SearchBox-input:focus {
    outline: none;
    border: 1px solid rgba(255, 255, 255, 0.4);
    box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.3),
      inset 1px 1px 1px rgba(255, 255, 255, 0.1),
      inset 0 0 2px 0 rgba(255, 255, 255, 0.2),
      inset 0 0 10px rgba(255, 255, 255, 0.2);
  }

  .ais-SearchBox-input::-webkit-search-decoration,
  .ais-SearchBox-input::-webkit-search-cancel-button,
  .ais-SearchBox-input::-webkit-search-results-button,
  .ais-SearchBox-input::-webkit-search-results-decoration {
    display: none;
  }

  .ais-SearchBox-submit {
    position: absolute;
    display: flex;
    justify-content: center;
    width: 40px;
    height: 100%;
    top: 0;
    left: 0;
  }

  .ais-SearchBox-submitIcon {
    fill: #fff;
    width: 14px;
    height: 14px;
  }

  .ais-SearchBox-reset,
  .ais-SearchBox-loadingIndicator {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 100%;
    right: 0;
    top: 0;
  }

  .ais-SearchBox-reset[hidden],
  .ais-SearchBox-loadingIndicator[hidden] {
    display: none;
  }

  .ais-SearchBox-resetIcon {
    fill: #fff;
    width: 10px;
    height: 10px;
  }

  .ais-RangeSlider .slider-rail {
    background-color: rgb(54, 58, 72);
    border-radius: 3px;
    cursor: pointer;
    height: 3px;
    position: absolute;
    width: 100%;
  }

  .ais-RangeSlider .slider-track {
    background: linear-gradient(
      90deg,
      rgb(96, 82, 135) 30%,
      rgb(116, 76, 183) 50%,
      rgb(157, 99, 231) 70%,
      rgb(247, 198, 184)
    );
    border-radius: 3px;
    cursor: pointer;
    height: 3px;
    position: absolute;
  }

  .ais-RangeSlider::after {
    top: 0;
    background: linear-gradient(
      90deg,
      rgb(157, 99, 231, 0.2),
      rgba(157, 99, 231, 0.8)
    );
    filter: blur(6px);
    display: block;
    content: "";
    width: 100%;
    height: 4px;
    position: absolute;
  }

  .ais-RangeSlider .slider-tick {
    color: rgb(113, 128, 150);
    cursor: grab;
    display: flex;
    font-size: 11px;
    position: absolute;
    text-align: center;
    top: 10px;
    transform: translateX(-50%);
    user-select: none;
  }

  .ais-RangeSlider .slider-handle {
    border-radius: 50%;
    border: 2px solid #1a202c;
    cursor: grab;
    outline: none;
    position: absolute;
    transform: translate(-50%, -50%) rotate(30deg);
    width: 24px;
    height: 24px;
    z-index: 1;
    background: url("/img/pokeball-tick-active.svg");
  }

  .ais-RangeSlider--noRefinement .slider-handle {
    transform: translate(-50%, -50%) rotate(0);
    background: url("/img/pokeball-tick.svg");
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

  .ais-Panel {
    background-image: radial-gradient( circle at 2% 2%, rgba(60, 71, 97,0.32), rgba(29, 35, 48,0.32) 40%, rgba(42, 40, 45,0.32) 85% );
    box-shadow: 0 0 8px 0 rgba(0,0,0,0.36), 6px 6px 24px 0 rgba(0,0,0,0.4), -5px -5px 12px 0 #364056, inset 0 0 0 1px rgba(113,113,195,0.08), inset 1px 1px 8px 0 rgba(28,35,50,0.65), inset 1px 1px 1px 0 rgba(145,172,229,0.36), inset 6px 6px 13px 0 rgba(74,89,121,0.29);
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 30px;
  }

  .ais-Panel-header {
    border-bottom: 1px solid #576784;
    margin-bottom: 20px;
  }
`;

export const ThemeProvider = ({ children }) => (
  <>
    {children}

    <GlobalStyle />
  </>
);
