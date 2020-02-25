import React from "react";
import { connectSearchBox } from "react-instantsearch-dom";

const DEBOUNCE_TIMER = 400;

export const SearchBox = connectSearchBox(props => {
  const inputRef = React.useRef(null);
  const timerId = React.useRef(null);
  const [query, setQuery] = React.useState(props.currentRefinement);

  function onChange(event) {
    const value = event.currentTarget.value;

    clearTimeout(timerId.current);
    timerId.current = setTimeout(() => {
      props.refine(value);
    }, DEBOUNCE_TIMER);

    setQuery(value);
  }

  function onSubmit(event) {
    event.preventDefault();
    event.stopPropagation();
    inputRef.current.blur();
  }

  function onReset() {
    setQuery("");
    props.refine("");
    inputRef.current.focus();
  }

  return (
    <div className="ais-SearchBox">
      <form
        noValidate
        onSubmit={onSubmit}
        onReset={onReset}
        action=""
        role="search"
        className="ais-SearchBox-form"
      >
        <input
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
          onChange={onChange}
          className="ais-SearchBox-input"
        />

        <button type="submit" title="Search" className="ais-SearchBox-submit">
          <svg
            className="ais-SearchBox-submitIcon"
            xmlns="http://www.w3.org/2000/svg"
            width="10"
            height="10"
            viewBox="0 0 40 40"
          >
            <path d="M26.804 29.01c-2.832 2.34-6.465 3.746-10.426 3.746C7.333 32.756 0 25.424 0 16.378 0 7.333 7.333 0 16.378 0c9.046 0 16.378 7.333 16.378 16.378 0 3.96-1.406 7.594-3.746 10.426l10.534 10.534c.607.607.61 1.59-.004 2.202-.61.61-1.597.61-2.202.004L26.804 29.01zm-10.426.627c7.323 0 13.26-5.936 13.26-13.26 0-7.32-5.937-13.257-13.26-13.257C9.056 3.12 3.12 9.056 3.12 16.378c0 7.323 5.936 13.26 13.258 13.26z" />
          </svg>
        </button>

        <button
          type="reset"
          title="Clear query"
          className="ais-SearchBox-reset"
          hidden={!query || props.isSearchStalled === true}
        >
          <svg
            className="ais-SearchBox-resetIcon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            width="10"
            height="10"
          >
            <path d="M8.114 10L.944 2.83 0 1.885 1.886 0l.943.943L10 8.113l7.17-7.17.944-.943L20 1.886l-.943.943-7.17 7.17 7.17 7.17.943.944L18.114 20l-.943-.943-7.17-7.17-7.17 7.17-.944.943L0 18.114l.943-.943L8.113 10z" />
          </svg>
        </button>

        <span
          hidden={props.isSearchStalled === false}
          className="ais-SearchBox-loadingIndicator"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 38 38"
            xmlns="http://www.w3.org/2000/svg"
            stroke="#fff"
            className="ais-SearchBox-loadingIcon"
          >
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
        </span>
      </form>
    </div>
  );
});
