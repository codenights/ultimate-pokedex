import React from "react";
import styled from "styled-components";
import { connectSearchBox } from "react-instantsearch-dom";

import { FilterPanel } from "./FilterPanel";

const DEBOUNCE_TIMER = 0;

export const SearchBox = connectSearchBox(props => {
  const inputRef = React.useRef(null);
  const timerId = React.useRef(null);

  const [query, setQuery] = React.useState(props.currentRefinement);
  const [isOpen, setIsOpen] = React.useState(false);

  function onChange(value) {
    clearTimeout(timerId.current);
    timerId.current = setTimeout(() => {
      props.refine(value);
    }, DEBOUNCE_TIMER);

    setQuery(value);
    setIsOpen(true);
  }

  function onSubmit(event) {
    event.preventDefault();
    event.stopPropagation();
    inputRef.current.blur();
    setIsOpen(false);
  }

  function onReset() {
    setQuery("");
    props.refine("");
    inputRef.current.focus();
  }

  React.useEffect(() => {
    if (!isOpen) {
      return;
    }

    function onKeyDown(event) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, setIsOpen]);

  return (
    <Container>
      <Form
        noValidate
        onSubmit={onSubmit}
        onReset={onReset}
        action=""
        role="search"
      >
        <Input
          ref={inputRef}
          type="search"
          placeholder="Search Pokédex"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          required
          maxLength="512"
          value={query}
          onChange={event => onChange(event.currentTarget.value)}
          onFocus={() => setIsOpen(true)}
          isOpen={isOpen}
        />

        <SubmitButton type="submit" title="Search">
          <SubmitIcon width="10" height="10" viewBox="0 0 40 40">
            <path d="M26.804 29.01c-2.832 2.34-6.465 3.746-10.426 3.746C7.333 32.756 0 25.424 0 16.378 0 7.333 7.333 0 16.378 0c9.046 0 16.378 7.333 16.378 16.378 0 3.96-1.406 7.594-3.746 10.426l10.534 10.534c.607.607.61 1.59-.004 2.202-.61.61-1.597.61-2.202.004L26.804 29.01zm-10.426.627c7.323 0 13.26-5.936 13.26-13.26 0-7.32-5.937-13.257-13.26-13.257C9.056 3.12 3.12 9.056 3.12 16.378c0 7.323 5.936 13.26 13.258 13.26z" />
          </SubmitIcon>
        </SubmitButton>

        <ResetButton
          type="reset"
          title="Clear query"
          hidden={!query || props.isSearchStalled === true}
        >
          <ResetIcon viewBox="0 0 20 20" width="10" height="10">
            <path d="M8.114 10L.944 2.83 0 1.885 1.886 0l.943.943L10 8.113l7.17-7.17.944-.943L20 1.886l-.943.943-7.17 7.17 7.17 7.17.943.944L18.114 20l-.943-.943-7.17-7.17-7.17 7.17-.944.943L0 18.114l.943-.943L8.113 10z" />
          </ResetIcon>
        </ResetButton>

        <LoadingIndicator hidden={props.isSearchStalled === false}>
          <svg width="18" height="18" viewBox="0 0 38 38" stroke="#fff">
            <g fill="none" fillRule="evenodd">
              <g transform="translate(1 1)" strokeWidth="2">
                <circle strokeOpacity=".5" cx="18" cy="18" r="18" />
                <path d="M36 18c0-9.94-8.06-18-18-18">
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="0 18 18"
                    to="360 18 18"
                    dur="1s"
                    repeatCount="indefinite"
                  />
                </path>
              </g>
            </g>
          </svg>
        </LoadingIndicator>
      </Form>

      <FilterPanel
        query={props.currentRefinement}
        isOpen={isOpen}
        onSelect={() => {
          onChange("");
          setIsOpen(false);
        }}
        onEmpty={() => {
          setIsOpen(false);
        }}
      />
    </Container>
  );
});

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  color: #fff;
`;

const Form = styled.form`
  width: 100%;
`;

const Input = styled.input`
  padding: 10px 40px;
  border-radius: ${props => (props.isOpen ? "19px 19px 0 0" : "19px")};
  width: 100%;
  box-sizing: border-box;
  font: inherit;
  appearance: none;
  height: 38px;
  border: 1px solid rgba(255, 255, 255, 0.16);
  background: #1a202c;
  box-shadow: 1px 1px 0 0 rgba(156, 157, 158, 0.1),
    inset 2px 5px 0 0 rgba(24, 23, 23, 0.5);

  &:focus {
    outline: none;
    border: 1px solid rgba(255, 255, 255, 0.4);
    box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.3),
      inset 1px 1px 1px rgba(255, 255, 255, 0.1),
      inset 0 0 2px 0 rgba(255, 255, 255, 0.2),
      inset 0 0 10px rgba(255, 255, 255, 0.2);
  }

  &::-webkit-search-decoration,
  &::-webkit-search-cancel-button,
  &::-webkit-search-results-button,
  &::-webkit-search-results-decoration {
    display: none;
  }
`;

const SubmitButton = styled.button`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 100%;
  top: 0;
  left: 0;
`;

const SubmitIcon = styled.svg`
  fill: #fff;
  width: 14px;
  height: 14px;
`;

const ResetIcon = styled.svg`
  fill: #fff;
  width: 10px;
  height: 10px;
`;

const ResetButton = styled.button`
  position: absolute;
  display: ${props => (props.hidden ? "hidden" : "flex")};
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 100%;
  right: 0;
  top: 0;
`;

const LoadingIndicator = styled.span`
  position: absolute;
  display: ${props => (props.hidden ? "hidden" : "flex")};
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 100%;
  right: 0;
  top: 0;
`;
