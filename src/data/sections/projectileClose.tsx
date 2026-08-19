import { type ReactElement } from "react";
import { Block } from "@/components/templates";
import { StackLayout } from "@/components/layouts";
import { EditableH2, EditableParagraph } from "@/components/atoms";

export const projectileCloseBlocks: ReactElement[] = [
    <StackLayout key="layout-close-heading" maxWidth="xl">
        <Block id="close-heading" padding="md">
            <EditableH2 id="h2-close-heading" blockId="close-heading">
                What You Now Know
            </EditableH2>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-close-summary" maxWidth="xl">
        <Block id="close-summary" padding="sm">
            <EditableParagraph id="para-close-summary" blockId="close-summary">
                So the ball was never really curving. It was travelling sideways at a speed that never
                changed, while falling exactly as though someone had simply dropped it, and the curve is
                nothing more than those two plain motions happening at the same moment.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-close-forward" maxWidth="xl">
        <Block id="close-forward" padding="sm">
            <EditableParagraph id="para-close-forward" blockId="close-forward">
                That is why a ferocious kick and a gentle one, struck from the same height, land after the
                same amount of time. Next you can use it to work out how far a ball will actually travel
                before it lands.
            </EditableParagraph>
        </Block>
    </StackLayout>,
];
