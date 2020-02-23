import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import { TypeIcon } from "../TypeIcon";
import { Tag, TypeCount, TypeName } from "./styles";

export const TypeBadgeAlgolia = ({ type, count, active }) => (
  <Tag
    type={type}
    className={classnames(
      "w-full flex flex-fill whitespace-no-wrap rounded-full text-center px-2 items-center p-1 my-2",
      {
        active
      }
    )}
  >
    <TypeIcon type={type} />
    <TypeName type={type} className="text-md ml-2">
      {type}
    </TypeName>
    <TypeCount className="text-sm text-gray-600 flex-1 text-right pr-1">
      {count}
    </TypeCount>
  </Tag>
);

TypeBadgeAlgolia.propTypes = {
  type: PropTypes.string.isRequired
};
