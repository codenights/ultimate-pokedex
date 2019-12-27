import React, { useState, useEffect } from "react";
import { connectRange } from "react-instantsearch-dom";
import { Slider, Rail, Handles, Tracks, Ticks } from "react-compound-slider";

function Handle({
  domain: [min, max],
  handle: { id, value, percent },
  disabled,
  getHandleProps
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
          transform: "translate(-50%, -100%)",
          cursor: disabled ? "not-allowed" : "grab",
          zIndex: 1
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
          cursor: disabled ? "not-allowed" : "grab"
        }}
        {...getHandleProps(id)}
      />
    </>
  );
}

export const RangeSlider = connectRange(
  ({ min, max, refine, currentRefinement, canRefine }) => {
    if (!canRefine) {
      return null;
    }

    const domain = [min, max];
    const [ticksValues, setTicksValues] = useState([
      currentRefinement.min,
      currentRefinement.max
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

    return (
      <Slider
        mode={2}
        step={1}
        domain={domain}
        values={[currentRefinement.min, currentRefinement.max]}
        disabled={!canRefine}
        onChange={onChange}
        onUpdate={setTicksValues}
        rootStyle={{ position: "relative", marginTop: "1.5rem" }}
        className="ais-RangeSlider"
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
                    width: `${target.percent - source.percent}%`
                  }}
                  {...getTrackProps()}
                />
              ))}
            </div>
          )}
        </Tracks>

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

        <Ticks values={ticksValues}>
          {({ ticks }) => (
            <div>
              {ticks.map(({ id, count, value, percent }) => (
                <div
                  key={id}
                  className="slider-tick"
                  style={{
                    marginLeft: `${-(100 / count) / 2}%`,
                    width: `${100 / count}%`,
                    left: `${percent}%`
                  }}
                >
                  {value}
                </div>
              ))}
            </div>
          )}
        </Ticks>

        <style global jsx>{`
          .ais-RangeSlider {
            margin: 40px 0;
            padding: 10px 0;
          }

          .ais-RangeSlider .slider-rail {
            background-color: rgba(65, 66, 71, 0.08);
            border-radius: 3px;
            cursor: pointer;
            height: 3px;
            position: absolute;
            width: 100%;
          }

          .ais-RangeSlider .slider-track {
            background-color: #6cf;
            border-radius: 3px;
            cursor: pointer;
            height: 3px;
            position: absolute;
          }

          .ais-RangeSlider .slider-tick {
            color: #555;
            cursor: grab;
            display: flex;
            font-size: 12px;
            font-weight: bold;
            position: absolute;
            text-align: center;
            top: 30px;
            transform: translateX(-50%);
            user-select: none;
          }

          .ais-RangeSlider .slider-handle {
            border-radius: 50%;
            box-shadow: 0 4px 11px 0 rgba(37, 44, 97, 0.15),
              0 2px 3px 0 rgba(93, 100, 148, 0.2);
            cursor: grab;
            outline: none;
            position: absolute;
            transform: translate(-50%, -50%);
            width: 20px;
            height: 20px;
            z-index: 1;
            background: url("/img/pokeball-tick.svg");
          }
        `}</style>
      </Slider>
    );
  }
);
