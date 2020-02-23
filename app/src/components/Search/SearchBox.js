import React from "react";
import { connectSearchBox } from "react-instantsearch-dom";

export const SearchBox = connectSearchBox(props => {
  const inputRef = React.useRef(null);

  function onSubmit(event) {
    event.preventDefault();
    event.stopPropagation();
    inputRef.current.blur();
  }

  function onReset() {
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
          value={props.currentRefinement}
          onChange={event => props.refine(event.currentTarget.value)}
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
          hidden={!props.currentRefinement}
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

        {props.showLoadingIndicator && (
          <span
            hidden={props.isSearchStalled === false}
            className="ais-SearchBox-loadingIndicator"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 38 38"
              xmlns="http://www.w3.org/2000/svg"
              stroke="#444"
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
        )}
      </form>

      <style global jsx>{`
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
          border-radius: 8px;
          height: 38px;
          border: 1px solid rgba(255, 255, 255, 0.16);
          background: linear-gradient(
            40deg,
            rgba(255, 255, 255, 0.24),
            rgba(255, 255, 255, 0.1)
          );
          box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.3),
            inset 1px 1px 1px rgba(255, 255, 255, 0.1);
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

        .ais-SearchBox-reset {
          position: absolute;
          display: flex;
          justify-content: center;
          width: 40px;
          height: 100%;
          right: 0;
          top: 0;
        }

        .ais-SearchBox-reset[hidden] {
          display: none;
        }

        .ais-SearchBox-resetIcon {
          fill: #fff;
          width: 10px;
          height: 10px;
        }
      `}</style>
    </div>
  );
});
