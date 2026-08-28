import { type ReactElement } from "react";
import { Block } from "@/components/templates";
import { StackLayout } from "@/components/layouts";
import { EditableH1, EditableParagraph, InlineTooltip } from "@/components/atoms";

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

    <StackLayout key="layout-block-1787567186729" maxWidth="xl">
    <Block id="block-1787567186729" padding="sm">
        <EditableParagraph id="para-block-1787567186729" blockId="block-1787567186729">Thsis</EditableParagraph>
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

    <StackLayout key="layout-block-1787567267198" maxWidth="xl">
        <Block id="block-1787567267198" padding="sm">
            <EditableParagraph id="para-block-1787567267198" blockId="block-1787567267198"><InlineTooltip tooltip={"Tooltip content"} color={"#F59E0B"} bgColor={"rgba(245, 158, 11, 0.15)"} position={"auto"} maxWidth={400} id={"inlineTooltip-b82a25f4-e9a4-4f14-be59-bcbdd6353bbf"}>term</InlineTooltip></EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-block-1787886881263" maxWidth="xl">
        <Block id="block-1787886881263" padding="sm">
            <EditableParagraph id="para-block-1787886881263" blockId="block-1787886881263">this para /</EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-block-1787886871092" maxWidth="xl">
        <Block id="block-1787886871092" padding="sm">
            <EditableParagraph id="para-block-1787886871092" blockId="block-1787886871092"></EditableParagraph>
        </Block>
    </StackLayout>,
];
