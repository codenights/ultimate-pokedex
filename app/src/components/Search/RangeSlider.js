import React, { useState, useEffect } from "react";
import { connectRange } from "react-instantsearch-dom";
import { Slider, Rail, Handles, Tracks, Ticks } from "react-compound-slider";
import cx from "classnames";

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
        className={cx("w-full h-6 mt-4 mx-3 mr-2 relative ais-RangeSlider", {
          ["ais-RangeSlider--noRefinement"]:
            currentRefinement.min === min && currentRefinement.max === max,
        })}
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
      </Slider>
    );
  }
);
