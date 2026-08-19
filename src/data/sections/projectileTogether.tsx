import { type ReactElement } from "react";
import { Block } from "@/components/templates";
import { StackLayout } from "@/components/layouts";
import { EditableH2, EditableParagraph } from "@/components/atoms";
import { VisualOptionCards } from "@/components/organisms";

export const projectileTogetherBlocks: ReactElement[] = [
    <StackLayout key="layout-together-heading" maxWidth="xl">
        <Block id="together-heading" padding="md">
            <EditableH2 id="h2-together-heading" blockId="together-heading">
                Putting the Two Halves Together
            </EditableH2>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-together-setup" maxWidth="xl">
        <Block id="together-setup" padding="sm">
            <EditableParagraph id="para-together-setup" blockId="together-setup">
                A kicked ball is doing both of those things at once: drifting sideways at a steady speed,
                and falling faster and faster downward. Neither half knows the other one exists.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-together-hook" maxWidth="xl">
        <Block id="together-hook" padding="sm">
            <EditableParagraph id="para-together-hook" blockId="together-hook">
                Stack those two plain motions on top of each other and something rather lovely happens:
                the curve appears all by itself.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-together-visual" maxWidth="xl">
        <Block id="together-visual">
            <VisualOptionCards
                blockId="together-visual"
                intro="Pick how your students will build the curved path from its two halves."
                cards={[
                    {
                        id: "build-path-step-by-step",
                        title: "A ball's path being built one second at a time from a sideways step and a drop",
                        looks:
                            "Imagine an empty pitch with a football at the top left and, for each second of flight, a pair of arrows: one lying flat pointing across, one pointing straight down. As each pair is set, the ball hops to where those two arrows carry it and the path so far is drawn behind.",
                        manipulate:
                            "Set the flat arrow and the downward arrow for each second, then watch the ball take the step those two arrows add up to",
                        reveals:
                            "The curve is not a special shape. It is just an unchanging step across plus a growing step down, over and over",
                        paradigm: "constructivist",
                        recommended: true,
                    },
                    {
                        id: "two-shadows",
                        title: "A ball flying across a gym, with a shadow on the floor and a shadow on the wall",
                        looks:
                            "Imagine a ball kicked across a gym, lit from above so it casts a shadow sliding along the floor, and lit from the side so it casts a second shadow sliding down the wall. The floor shadow moves at an unchanging pace while the wall shadow drops faster and faster.",
                        manipulate:
                            "Drag the ball anywhere along its flight path and watch both shadows travel with it",
                        reveals:
                            "The floor shadow is the sideways motion and the wall shadow is the falling, and each one carries on exactly as it did alone",
                        paradigm: "comparison",
                    },
                    {
                        id: "score-over-the-wall",
                        title: "A free kick aimed over a defensive wall at an open goal",
                        looks:
                            "Imagine a football on the ground with a defensive wall a few metres ahead and a goal behind it, and a kick arrow attached to the ball that sets both how hard and how steeply it is struck. The chosen path is drawn as a faint curve before the ball is struck.",
                        manipulate:
                            "Swing and stretch the kick arrow until the faint curve clears the wall and drops inside the goal",
                        reveals:
                            "Aiming higher buys more hang time, and hang time is the only thing that decides how far the steady sideways speed carries the ball",
                        paradigm: "goal",
                    },
                ]}
            />
        </Block>
    </StackLayout>,
];
