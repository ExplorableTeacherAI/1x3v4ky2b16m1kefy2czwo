import { type ReactElement } from "react";
import { Block } from "@/components/templates";
import { StackLayout } from "@/components/layouts";
import { EditableH2, EditableParagraph } from "@/components/atoms";
import { VisualOptionCards } from "@/components/organisms";

export const projectileFallingBlocks: ReactElement[] = [
    <StackLayout key="layout-falling-heading" maxWidth="xl">
        <Block id="falling-heading" padding="md">
            <EditableH2 id="h2-falling-heading" blockId="falling-heading">
                Falling, All On Its Own
            </EditableH2>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-falling-setup" maxWidth="xl">
        <Block id="falling-setup" padding="sm">
            <EditableParagraph id="para-falling-setup" blockId="falling-setup">
                Forget sideways for a moment and watch only the falling. A dropped ball does not fall at
                a steady speed. It gains about 10 metres per second of speed every single second.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-falling-hook" maxWidth="xl">
        <Block id="falling-hook" padding="sm">
            <EditableParagraph id="para-falling-hook" blockId="falling-hook">
                So how far has it actually dropped after one second, or after three? The gaps are not
                what most people expect.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-falling-visual" maxWidth="xl">
        <Block id="falling-visual">
            <VisualOptionCards
                blockId="falling-visual"
                intro="Pick how your students will explore the falling half on its own."
                cards={[
                    {
                        id: "mark-the-pole",
                        title: "A basketball dropped beside a tall measuring pole marked in metres",
                        looks:
                            "Imagine a basketball held at the top of a tall pole marked off in metres, with three empty tags hanging beside it labelled one second, two seconds and three seconds. When the ball is released it falls past the pole and the true positions light up next to the tags.",
                        manipulate:
                            "Slide each of the three tags up or down the pole to where they think the ball will be after that many seconds, then release the ball",
                        reveals:
                            "Each second the ball drops a bigger gap than the second before, because it keeps speeding up",
                        paradigm: "constructivist",
                        recommended: true,
                    },
                    {
                        id: "heavy-and-light",
                        title: "A heavy medicine ball and a light tennis ball dropped side by side",
                        looks:
                            "Imagine a chunky medicine ball and a small tennis ball held level with each other, high above a gym floor. As they fall, each one leaves a trail of dots behind in its own lane, and a weight dial sits under the medicine ball.",
                        manipulate:
                            "Turn the weight dial to make the medicine ball as heavy or as light as they like, then drop both balls together",
                        reveals:
                            "The two trails of dots always line up, so weight makes no difference to how fast something falls",
                        targetsMisconception: "Students think heavier objects fall faster than lighter ones",
                        paradigm: "comparison",
                    },
                    {
                        id: "speed-while-falling",
                        title: "A falling ball beside a graph of how fast it is going",
                        looks:
                            "Imagine a ball part way through a fall with a large speed reading floating next to it, and a graph beside the scene where a straight line climbs as the ball drops. A marker on the line always sits at the moment students are looking at.",
                        manipulate:
                            "Drag the ball down its fall to any moment and watch the speed reading and the marker on the graph move with it",
                        reveals:
                            "The speed climbs in an even, straight-line way: ten more metres per second for every extra second of falling",
                        paradigm: "temporal",
                        secondView: {
                            shows: "A graph of falling speed against time with the current moment marked",
                            role: "complementary",
                            syncedBy:
                                "fallTime, plus a shared hover highlight linking the ball to the marker on the graph",
                        },
                    },
                ]}
            />
        </Block>
    </StackLayout>,
];
