import React from "react";
import Link from "next/link";
import { Icons } from "../Icons";

export const EggGroup = ({ id, name }) => {
  return (
    <Link href="/egg-group/[eggGroupId]" as={`/egg-group/${id}`}>
      <a className="flex items-center">
        <Icons
          icon="eggColor"
          className={`inline mr-1 fill-group-${name.toLowerCase()}`}
          width="18"
          height="18"
        />
        {name}
      </a>
    </Link>
  );
};
