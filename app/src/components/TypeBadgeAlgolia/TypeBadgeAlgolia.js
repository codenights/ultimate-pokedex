import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";

import { TypeIcon } from "../TypeIcon";
import { Tag, TypeCount, TypeName } from "./styles";

export const TypeBadgeAlgolia = ({ type, count, active }) => (
  <Tag
    type={type}
    className={cx(
      "w-full flex flex-fill whitespace-no-wrap rounded-full text-center items-center px-2 py-1 my-1",
      {
        active,
      }
    )}
  >
    <TypeIcon type={type} />

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
