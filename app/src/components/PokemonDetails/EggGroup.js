import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { Icons } from "../Icons";

const EggIcon = styled.dd``;

export const EggGroup = ({ id, name }) => {
  return (
    <EggIcon className="inline mr-2">
      <Link href="/egg-group/[eggGroupId]" as={`/egg-group/${id}`}>
        <a>
          <Icons
            icon="eggColor"
            className={`inline mr-1 fill-group-${name.toLowerCase()}`}
            width="18"
            height="18"
          />
          {name}
        </a>
      </Link>
    </EggIcon>
  );
};
