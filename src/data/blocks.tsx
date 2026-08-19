import { type ReactElement } from "react";

// Initialize variables and their colors from this file's variable definitions
import { useVariableStore, initializeVariableColors } from "@/stores";
import { getDefaultValues, variableDefinitions } from "./variables";
useVariableStore.getState().initialize(getDefaultValues());
initializeVariableColors(variableDefinitions);

import { projectileOrientBlocks } from "./sections/projectileOrient";
import { projectileDropAndKickBlocks } from "./sections/projectileDropAndKick";
import { projectileFallingBlocks } from "./sections/projectileFalling";
import { projectileSidewaysBlocks } from "./sections/projectileSideways";
import { projectileTogetherBlocks } from "./sections/projectileTogether";
import { projectileCloseBlocks } from "./sections/projectileClose";

export const blocks: ReactElement[] = [
    ...projectileOrientBlocks,
    ...projectileDropAndKickBlocks,
    ...projectileFallingBlocks,
    ...projectileSidewaysBlocks,
    ...projectileTogetherBlocks,
    ...projectileCloseBlocks,
];
