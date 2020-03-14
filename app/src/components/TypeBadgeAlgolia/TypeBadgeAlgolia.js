import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";

import { TypeIcon } from "../TypeIcon";
import { Tag, TypeIconWrapper, TypeCount, TypeName } from "./styles";

export const TypeBadgeAlgolia = ({ type, count, active, value }) => (
  <Tag
    type={type}
    className={cx(
      "w-full flex flex-fill whitespace-no-wrap rounded-full text-center items-center px-2 py-1 my-1",
      {
        active,
        typeModifier: value.length !== 1,
      }
    )}
  >
    <TypeIconWrapper className="flex items-center">
      <TypeIcon type={type} />
    </TypeIconWrapper>

    <TypeName type={type} className={cx("text-md ml-2", { active })}>
      {type}
    </TypeName>

    <TypeCount className={cx("text-sm flex-1 text-right pr-1", { active })}>
      {count}
    </TypeCount>
  </Tag>
);

TypeBadgeAlgolia.propTypes = {
  type: PropTypes.string.isRequired,
};
