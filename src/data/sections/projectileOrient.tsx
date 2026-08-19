import { type ReactElement } from "react";
import { Block } from "@/components/templates";
import { StackLayout } from "@/components/layouts";
import { EditableH1, EditableParagraph } from "@/components/atoms";

export const projectileOrientBlocks: ReactElement[] = [
    <StackLayout key="layout-orient-title" maxWidth="xl">
        <Block id="orient-title" padding="md">
            <EditableH1 id="h1-orient-title" blockId="orient-title">
                Why a Kicked Ball Falls Like a Dropped One
            </EditableH1>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-orient-opening" maxWidth="xl">
        <Block id="orient-opening" padding="sm">
            <EditableParagraph id="para-orient-opening" blockId="orient-opening">
                Kick a football and it sweeps through the air in a curve. Every shot, every pass, every
                dropped set of keys traces that same kind of path, and there is one surprisingly simple
                reason why. This is projectile motion: what happens to anything flying through the air
                once nothing is pushing it any more.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-orient-promise" maxWidth="xl">
        <Block id="orient-promise" padding="sm">
            <EditableParagraph id="para-orient-promise" blockId="orient-promise">
                By the end you will be able to explain why a ball racing sideways falls at exactly the
                same rate as one dropped from your hand. If you can already work out a distance from a
                speed and a time, you have everything you need to start.
            </EditableParagraph>
        </Block>
    </StackLayout>,
];
