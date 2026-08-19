import { type ReactElement } from "react";
import { Block } from "@/components/templates";
import { StackLayout } from "@/components/layouts";
import { EditableH2, EditableParagraph } from "@/components/atoms";
import { VisualOptionCards } from "@/components/organisms";

export const projectileDropAndKickBlocks: ReactElement[] = [
    <StackLayout key="layout-drop-kick-heading" maxWidth="xl">
        <Block id="drop-kick-heading" padding="md">
            <EditableH2 id="h2-drop-kick-heading" blockId="drop-kick-heading">
                One Ball Dropped, One Ball Kicked
            </EditableH2>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-drop-kick-setup" maxWidth="xl">
        <Block id="drop-kick-setup" padding="sm">
            <EditableParagraph id="para-drop-kick-setup" blockId="drop-kick-setup">
                Hold two footballs at the same height. Drop one straight down, and at that very same
                instant fling the other hard, sideways. Which one hits the floor first?
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-drop-kick-hook" maxWidth="xl">
        <Block id="drop-kick-hook" padding="sm">
            <EditableParagraph id="para-drop-kick-hook" blockId="drop-kick-hook">
                Nearly everyone picks the kicked one, because it clearly has much further to travel.
                Let's put that to the test.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-drop-kick-visual" maxWidth="xl">
        <Block id="drop-kick-visual">
            <VisualOptionCards
                blockId="drop-kick-visual"
                intro="Pick how your students will test the race between the two balls."
                cards={[
                    {
                        id: "predict-landing-spot",
                        title: "Two balls fall from the same height — one straight down, one kicked sideways",
                        looks:
                            "Imagine two footballs sitting on the edge of a table at the same height. One is nudged straight off the edge, the other is kicked hard sideways. As they fall, each one leaves a faint trail of dots showing where it was every tenth of a second.",
                        manipulate:
                            "Place a faint copy of the kicked ball where they think it will be at the moment the dropped ball touches the floor",
                        reveals:
                            "Both balls reach the floor at the same moment, no matter how hard the kick",
                        targetsMisconception:
                            "Students think a ball thrown sideways stays up longer than one simply dropped",
                        paradigm: "prediction",
                        recommended: true,
                    },
                    {
                        id: "step-through-fall",
                        title: "Two falling balls joined by a straight line at every instant",
                        looks:
                            "Imagine the same two balls, one dropped and one kicked, with a straight line drawn between them at every moment of the fall. As students move through the fall the line stays flat all the way down, and both balls sink by the same amount each step.",
                        manipulate:
                            "Drag a handle along the timeline to move both balls through the fall together, pausing anywhere they like",
                        reveals:
                            "At every single instant the two balls are at the same height, so falling does not care about sideways speed",
                        paradigm: "temporal",
                    },
                    {
                        id: "kick-strength-graph",
                        title: "Two balls leaving a table, with a graph of their heights beside them",
                        looks:
                            "Imagine two balls dropping off a table together, one straight down and one kicked sideways, with a graph beside them drawing one line per ball as they fall. However hard the kick, the two lines land exactly on top of each other.",
                        manipulate:
                            "Stretch the arrow on the kicked ball to make the kick weaker or ferocious, then compare the two lines on the graph",
                        reveals:
                            "Changing the sideways kick changes the path across the room but never changes the fall",
                        paradigm: "comparison",
                        secondView: {
                            shows: "A graph of height against time, with one line drawn for each ball",
                            role: "complementary",
                            syncedBy:
                                "kickSpeed and fallTime, plus a shared hover highlight linking each ball to its own line",
                        },
                    },
                ]}
            />
        </Block>
    </StackLayout>,
];
