import React, { useState, useEffect } from "react";
import { connectRange } from "react-instantsearch-dom";
import { Slider, Rail, Handles, Tracks, Ticks } from "react-compound-slider";

function Handle({
  domain: [min, max],
  handle: { id, value, percent },
  disabled,
  getHandleProps,
}) {
  return (
    <>
      {/* Dummy element to make the tooltip draggable */}
      <div
        style={{
          position: "absolute",
          left: `${percent}%`,
          width: 40,
          height: 25,
          transform: "translateX(-50%)",
          cursor: disabled ? "not-allowed" : "grab",
          zIndex: 1,
        }}
        aria-hidden={true}
        {...getHandleProps(id)}
      />
      <div
        role="slider"
        className="slider-handle"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        style={{
          left: `${percent}%`,
          cursor: disabled ? "not-allowed" : "grab",
        }}
        {...getHandleProps(id)}
      />
    </>
  );
}

export const RangeSlider = connectRange(
  ({ min, max, refine, currentRefinement, canRefine }) => {
    const isDisabled = canRefine === false || min === max;

    const domain = [min, max];
    const [ticksValues, setTicksValues] = useState([
      currentRefinement.min,
      currentRefinement.max,
    ]);

    const onChange = values => {
      if (isNaN(values[0]) || isNaN(values[1])) {
        return;
      }

      refine({ min: values[0], max: values[1] });
    };

    useEffect(() => {
      setTicksValues([currentRefinement.min, currentRefinement.max]);
    }, [currentRefinement]);

    if (isDisabled) {
      return (
        <div className="w-full h-6 mt-4 mx-3 mr-2 relative ais-RangeSlider" />
      );
    }

    return (
      <Slider
        mode={2}
        step={1}
        domain={domain}
        values={[currentRefinement.min, currentRefinement.max]}
        onChange={onChange}
        onUpdate={setTicksValues}
        className="w-full h-6 mt-4 mx-3 mr-2 relative ais-RangeSlider"
      >
        <Rail>
          {({ getRailProps }) => (
            <div className="slider-rail" {...getRailProps()} />
          )}
        </Rail>

        <Tracks left={false} right={false}>
          {({ tracks, getTrackProps }) => (
            <div>
              {tracks.map(({ id, source, target }) => (
                <div
                  key={id}
                  className="slider-track"
                  style={{
                    left: `${source.percent}%`,
                    width: `${target.percent - source.percent}%`,
                  }}
                  {...getTrackProps()}
                />
              ))}
            </div>
          )}
        </Tracks>

        {/* We don't show the handles if a single Pokémon is listed */}
        {isDisabled === false && (
          <Handles>
            {({ handles, getHandleProps }) => (
              <div>
                {handles.map(handle => (
                  <Handle
                    key={handle.id}
                    handle={handle}
                    domain={domain}
                    getHandleProps={getHandleProps}
                  />
                ))}
              </div>
            )}
          </Handles>
        )}

        <Ticks values={ticksValues}>
          {({ ticks }) => (
            <div>
              {ticks.map(({ id, count, value, percent }, index) => (
                <div
                  key={[id, index].join(":")}
                  className="slider-tick"
                  style={{
                    marginLeft: `${-(100 / count) / 2}%`,
                    width: `${100 / count}%`,
                    left: `${percent}%`,
                  }}
                >
                  {value}
                </div>
              ))}
            </div>
          )}
        </Ticks>

        <style global jsx>{`
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
            top: 8px;
            transform: translateX(-50%);
            user-select: none;
          }

          .ais-RangeSlider .slider-handle {
            border-radius: 50%;
            box-shadow: 0 2px 8px 1px rgba(0, 0, 0, 0.6);
            cursor: grab;
            outline: none;
            position: absolute;
            transform: translate(-50%, -50%);
            width: 16px;
            height: 16px;
            z-index: 1;
            background: url("/img/pokeball-tick.svg");
          }
        `}</style>
      </Slider>
    );
  }
);
