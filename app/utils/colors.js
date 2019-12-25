import { desaturate } from "polished";

export const getBackgroundColorFromType = type => desaturate(0.5, type.color);
