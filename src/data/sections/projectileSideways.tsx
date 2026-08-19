import { type ReactElement } from "react";
import { Block } from "@/components/templates";
import { StackLayout } from "@/components/layouts";
import { EditableH2, EditableParagraph } from "@/components/atoms";
import { VisualOptionCards } from "@/components/organisms";

export const projectileSidewaysBlocks: ReactElement[] = [
    <StackLayout key="layout-sideways-heading" maxWidth="xl">
        <Block id="sideways-heading" padding="md">
            <EditableH2 id="h2-sideways-heading" blockId="sideways-heading">
                Sideways, All On Its Own
            </EditableH2>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-sideways-setup" maxWidth="xl">
        <Block id="sideways-setup" padding="sm">
            <EditableParagraph id="para-sideways-setup" blockId="sideways-setup">
                Now the other half. The instant the ball leaves your foot, nothing is pushing it forward
                any more, yet it keeps sailing across the pitch.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-sideways-hook" maxWidth="xl">
        <Block id="sideways-hook" padding="sm">
            <EditableParagraph id="para-sideways-hook" blockId="sideways-hook">
                With nothing shoving it along and nothing holding it back, its sideways speed simply
                stays whatever the kick gave it. So what does that look like second by second?
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-sideways-visual" maxWidth="xl">
        <Block id="sideways-visual">
            <VisualOptionCards
                blockId="sideways-visual"
                intro="Pick how your students will explore the sideways half on its own."
                cards={[
                    {
                        id: "which-arrows-act",
                        title: "A ball in mid-flight with a set of arrows students can attach to it",
                        looks:
                            "Imagine a football frozen halfway through a flight above a pitch, with a small rack of arrows resting beside it: one pointing forward, one back, one down. Whichever arrows are attached, the ball then flies the path those arrows would give it.",
                        manipulate:
                            "Drag the arrows they think are acting on the ball onto it, then release the ball and watch the path they have chosen",
                        reveals:
                            "Only the downward arrow belongs. Nothing pushes the ball forward, it simply keeps the speed the kick gave it",
                        targetsMisconception:
                            "Students think something keeps pushing the ball forward while it flies",
                        paradigm: "prediction",
                        recommended: true,
                    },
                    {
                        id: "even-spaced-dots",
                        title: "A ball sliding across smooth ice, dropping a dot every second",
                        looks:
                            "Imagine a football sliding across a wide sheet of ice with a metre scale running along underneath it, and a kick arrow attached to the ball. As it travels it leaves a dot behind every second, spread out in a neat row.",
                        manipulate:
                            "Stretch or shrink the kick arrow to change how fast the ball is sent off, then watch the row of dots it leaves",
                        reveals:
                            "The dots stay evenly spaced whatever the kick, because a steady speed covers equal distance in equal time",
                        paradigm: "conventional",
                    },
                    {
                        id: "pass-to-teammate",
                        title: "A basketball pass across a court toward a waiting teammate",
                        looks:
                            "Imagine a court seen from above with a player at one end, a teammate standing 12 metres away, and a stopwatch running in the corner. A speed arrow sits on the ball, and the ball travels the moment it is released.",
                        manipulate:
                            "Drag the speed arrow until the pass reaches the teammate in exactly two seconds",
                        reveals:
                            "Distance is just speed multiplied by time, so a 12 metre pass in 2 seconds needs 6 metres per second",
                        paradigm: "goal",
                    },
                ]}
            />
        </Block>
    </StackLayout>,
];
